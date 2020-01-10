export const CART_ADD_TO_LIST_REQUEST = "CART_ADD_TO_LIST_REQUEST";
export const CART_SET_ABSTRACT = "CART_SET_ABSTRACT";

//////////////////___________EXTRA CODE____________////////////////////////
export function ACTION_CART_ADD_TO_LIST_REQUEST(data,formType){
    return {
        type: CART_ADD_TO_LIST_REQUEST,
        formType:formType,
        payload: data
    }
}
//////////////////___________EXTRA CODE____________////////////////////////

export function ACTION_CART_SET_ABSTRACT(abstract){
    return {
        type: CART_SET_ABSTRACT,
        payload: abstract
    }
}