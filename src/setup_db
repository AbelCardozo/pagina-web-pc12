import { neon } from '@netlify/neon';
import bcrypt from 'bcryptjs';

// Esto usa la variable de entorno que Netlify configura
const sql = neon();

async function setupDatabase() {
    try {
        // --- 1. Crear las tablas ---
        await sql`
            CREATE TABLE IF NOT EXISTS permisos (
                id SERIAL PRIMARY KEY,
                rol VARCHAR(50) NOT NULL UNIQUE
            );
            
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
        `;

        // --- 2. Insertar datos iniciales ---

        // Insertar roles
        await sql`
            INSERT INTO permisos (rol) VALUES ('Administrador'), ('Usuario')
            ON CONFLICT (rol) DO NOTHING;
        `;

        // Insertar usuario administrador si no existe
        const [adminExists] = await sql`SELECT COUNT(*) FROM usuarios WHERE "user" = 'admin'`;
        if (adminExists.count === '0') {
            const hashedPassword = await bcrypt.hash('1234', 10);
            await sql`
                INSERT INTO usuarios ("user", password, email, rol_id)
                VALUES ('admin', ${hashedPassword}, 'admin@paginaweb.com', 1)
            `;
        }
        
        // Insertar productos si la tabla está vacía
        const [productsExist] = await sql`SELECT COUNT(*) FROM productos`;
        if (productsExist.count === '0') {
            const productos = [
                ['Camiseta Gamer', '../productos/camiseta.png', 2999.99, 12, 'Camiseta temática gamer con diseño exclusivo.'],
                ['Gabinete', '../productos/gabinete.png', 13500.00, 5, 'Gabinete de PC moderno con diseño gaming y buena ventilación.'],
                ['Memoria DDR4 8GB', '../productos/memoria-generico-dimm-ddr4-8gb-2666mhz-cl19-25158.png', 9500.00, 15, 'Memoria RAM DDR4 de 8GB a 2666MHz, ideal para multitarea.'],
                ['Placa Base', '../productos/placa-base.png', 23000.00, 8, 'Placa madre compatible con procesadores Intel.'],
                ['Llaveros Animados', '../productos/llavero.png', 2000.00, 1, 'Llaveros con diseños de personajes animados.'],
                ['Llaveros Demon Slasher', '../productos/llavero2.png', 1500.00, 1, 'Llaveros temáticos de la serie Demon Slasher.'],
                ['Llaveros Neverland', '../productos/llavero3.png', 1500.00, 1, 'Llaveros inspirados en Neverland.'],
                ['Remera Estampada', '../productos/remera3.png', 5500.00, 1, 'Remera de alta calidad con estampado premium.'],
                ['Taza Pac-Man', '../productos/taza.png', 3000.00, 1, 'Taza con diseño retro de Pac-Man.'],
                ['Taza Mario Bros', '../productos/taza1.png', 3000.00, 1, 'Taza con diseño del icónico personaje Mario Bros.'],
                ['Taza Naruto', '../productos/taza2.png', 3000.00, 1, 'Taza temática del anime Naruto.'],
                ['Taza Sonic', '../productos/taza3.png', 3000.00, 1, 'Taza con diseño del clásico personaje Sonic.'],
                ['Taza Totoro', '../productos/taza4.png', 3000.00, 1, 'Taza con el tierno personaje de Totoro.'],
                ['Taza Dragon Ball Z', '../productos/taza5.png', 3000.00, 1, 'Taza con diseño de los personajes de Dragon Ball Z.']
            ];
            
            const insertPromises = productos.map(p => 
                sql`INSERT INTO productos (nombre, imagen, precio, cantidad, descripcion) VALUES (${p[0]}, ${p[1]}, ${p[2]}, ${p[3]}, ${p[4]})`
            );
            await Promise.all(insertPromises);
        }
        
        console.log('Base de datos inicializada y productos insertados correctamente.');
        
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error.message);
    }
}

setupDatabase();