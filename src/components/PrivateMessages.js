import React from 'react';
import PropTypes from 'prop-types';

export default function PrivateMessages({ messages }) {
    return (
        <>
            <hr/>
            <h2 style={{color: "red"}}>Private messages</h2>
            {messages.map((message) =>
                <p key={message.objectId} style={{color: "red"}}>
                    <strong>From: {message.account_id}</strong>:<br/>
                    {message.message} - {message.payload}
                </p>
            )}
        </>
    );
}

PrivateMessages.propTypes = {
    messages: PropTypes.array
};
