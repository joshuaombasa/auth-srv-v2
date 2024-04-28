import express from 'express';

const signoutRouter = express.Router();

signoutRouter.post('/api/users/signout', (request, response) => {
  response.send({});
});

export { signoutRouter };
