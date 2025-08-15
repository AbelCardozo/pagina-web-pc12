CREATE TABLE IF NOT EXISTS permisos (
    id SERIAL PRIMARY KEY,
    rol VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO permisos (rol) VALUES ('Administrador'), ('Usuario')
ON CONFLICT (rol) DO NOTHING;

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    "user" VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL DEFAULT 2,
    FOREIGN KEY (rol_id) REFERENCES permisos (id)
);

CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad INT NOT NULL,
    descripcion TEXT
);