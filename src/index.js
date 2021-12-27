import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {initContract} from "./utils";
import Start from "./Start";

window.nearInitPromise = initContract()
    .then(() => {
        ReactDOM.render(
            <Start />,
            document.querySelector('#root')
        )
    })
    .catch(console.error)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
