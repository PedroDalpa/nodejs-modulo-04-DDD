import { QuestionRepositoryInterface } from '../interfaces/repositories/question-repository'

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepositoryInterface) {}

  async execute(slug: string) {
    const question = await this.questionRepository.findBySlug(slug)

    return {
      question,
    }
  }
}
