import { Answer } from '../entities/answer'
import { AnswerRepositoryInterface } from '../interfaces/repositories/aswers-repository'

type AnswerQuestionProps = {
  instructorId: string
  questionId: string
  context: string
}

export class AnswerQuestion {
  constructor(private answerRepository: AnswerRepositoryInterface) {}
  async execute({ context, instructorId, questionId }: AnswerQuestionProps) {
    const answer = new Answer({
      context,
      questionId,
      authorId: instructorId,
    })

    await this.answerRepository.create(answer)

    return { answer }
  }
}
