import * as React from 'react'
import { createContext, useContext, useMemo, useEffect } from 'react'

import Avatar, { AvatarStyle } from './avatar'
import { OptionContext, allOptions } from './options'
import { OptionContextProvider } from './options/Selector'

export { default as Avatar, AvatarStyle } from './avatar'
export { Option, OptionContext, allOptions } from './options'

import { default as PieceComponent } from './avatar/piece';

export interface Props {
  avatarStyle: string
  className?: string;
  style?: React.CSSProperties
  topType?: string
  accessoriesType?: string
  hairColor?: string
  facialHairType?: string
  facialHairColor?: string
  clotheType?: string
  clotheColor?: string
  graphicType?: string
  eyeType?: string
  eyebrowType?: string
  mouthType?: string
  skinColor?: string
  pieceType?: string
  pieceSize?: string
  viewBox?: string
  [key: string]: any; // Allow indexing with string keys
}

// Create modern React Context
const AvatarOptionContext = createContext<OptionContext | null>(null);

// Custom hook to use the context
export const useAvatarOptions = () => {
  const context = useContext(AvatarOptionContext);
  if (!context) {
    throw new Error('useAvatarOptions must be used within an AvatarProvider');
  }
  return context;
};

// Modern functional component using hooks
export default function AvatarComponent(props: Props) {
  const { avatarStyle, style, className } = props;

  // Create option context instance
  const optionContext = useMemo(() => new OptionContext(allOptions), []);

  // Update option context when props change
  useEffect(() => {
    const data: { [index: string]: string } = {};
    for (const option of allOptions) {
      const value = props[option.key];
      if (!value) {
        continue;
      }
      data[option.key] = value;
    }
    optionContext.setData(data);
  }, [props, optionContext]);

  const avatarProps: any = { avatarStyle: avatarStyle as AvatarStyle };
  if (style !== undefined) avatarProps.style = style;
  if (className !== undefined) avatarProps.className = className;

  return (
    <OptionContextProvider value={optionContext}>
      <Avatar {...avatarProps} />
    </OptionContextProvider>
  );
}

// Modern Piece component using hooks
export function Piece(props: Props) {
  const { avatarStyle, style, pieceType, pieceSize, viewBox } = props;

  // Create option context instance
  const optionContext = useMemo(() => new OptionContext(allOptions), []);

  // Update option context when props change
  useEffect(() => {
    const data: { [index: string]: string } = {};
    for (const option of allOptions) {
      const value = props[option.key];
      if (!value) {
        continue;
      }
      data[option.key] = value;
    }
    optionContext.setData(data);
  }, [props, optionContext]);

  const pieceProps: any = { avatarStyle: avatarStyle as AvatarStyle };
  if (style !== undefined) pieceProps.style = style;
  if (pieceType !== undefined) pieceProps.pieceType = pieceType;
  if (pieceSize !== undefined) pieceProps.pieceSize = pieceSize;
  if (viewBox !== undefined) pieceProps.viewBox = viewBox;

  return (
    <OptionContextProvider value={optionContext}>
      <PieceComponent {...pieceProps} />
    </OptionContextProvider>
  );
}
