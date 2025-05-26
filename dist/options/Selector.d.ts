import { default as Option } from './Option';
import { default as OptionContext } from './OptionContext';
import { AvatarOptionComponent } from '../types/common';
import * as React from 'react';
export interface Props<P = any> {
    option: Option;
    defaultOption: AvatarOptionComponent<P> | string;
    children?: React.ReactNode;
}
export declare const useOptionContext: () => OptionContext;
export declare const OptionContextProvider: React.FC<{
    value: OptionContext;
    children: React.ReactNode;
}>;
export default function Selector<P = any>({ option, defaultOption, children }: Props<P>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Selector.d.ts.map