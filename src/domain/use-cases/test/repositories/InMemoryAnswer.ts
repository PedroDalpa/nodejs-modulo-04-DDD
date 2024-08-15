import { Answer } from '../../../entities/answer'
import { AnswerRepositoryInterface } from '../../../interfaces/repositories/answers-repository'

export class InMemoryAnswerRepository implements AnswerRepositoryInterface {
  answers: Answer[] = []
  async create(answer: Answer) {
    this.answers.push(answer)

    return answer
  }

  async findById(id: string) {
    return this.answers.find((answer) => answer.id === id) ?? null
  }

  async delete(id: string) {
    const index = this.answers.findIndex((answer) => answer.id === id)

    this.answers.splice(index, 1)
  }
}
