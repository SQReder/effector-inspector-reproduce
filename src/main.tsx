import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {Provider} from "effector-react/scope";
import {fork} from "effector";

ReactDOM.render(
    <React.StrictMode>
        <Provider value={fork()}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
