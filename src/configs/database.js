const dbOptions = {
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ...(process.env.DB_LOGS_ENABLED === 'false' && { logging: () => {} }),
  define: {
    timestamps: true, // created_at, updated_at
    underscored: true, // conver tableName to table_name
  },
};

module.exports = dbOptions;
