const template = document.createElement('template');
template.innerHTML = `<slot></slot>`;

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'shadow-island': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        >;

        'another-shadow-island': React.DetailedHTMLProps<
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

export class AnotherShadowIsland extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }
}


if (!customElements.get('shadow-island')) {
    customElements.define('shadow-island', ShadowIsland);
}

if (!customElements.get('another-shadow-island')) {
  customElements.define('another-shadow-island', AnotherShadowIsland);
}