import { createStore } from 'redux'
//import connectWalletReducer from 'redux/reducers/connectWalletReducer'
import { InitialState,DispatchAction,rootReducer } from 'redux/reducers/rootReducer';

// const store = createStore(connectWalletReducer)

// export default store;
export const store = createStore<InitialState, DispatchAction, null, null>(rootReducer);