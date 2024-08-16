import { Question } from '../../entities/question'

export type UpdateQuestionProps = {
  questionId: string
  title: string
  content: string
}
export interface QuestionRepositoryInterface {
  create(question: Question): Promise<Question>
  findBySlug(slug: string): Promise<Question | null>
  findById(id: string): Promise<Question | null>
  deleteById(id: string): Promise<void>
  update(question: Question): Promise<void>
}
