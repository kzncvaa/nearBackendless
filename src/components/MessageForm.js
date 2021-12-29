// import React, {useEffect, useState} from "react";
// import {Form, Button, Container} from "react-bootstrap";
// import Big from "big.js";
//
// export const MessageForm = ({ onSubmit, currentUser }) =>{
//
//     return(
//         <Container className="mb-5">
//             {currentUser ?
//                 <Form onSubmit={onSubmit}>
//                     <fieldset id="fieldset">
//                         <Form.Group className="mb-3"
//                             // controlId="formBasicEmail"
//                         >
//                             <Form.Label htmlFor="message">Write message:</Form.Label>
//                             <Form.Control type="text"
//                                           placeholder="Enter message"
//                                           autoComplete="off"
//                                           autoFocus
//                                           id="message"
//                                           required
//                             />
//                         </Form.Group>
//
//                         <Form.Group className="mb-3"
//                             // controlId="formBasicEmail"
//                         >
//                             <Form.Label htmlFor="donation">Rate (optional):</Form.Label>
//                             <Form.Control
//                                 autoComplete="off"
//                                 defaultValue={'0'}
//                                 id="donation"
//                                 max={Big(currentUser.balance).div(10 ** 24)}
//                                 min="0"
//                                 step="0.01"
//                                 type="number"
//                             />
//                             <Form.Text title="NEAR Tokens">Ⓝ</Form.Text>
//                         </Form.Group>
//
//                         <Button variant="primary" type="submit">
//                             Submit
//                         </Button>
//                     </fieldset>
//                 </Form>
//                 :
//                 <p>please login for sending message</p>
//             }
//         </Container>
//     )
// }
