import React, {useEffect, useState} from "react";
import {Form, Button, Container} from "react-bootstrap";
import Big from "big.js";

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

export const MessageForm = ({ onSubmitMessage, currentUser, contract }) =>{
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // contract.getMessages().then(setMessages);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const { message, donation } = e.target.elements;

        // fieldset.disabled = true;

        // update blockchain data in background

        // add uuid to each message, so we know which one is already known
        contract.addMessage(
            { text: message.value },
            BOATLOAD_OF_GAS,
            Big(donation.value || '0').times(10 ** 24).toFixed()
        ).then(() => {
            contract.getMessages().then(messages => {
                setMessages(messages);
                message.value = '';
                donation.value = SUGGESTED_DONATION;
                // fieldset.disabled = false;
                message.focus();
            });
        });
    };


    return(
        <Container className="mb-5">
            {currentUser ?
                <Form onSubmit={onSubmit}>
                    <fieldset id="fieldset">
                        <Form.Group className="mb-3"
                            // controlId="formBasicEmail"
                        >
                            <Form.Label htmlFor="message">Write message:</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter message"
                                          autoComplete="off"
                                          autoFocus
                                          id="message"
                                          required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3"
                            // controlId="formBasicEmail"
                        >
                            <Form.Label htmlFor="donation">Rate (optional):</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                defaultValue={'0'}
                                id="donation"
                                max={Big(currentUser.balance).div(10 ** 24)}
                                min="0"
                                step="0.01"
                                type="number"
                            />
                            <Form.Text title="NEAR Tokens">Ⓝ</Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </fieldset>
                </Form>
                :
                <p>please login for sending message</p>
            }
        </Container>
    )
}
