import { Sequelize } from 'sequelize';
import { Options } from 'sequelize/types';
import User from '../models/User';
import Question from '../models/Question';

const connections: {
  [key: string]: Sequelize;
} = {};

function setupModels(connection: Sequelize) {
  User.setup(connection);
  Question.setup(connection);
}

export async function connect(options: Options): Promise<Sequelize> {
  const key = options.database as string;

  if (connections[key]) return connections[key];

  const connection = new Sequelize(options);
  connections[key] = connection;
  setupModels(connection);
  return connections[key];
}
