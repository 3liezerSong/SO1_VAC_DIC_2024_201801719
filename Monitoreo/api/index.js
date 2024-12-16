// Dependencias
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');

// Inicialización de Express
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Configuración de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  });
  

// Modelos
const RamMetric = sequelize.define('RamMetric', {
  total_ram: { type: DataTypes.INTEGER, allowNull: false },
  free_ram: { type: DataTypes.INTEGER, allowNull: false },
  used_ram: { type: DataTypes.INTEGER, allowNull: false },
  percentage_used: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  metric_date: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: 'ram_metric',
  timestamps: false,
});

const CpuMetric = sequelize.define('CpuMetric', {
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

// Ruta para insertar métricas de RAM
app.post('/api/ram-metric', async (req, res) => {
  try {
    const { total_ram, free_ram, used_ram, percentage_used, metric_date } = req.body;

    if (!total_ram || !free_ram || !used_ram || !metric_date) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    const ramMetric = await RamMetric.create({
      total_ram,
      free_ram,
      used_ram,
      percentage_used,
      metric_date,
    });

    res.status(201).json(ramMetric);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar la métrica de RAM.' });
  }
});

// Ruta para insertar métricas de CPU
app.post('/api/cpu-metric', async (req, res) => {
  try {
    const { pid, process_name, user_name, process_state, metric_type, metric_value, metric_date } = req.body;

    if (!pid || !process_name || !user_name || !process_state || !metric_type || !metric_value || !metric_date) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    if (metric_type !== 'CPU') {
      return res.status(400).json({ error: 'El tipo de métrica debe ser "CPU".' });
    }

    const cpuMetric = await CpuMetric.create({
      pid,
      process_name,
      user_name,
      process_state,
      metric_type,
      metric_value,
      metric_date,
    });

    res.status(201).json(cpuMetric);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar la métrica de CPU.' });
  }
});

// Inicialización del servidor
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
