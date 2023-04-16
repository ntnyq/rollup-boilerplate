import { describe, expect, it } from 'vitest'
import { foo } from '../src'

describe('test group', () => {
  it('should pass', () => {
    expect(foo(0)).toBe(-1)
  })
})
