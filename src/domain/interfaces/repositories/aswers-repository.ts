import { Answer } from '../../entities/answer'

export interface AnswerRepositoryInterface {
  create(answer: Answer): Promise<Answer>
}
