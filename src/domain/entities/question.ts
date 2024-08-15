import { Slug } from '../value-object/slug'
import { Entity } from '../../core/entities/base'
import { Optional } from '../../core/types/optional'

export type QuestionProps = {
  authorId: string
  bestAnswerId?: string
  title: string
  context: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get slug() {
    return this.props.slug.value
  }

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
