import React from "react";
import {login, logout} from "../utils";
import {Button, Container, Navbar} from 'react-bootstrap';

export const Header = ({currentUser}) =>{
    return(
        <Navbar bg="light" className="mb-3">
            <Container>
                <Navbar.Brand>
                    { currentUser
                        ? <Button variant="primary" onClick={logout}>Log out</Button>
                        : <Button variant="primary" onClick={login}>Log in</Button>
                    }
                </Navbar.Brand>
                <Navbar.Brand>
                    { currentUser ?
                    "User:" +currentUser.accountId : "You not signed"
                    }
                </Navbar.Brand>
                <Navbar.Brand>
                    { currentUser &&
                    "Balance:" + currentUser.balance
                    }
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}