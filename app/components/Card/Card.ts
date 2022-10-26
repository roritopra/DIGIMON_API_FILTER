export enum Attribute {
    "name" = "name",
    "level" = "level",
    "img" = "img",
}

export class Card extends HTMLElement {
    name?: string;
    level?: string;
    img?: string;
    
    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            img: null,
            level: null,
            name: null,
        };
        return Object.keys(attrs);
    }
    
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    
    connectedCallback(){
        this.render();
        
        const btn = this.shadowRoot?.querySelector('button');
        btn?.addEventListener('click',()=>{
            const event: CustomEvent<{name:string,level:string,img:string}> = new CustomEvent("save-user",{
                detail: {name: this.name, level: this.level, img: this.img},
                composed: true
            });
            this.dispatchEvent(event);
        })
    }
    
    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {
                default:
                this[propName] = newValue;
                break;
            }
            
            this.render();
        }
        
        render(){
            if(this.shadowRoot){
                this.shadowRoot.innerHTML = `
                <section>
                <h1>${this.name}:</h1>
                <p>${this.level}</p>
                <img src="${this.img}">
                <button>Guardar usuario</button>
                </section>
                `
            }
        }
    }
    
customElements.define("app-card",Card);