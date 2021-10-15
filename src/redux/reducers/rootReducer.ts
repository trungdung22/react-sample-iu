import {Action, Dispatch, Reducer} from "redux";

export interface InitialState {
    is_connect: string, 
    publicKey: string,
    adapter_type: string
}

export const initialState: InitialState = {
    is_connect: '', 
    publicKey: '',
    adapter_type: ''
};

export interface DispatchAction extends Action {
    payload: Partial<InitialState>;
}

export enum ActionType {
    ConnectWalletAct
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (state, action) => {
    if (action.type === ActionType.ConnectWalletAct) {
        return {...state, is_connect: action.payload.is_connect || ''};
    }

    if (action.type === ActionType.ConnectWalletAct) {
        return {...state, publicKey: action.payload.publicKey || ''};
    }

    if (action.type === ActionType.ConnectWalletAct) {
        return {...state, adapter_type: action.payload.adapter_type || ''};
    }else return state;
};


export class RootDispatcher {
    
    private readonly dispatch: Dispatch<DispatchAction>;
    
    constructor(dispatch: Dispatch<DispatchAction>){
        this.dispatch = dispatch; 
    }

    updateConnectionStatus = (is_connect: string) => this.dispatch({type: ActionType.ConnectWalletAct, payload: {is_connect}});
    updateConnectionPublicKey = (publicKey: string) => this.dispatch({type: ActionType.ConnectWalletAct, payload: {publicKey}});
    updateConnectionAdapterType = (adapter_type: string) => this.dispatch({type: ActionType.ConnectWalletAct, payload: {adapter_type}});

}
