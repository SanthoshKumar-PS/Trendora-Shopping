import express from 'express';
import { getDashboardData } from '../../controllers/warehouse/dashboardController';

export const apiRouter = express.Router();

apiRouter.get('/dashboard',getDashboardData)