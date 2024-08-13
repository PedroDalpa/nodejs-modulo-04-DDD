import { Answer } from '../../../entities/answer'
import { AnswerRepositoryInterface } from '../../../interfaces/repositories/answers-repository'

export class InMemoryAnswerRepository implements AnswerRepositoryInterface {
  answers: Answer[] = []
  async create(answer: Answer) {
    this.answers.push(answer)

    return answer
  }
}
