package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os/exec"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/shirou/gopsutil/cpu"
)

/*type Process struct {
	pid           int     `json:"pid"`
	process_name  string  `json:"name"`
	user_name     int     `json:"user"`
	process_state int     `json:"state"`
	metric_value  float64 `json:"ram"`
	father        int     `json:"father"`
}

type Cpu struct {
	ip_vm           string    `json:"ip"`
	percentage_used float64   `json:"percentage_used"`
	processes       []Process `json:"tasks"`
}

type Ram struct {
	ip_vm           string  `json:"ip"`
	total_ram       float64 `json:"total_ram"`
	free_ram        float64 `json:"free_ram"`
	used_ram        float64 `json:"used_ram"`
	percentage_used float64 `json:"percentage_used"`
}*/

type Process struct {
	Pid    int     `json:"pid"`
	Name   string  `json:"name"`
	User   int     `json:"user"`
	State  int     `json:"state"`
	Ram    float64 `json:"ram"`
	Father int     `json:"father"`
}

type Cpu struct {
	IP        string    `json:"ip"`
	Usage     float64   `json:"percentage_used"`
	Processes []Process `json:"tasks"`
}

type Ram struct {
	IP    string  `json:"ip"`
	Total float64 `json:"total_ram"`
	Free  float64 `json:"free_ram"`
	Used  float64 `json:"used_ram"`
	Perc  float64 `json:"percentage_used"`
}

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome!")
}

// Función para obtener el hostname
func getHostName() (string, error) {
	cmd := exec.Command("hostname")
	out, err := cmd.Output()
	if err != nil {
		return "", err
	}
	return string(out), nil
}

func getIPAddress() (string, error) {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", err
	}
	for _, addr := range addrs {
		if ipNet, ok := addr.(*net.IPNet); ok && !ipNet.IP.IsLoopback() {
			if ipNet.IP.To4() != nil {
				return ipNet.IP.String(), nil
			}
		}
	}
	return "", err
}

// postScheduledData
func postScheduledData() {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			fmt.Println("======= DATOS MODULO CPU =======")
			fmt.Println(" ")
			cmdCpu := exec.Command("sh", "-c", "cat /proc/cpu")
			outCpu, errCpu := cmdCpu.CombinedOutput()
			if errCpu != nil {
				fmt.Println(errCpu)
			}

			ip, err := getIPAddress()
			if err != nil {
				fmt.Println("Error al obtener la IP:", err)
			}

			//---CPU
			fmt.Println("======= CPU =======")
			var cpu_info Cpu
			err = json.Unmarshal([]byte(outCpu), &cpu_info)
			if err != nil {
				fmt.Println(err)
			}
			cpu_info.IP = ip
			//Mandar el post
			url := "http://34.28.123.123:5000/api/cpu-metric"
			//Manda cpu_info que es un json
			p_cpu, err := cpu.Percent(time.Second, false)
			if err != nil {
				fmt.Println(err)
			}
			cpu_info.Usage = p_cpu[0]
			jsonValue, _ := json.Marshal(cpu_info)
			fmt.Println(string(jsonValue))
			//Mandar el json a la url
			response, err := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))
			if err != nil {
				fmt.Println(err)
			} else {
				defer response.Body.Close()
				responseBody, err := ioutil.ReadAll(response.Body)
				if err != nil {
					fmt.Println(err)
				} else {
					fmt.Println("\x1b[32m", string(responseBody), "\x1b[0m")
				}
			}
			fmt.Println(" ")
			fmt.Println("======= DATOS MODULO RAM =======")
			fmt.Println(" ")

			cmdRam := exec.Command("sh", "-c", "cat /proc/ram")
			outRam, errRam := cmdRam.CombinedOutput()
			if errRam != nil {
				fmt.Println(errRam)
			}
			//---RAM
			fmt.Println("======= RAM =======")
			var ram_info Ram
			err = json.Unmarshal([]byte(outRam), &ram_info)
			if err != nil {
				fmt.Println(err)
			}
			ram_info.IP = ip
			//Mandar respuesta
			url = "http://34.28.123.123:5000/api/ram-metric"
			//Manda ram_info que es un json
			jsonValue, _ = json.Marshal(ram_info)
			fmt.Println(string(jsonValue))
			//Mandar el json a la url
			response, err = http.Post(url, "application/json", bytes.NewBuffer(jsonValue))
			if err != nil {
				fmt.Println(err)
			} else {
				defer response.Body.Close()
				responseBody, err := ioutil.ReadAll(response.Body)
				if err != nil {
					fmt.Println(err)
				} else {
					fmt.Println("\x1b[32m", string(responseBody), "\x1b[0m")
				}
			}
			fmt.Println(" ")
		}
	}
}

func main() {

	fmt.Println("Starting server... - Clase 5 - Sistemas Operativos 1")
	router := mux.NewRouter().StrictSlash(true)
	//Endpoints
	router.HandleFunc("/", Index).Methods("GET")

	//Iniciar go routine
	go postScheduledData()

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	//Start server
	fmt.Println("Server started at port 5200")
	log.Fatal(http.ListenAndServe(":5200", handlers.CORS(headers, methods, origins)(router)))
}
