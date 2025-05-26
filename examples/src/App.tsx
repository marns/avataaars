import { useState, useEffect } from 'react'
// @ts-ignore - Using built package
import Avatar, { Piece } from '../../dist/index.mjs'

// Avatar customization options
const avatarOptions = {
  avatarStyle: ['Circle', 'Transparent'],
  topType: [
    'NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4',
    'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads',
    'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides',
    'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand',
    'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet',
    'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved',
    'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart'
  ],
  accessoriesType: ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'],
  hairColor: ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray'],
  facialHairType: ['Blank', 'BeardMedium', 'BeardLight', 'BeardMajestic', 'MoustacheFancy', 'MoustacheMagnum'],
  facialHairColor: ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'Platinum', 'Red', 'SilverGray'],
  clotheType: ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'],
  clotheColor: ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'],
  eyeType: ['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky'],
  eyebrowType: ['Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'],
  mouthType: ['Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'],
  skinColor: ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black']
}

interface AvatarConfig {
  avatarStyle: string
  topType: string
  accessoriesType: string
  hairColor: string
  facialHairType: string
  facialHairColor: string
  clotheType: string
  clotheColor: string
  eyeType: string
  eyebrowType: string
  mouthType: string
  skinColor: string
}

type Theme = 'light' | 'dark' | 'auto'

function App() {
  const [config, setConfig] = useState<AvatarConfig>({
    avatarStyle: 'Circle',
    topType: 'LongHairMiaWallace',
    accessoriesType: 'Prescription02',
    hairColor: 'BrownDark',
    facialHairType: 'BeardLight',
    facialHairColor: 'BrownDark',
    clotheType: 'Hoodie',
    clotheColor: 'PastelBlue',
    eyeType: 'Happy',
    eyebrowType: 'Default',
    mouthType: 'Smile',
    skinColor: 'Light'
  })

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('avataaars-theme') as Theme
    return savedTheme || 'auto'
  })

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'auto') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }

    localStorage.setItem('avataaars-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(current => {
      switch (current) {
        case 'light': return 'dark'
        case 'dark': return 'auto'
        case 'auto': return 'light'
        default: return 'light'
      }
    })
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return '☀️'
      case 'dark': return '🌙'
      case 'auto': return '🌓'
      default: return '🌓'
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case 'light': return 'Light mode'
      case 'dark': return 'Dark mode'
      case 'auto': return 'Auto mode'
      default: return 'Auto mode'
    }
  }

  const updateConfig = (key: keyof AvatarConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const randomizeAvatar = () => {
    const newConfig: AvatarConfig = {} as AvatarConfig
    Object.entries(avatarOptions).forEach(([key, options]) => {
      const randomIndex = Math.floor(Math.random() * options.length)
      newConfig[key as keyof AvatarConfig] = options[randomIndex]
    })
    setConfig(newConfig)
  }

  return (
    <div className="app">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title={getThemeLabel()}
        aria-label={getThemeLabel()}
      >
        {getThemeIcon()}
      </button>

      <h1>🎨 Avataaars Examples</h1>
      <p>Interactive avatar builder showcasing the React component library</p>

      <div className="avatar-builder">
        <div className="avatar-preview">
          <div className="avatar-display">
            <Avatar
              {...config}
              style={{ width: '280px', height: '280px' }}
            />
          </div>
          <button onClick={randomizeAvatar}>
            🎲 Randomize Avatar
          </button>
        </div>

        <div className="avatar-controls">
          {Object.entries(avatarOptions).map(([key, options]) => (
            <div key={key} className="control-group">
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </label>
              <select
                id={key}
                value={config[key as keyof AvatarConfig]}
                onChange={(e) => updateConfig(key as keyof AvatarConfig, e.target.value)}
              >
                {options.map(option => (
                  <option key={option} value={option}>
                    {option.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <h2>🧩 Individual Pieces</h2>
      <p>Each avatar part can be rendered separately</p>

      <div className="piece-gallery">
        <div className="piece-item">
          <Piece
            avatarStyle="Transparent"
            pieceType="top"
            topType={config.topType}
            hairColor={config.hairColor}
            style={{ width: '80px', height: '80px' }}
          />
          <h4>Hair</h4>
        </div>

        <div className="piece-item">
          <Piece
            avatarStyle="Transparent"
            pieceType="accessories"
            accessoriesType={config.accessoriesType}
            style={{ width: '80px', height: '80px' }}
          />
          <h4>Accessories</h4>
        </div>

        <div className="piece-item">
          <Piece
            avatarStyle="Transparent"
            pieceType="facialHair"
            facialHairType={config.facialHairType}
            facialHairColor={config.facialHairColor}
            style={{ width: '80px', height: '80px' }}
          />
          <h4>Facial Hair</h4>
        </div>

        <div className="piece-item">
          <Piece
            avatarStyle="Transparent"
            pieceType="clothes"
            clotheType={config.clotheType}
            clotheColor={config.clotheColor}
            style={{ width: '80px', height: '80px' }}
          />
          <h4>Clothes</h4>
        </div>
      </div>

      <div className="code-section">
        <h3>📋 Current Configuration</h3>
        <pre className="code-block">
          {JSON.stringify(config, null, 2)}
        </pre>

        <h3>💻 Code Example</h3>
        <pre className="code-block small">
          {`import Avatar from 'avataaars'

<Avatar
  avatarStyle="${config.avatarStyle}"
  topType="${config.topType}"
  accessoriesType="${config.accessoriesType}"
  hairColor="${config.hairColor}"
  facialHairType="${config.facialHairType}"
  facialHairColor="${config.facialHairColor}"
  clotheType="${config.clotheType}"
  clotheColor="${config.clotheColor}"
  eyeType="${config.eyeType}"
  eyebrowType="${config.eyebrowType}"
  mouthType="${config.mouthType}"
  skinColor="${config.skinColor}"
/>`}
        </pre>
      </div>
    </div>
  )
}

export default App 