import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeQuestion } from './test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionRepository } from './test/repositories/InMemoryQuestion'

let editQuestionUseCase: EditQuestionUseCase
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Edit question use case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    editQuestionUseCase = new EditQuestionUseCase(inMemoryQuestionRepository)

    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should be able to edit content and title field of question', async () => {
    vi.setSystemTime(new Date(2024, 6, 10, 0, 0))
    const question = makeQuestion({})
    inMemoryQuestionRepository.questions.push(question)

    vi.setSystemTime(new Date(2024, 8, 10, 0, 0))

    await editQuestionUseCase.execute({
      questionId: question.id,
      authorId: question.authorId,
      content: 'new content',
      title: 'new title',
    })

    expect(inMemoryQuestionRepository.questions[0].title).toEqual('new title')
    expect(inMemoryQuestionRepository.questions[0].content).toEqual(
      'new content',
    )
    expect(inMemoryQuestionRepository.questions[0].slug).toEqual('new-title')
    expect(inMemoryQuestionRepository.questions[0].id).toEqual(question.id)
    expect(inMemoryQuestionRepository.questions[0].authorId).toEqual(
      question.authorId,
    )
    expect(inMemoryQuestionRepository.questions[0].updatedAt).toEqual(
      new Date(),
    )
    expect(inMemoryQuestionRepository.questions[0].createdAt).toEqual(
      question.createdAt,
    )

    vi.useRealTimers()
  })

  it('should be able to edit only title field of question', async () => {
    vi.setSystemTime(new Date(2024, 6, 10, 0, 0))
    const question = makeQuestion({})
    inMemoryQuestionRepository.questions.push(question)

    vi.setSystemTime(new Date(2024, 8, 10, 0, 0))

    await editQuestionUseCase.execute({
      questionId: question.id,
      authorId: question.authorId,
      title: 'new title',
    })

    expect(inMemoryQuestionRepository.questions[0].title).toEqual('new title')
    expect(inMemoryQuestionRepository.questions[0].content).toEqual(
      question.content,
    )
    expect(inMemoryQuestionRepository.questions[0].slug).toEqual('new-title')
    expect(inMemoryQuestionRepository.questions[0].id).toEqual(question.id)
    expect(inMemoryQuestionRepository.questions[0].authorId).toEqual(
      question.authorId,
    )
    expect(inMemoryQuestionRepository.questions[0].updatedAt).toEqual(
      new Date(),
    )
    expect(inMemoryQuestionRepository.questions[0].createdAt).toEqual(
      question.createdAt,
    )

    vi.useRealTimers()
  })

  it('should be able to edit only content field of question', async () => {
    vi.setSystemTime(new Date(2024, 6, 10, 0, 0))
    const question = makeQuestion({})
    inMemoryQuestionRepository.questions.push(question)

    vi.setSystemTime(new Date(2024, 8, 10, 0, 0))

    await editQuestionUseCase.execute({
      questionId: question.id,
      authorId: question.authorId,
      content: 'new content',
    })

    expect(inMemoryQuestionRepository.questions[0].title).toEqual(
      question.title,
    )
    expect(inMemoryQuestionRepository.questions[0].content).toEqual(
      'new content',
    )
    expect(inMemoryQuestionRepository.questions[0].slug).toEqual(question.slug)
    expect(inMemoryQuestionRepository.questions[0].id).toEqual(question.id)
    expect(inMemoryQuestionRepository.questions[0].authorId).toEqual(
      question.authorId,
    )
    expect(inMemoryQuestionRepository.questions[0].updatedAt).toEqual(
      new Date(),
    )
    expect(inMemoryQuestionRepository.questions[0].createdAt).toEqual(
      question.createdAt,
    )

    vi.useRealTimers()
  })

  it('should not be able to update a question with invalid question id', async () => {
    const question = makeQuestion({})
    inMemoryQuestionRepository.questions.push(question)

    await expect(() =>
      editQuestionUseCase.execute({
        questionId: 'Invalid id',
        authorId: question.authorId,
        content: 'new content',
        title: 'new title',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to update a question with invalid author id', async () => {
    const question = makeQuestion({})
    inMemoryQuestionRepository.questions.push(question)

    await expect(() =>
      editQuestionUseCase.execute({
        questionId: question.id,
        authorId: 'Invalid author id',
        content: 'new content',
        title: 'new title',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
