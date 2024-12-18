const express = require('express');
const { Sequelize, DataTypes, DATE } = require('sequelize');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// Configuración de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,     
  process.env.DB_PASSWORD,   
  {
    host: process.env.DB_HOST, 
    port: 3306,         
    dialect: 'mysql',
  }
);


// RamMetric Model
const RamMetric = sequelize.define('RamMetric', {
  ip_vm: { type: DataTypes.STRING, allowNull: false },
  metric_type: { type: DataTypes.ENUM('RAM'), allowNull: false },
  total_ram: { type: DataTypes.INTEGER, allowNull: false },
  free_ram: { type: DataTypes.INTEGER, allowNull: false },
  used_ram: { type: DataTypes.INTEGER, allowNull: false },
  percentage_used: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  metric_date: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: 'ram_metric',
  timestamps: false,
});
// CpuMetric Model
const CpuMetric = sequelize.define('CpuMetric', {
  ip_vm: { type: DataTypes.STRING, allowNull: false },
  pid: { type: DataTypes.INTEGER, allowNull: false },
  process_name: { type: DataTypes.STRING, allowNull: false },
  user_name: { type: DataTypes.STRING, allowNull: false },
  process_state: { type: DataTypes.STRING, allowNull: false },
  metric_type: { type: DataTypes.ENUM('CPU'), allowNull: false },
  metric_value: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  metric_date: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: 'cpu_metric',
  timestamps: false,
});

// Rutas
app.post('/api/ram-metric', async (req, res) => {
  try {
    const {ip, total_ram, free_ram, used_ram, percentage_used} = req.body;

    const metric_type = "RAM";
    var metric_date =  new Date();
    const ramMetric = await RamMetric.create({
      ip_vm: ip,
      metric_type,
      total_ram,
      free_ram,
      used_ram,
      percentage_used,
      metric_date,
    });

    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar la métrica de RAM.' });
  }
});

app.post('/api/cpu-metric', async (req, res) => {
  try {
    const { ip_vm, percentage_used, processes } = req.body;
    if (!ip_vm || !percentage_used || !processes) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }
    const metric_type = 'CPU';
    const metric_date = new Date();
    
    for (const process of processes) {
      const { pid, process_name, user_name, process_state, metric_value, father } = process;

      if (!pid || !process_name || !user_name || !process_state || !father) {
        return res.status(400).json({ error: 'Faltan campos obligatorios en las tareas.' });
      }

      if (metric_value === null || metric_value === undefined) { 
        metric_value = 0; 
      }

      await CpuMetric.create({
        ip_vm,
        metric_type,
        pid,
        process_name,
        user_name,
        process_state,
        metric_value,
        metric_date,
      });
    }

    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar las métricas de CPU.' });
  }
});



app.post('/api/cpu-metric-v2', async (req, res) => {
  try {
    const { ip_vm, percentage_used, pid, process_name, user_name, process_state, metric_value, father} = req.body;

    if ( !ip_vm || !percentage_used || !pid || !process_name || !user_name || !process_state || !metric_value || !father) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }
    const metric_type = 'CPU';
    var metric_date = new Date();
    const cpuMetric = await CpuMetric.create({
      ip_vm,
      metric_type,
      pid,
      process_name,
      user_name,
      process_state,
      metric_value,
      metric_date,
    });

    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar la métrica de CPU.' });
  }
});


app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ status: 'ok', message: 'Servicio activo y conectado a la base de datos.' });
  } catch (error) {
    console.error('Error en el Health Check:', error);
    res.status(500).json({ status: 'error', message: 'Problema con la conexión a la base de datos.' });
  }
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    await sequelize.sync();
    console.log(`Servidor corriendo en http://localhost:${port}`);
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});
