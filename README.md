# Installing

```
yarn add pg pg-hstore sequelize
yarn add sequelize-cli -D
```

# Configuring

Create a database configuration file on `config/database.js`
```
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
```

Implement DB connection on `database/index.ts`
```
import { Sequelize } from 'sequelize';
import dbConfig from '~configs/database';

const connection = new Sequelize(dbConfig);

export default connection;
```

Create .sequelizerc to set config file
```
const path = require('path');

module.exports = {
  config: path.resolve(__dirname, 'src', 'configs', 'database.js'),
};
```

Cretea database through sequelize-cli
```
yarn sequelize db:create
```

# Migrations

Add migrations path on .sequelizerc
```
const path = require('path');

module.exports = {
  ...,
  'migrations-path': path.resolve(__dirname, 'src', 'database', 'migrations')
};
```

Create your first migration
```
yarn sequelize migration:create --name=create-users
```

Execute your migration
```
yarn sequelize db:migrate
```

Undo your last migration
```
yarn sequelize db:migrate:undo
```