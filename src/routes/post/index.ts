import { Router } from "express";

import PostCrudRoute from './controller';

const PostRoute = Router();
PostRoute.use('/', PostCrudRoute);
export default PostRoute;