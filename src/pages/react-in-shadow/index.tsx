import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { mountReactShadowIsland } from './ReactShadowIsland';
import { AppTheme } from '../../state/AppTheme';
import { observer } from 'mobx-react';
import { ThemeSwitcher } from './sections/ThemeSwitcher';

const appTheme = new AppTheme();

const ProviderView = observer(( { theme, children }) => {
  return <FluentProvider theme={theme.currentTheme}>{children}</FluentProvider>;
});

const App = () => {
  return <ProviderView theme={appTheme}><Button>🎃</Button></ProviderView>;
}

mountReactShadowIsland(<ProviderView theme={appTheme}><ThemeSwitcher appTheme={appTheme}/></ProviderView>, document.getElementById('theme-switcher')!);
mountReactShadowIsland(<App/>, document.getElementById('root')!);

