import { Answer } from '../entities/answer'
import { AnswerRepositoryInterface } from '../interfaces/repositories/answers-repository'

type AnswerQuestionProps = {
  instructorId: string
  questionId: string
  context: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepositoryInterface) {}
  async execute({ context, instructorId, questionId }: AnswerQuestionProps) {
    const answer = Answer.create({
      authorId: instructorId,
      context,
      questionId,
    })

    await this.answerRepository.create(answer)

    return { answer }
  }
}
