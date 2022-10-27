import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FluentProvider, makeStyles, webLightTheme, Button } from '@fluentui/react-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createDOMRenderer, RendererProvider, shorthands } from '@griffel/react';
import './shadow-island';

const shadowIsland = document.createElement('shadow-island');
document.getElementById('root')?.appendChild(shadowIsland);
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const addedNodes = Array.from(mutation.addedNodes);
      for (const node of addedNodes) {
        if ((node as HTMLElement).tagName === 'STYLE') {
          if ((node as HTMLElement).getAttribute('data-make-styles-bucket')) {
            if (shadowIsland.shadowRoot) {
              console.log("update")
              shadowIsland.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
            }
          } else if ((node as HTMLElement).id.startsWith('fui-FluentProvider')) {
            // console.log('afdasfsadf')
            // shadowIsland.shadowRoot?.appendChild(node);
          }
        }
      }
    }
  });
});
observer.observe(document.head, { childList: true, subtree: true });

const useStyles = makeStyles({
  base: {
    ...shorthands.border('1px', 'solid', 'hotpink'),
  }
})

const Boo = () => {
  const styles = useStyles();
  return <div className={styles.base}>👻</div>;
};


const App = () => {

  
  const renderer = React.useMemo(() => createDOMRenderer(document, { constructableStylesheets: true }), [document]);

  React.useEffect(() => {
    console.log("hi there")
    if (shadowIsland.shadowRoot) {
      shadowIsland.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
    }
  }, [document.adoptedStyleSheets])

  return (
    <RendererProvider renderer={renderer}>
      <FluentProvider theme={webLightTheme}>
        <Boo/>
        <Button>🏝️</Button>
      </FluentProvider>
    </RendererProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root2'),
)

ReactDOM.render(
  <App />,
  (shadowIsland as { root: HTMLElement } & HTMLElement).root,
);


