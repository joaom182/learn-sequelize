require('dotenv').config({
  path: '.env.test',
});
const NodeEnvironment = require('jest-environment-node');
const { v4: uuid } = require('uuid');
const { execSync } = require('child_process');
const { connect } = require('../database/connection');

const sequelizeCli = './node_modules/.bin/sequelize';

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `db_test_${uuid()}`;
    this.connection = null;
  }

  async setup() {
    this.global.process.env.DB_NAME = process.env.DB_NAME = this.schema;
    this.global.process.env.DB_STORAGE =
      process.env.DB_STORAGE = `/var/tmp/data/${this.schema}.sqlite`;
    execSync(`${sequelizeCli} db:migrate`);
  }

  async teardown() {
    execSync(`rm -rf ${process.env.DB_STORAGE}`).toString();
  }
}

module.exports = CustomEnvironment;
