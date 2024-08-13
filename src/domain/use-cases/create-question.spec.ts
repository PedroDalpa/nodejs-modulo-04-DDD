import { beforeAll, describe, expect, it } from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from './test/repositories/InMemoryQuestion'

let createQuestionUseCase: CreateQuestionUseCase
let inMemoryQuestionRepository: InMemoryQuestionRepository
describe('Create question use case', () => {
  beforeAll(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    createQuestionUseCase = new CreateQuestionUseCase(
      inMemoryQuestionRepository,
    )
  })

  it('should be able to create a question', async () => {
    const { question } = await createQuestionUseCase.execute({
      authorId: 'test-author-id',
      context: 'test context',
      title: 'Test title',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.questions).toHaveLength(1)
    expect(inMemoryQuestionRepository.questions[0].slug).toEqual('test-title')
  })
})
