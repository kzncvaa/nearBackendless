import React from 'react';
import PropTypes from 'prop-types';

export default function Messages({ messages }) {
    return (
        <>
            <h2>Messages</h2>
            {messages.map((message) =>
                <p key={message.objectId}>
                    <strong>{message.account_id}</strong>:<br/>
                    {message.message} - {message.payload}
                </p>
            )}
        </>
    );
}

Messages.propTypes = {
    messages: PropTypes.array
};
