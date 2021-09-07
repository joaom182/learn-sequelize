import { Sequelize } from 'sequelize';
import { Options } from 'sequelize/types';
import dbConfig from '~configs/database';
import User from '~src/models/User';

const connection = new Sequelize(dbConfig as Options);

User.setup(connection);

export default connection;
