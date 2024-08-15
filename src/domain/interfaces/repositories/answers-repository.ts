import { Answer } from '../../entities/answer'

export interface AnswerRepositoryInterface {
  create(answer: Answer): Promise<Answer>
  findById(id: string): Promise<Answer | null>
  delete(id: string): Promise<void>
}
