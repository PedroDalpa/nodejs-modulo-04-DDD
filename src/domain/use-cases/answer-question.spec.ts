import { beforeAll, describe, expect, it } from 'vitest'
import { Question } from '../entities/question'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { Slug } from '../value-object/slug'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from './test/repositories/InMemoryAnswer'

let answerQuestionUseCase: AnswerQuestionUseCase
let answersRepository: InMemoryAnswerRepository
describe('Answer question use case', () => {
  beforeAll(() => {
    answersRepository = new InMemoryAnswerRepository()
    answerQuestionUseCase = new AnswerQuestionUseCase(answersRepository)
  })

  it('should be able create answer to a question', async () => {
    const question = Question.create({
      authorId: randomUUID(),
      context: faker.lorem.paragraph(),
      slug: new Slug('example title'),
      title: faker.lorem.words(),
    })

    const { answer } = await answerQuestionUseCase.execute({
      context: faker.lorem.paragraph(),
      questionId: question.id,
      instructorId: randomUUID(),
    })

    expect(answer.id).toBeTruthy()
    expect(answersRepository.answers).toHaveLength(1)
  })
})
