import express from 'express';

const currentuserRouter = express.Router();

currentuserRouter.get('/api/users/currentuser', (request, response) => {
  response.send({});
});

export { currentuserRouter };
