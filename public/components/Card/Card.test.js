/**
 * @jest-environment jsdom
*/
import { CardEvents } from "./types";
//test renderizar el componente
describe("card component", () => {
    test("Render custom element tag", () => {
        document.body.innerHTML = `<app-card name="mocked" email="mocked email" city="mocked city">
        </app-card> `;
        const card = document.body.querySelector("app-card");
        expect(card).not.toBeNull();
    });
    //test nombre pasar una propiedad
    test("render name", () => {
        var _a;
        const mockedName = "mocked";
        document.body.innerHTML = `<app-card name=${mockedName}></app-card>`;
        require("./card.js");
        const card = document.body.querySelector("app-card");
        const nameTag = (_a = card === null || card === void 0 ? void 0 : card.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("h1");
        expect(nameTag === null || nameTag === void 0 ? void 0 : nameTag.textContent).toEqual(mockedName);
    });
    //test boton
    test("click triggered", () => {
        var _a;
        const mockedName = "mocked";
        const mockedListener = jest.fn();
        document.body.innerHTML = `<app-card name=${mockedName}></app-card>`;
        require("./card.js");
        const card = document.body.querySelector("app-card");
        card === null || card === void 0 ? void 0 : card.addEventListener(CardEvents.saveUser, mockedListener);
        const btn = (_a = card === null || card === void 0 ? void 0 : card.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        btn === null || btn === void 0 ? void 0 : btn.click();
        expect(mockedListener).toHaveBeenCalled();
    });
});
