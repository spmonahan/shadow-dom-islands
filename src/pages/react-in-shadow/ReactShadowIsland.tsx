import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createDOMRenderer, RendererProvider } from '@griffel/react';
import './shadow-island';

const observeStylesheets = (shadowIsland: HTMLElement) => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const addedNodes = Array.from(mutation.addedNodes);
        for (const node of addedNodes) {
          if ((node as HTMLElement).tagName === 'STYLE') {
            if ((node as HTMLElement).getAttribute('data-make-styles-bucket')) {
              if (shadowIsland.shadowRoot) {
                console.log('update');
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
};

type ReactShadowIslandProps = {
  children: React.ReactNode;
  styleTagTarget?: HTMLElement;
};

export const ReactShadowIsland: React.FC<ReactShadowIslandProps> = ({ children, styleTagTarget }) => {
  const renderer = createDOMRenderer(document, { styleTagTarget, constructableStylesheets: false });
  return <RendererProvider renderer={renderer}>{children}</RendererProvider>;
};

export const mountReactShadowIsland: ReactDOM.Renderer = (element, container, _callback): React.Element => {
  const shadowIsland = container;
  observeStylesheets(shadowIsland);

  return ReactDOM.render(
    <ReactShadowIsland styleTagTarget={shadowIsland}>{element}</ReactShadowIsland>,
    shadowIsland.shadowRoot!,
  );
};
