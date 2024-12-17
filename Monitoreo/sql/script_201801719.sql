CREATE DATABASE IF NOT EXISTS monitoring_db;

USE monitoring_db;

GRANT ALL PRIVILEGES ON monitoring_db.* TO 'grafana_user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS ram_metric (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_vm VARCHAR(100) NOT NULL,
    metric_type ENUM('RAM') NOT NULL, 
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
    ip_vm VARCHAR(100) NOT NULL,
    metric_type ENUM('CPU') NOT NULL, 
    percentage_used DECIMAL(5, 2) NOT NULL,
    pid INT NOT NULL,                    
    process_name VARCHAR(255) NOT NULL,  
    user_name INT NOT NULL,     
    process_state INT NOT NULL, 
    metric_value DECIMAL(5, 2) NOT NULL, 
    metric_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(255),             
    updated_by VARCHAR(255),             
    version INT DEFAULT 0
);
