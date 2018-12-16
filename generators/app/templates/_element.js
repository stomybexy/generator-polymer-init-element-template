import { LitElement, html } from '@polymer/lit-element';

class <%= className %> extends LitElement {
    render({ name }) {
        return html`
            <p>Hello from ${name}</p>
        `;
    }

    static get properties() {
        return {
            name: String
        }
    }

    constructor() {
        super();
        this.name = '<%= displayName %>';
    }
}

window.customElements.define('<%= elementName %>', <%= className %>);
