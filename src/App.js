import './App.css';
import {Header} from "./components/Header";
import React, {useEffect, useState} from 'react'
import Big from 'big.js';
import {Spinner} from 'react-bootstrap';
import Backendless from 'backendless';
import {MessageForm} from "./components/MessageForm";
import {addAuthUser, gotMessages, initContract, login} from "./utils";
import {Messages} from "./components/Messages";
import PropTypes from 'prop-types';



const APP_ID = '1360435F-A676-BBA3-FFCE-85E6B8CA8800';
const API_KEY = '3BF9589C-39DC-4CCE-A651-0A477E22B0BE';
Backendless.serverURL = 'https://eu-api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();


function App({ contract, currentUser, nearConfig, wallet }) {
    const [error, setError] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    let messages = [];

    useEffect(() => {
        Backendless.Data.of('NEAR_DB').save({ account_id: 'TEST START' })
            .then(obj => {
                const message = 'A data object has been saved in Backendless. Check \'DB\' in Backendless Console.' +
                    `ObjectId = ${obj.objectId}`
                setMessage(message);
                setLoading(false);
                // console.log('added');
            })
            .catch(error => {
                setError( `Got an error - ${error}`)
                setLoading(false)
            })
        messages = gotMessages();
    }, []);

        return (
            loading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>:
            <div className="App">
                {currentUser && addAuthUser(currentUser) }
                <Header currentUser={currentUser}/>
                <MessageForm
                    currentUser={currentUser}
                    contract={contract}
                />
                <Messages/>
                {/*{message}*/}

            </div>
        )
}
App.propTypes = {
    contract: PropTypes.shape({
        addMessage: PropTypes.func.isRequired,
        getMessages: PropTypes.func.isRequired
    }).isRequired,
    currentUser: PropTypes.shape({
        accountId: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired
    }),
    nearConfig: PropTypes.shape({
        contractName: PropTypes.string.isRequired
    }).isRequired,
    wallet: PropTypes.shape({
        requestSignIn: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired
    }).isRequired
};


export default App;
