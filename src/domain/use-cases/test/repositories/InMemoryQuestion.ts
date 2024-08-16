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

  async findById(id: string): Promise<Question | null> {
    return this.questions.find((question) => question.id === id) ?? null
  }

  async deleteById(id: string): Promise<void> {
    const index = this.questions.findIndex((question) => question.id === id)

    this.questions.splice(index, 1)
  }

  async update(question: Question): Promise<void> {
    const index = this.questions.findIndex((item) => item.id === question.id)

    this.questions[index] = question
  }
}
