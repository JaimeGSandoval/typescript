import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import pool from '../database/db';
import queries from '../queries/queries';

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const queryResult: QueryResult = await pool.query(queries.getAllUsersQuery);

    return res.status(200).json({
      status: 'Success',
      data: {
        users: queryResult.rows,
      },
    });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json('Internal server error');
  }
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const userId = parseInt(req.params.id, 10);

  try {
    const queryResult: QueryResult = await pool.query(
      queries.getUserByIdQuery,
      [userId]
    );

    if (!queryResult.rows.length) {
      return res.status(400).json({
        status: 'Fail',
        message: 'No user by that ID',
      });
    }

    return res.status(200).json({
      status: 'Success',
      data: {
        user: queryResult.rows,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'Fail',
      message: 'Internal server error',
    });
  }
};

interface CreateUser {
  name: string;
  email: string;
}

const createUser = async (
  req: Request<{}, {}, {}, CreateUser>,
  res: Response
): Promise<Response> => {
  const name: string = req.query.name;
  const email: string = req.query.email;

  if (!name || !email) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Bad request. Name and Email must be provided.',
    });
  }

  try {
    const queryResult: QueryResult = await pool.query(queries.createUserQuery, [
      name,
      email,
    ]);

    return res.status(201).json({
      status: 'Success',
      data: {
        createdUser: queryResult.rows,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

interface UpdateUser {
  name?: string;
  email?: string;
  id: string;
}

const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUser>,
  res: Response
): Promise<Response> => {
  const name: string | undefined = req.body.name;
  const email: string | undefined = req.body.email;
  const id: number = parseInt(req.params.id);

  if (!name || !email) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Bad request. A value must be provided to update name or email.',
    });
  }

  try {
    const queryResult: QueryResult = await pool.query(queries.updateUserQuery, [
      name,
      email,
      id,
    ]);

    return res.status(200).json({
      status: 'Success',
      data: {
        createdUser: queryResult.rows,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  try {
    const userExists: QueryResult = await pool.query(queries.getUserByIdQuery, [
      id,
    ]);

    if (!userExists.rows.length) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Bad request. No user exists by that ID',
      });
    }

    await pool.query(queries.deleteUserQuery, [id]);

    return res.status(200).json({
      status: 'Success',
      message: 'User successfully deleted',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
