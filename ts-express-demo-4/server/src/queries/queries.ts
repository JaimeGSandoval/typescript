const getAllUsersQuery: string = 'SELECT * FROM users ORDER BY id ASC';

const getUserByIdQuery: string = 'SELECT * FROM users WHERE id = $1';

const createUserQuery: string =
  'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';

const updateUserQuery: string =
  'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';

const deleteUserQuery: string = 'DELETE FROM users WHERE id = $1';

export default {
  getAllUsersQuery,
  getUserByIdQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
};
