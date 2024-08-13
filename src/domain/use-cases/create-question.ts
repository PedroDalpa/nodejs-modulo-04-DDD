import { Question } from '../entities/question'
import { QuestionRepositoryInterface } from '../interfaces/repositories/question-repository'
import { Slug } from '../value-object/slug'

type CreateQuestionProps = {
  authorId: string
  title: string
  context: string
}

export class CreateQuestionUseCase {
  constructor(private answerRepository: QuestionRepositoryInterface) {}

  async execute({ authorId, context, title }: CreateQuestionProps) {
    const slug = Slug.createFromText(title)
    const question = Question.create({ authorId, context, slug, title })

    await this.answerRepository.create(question)

    return { question }
  }
}
