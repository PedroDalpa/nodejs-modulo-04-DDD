import { randomUUID } from 'crypto'
import { Answer, AnswerProps } from '../../../entities/answer'

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: string) {
  const answer = Answer.create(
    {
      authorId: randomUUID(),
      content: 'Example',
      questionId: randomUUID(),
      ...override,
    },
    id,
  )

  return answer
}
