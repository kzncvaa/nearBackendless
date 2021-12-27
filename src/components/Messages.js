import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";
import {gotMessages} from "../utils";

export function Messages() {
    const [messages, setMessages] = useState([])

    useEffect(async () => {
        let arr = await gotMessages()
        setMessages(arr)
    }, [])


    return (
        <Container>
            <h2>Messages</h2>
            {Array.from(messages).map((message) =>{
                console.log(message)
                return <Card key={message.objectId} className="mb-2">
                    <Card.Header>USER: {message.account_id}</Card.Header>
                    <Card.Body>
                        <Card.Text>{message.message}</Card.Text>
                        {/*<Card.Text>*/}
                        {/*    With supporting text below as a natural lead-in to additional content.*/}
                        {/*</Card.Text>*/}
                    </Card.Body>
                </Card>
            })}
        </Container>
    );
}
