import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import {Form, Button} from 'react-bootstrap'

export default function MessageForm({ onSubmit, currentUser, onPrivateSubmit }) {

    const [x, setX] = useState(false);

    const soldCheckbox = ({ target: { checked } }) => {
        console.log(x, checked);
        setX(checked);
    };

    return (
        <Form onSubmit={x ? onPrivateSubmit : onSubmit}>
            <fieldset id="fieldset">

                <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter message"
                                  autoComplete="off"
                                  autoFocus
                                  // id="message"
                                  required
                    />
                </Form.Group>

                {/*<p className="highlight">*/}
                {/*    <label htmlFor="message">Message:</label>*/}
                {/*    <input*/}
                {/*        autoComplete="off"*/}
                {/*        autoFocus*/}
                {/*        id="message"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</p>*/}

                <Form.Group className="mb-3" controlId="donation">
                    <Form.Label>Donation (optional)</Form.Label>
                    <Form.Control
                        autoComplete="off"
                        defaultValue={'0'}
                        // id="donation"
                        max={Big(currentUser.balance).div(10 ** 24)}
                        min="0"
                        step="0.01"
                        type="number"
                    />
                </Form.Group>

                {/*<p>*/}
                {/*    <label htmlFor="donation">Donation (optional):</label>*/}
                {/*    <input*/}
                {/*        autoComplete="off"*/}
                {/*        defaultValue={'0'}*/}
                {/*        id="donation"*/}
                {/*        max={Big(currentUser.balance).div(10 ** 24)}*/}
                {/*        min="0"*/}
                {/*        step="0.01"*/}
                {/*        type="number"*/}
                {/*    />*/}
                {/*    <span title="NEAR Tokens">Ⓝ</span>*/}
                {/*</p>*/}

                <Form.Group className="mb-3" controlId="checkbox">
                    {/*<Form.Label>Set true if you want to make private message</Form.Label>*/}

                    <Form.Check
                        checked={x}
                        onChange={soldCheckbox}
                        // id="checkbox"
                        // type={checkbox}

                        // type={type}
                        label="Set true if you want to make private message"
                        // id={`disabled-default-${type}`}
                    />
                </Form.Group>
            {/*    <p>*/}
            {/*    <label htmlFor="checkbox">Set true if you want to make private message</label>*/}
            {/*        <input type="checkbox" id="checkbox" checked={x} onChange={soldCheckbox} />*/}
            {/*        <span title="NEAR Tokens">Ⓝ</span>*/}
            {/*</p>*/}
                <Form.Group className="mb-3" controlId="receiver">
                    <Form.Label>Receiver</Form.Label>
                    <Form.Control
                        placeholder="Enter receiver"
                        autoComplete="off"
                        // id="receiver"
                        type="text"
                        disabled={!x}
                    />
                </Form.Group>
                {/*<p>*/}
                {/*    <label htmlFor="receiver">Receiver (optional):</label>*/}
                {/*    <input*/}
                {/*        autoComplete="off"*/}
                {/*        defaultValue={'0'}*/}
                {/*        id="receiver"*/}
                {/*        min="0"*/}
                {/*        step="0.01"*/}
                {/*        type="number"*/}
                {/*        disabled={!x}*/}
                {/*    />*/}
                {/*</p>*/}
                <Button variant="primary" type="submit" className="mb-3">
                    Send message
                </Button>
            </fieldset>
        </Form>
    );
}

MessageForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
        accountId: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired
    }),
    onPrivateSubmit: PropTypes.func.isRequired
};
