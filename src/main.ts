require('dotenv').config();
import { connect } from '~database/connection';
import User from './models/User';
import dbConfig from './configs/database';
import { Options } from 'sequelize/types';

async function main() {
  try {
    await connect(dbConfig as Options);
    const user = await User.create({
      name: 'João',
      email: 'joaomainka182@gmail.com',
      age: 30,
    });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

main();

export {};
