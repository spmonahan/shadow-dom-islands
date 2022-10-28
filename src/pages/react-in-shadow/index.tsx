import * as React from 'react';

import { Button, FluentProvider } from '@fluentui/react-components';
import { mountReactShadowIsland } from './ReactShadowIsland';
import { RootStore } from '../../state/rootStore';
import { observer } from 'mobx-react';
import { RibbonView } from './sections/Ribbon';

const rootStore = new RootStore();

const ProviderView = observer(( { themeStore, children }) => {
  console.log('1')
  return <FluentProvider theme={themeStore.currentTheme}>{children}</FluentProvider>;
});

const App = () => {
  return <ProviderView themeStore={rootStore.themeStore}>
    <Button>🎃</Button>
  </ProviderView>;
}

const Ribbon = () => {
  return <ProviderView themeStore={rootStore.themeStore}>
    <RibbonView themeStore={rootStore.themeStore}/>
  </ProviderView>
}

// This order matters but I'm not sure why
mountReactShadowIsland(<App/>, document.getElementById('root')!);
mountReactShadowIsland(<Ribbon/>, document.getElementById('ribbon')!);

