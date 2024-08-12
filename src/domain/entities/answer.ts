import { randomUUID } from 'crypto'

type AnswerProps = {
  context: string
  authorId: string
  questionId: string
}

export class Answer {
  public id: string
  public context: string
  public authorId: string
  public questionId: string

  constructor(props: AnswerProps, id?: string) {
    this.id = id ?? randomUUID()
    this.context = props.context
    this.authorId = props.authorId
    this.questionId = props.questionId
  }
}
