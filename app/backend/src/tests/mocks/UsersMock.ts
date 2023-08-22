import * as bcrypt from 'bcryptjs';

const password = 'secret';
const validEmail = 'ashen_one@gmail.com';
const invalidEmail = 'lautrec';

const user1 = {
  id: 1,
  username: 'Gwyn',
  role: 'admin',
  email: validEmail,
  password: bcrypt.hashSync(password, 10),
};

const user2 = {
  id: 2,
  username: 'Ashen One',
  role: 'Goleiro',
  email: validEmail,
  password: bcrypt.hashSync(password, 10),
};

const users = [user1, user2];

const loginBody = {
  email: validEmail,
  password: password,
};

const invalidLoginEmailBody = {
  email: invalidEmail,
  password: password,
};

const invalidLoginPasswordBody = {
  email: validEmail,
  password: '123',
};

export {
  user1,
  user2,
  users,
  loginBody,
  invalidLoginEmailBody,
  invalidLoginPasswordBody,
};
