export var Attribute;
(function (Attribute) {
    Attribute["name"] = "name";
    Attribute["level"] = "level";
    Attribute["img"] = "img";
})(Attribute || (Attribute = {}));
export class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    static get observedAttributes() {
        const attrs = {
            img: null,
            level: null,
            name: null,
        };
        return Object.keys(attrs);
    }
    connectedCallback() {
        var _a;
        this.render();
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button');
        btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => {
            const event = new CustomEvent("save-user", {
                detail: { name: this.name, level: this.level, img: this.img },
                composed: true
            });
            this.dispatchEvent(event);
        });
    }
    attributeChangedCallback(propName, _, newValue) {
        switch (propName) {
            default:
                this[propName] = newValue;
                break;
        }
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="components/card.css">
                <section>
                <h1>${this.name}:</h1>
                <p>${this.level}</p>
                <img src="${this.img}">
                <button>Guardar usuario</button>
                </section>
                `;
        }
    }
}
customElements.define("app-card", Card);
