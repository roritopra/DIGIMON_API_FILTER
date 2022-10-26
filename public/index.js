var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "./components/index.js";
import { getData } from "./services/fetch.js";
class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entra');
            const data = yield getData();
            this.render(data);
            console.log("connected callback");
            const card = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll("app-card");
            card === null || card === void 0 ? void 0 : card.forEach((e, index) => {
                e.addEventListener("save-user", (evt) => {
                    const name = evt.detail.name;
                    const level = evt.detail.level;
                    const img = evt.detail.img;
                    const user = {
                        name: name,
                        level: level,
                        img: img
                    };
                    console.log(name);
                    localStorage.setItem("user" + index, JSON.stringify(user));
                });
            });
            const input = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('input');
            input.addEventListener('input', (event) => {
                const target = event.target;
                card.forEach((item) => {
                    if (item.name.toLowerCase().includes(target.value.toLowerCase()))
                        return item.classList.remove('hidden');
                    item.classList.add('hidden');
                });
            });
        });
    }
    render(data) {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/style.css">
            <input type="text" name="filter">
        `;
        data.forEach(e => {
            this.shadowRoot.innerHTML += `<app-card name=${e.name} level=${e.level} img=${e.img}></app-card>`;
        });
    }
}
customElements.define("app-container", AppContainer);
