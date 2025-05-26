import { describe, it, expect } from 'vitest'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Avatar, { Piece } from './index'

describe('Avatar Component - Simple Tests', () => {
  it('creates Avatar element without crashing', () => {
    const element = React.createElement(Avatar, { avatarStyle: 'Circle' })
    expect(element).toBeDefined()
    expect(element.type).toBe(Avatar)
  })

  it('creates Piece element without crashing', () => {
    const element = React.createElement(Piece, {
      avatarStyle: 'Transparent',
      pieceType: 'top'
    })
    expect(element).toBeDefined()
    expect(element.type).toBe(Piece)
  })

  it('renders Avatar to HTML string', () => {
    const element = React.createElement(Avatar, {
      avatarStyle: 'Circle',
      topType: 'LongHairMiaWallace',
      hairColor: 'BrownDark'
    })

    const html = ReactDOMServer.renderToString(element)
    expect(html).toContain('<svg')
    expect(html.length).toBeGreaterThan(1000) // Should be substantial SVG content
  })

  it('renders Piece to HTML string', () => {
    const element = React.createElement(Piece, {
      avatarStyle: 'Transparent',
      pieceType: 'top',
      topType: 'LongHairMiaWallace',
      hairColor: 'BrownDark'
    })

    const html = ReactDOMServer.renderToString(element)
    expect(html).toContain('<svg')
    expect(html.length).toBeGreaterThan(100)
  })

  it('accepts all customization props', () => {
    const props = {
      avatarStyle: 'Circle',
      topType: 'LongHairStraight',
      accessoriesType: 'Prescription02',
      hairColor: 'BrownDark',
      facialHairType: 'BeardMedium',
      clotheType: 'Hoodie',
      clotheColor: 'PastelBlue',
      eyeType: 'Happy',
      eyebrowType: 'Default',
      mouthType: 'Smile',
      skinColor: 'Light'
    }

    const element = React.createElement(Avatar, props)
    const html = ReactDOMServer.renderToString(element)

    expect(html).toContain('<svg')
    expect(html.length).toBeGreaterThan(2000) // Full avatar should be substantial
  })
}) 