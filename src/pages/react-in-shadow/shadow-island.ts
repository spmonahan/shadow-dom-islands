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

    private _root: HTMLElement;
    private _shadowRoot: ShadowRoot;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        // const instance = template.content.cloneNode(true);
        // shadowRoot.appendChild(instance);
        const root = document.createElement('div');
        this._shadowRoot.appendChild(root);
        this._root = root;
    }

    get root() {
        return this._root;
    }

    // get shadowRoot() {
    //     return this._shadowRoot;
    // }
}



if (!customElements.get('shadow-island')) {
    customElements.define('shadow-island', ShadowIsland);
}