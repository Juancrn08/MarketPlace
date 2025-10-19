import pkg from 'pg';
const {Client} = pkg; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { console } from 'inspector';

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'Juancrn01',
    password: process.env.DB_PASSWORD,
    database: 'MarketP'
}

async function setupDatabase() {
    const client = new Client(config);

    try {
        await client.connect();
        console.log('Conectando a PostgreSQL...')

        //Crear base de datos si no existe

        try {
             await client.query('Create Database MarketP');
             console.log('Base de datos "MarketP" creada');
        } catch (err) {
            if (err.code == '42P04') {
                console.log('La base de datos ya existe');
            } else {
                throw err;
            }
        }

        await client.end();
        config.database = MarketP;
        const clientMarketP = new Client(config);
        await clientMarketP.connect();

        // Ejecutar schema SQL
        const schemaPath = path.join(_dirname, '../database/schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf');

        await clientMarketP .query(schemaSQL);
        console.log('Esquema de base de datos creado');

        //Ejecutar datos iniciales
        const seedsPath = path.join(_dirname, '../database/seeds/initial-data.sql');
        if (fs.existsSync(seedsPath)){
            const seedsSQL = fs.readFileSync(seedsPath, 'utf8');
            await MarketP.query(seedsSQL);
            console.log('Datos iniciales insertados');
        }
        
        console.log('Base de datos configurada correctamente');
        await MarketP.end();
    } catch (error) {
        console.error('Error configurando la base de datos', error);
        process.exit(1);
    }
}

setupDatabase();