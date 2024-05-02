import express from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const currentuserRouter = express.Router();

currentuserRouter.get(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  (request, response) => {
    response.send({ currentUser: request.currentUser || null });
  }
);

export { currentuserRouter };
