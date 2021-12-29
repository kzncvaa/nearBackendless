// import React from 'react';
// import App from './App';
// import {getConfig} from './config.js';
// import * as nearAPI from 'near-api-js';
// import {useEffect, useState} from 'react'
// import {Spinner} from "react-bootstrap";
//
// export default function Start () {
//     const [connect, setConnect] = useState(null)
//     console.log("start");
//
//     useEffect(()=>{
// // Initializing contract
//         const fetchData = async () => {
//             // get network configuration values from config.js
//             // based on the network ID we pass to getConfig()
//             const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');
//
//             // create a keyStore for signing transactions using the user's key
//             // which is located in the browser local storage after user logs in
//             const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
//
//             // Initializing connection to the NEAR testnet
//             const near = await nearAPI.connect({ keyStore, ...nearConfig });
//
//             // Initialize wallet connection
//             const walletConnection = new nearAPI.WalletConnection(near);
//
//             // Load in user's account data
//             let currentUser;
//             if (walletConnection.getAccountId()) {
//                 currentUser = {
//                     // Gets the accountId as a string
//                     accountId: walletConnection.getAccountId(),
//                     // Gets the user's token balance
//                     balance: (await walletConnection.account().state()).amount,
//                 };
//             }
//
//             // Initializing our contract APIs by contract name and configuration
//             const contract = await new nearAPI.Contract(
//                 // User's accountId as a string
//                 walletConnection.account(),
//                 // accountId of the contract we will be loading
//                 // NOTE: All contracts on NEAR are deployed to an account and
//                 // accounts can only have one contract deployed to them.
//                 nearConfig.contractName,
//                 {
//                     // View methods are read-only – they don't modify the state, but usually return some value
//                     viewMethods: ['getMessages'],
//                     // Change methods can modify the state. But you don't receive the returned value when called.
//                     changeMethods: ['addMessage'],
//                     // Sender is the account ID to initialize transactions.
//                     // getAccountId() will return empty string if user is still unauthorized
//                     sender: walletConnection.getAccountId(),
//                 }
//             );
//             setConnect({ contract, currentUser, nearConfig, walletConnection })
//
//         }
//         fetchData().then(()=>{
//             console.log("fetch");
//         })
//
//     },[])
//
//
//     if (connect!==null) {
//         console.log(connect);
//         return (
//             <App
//                 contract={connect.contract}
//                 currentUser={connect.currentUser}
//                 nearConfig={connect.nearConfig}
//                 wallet={connect.walletConnection}
//             />
//         )} else {
//         return (
//             <Spinner animation="border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//             </Spinner>
//         )}
//
// }
//
//
//
//
//
