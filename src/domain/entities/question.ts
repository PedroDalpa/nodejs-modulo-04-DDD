import { Slug } from '../value-object/slug'
import { Entity } from '../../core/entities/base'
import { Optional } from '../../core/types/optional'

type QuestionProps = {
  authorId: string
  bestAnswerId?: string
  title: string
  context: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: string) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return question
  }
}
