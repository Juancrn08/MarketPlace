import pkg from 'pg';
const {Client} = pkg; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'Juancrn01',
    password: process.env.DB_PASSWORD || '1234', 
    database: 'postgres'
}

async function setupDatabase() {
    const client = new Client(config);

    try {
        await client.connect();
        console.log('Conectando a PostgreSQL...');

        // Crear base de datos si no existe
        try {
            await client.query('CREATE DATABASE marketp');
            console.log('✅ Base de datos "marketp" creada');
        } catch (err) {
            if (err.code === '42P04') {
                console.log('ℹ️ La base de datos ya existe');
            } else {
                throw err;
            }
        }

        await client.end();
        config.database = 'marketp';
        const clientMarketP = new Client(config);
        await clientMarketP.connect();
        console.log('✅ Conectado a MarketP');

        // ✅ CORREGIR ESTA RUTA según donde esté schema.sql
        const schemaPath = path.join(__dirname, '../database/schema.sql'); // Cambia esto
        console.log('📁 Buscando schema en:', schemaPath);
        
        if (fs.existsSync(schemaPath)) {
            console.log('✅ schema.sql encontrado');
            const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
            await clientMarketP.query(schemaSQL);
            console.log('✅ Esquema de base de datos creado');
        } else {
            console.log('❌ ERROR: schema.sql no encontrado en:', schemaPath);
            // Listar archivos para debug
            const files = fs.readdirSync(__dirname);
            console.log('📂 Archivos en directorio actual:', files);
            return;
        }

        console.log('🎉 Base de datos y tablas creadas correctamente');
        await clientMarketP.end();
        
    } catch (error) {
        console.error('❌ Error configurando la base de datos:', error.message);
        process.exit(1);
    }
}

setupDatabase();