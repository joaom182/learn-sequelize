/**
 * @jest-environment ./src/configs/jest-environment
 */

import { Options } from 'sequelize/types';
import dbOptions from '~configs/database';
import { connect } from '~database/connection';
import User from './User';

describe('Users table integration test', () => {
  beforeAll(async () => {
    await connect(dbOptions as Options);
  });

  it('should create a user on database', async () => {
    const user = await User.create({
      name: 'João',
      email: 'joaomainka182@gmail.com',
      age: 30,
    });
    expect(user).toHaveProperty('id');
    expect(user.name).toEqual('João');
    expect(user.email).toEqual('joaomainka182@gmail.com');
    expect(user.age).toEqual(30);
  });
});

export {};
