# Installing

```
yarn add pg pg-hstore sequelize
yarn add sequelize-cli -D
```


# Configuring

Create a database configuration file on `config/database.js`

```typescript
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

```

Create .env files

>.env
```
DB_DIALECT=postgres
DB_HOST=localhost
DB_USER=docker
DB_PASS=docker
DB_NAME=sqlnode
DB_LOGS_ENABLED=true
```

>.env.test
```
DB_DIALECT=sqlite
DB_STORAGE='/var/tmp/data/test_database.sqlite'
DB_HOST=localhost
DB_USER=docker
DB_PASS=docker
DB_NAME=db_test
DB_LOGS_ENABLED=false
```

Implement DB connection on `database/index.ts`
```typescript
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
  // other models...
}

export async function connect(options: Options): Promise<Sequelize> {
  const key = options.database as string;

  if (connections[key]) return connections[key];

  const connection = new Sequelize(options);
  connections[key] = connection;
  setupModels(connection);
  return connections[key];
}
```

Create .sequelizerc to set config file
```typescript
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
```typescript
const path = require('path');

module.exports = {
  ...otherConfigs,
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

# Integration tests

## Tips

Execute migrations on your `jest-environment-node` file using `execSync` lib.
```typescript
const { execSync } = require('child_process');
const sequelizeCli = './node_modules/.bin/sequelize';

execSync(`${sequelizeCli} db:migrate`);
```

You can load your test environment variables on jest-environment-file using the lib `dotenv`
```typescript
require('dotenv').config({
  path: '.env.test',
});
```

You can overwrite environment variables this way:
```typescript
this.global.process.env.DB_NAME = process.env.DB_NAME = 'NEW_VALUE';
```

Connect on database before to execute your tests
```typescript
import { Options } from 'sequelize/types';
import dbOptions from '~configs/database';
import { connect } from '~database/connection';

describe('...', () => {
  beforeAll(async () => {
    await connect(dbOptions as Options);
  });
  // ...
})
```

> Helpful links
- https://jestjs.io/pt-BR/docs/configuration#testenvironment-string
- https://github.com/rocketseat-content/youtube-node-testes/blob/master/prisma/prisma-environment-jest.js
- https://www.youtube.com/watch?v=18Dgf7lb9QA