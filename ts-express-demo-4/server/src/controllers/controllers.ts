import { Request, Response } from 'express';
import pool from '../database/db';

const getNinjas = async (req: Request, res: Response) => {
  await pool.query('SELECT * FROM ninjas', (error, results) => {
    if (error) {
      return res.send(error.message);
    }

    return res.send(results.rows);
  });
};

export default {
  getNinjas,
};
