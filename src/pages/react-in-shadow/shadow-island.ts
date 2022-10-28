// const template = document.createElement('template');
// template.innerHTML = `<slot></slot>`;

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'shadow-island': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        >;
      }
    }
  }

export class ShadowIsland extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}



if (!customElements.get('shadow-island')) {
    customElements.define('shadow-island', ShadowIsland);
}