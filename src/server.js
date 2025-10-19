import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

//Configuracion
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/v1/auth', (await import('./routes/authRoutes.js')).default);
app.use('./api/v1/products', (await import('./routes/productsRoutes.js')).default);
app.use('./api/v1/orders', (await import('./routes/ordersRoutes.js')).default);
app.use('./api/v1/mipymes', (await import('./routes/mipymeRoutes.js')).default);

//Ruta de salud
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'MarketPlace running',
        timestamp: new Date().toISOString()
    });
});

//Manejo de errores
app.use((err, req, res, next) =>{
    console.error('Error', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went error'
    });
});

app.listen(PORT, () => {
    console.log(`MarketPlace running on port ${PORT}`);
    console.log(`Enviroment: ${process.env.NODE_ENV}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
})