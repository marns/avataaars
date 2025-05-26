import { OptionContext } from './options';
import * as React from 'react';
export { default as Avatar, AvatarStyle } from './avatar';
export { Option, OptionContext, allOptions } from './options';
export interface Props {
    avatarStyle: string;
    className?: string;
    style?: React.CSSProperties;
    topType?: string;
    accessoriesType?: string;
    hairColor?: string;
    facialHairType?: string;
    facialHairColor?: string;
    clotheType?: string;
    clotheColor?: string;
    graphicType?: string;
    eyeType?: string;
    eyebrowType?: string;
    mouthType?: string;
    skinColor?: string;
    pieceType?: string;
    pieceSize?: string;
    viewBox?: string;
    [key: string]: any;
}
export declare const useAvatarOptions: () => OptionContext;
export default function AvatarComponent(props: Props): import("react/jsx-runtime").JSX.Element;
export declare function Piece(props: Props): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map