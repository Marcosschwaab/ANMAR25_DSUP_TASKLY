import express, { ErrorRequestHandler } from 'express';
import "reflect-metadata"
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import noteRoutes from './routes/noteRoutes';
import { errorHandler } from './middlewares/errorHandler';

import { dataSource } from './config/database';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/', taskRoutes);
app.use('/api/v1/', noteRoutes);

// Error handler
app.use(errorHandler as ErrorRequestHandler);

//Database test
dataSource.initialize().then(() => {
    console.log('Database connected!');
}).catch((error) => {
    console.error('Error connecting to database:', error);
});

//Server test
app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});