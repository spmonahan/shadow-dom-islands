import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Button, FluentProvider } from '@fluentui/react-components';
import { mountReactShadowIsland } from './ReactShadowIsland';
import { RootStore } from '../../state/rootStore';
import { observer } from 'mobx-react';
import { RibbonView } from './sections/Ribbon';
import { ListView } from './sections/List';
import { MessageView } from './sections/Message';

const rootStore = new RootStore();

const ProviderView = observer(( { themeStore, children, targetElement }) => {
  console.log('1')
  return <FluentProvider targetElement={targetElement} style={{height: '100%'}} theme={themeStore.currentTheme}>{children}</FluentProvider>;
});

// const App = () => {
//   return <ProviderView themeStore={rootStore.themeStore}>
//     <Button>🎃</Button>
//   </ProviderView>;
// }

const Ribbon = () => {
  return <ProviderView themeStore={rootStore.themeStore} targetElement={document.getElementById('ribbon')!}>
    <RibbonView themeStore={rootStore.themeStore}/>
  </ProviderView>
}


const List = () => {
  
  return <ProviderView themeStore={rootStore.themeStore} targetElement={document.getElementById('list')!}>
    <ListView listStore={rootStore.listStore}/>
  </ProviderView>
}

const Message = () => {
  return <ProviderView themeStore={rootStore.themeStore} targetElement={document.getElementById('message')!}>
    <MessageView />
  </ProviderView>
}

mountReactShadowIsland(<Ribbon/>, document.getElementById('ribbon')!);
mountReactShadowIsland(<Message/>, document.getElementById('message')!);

const declarativeRoot = createRoot(document.getElementById('declarative')!);
declarativeRoot.render(<declarative-element>
  <template shadowroot="open">
    <div className="am-i-in-shadow">I am declarative shadow DOM in React. You will not see me rendered.</div>
  </template>
</declarative-element>);

