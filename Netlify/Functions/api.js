import { neon } from '@netlify/neon';
import bcrypt from 'bcryptjs';

// Esto usa la variable de entorno que Netlify configura
const sql = neon();

export const handler = async (event) => {
  const { action, user, email, password } = JSON.parse(event.body);

  if (!action) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'No action specified.' }),
    };
  }

  try {
    switch (action) {
      case 'register':
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql`INSERT INTO usuarios ("user", email, password, rol_id) VALUES (${user}, ${email}, ${hashedPassword}, 2)`;
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, message: 'Usuario registrado correctamente.' }),
        };

      case 'login':
        const [dbUser] = await sql`SELECT password FROM usuarios WHERE "user" = ${user}`;
        if (dbUser && await bcrypt.compare(password, dbUser.password)) {
          return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Login exitoso.' }),
          };
        } else {
          return {
            statusCode: 401,
            body: JSON.stringify({ success: false, message: 'Usuario o contraseña incorrectos.' }),
          };
        }
      
      case 'getProducts':
        const productos = await sql`SELECT nombre, descripcion, imagen, precio, cantidad FROM productos`;
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, productos }),
        };

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ success: false, message: 'Invalid action.' }),
        };
    }
  } catch (error) {
    if (error.message.includes('unique constraint')) {
      return {
        statusCode: 409,
        body: JSON.stringify({ success: false, message: 'El usuario o correo ya existen.' }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: `Error de base de datos: ${error.message}` }),
    };
  }
};