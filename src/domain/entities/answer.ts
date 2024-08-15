import { Entity } from '../../core/entities/base'
import { Optional } from '../../core/types/optional'

export type AnswerProps = {
  context: string
  authorId: string
  questionId: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get authorId() {
    return this.props.authorId
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: string) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return answer
  }
}
