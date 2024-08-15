import { Question } from '../../entities/question'

export interface QuestionRepositoryInterface {
  create(question: Question): Promise<Question>
  findBySlug(slug: string): Promise<Question | null>
}
