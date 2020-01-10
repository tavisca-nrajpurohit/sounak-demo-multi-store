import { LitElement, html, property, TemplateResult} from 'lit-element';
import {reducer} from './state/reducer';
import {get} from '@rakoon-badshah/dynamic-redux';
import {GetAbstract} from './CartApi';
import {ACTION_CART_ADD_TO_LIST_REQUEST} from'./state/actions';


export class MyCart extends LitElement {

  @property({type : String})  
  propPath="app";
  @property({type : Object})  
  store;

  @property({type:Array}) names=[];
  @property({type:Array}) info=[];
  numberOfInfo=0;
  numberOfNames=0;

  constructor(){
      super();
  }

  firstUpdated(){
    if(this.store){
      this.store.attachReducers({ [this.propPath]:reducer(this.propPath)});
      this.resetData();
      this.store.subscribe(()=>{
        if(!get(this.store.getState(),this.propPath)["abstractUpdated"]){
          this.resetDataAndCallGetAbstract();
        }else{
          this.resetData();
        }
      });
    }
    //////////////////////___________EXTRA CODE____________//////////////////////////////////////

    window.addEventListener('CART_ADD_TO_CART',  e => this.store.dispatch(ACTION_CART_ADD_TO_LIST_REQUEST(e["detail"].payload,e["detail"].formType)));

    window.addEventListener('INFO_TO_CART_ADD_TO_CART',  e => this.store.dispatch(ACTION_CART_ADD_TO_LIST_REQUEST(e["detail"].payload,e["detail"].formType)));
    
    //////////////////////___________EXTRA CODE____________/////////////////////////////////////////
  }

  render(){
    return html`<h1>Cart</h1>
                ${this.numberOfNames>0?html`
                <h3>Names:</h3>
                <ul>
                   ${Object.keys(this.names).map(item=>
                    html`<li><b>${this.names[item]["data"]["name"]}:</b><br>${this.names[item]["abstract"]}</li><br>`)}
                </ul>
                <hr>
                `:html``
              }
                
                ${this.numberOfInfo>0?html`
                <h3>Info:</h3>
                <ul>
                   ${Object.keys(this.info).map(item=>
                    html`<li>Name:<b>${this.info[item]["data"]["name"]}</b><br>
                            Age:<b>${this.info[item]["data"]["age"]}</b><br>
                            Gender:<b>${this.info[item]["data"]["gender"]}</b><br>   
                        </li><br>`)}
                </ul>
                `:html``
                }
                `;
  }

  resetDataAndCallGetAbstract(){
    let st = this.store.getState();
    let data = get(st,this.propPath);
    this.names= data["namesByID"];
    this.info= data["infoByID"];
    this.numberOfInfo = data.numberOfInfo;
    this.numberOfNames = data.numberOfNames;
    GetAbstract(this.numberOfNames, this.store, this.propPath);
  }


  resetData(){
    let st = this.store.getState();
    let data = get(st,this.propPath);
    this.names= data["namesByID"];
    this.numberOfNames = data.numberOfNames;
    this.info= data["infoByID"];
    this.numberOfInfo = data.numberOfInfo;
  }
  
}
customElements.define('my-cart', MyCart);