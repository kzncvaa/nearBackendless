import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function Form({ onSubmit, currentUser, onPrivateSubmit }) {

    const [x, setX] = useState(false);

    const soldCheckbox = ({ target: { checked } }) => {
        console.log(x, checked);
        setX(checked);
    };

    return (
        <form onSubmit={x ? onPrivateSubmit : onSubmit}>
            <fieldset id="fieldset">
                <p>Sign the guest book, { currentUser.accountId }!</p>
                <p className="highlight">
                    <label htmlFor="message">Message:</label>
                    <input
                        autoComplete="off"
                        autoFocus
                        id="message"
                        required
                    />
                </p>
                <p>
                    <label htmlFor="donation">Donation (optional):</label>
                    <input
                        autoComplete="off"
                        defaultValue={'0'}
                        id="donation"
                        max={Big(currentUser.balance).div(10 ** 24)}
                        min="0"
                        step="0.01"
                        type="number"
                    />
                    <span title="NEAR Tokens">Ⓝ</span>
                </p>
                <p>
                <label htmlFor="checkbox">Set true if you want to make private message</label>
                    <input type="checkbox" id="checkbox" checked={x} onChange={soldCheckbox} />
                    <span title="NEAR Tokens">Ⓝ</span>
            </p>
                <p>
                    <label htmlFor="receiver">Receiver (optional):</label>
                    <input
                        autoComplete="off"
                        defaultValue={'0'}
                        id="receiver"
                        min="0"
                        step="0.01"
                        type="number"
                        disabled={!x}
                    />
                    <span title="NEAR Tokens">Ⓝ</span>
                </p>
                <button type="submit">
                    Sign
                </button>
            </fieldset>
        </form>
    );
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
        accountId: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired
    })
};
