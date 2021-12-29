// import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
// import {getConfig} from './config'
// import Backendless from "backendless";
// import Big from "big.js";
// import {useState} from "react";
//
// const nearConfig = getConfig(process.env.NODE_ENV || 'testnet')
// console.log(nearConfig);
//
// // Initialize contract & set global variables
// export async function initContract() {
//
//     // Initialize connection to the NEAR testnet
//     const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
//
//     // console.log(near)
//     // Initializing Wallet based Account. It can work with NEAR testnet wallet that
//     // is hosted at https://wallet.testnet.near.org
//     window.walletConnection = new WalletConnection(near)
//     // console.log(window.walletConnection)
//
//     // Getting the Account ID. If still unauthorized, it's just empty string
//     window.accountId = window.walletConnection.getAccountId()
//     // console.log(window.accountId)
//
//     // Initializing our contract APIs by contract name and configuration
//     window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
//         // View methods are read only. They don't modify the state, but usually return some value.
//         viewMethods: ['getGreeting'],
//         // Change methods can modify the state. But you don't receive the returned value when called.
//         changeMethods: ['setGreeting'],
//         // sender: walletConnection.getAccountId(),
//     })
//     // console.log(window.contract)
//
// }
//
// // export async function onSubmitMessage(e, contract, donation){
// //     e.preventDefault();
// //     const [messages, setMessages] = useState([]);
// //
// //     const { message, donation } = e.target.elements;
// //
// //     // fieldset.disabled = true;
// //
// //     // update blockchain data in background
// //     // add uuid to each message, so we know which one is already known
// //     contract.addMessage(
// //         { text: message.value },
// //         1000000,
// //         Big(donation.value || '0').times(10 ** 24).toFixed()
// //     ).then(() => {
// //         contract.getMessages().then(messages => {
// //             setMessages(messages);
// //             message.value = '';
// //             donation.value = 0;
// //             // fieldset.disabled = false;
// //             message.focus();
// //         });
// //     });
// // }
//
// export function logout() {
//     window.walletConnection.signOut()
//     // reload page
//     window.location.replace(window.location.origin + window.location.pathname)
// }
//
// export function login(nearConfig) {
//     console.log(nearConfig);
//     // Allow the current app to make calls to the specified contract on the
//     // user's behalf.
//     // This works by creating a new access key for the user's account and storing
//     // the private key in localStorage.
//     window.walletConnection.requestSignIn(nearConfig.contractName, 'NEAR Backendless')
//     // window.walletConnection.requestSignIn("", "NEAR REST API")
// }
//
// export function addAuthUser(currentUser){
//     Backendless.Data.of('authedUsers').save({ account_id: currentUser.accountId })
//         .then(obj => {
//             console.log(currentUser.accountId)
//
//             console.log('A data object has been saved in Backendless. Check \'DB\' in Backendless Console.' +
//                 `ObjectId = ${obj.objectId}`);
//         })
//         .catch(error => {
//             console.log(error);
//         })
// }
//
// export function addMessage(currentUser, message, payload) {
//     Backendless.Data.of('Messages').save({ account_id: currentUser.accountId , message: message, payload: payload})
//         .then(obj => {
//             console.log(currentUser.accountId)
//
//             console.log('A data object has been saved in Backendless. Check \'DB\' in Backendless Console.' +
//                 `ObjectId = ${obj.objectId}`);
//         })
//         .catch(error => {
//             console.log(error);
//         })
// }
//
// export const gotMessages = async () => {
//     try {
//         let messages = await Backendless.Data.of('Messages').find()
//         return messages
//     }catch (e) {
//         return e
//     }
// }