import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

export const QuestionAttributes: ModelAttributes<Question> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class Question extends Model {
  public id!: number;
  public text!: string;
  public type!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static setup(sequelize: Sequelize) {
    this.init(QuestionAttributes, {
      sequelize,
    });
  }
}

export default Question;
