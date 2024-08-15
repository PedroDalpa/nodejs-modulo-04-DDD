import { beforeAll, describe, expect, it } from 'vitest'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionRepository } from './test/repositories/InMemoryQuestion'
import { Question } from '../entities/question'
import { Slug } from '../value-object/slug'

let getQuestionBySlugUseCase: GetQuestionBySlugUseCase
let inMemoryQuestionRepository: InMemoryQuestionRepository
describe('Get question by slug use case', () => {
  beforeAll(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    getQuestionBySlugUseCase = new GetQuestionBySlugUseCase(
      inMemoryQuestionRepository,
    )
  })

  it('should be able to return slug by slug', async () => {
    const questionToCreate = Question.create({
      authorId: '134',
      context: 'test context',
      slug: new Slug('example-question-title'),
      title: 'Example question title',
    })

    inMemoryQuestionRepository.questions.push(questionToCreate)

    const { question } = await getQuestionBySlugUseCase.execute(
      'example-question-title',
    )

    expect(question?.slug).toBe('example-question-title')
    expect(question?.id).toEqual(questionToCreate.id)
  })

  it('should not be able to return slug by invalid slug', async () => {
    const questionToCreate = Question.create({
      authorId: '134',
      context: 'test context',
      slug: Slug.createFromText('Example question title'),
      title: 'Example question title',
    })

    inMemoryQuestionRepository.questions.push(questionToCreate)

    const { question } =
      await getQuestionBySlugUseCase.execute('example-question')

    expect(question?.slug).not.toBeTruthy()
  })
})
