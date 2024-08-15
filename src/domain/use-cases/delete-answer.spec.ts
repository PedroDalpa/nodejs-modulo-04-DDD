import { beforeAll, describe, expect, it } from 'vitest'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from './test/repositories/InMemoryAnswer'
import { makeAnswer } from './test/factories/make-answer'

let deleteAnswerUseCase: DeleteAnswerUseCase
let inMemoryAnswerRepository: InMemoryAnswerRepository

describe('Delete answer use case', () => {
  beforeAll(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    deleteAnswerUseCase = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete answer', async () => {
    const answer = makeAnswer()

    inMemoryAnswerRepository.answers.push(answer)

    await deleteAnswerUseCase.execute({
      authorId: answer.authorId,
      answerId: answer.id,
    })

    expect(inMemoryAnswerRepository.answers.length).toEqual(0)
  })

  it('should not be able to delete answer an invalid answer id', async () => {
    const answer = makeAnswer()

    inMemoryAnswerRepository.answers.push(answer)

    await expect(async () =>
      deleteAnswerUseCase.execute({
        answerId: 'invalid answer id',
        authorId: answer.authorId,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete answer an invalid author id', async () => {
    const answer = makeAnswer()

    inMemoryAnswerRepository.answers.push(answer)

    expect(async () =>
      deleteAnswerUseCase.execute({
        answerId: answer.id,
        authorId: 'invalid author id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
