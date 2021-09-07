const dbOptions = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'docker',
  password: 'docker',
  database: 'sqlnode',
  define: {
    timestamps: true, // created_at, updated_at
    underscored: true, // conver tableName to table_name
  },
};

module.exports = dbOptions;
