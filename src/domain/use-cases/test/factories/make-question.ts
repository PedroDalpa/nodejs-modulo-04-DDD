import { randomUUID } from 'crypto'
import { Question, QuestionProps } from '../../../entities/question'
import { Slug } from '../../../value-object/slug'

export function makeQuestion(override: Partial<QuestionProps>) {
  const question = Question.create({
    authorId: randomUUID(),
    context: 'Exemple context',
    title: 'Exemple question',
    slug: new Slug('exemple-question'),
    createdAt: new Date(),
    ...override,
  })

  return question
}
