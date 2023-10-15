import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";


export const Context = createContext(null)
ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore()
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
