import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { setDetail } from '../features/CartSlice.js';
import { Link } from 'react-router-dom';
import {Button, Navbar, Container, Table} from 'react-bootstrap';

const DetailTransaction = () => {
const [ordereds, setDetail] = useState([]);

useEffect(()=>{
    getDetails();
},[]);

const getDetails = async () => {
    const response = await axios.get('/ordereds');
    setDetail(response.data)
};

const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
    return alert('User not logged in');
} 

    return (
        <>
        <Navbar className="fluid bg-body-tertiary">
            <Container>
                <Navbar.Brand>Detail Transaction</Navbar.Brand>
                <Button variant="warning" as={Link} to={'/'} className=''>Back</Button>
            </Container>
        </Navbar>
        <div className='columns mt-5 is-centered'>
            <div className='column '>
                {/* <Table className='table is-striped is-fullwidth'> */}
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Details</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordereds.map((order, index) => (
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.total}</td>
                            <td>{order.details}</td>
                            <td>{user.username}</td>
                        </tr>                            
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
        </>
    )
}

export default DetailTransaction;