/**
 * @jest-environment ./src/configs/jest-environment
 */

import { Options } from 'sequelize/types';
import dbOptions from '~configs/database';
import { connect } from '~database/connection';
import Question from './Question';

describe('Question table integration test', () => {
  beforeAll(async () => {
    await connect(dbOptions as Options);
  });

  it('should create a question on database', async () => {
    const question = await Question.create({
      text: 'Question test?',
      type: 'confirm',
    });
    expect(question).toHaveProperty('id');
    expect(question.text).toEqual('Question test?');
    expect(question.type).toEqual('confirm');
  });
});

export {};
