import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Button, FluentProvider } from '@fluentui/react-components';
import root from 'react-shadow';
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

const App = () => {
  return <>
    <root.div id="ribbon"><Ribbon/></root.div>
    <root.div id="message"><Message/></root.div>
  </>
};

ReactDOM.render(<App/>, document.getElementById('root')!);



// mountReactShadowIsland(<Ribbon/>, document.getElementById('ribbon')!);
// // mountReactShadowIsland(<List/>, document.getElementById('list')!);
// mountReactShadowIsland(<Message/>, document.getElementById('message')!);

