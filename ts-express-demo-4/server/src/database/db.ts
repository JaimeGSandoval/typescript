import { Pool } from 'pg';

const pool = new Pool({
  user: 'dev',
  host: 'localhost',
  port: 5432,
  database: 'ninjas',
});

export default pool;
