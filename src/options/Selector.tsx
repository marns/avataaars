import * as React from 'react'
import { useContext, useEffect, useRef } from 'react'

import Option from './Option'
import OptionContext from './OptionContext'
import { AvatarOptionComponent, isAvatarOptionComponent } from '../types/common'

function getComponentOptionValue<P>(component: React.ComponentClass<P>): string {
  if (!isAvatarOptionComponent(component)) {
    throw new Error(`optionValue should be provided for ${component}`)
  }
  return component.optionValue
}

export interface Props<P = any> {
  option: Option
  defaultOption: AvatarOptionComponent<P> | string
  children?: React.ReactNode
}

// Create a context for the OptionContext
const OptionContextReact = React.createContext<OptionContext | null>(null);

// Hook to use the option context
export const useOptionContext = () => {
  const context = useContext(OptionContextReact);
  if (!context) {
    throw new Error('useOptionContext must be used within an OptionContextProvider');
  }
  return context;
};

// Provider component
export const OptionContextProvider: React.FC<{ value: OptionContext; children: React.ReactNode }> = ({ value, children }) => {
  return (
    <OptionContextReact.Provider value={value}>
      {children}
    </OptionContextReact.Provider>
  );
};

export default function Selector<P = any>({ option, defaultOption, children }: Props<P>) {
  const optionContext = useOptionContext();
  const forceUpdateRef = useRef<(() => void) | null>(null);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  // Store the force update function
  forceUpdateRef.current = forceUpdate;

  const optionContextUpdate = React.useCallback(() => {
    if (forceUpdateRef.current) {
      forceUpdateRef.current();
    }
  }, []);

  const updateOptionValues = React.useCallback((currentChildren?: React.ReactNode) => {
    const childrenToUse = currentChildren !== undefined ? currentChildren : children;
    const values = React.Children.map(
      childrenToUse,
      child => {
        if (!React.isValidElement(child) || typeof child.type !== 'function') {
          throw new Error('Invalid child element in Selector');
        }
        return getComponentOptionValue(child.type as React.ComponentClass<P>);
      }
    );
    if (values && new Set(values).size !== values.length) {
      throw new Error('Duplicate values');
    }
    optionContext.setOptions(option.key, values || []);
  }, [children, option.key, optionContext]);

  // Effect for component mount/unmount and option setup
  useEffect(() => {
    const defaultValue = (
      typeof defaultOption === 'string' ?
        defaultOption : getComponentOptionValue(defaultOption)
    );

    optionContext.addStateChangeListener(optionContextUpdate);
    optionContext.optionEnter(option.key);
    const optionState = optionContext.getOptionState(option.key);
    updateOptionValues();

    if (optionState) {
      optionContext.setDefaultValue(option.key, defaultValue);
    }

    // Cleanup function
    return () => {
      optionContext.removeStateChangeListener(optionContextUpdate);
      optionContext.optionExit(option.key);
    };
  }, [option.key, defaultOption, optionContext, optionContextUpdate, updateOptionValues]);

  // Effect for children changes
  useEffect(() => {
    updateOptionValues();
  }, [children, updateOptionValues]);

  // Render logic
  let result: React.ReactNode | null = null;
  const value = optionContext.getValue(option.key)!;
  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && typeof child.type === 'function') {
      if (getComponentOptionValue(child.type as React.ComponentClass<P>) === value) {
        result = child;
      }
    }
  });

  return <>{result}</>;
}
