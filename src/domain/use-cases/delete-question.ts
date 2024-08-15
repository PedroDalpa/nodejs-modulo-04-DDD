import { QuestionRepositoryInterface } from '../interfaces/repositories/question-repository'

type DeleteQuestionUseCaseProps = {
  questionId: string
  authorId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepositoryInterface) {}
  async execute({ questionId, authorId }: DeleteQuestionUseCaseProps) {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Could not find the question')
    }

    if (question.authorId !== authorId) {
      throw new Error('Not allowed')
    }

    return this.questionRepository.deleteById(questionId)
  }
}
