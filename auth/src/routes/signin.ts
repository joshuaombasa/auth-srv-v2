import express from 'express';

const signinRouter = express.Router();

signinRouter.post('/api/users/signin', (request, response) => {
  response.send({});
});

export { signinRouter };
