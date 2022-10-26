import "./components/index.js";
import { getData } from "./services/fetch.js";

class AppContainer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback(){
        console.log('entra');
        const data = await getData();
        this.render(data);
        console.log("connected callback");

        const card = this.shadowRoot?.querySelectorAll("app-card");
        card?.forEach((e,index)=>{
            e.addEventListener("save-user",(evt: CustomEvent)=>{
                const name = evt.detail.name;
                const level = evt.detail.level;
                const img = evt.detail.img;
                const user = {
                    name: name,
                    level: level,
                    img: img
                }

                console.log(name);
                
                localStorage.setItem("user"+index,JSON.stringify(user));
            });
        });

        const input = this.shadowRoot?.querySelector('input');
        input.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            card.forEach((item) => {
                if(item.name.toLowerCase().includes(target.value.toLowerCase())) return item.classList.remove('hidden');

                item.classList.add('hidden');
            });
        });
    }

    render(data){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/style.css">
            <input type="text" name="filter">
        `;
        data.forEach(e => {
            this.shadowRoot.innerHTML += `<app-card name=${e.name} level=${e.level} img=${e.img}></app-card>`            
        }); 
    }
}

customElements.define("app-container",AppContainer);