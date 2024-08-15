import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteQuestionUseCase } from './delete-question'
import { InMemoryQuestionRepository } from './test/repositories/InMemoryQuestion'
import { makeQuestion } from './test/factories/make-question'

let deleteQuestionUseCase: DeleteQuestionUseCase
let inMemoryQuestionRepository: InMemoryQuestionRepository
describe('Delete question use case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    deleteQuestionUseCase = new DeleteQuestionUseCase(
      inMemoryQuestionRepository,
    )
  })

  it('should be able to delete a question', async () => {
    const question = makeQuestion({})
    inMemoryQuestionRepository.questions.push(question)
    inMemoryQuestionRepository.questions.push(makeQuestion({}))

    await deleteQuestionUseCase.execute({
      authorId: question.authorId,
      questionId: question.id,
    })

    expect(inMemoryQuestionRepository.questions.length).toEqual(1)
  })

  it('should not be able to delete a question an invalid question id', async () => {
    const question = makeQuestion({})
    inMemoryQuestionRepository.questions.push(question)

    await expect(async () =>
      deleteQuestionUseCase.execute({
        questionId: 'invalid question id',
        authorId: question.authorId,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a question an invalid author id', async () => {
    const question = makeQuestion({})
    inMemoryQuestionRepository.questions.push(question)

    await expect(async () =>
      deleteQuestionUseCase.execute({
        questionId: question.id,
        authorId: 'invalid author id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
