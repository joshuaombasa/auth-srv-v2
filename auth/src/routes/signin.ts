import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { body } from 'express-validator';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentails');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentails');
    }

     // Generate jwt

     const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store jwt on session object

    request.session = { jwt: userJwt };

    response.status(201).send(existingUser);
  }
);

export { signinRouter };
