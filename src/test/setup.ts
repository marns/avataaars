import { beforeEach, expect } from 'vitest'

// Global test setup
beforeEach(() => {
  // Reset any mocks or state before each test
})

// Custom matchers for avatar testing
expect.extend({
  toContainSVGElements(received: string) {
    const hasSVG = received.includes('<svg')
    const hasPath = received.includes('<path') || received.includes('<circle') || received.includes('<ellipse')

    return {
      message: () => `Expected string to contain SVG elements`,
      pass: hasSVG && hasPath
    }
  }
}) 