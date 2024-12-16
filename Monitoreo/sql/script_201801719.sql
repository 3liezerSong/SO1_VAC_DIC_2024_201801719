CREATE DATABASE IF NOT EXISTS monitoring_db;

USE monitoring_db;

CREATE TABLE IF NOT EXISTS ram_metric (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_ram INT NOT NULL,                   
    free_ram INT NOT NULL,
    used_ram INT NOT NULL,
    percentage_used DECIMAL(5, 2) NULL,
    metric_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),      
    updated_by VARCHAR(255),           
    version INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cpu_metric (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pid INT NOT NULL,                    
    process_name VARCHAR(255) NOT NULL,  
    user_name VARCHAR(255) NOT NULL,     
    process_state VARCHAR(255) NOT NULL, 
    metric_type ENUM('CPU') NOT NULL, 
    metric_value DECIMAL(5, 2) NOT NULL, 
    metric_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),             
    updated_by VARCHAR(255),             
    version INT DEFAULT 0
);

/*
Constuir un json con la informacion de la memoria RAM
{
    "total_ram": 0,
    "free_ram": 0,
    "used_ram": 0
    "percentage_used": 0
}
*/