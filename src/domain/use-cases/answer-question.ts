import { Answer } from '../entities/answer'
import { AnswerRepositoryInterface } from '../interfaces/repositories/answers-repository'

type AnswerQuestionProps = {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepositoryInterface) {}
  async execute({ content, instructorId, questionId }: AnswerQuestionProps) {
    const answer = Answer.create({
      authorId: instructorId,
      content,
      questionId,
    })

    await this.answerRepository.create(answer)

    return { answer }
  }
}
