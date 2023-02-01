import React, { cloneElement } from 'react';
import { AuthProvider } from '../../hooks/Auth';
import { PhoneProvider } from '../../hooks/Phone';
// import { MenuProvider } from '../../hooks/Menu';
// import { ThemeContextProvider } from '../ThemeContext';

type ProviderComposerProps = {
  children: React.ReactNode | React.ReactNode[];
  contexts: any[];
};

type ContextProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

const CONTEXT_LIST: any[] = [
  <AuthProvider children={undefined} />,
  <PhoneProvider children={undefined} />,
  // <MenuProvider key="menu" />,
  // <ThemeContextProvider />,
];

const ProviderComposer = ({ contexts, children }: ProviderComposerProps) => {
  return contexts.reduce(
    (kids, parent) =>
      cloneElement(parent, {
        children: kids
      }),
    children
  );
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  return (
    <ProviderComposer contexts={CONTEXT_LIST}>{children}</ProviderComposer>
  );
};

export default ContextProvider;
