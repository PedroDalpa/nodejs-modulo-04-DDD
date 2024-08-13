import { Question } from '../../../entities/question'
import { QuestionRepositoryInterface } from '../../../interfaces/repositories/question-repository'

export class InMemoryQuestionRepository implements QuestionRepositoryInterface {
  questions: Question[] = []
  async create(question: Question) {
    this.questions.push(question)

    return question
  }
}
