import { Question } from '../entities/question'
import { QuestionRepositoryInterface } from '../interfaces/repositories/question-repository'
import { Slug } from '../value-object/slug'

type CreateQuestionProps = {
  authorId: string
  title: string
  content: string
}

export class CreateQuestionUseCase {
  constructor(private answerRepository: QuestionRepositoryInterface) {}

  async execute({ authorId, content, title }: CreateQuestionProps) {
    const slug = Slug.createFromText(title)
    const question = Question.create({ authorId, content, slug, title })

    await this.answerRepository.create(question)

    return { question }
  }
}
