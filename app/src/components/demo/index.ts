import { createStore, combineReducers,applyMiddleware} from '@rakoon-badshah/dynamic-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LitElement, html,css} from 'lit-element';
//import '../form';
//import '../info-form';
//import '../cart';
import '../../../../lib/state-name-form/dist/app.ecd58d0d8cde419d4531';
import '../../../../lib/state-info-form/dist/app.674fe0245cda52fd9e0a';
import '../../../../lib/state-cart/dist/app.1cc4839b923207292776';

 const rootReducer= (state = {}, action)=>{
    return state;
}
const consoleLogger = store => next => action =>{
    console.log("__________ LOGGER SERVICE __________");
    console.log('Previous State', store.getState());
    console.log('Dispatching ACTION:', action);
    let result = next(action);
    console.log('Next State', store.getState());
    return result;
    }

export const store1 = createStore(combineReducers({
    app: rootReducer
}),composeWithDevTools(applyMiddleware(consoleLogger)));
export const store2 = createStore(combineReducers({
    app: rootReducer
}),composeWithDevTools(applyMiddleware(consoleLogger)));
export const store3 = createStore(combineReducers({
    app: rootReducer
}),composeWithDevTools(applyMiddleware(consoleLogger)));

export class App extends LitElement {
    static get styles() {
        return css`
        .grid-container {
            display: grid;
            grid-template-columns: auto auto 50%;
            padding: 5px;
        }
        .grid-item {
        border: 1px solid;
        padding: 5px;
        text-align: center;
        }
        `;
      }
    render(){
        return html`
        <div class="grid-container">
            <div class="grid-item">
                <name-form .store="${store1}" propPath="app.Name_Form"></name-form>
            </div>
            <div class="grid-item">
                <info-form .store="${store2}" propPath="app.Info_Form"></info-form>
            </div>
            <div class="grid-item">
                <my-cart .store="${store3}" propPath="app.Cart"></my-cart>
            </div>
        </div>
        `;
    }
}
customElements.define('my-app', App);