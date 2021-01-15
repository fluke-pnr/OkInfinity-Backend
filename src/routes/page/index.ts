import { Router } from "express";
import PageCrudRoute from './controller';

const PageRoute = Router();
PageRoute.use('/', PageCrudRoute);
export default PageRoute;