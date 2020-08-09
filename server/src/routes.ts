import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';

const routes = express.Router();
const clasesController = new ClassesController();
const connectionsController  = new ConnectionController();

routes.post('/classes', clasesController.create);
routes.get('/classes', clasesController.index);
routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;