import * as React from 'react';
/**
 * Props for components that only need children (most hair/clothing components)
 */
export type WithChildren = {
    children?: React.ReactNode;
};
/**
 * Props for components that need a maskID (color/graphics components)
 */
export interface MaskIDProps {
    maskID: string;
}
/**
 * Empty props for simple components like Blank
 */
export type EmptyProps = {};
/**
 * Base interface for components with optionValue static property
 */
export interface HasOptionValue {
    optionValue: string;
    displayName?: string;
}
/**
 * Component class with optionValue static property for avatar options
 * Uses generic type parameter to specify the exact props type
 */
export type AvatarOptionComponent<P = any> = React.ComponentClass<P> & HasOptionValue;
/**
 * Type for React element with avatar option component
 */
export interface AvatarOptionElement<P = any> extends React.ReactElement<P> {
    type: AvatarOptionComponent<P>;
}
/**
 * Type guard to check if a component has optionValue
 */
export declare function isAvatarOptionComponent<P = any>(component: React.ComponentClass<P>): component is AvatarOptionComponent<P>;
/**
 * Type guard to check if a React element is an avatar option element
 */
export declare function isAvatarOptionElement<P = any>(element: React.ReactNode): element is AvatarOptionElement<P>;
//# sourceMappingURL=common.d.ts.map