import { Sequelize } from 'sequelize';
import { Options } from 'sequelize/types';
import dbConfig from '~configs/database';

const connection = new Sequelize(dbConfig as Options);

export default connection;
