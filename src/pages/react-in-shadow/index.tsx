import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Button, FluentProvider } from '@fluentui/react-components';
import root from 'react-shadow/griffel';
import { RootStore } from '../../state/rootStore';
import { observer } from 'mobx-react';
import { RibbonView } from './sections/Ribbon';
import { ListView } from './sections/List';
import { MessageView } from './sections/Message';
import { ReactShadowFluentThemeProvider, useShadowContext } from './ReactShadowFluentThemeProvider';

const rootStore = new RootStore();

const ProviderView = observer(( { themeStore, children, targetElement }) => {
  return <FluentProvider targetElement={targetElement} style={{height: '100%'}} theme={themeStore.currentTheme}>{children}</FluentProvider>;
});

const Ribbon = () => {
  
  const { theme } = useShadowContext();
  return <FluentProvider style={{ height: '100%' }}  targetElement={document.getElementById('ribbon')!} theme={theme}>
    <RibbonView/>
  </FluentProvider>
}


const List = () => {
  
  return <ProviderView themeStore={rootStore.themeStore} targetElement={document.getElementById('list')!}>
    <ListView listStore={rootStore.listStore}/>
  </ProviderView>
}

const Message = () => {
  const { theme } = useShadowContext();
  return <FluentProvider style={{ height: '100%' }} targetElement={document.getElementById('message')!} theme={theme}>
    <MessageView/>
  </FluentProvider>
}

const App = () => {
  
  return <>
    <ReactShadowFluentThemeProvider>
      <root.div id="ribbon"><Ribbon/></root.div>
      <root.div id="message"><Message/></root.div>
    </ReactShadowFluentThemeProvider>
  </>
};

ReactDOM.render(<App/>, document.getElementById('root')!);
