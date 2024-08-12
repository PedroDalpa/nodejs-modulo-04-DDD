import { Entity } from '../../core/entities/base'

type InstructorProps = {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: string) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
