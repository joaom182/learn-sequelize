import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

export const UserAttributes: ModelAttributes<User> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
};

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string | null;
  public age!: number | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static setup(sequelize: Sequelize) {
    this.init(UserAttributes, {
      sequelize,
    });
  }
}

export default User;
