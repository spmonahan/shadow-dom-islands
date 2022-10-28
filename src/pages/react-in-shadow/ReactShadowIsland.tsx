import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FluentProvider, Theme } from '@fluentui/react-components';
import { createDOMRenderer, RendererProvider } from '@griffel/react';
import './shadow-island';

const mountShadowIsland = (shadowIsland: HTMLElement, root: HTMLElement) => {
  
  root.appendChild(shadowIsland);

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
}

type ReactShadowIslandProps = {
  children: React.ReactNode;
}

export const ReactShadowIsland: React.FC<ReactShadowIslandProps> = ({ children }) => {
  const renderer = React.useMemo(() => createDOMRenderer(document, { constructableStylesheets: true }), [document]);

  // React.useEffect(() => {
  //   console.log("hi there")
  //   if (shadowIsland.shadowRoot) {
  //     shadowIsland.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
  //   }
  // }, [document.adoptedStyleSheets])

  return (
    <RendererProvider renderer={renderer}>
      {children}
      {/* <FluentProvider theme={theme}>
        {children}
      </FluentProvider> */}
    </RendererProvider>
  );
}

// ReactDOM.render(
//   <Wrapper/>,
//   shadowIsland.shadowRoot!,
// );

export const mountReactShadowIsland: ReactDOM.Renderer = (element, container, _callback): React.Element => {
  const shadowIsland = document.createElement('shadow-island');
  mountShadowIsland(shadowIsland, container);

  return ReactDOM.render(<ReactShadowIsland>{element}</ReactShadowIsland>, shadowIsland.shadowRoot!);
}
