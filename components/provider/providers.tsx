import React, { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';

interface Props {
  children: ReactNode;
}

export const Providers = (props: Props) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      {props.children}
    </ThemeProvider>
  );
};
