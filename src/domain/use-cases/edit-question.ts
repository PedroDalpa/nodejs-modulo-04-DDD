import { QuestionRepositoryInterface } from '../interfaces/repositories/question-repository'

type EditQuestionUseCaseProps = {
  questionId: string
  authorId: string
  title?: string
  content?: string
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepositoryInterface) {}
  async execute({
    questionId,
    authorId,
    content,
    title,
  }: EditQuestionUseCaseProps) {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Could not find the question')
    }

    if (question.authorId !== authorId) {
      throw new Error('Not allowed')
    }

    question.title = title ?? question.title
    question.content = content ?? question.content

    return this.questionRepository.update(question)
  }
}
