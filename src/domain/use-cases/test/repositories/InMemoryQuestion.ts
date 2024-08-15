import { Question } from '../../../entities/question'
import { QuestionRepositoryInterface } from '../../../interfaces/repositories/question-repository'

export class InMemoryQuestionRepository implements QuestionRepositoryInterface {
  questions: Question[] = []
  async create(question: Question) {
    this.questions.push(question)

    return question
  }

  async findBySlug(slug: string) {
    return this.questions.find((question) => question.slug === slug) ?? null
  }
}
