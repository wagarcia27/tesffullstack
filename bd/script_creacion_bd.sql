CREATE DATABASE IF NOT EXISTS bd_meza;

USE bd_meza;

CREATE TABLE IF NOT EXISTS person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    fechaNacimiento DATE,
    puesto VARCHAR(255),
    sueldo DECIMAL(10, 2)
);


CREATE USER 'conexion'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'conexion'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;