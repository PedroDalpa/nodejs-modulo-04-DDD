import { describe, expect, it } from 'vitest'
import { Slug } from './slug'

describe('Normalize slug', () => {
  it('should be able to normalize a text to a slug', () => {
    const slug = Slug.createFromText('example Question title ')

    expect(slug.value).toBe('example-question-title')
  })
})
