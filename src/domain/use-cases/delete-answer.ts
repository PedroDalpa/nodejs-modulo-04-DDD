import { AnswerRepositoryInterface } from '../interfaces/repositories/answers-repository'

type DeleteAnswerUseCaseProps = {
  authorId: string
  answerId: string
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepositoryInterface) {}

  async execute({ authorId, answerId }: DeleteAnswerUseCaseProps) {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Could not find the answer')
    }

    if (answer.authorId !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answerRepository.delete(answerId)
  }
}
