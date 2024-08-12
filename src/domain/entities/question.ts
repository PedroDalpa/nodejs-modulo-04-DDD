import { randomUUID } from 'crypto'
import { Slug } from '../value-object/slug'

type QuestionProps = {
  title: string
  slug: Slug
  context: string
  authorId: string
}

export class Question {
  public id: string
  public title: string
  public slug: Slug
  public context: string
  public authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID()
    this.context = props.context
    this.authorId = props.authorId
    this.title = props.title
    this.slug = props.slug
  }
}
