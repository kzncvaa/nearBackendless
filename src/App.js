import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import Backendless from 'backendless';
import {addAuthUser, addMessage, gotMessages, gotPrivateMessages, addPrivateMessage} from "./utils";
import {Container, Button, Navbar} from 'react-bootstrap';
import MessageForm from "./components/Form";
import PrivateMessages from "./components/PrivateMessages";
import {sendTransaction} from "./index";



const APP_ID = '1360435F-A676-BBA3-FFCE-85E6B8CA8800';
const API_KEY = '3BF9589C-39DC-4CCE-A651-0A477E22B0BE';
Backendless.serverURL = 'https://eu-api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);


const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
    const [messages, setMessages] = useState([]);
    const [privateMessages, setPrivateMessages] = useState([]);

    useEffect(async () => {
        // contract.getMessages().then(setMessages);
        // console.log(a)
        setMessages(await gotMessages());
        setPrivateMessages(await gotPrivateMessages(currentUser.accountId));
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('ONSUBMIT')
        const { fieldset, message, donation } = e.target.elements;

        fieldset.disabled = true;

        contract.addMessage(
            { text: message.value },
            BOATLOAD_OF_GAS,
            Big(donation.value || '0').times(10 ** 24).toFixed()
        ).then(() => {
            contract.getMessages().then(messages => {
                setMessages(messages);
                message.value = '';
                donation.value = SUGGESTED_DONATION;
                fieldset.disabled = false;
                message.focus();
            });
        });
        addMessage(currentUser, message.value, donation.value);
    };

    const onPrivateSubmit = async (e) => {
        e.preventDefault();
        const {fieldset, message, donation, receiver} = e.target.elements;
        // fieldset.disabled = true;


        //TODO: Шуля тут твой код
         sendTransaction(currentUser, receiver.value, donation.value);


        // addPrivateMessage(currentUser, message.value, donation.value, receiver.value);
    };

    const signIn = () => {
        wallet.requestSignIn(
            {contractId: nearConfig.contractName, methodNames: [contract.addMessage.name]}, //contract requesting access
            'NEAR Backendless Messenger', //optional name
            null, //optional URL to redirect to if the sign in was successful
            null //optional URL to redirect to if the sign in was NOT successful
        );
    };

    const signOut = () => {
        wallet.signOut();
        localStorage.clear();
        window.location.replace(window.location.origin + window.location.pathname);
    };

    return (
        <>
            <Navbar bg="dark" className="mb-3">
                <Container>
                    <Navbar.Brand>
                        <h1 style={{color: "white"}}>NEAR Backendless Messenger</h1>
                    </Navbar.Brand>
                        {currentUser
                            ?
                            <Navbar.Brand style={{color: "white"}}>Sign as { currentUser.accountId }</Navbar.Brand>
                            : <Navbar.Brand style={{color: "white"}}>Please sign in</Navbar.Brand>
                        }
                    <Navbar.Brand>
                        { currentUser
                            ? <Button variant="primary" onClick={signOut}>Log out</Button>
                            : <Button variant="primary" onClick={signIn}>Log in</Button>
                        }
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Container>
                {
                    currentUser && addAuthUser(currentUser)
                }
                <header>
                </header>
                { currentUser
                    ? <MessageForm onSubmit={onSubmit} currentUser={currentUser} onPrivateSubmit={onPrivateSubmit} />
                    : <SignIn/>
                }
                {/*{ !!currentUser && !!messages.length && <Messages messages={messagesBackendless}/> }*/}
                {privateMessages.length>=1
                    ? <PrivateMessages messages={privateMessages}/>
                    :
                    <div/>
                }
                <Messages messages={messages}/>
            </Container>
        </>
    );
};

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



// import './App.css';
// import {Header} from "./components/Header";
// import React, {useEffect, useState} from 'react'
// import Big from 'big.js';
// import {Spinner} from 'react-bootstrap';
// import Backendless from 'backendless';
// import {MessageForm} from "./components/MessageForm";
// import {addAuthUser, gotMessages, initContract, login} from "./utils";
// import {Messages} from "./components/Messages";
// import PropTypes from 'prop-types';
// import * as nearAPI from 'near-api-js';
//
//
// const APP_ID = '1360435F-A676-BBA3-FFCE-85E6B8CA8800';
// const API_KEY = '3BF9589C-39DC-4CCE-A651-0A477E22B0BE';
// Backendless.serverURL = 'https://eu-api.backendless.com';
// Backendless.initApp(APP_ID, API_KEY);
//
//
// const SUGGESTED_DONATION = '0';
// const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
//
// function App({ contract, currentUser, nearConfig, wallet }) {
//     const [messages, setMessages] = useState([]);
//
//
//     const [error, setError] = useState('');
//     const [message, setMessage] = useState(null);
//     const [loading, setLoading] = useState(true);
//     let messagesBackendless = [];
//
//     useEffect(() => {
//         contract.getMessages().then(setMessages);
//
//
//         Backendless.Data.of('NEAR_DB').save({ account_id: 'TEST START' })
//             .then(obj => {
//                 const message = 'A data object has been saved in Backendless. Check \'DB\' in Backendless Console.' +
//                     `ObjectId = ${obj.objectId}`
//                 setMessage(message);
//                 setLoading(false);
//                 // console.log('added');
//             })
//             .catch(error => {
//                 setError( `Got an error - ${error}`)
//                 setLoading(false)
//             })
//         messagesBackendless = gotMessages();
//     }, []);
//
//     const onSubmit = (e) => {
//         e.preventDefault();
//
//         const {  message, donation } = e.target.elements;
//
//
//         contract.addMessage(
//             { text: message.value },
//             BOATLOAD_OF_GAS,
//             Big(donation.value || '0').times(10 ** 24).toFixed()
//         ).then(() => {
//             contract.getMessages().then(messages => {
//                 setMessages(messages);
//                 message.value = '';
//                 donation.value = SUGGESTED_DONATION;
//                 message.focus();
//             });
//         });
//     };
//
//     return (
//             loading ?
//                 <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </Spinner>:
//             <div className="App">
//                 {currentUser && addAuthUser(currentUser) }
//                 <Header currentUser={currentUser}/>
//                 <MessageForm
//                     onSubmit={onSubmit}
//                     currentUser={currentUser}
//                 />
//                 <Messages/>
//                 {/*{message}*/}
//
//             </div>
//         )
// }
// App.propTypes = {
//     contract: PropTypes.shape({
//         addMessage: PropTypes.func.isRequired,
//         getMessages: PropTypes.func.isRequired
//     }).isRequired,
//     currentUser: PropTypes.shape({
//         accountId: PropTypes.string.isRequired,
//         balance: PropTypes.string.isRequired
//     }),
//     nearConfig: PropTypes.shape({
//         contractName: PropTypes.string.isRequired
//     }).isRequired,
//     wallet: PropTypes.shape({
//         requestSignIn: PropTypes.func.isRequired,
//         signOut: PropTypes.func.isRequired
//     }).isRequired
// };
//
//
// export default App;
