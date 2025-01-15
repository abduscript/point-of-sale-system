import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Button, Table, Container, Navbar} from 'react-bootstrap';

const ProductList = () => {
const [products, setProduct] = useState([]);

useEffect(()=>{
    getProducts();
},[]);

const getProducts = async () => {
    const response = await axios.get('/products');
    setProduct(response.data)
};

const deleteProduct = async (id) => {
    try{
        await axios.delete(`/products/${id}`);
        getProducts();
    }catch(error){
        console.log(error);
    }   
}

    return (
        <>
        <Navbar className="fluid bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#">Product List</Navbar.Brand>
            </Container>
        </Navbar>
        <div className='columns mt-3 is-centered'>
            <div className='column '>
                <Table className='table is-striped is-fullwidth'>
                {/* <Table striped bordered hover size="sm"> */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Id</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>image</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.id}</td>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.isReady}</td>
                            <td>{product.image}</td>
                            <td>{product.categoryId}</td>
                            <td>
                                <Button variant="info" as={Link} to={`/edit-product/${product.id}`}>Edit</Button>
                                <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
                            </td>
                        </tr>                            
                        ))}
                    </tbody>
                </Table>
                <Button variant="primary" as={Link} to="/add" >Add Product</Button>
                <Button variant="warning" as={Link} to={'/'}>Back</Button>
            </div>
        </div>
    </>
    )
}

export default ProductList