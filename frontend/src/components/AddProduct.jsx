import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup, Container, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

const AddProduct = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [isReady, setIsReady] = useState(0);
    const [image, setImage] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        console.log('Data yang dikirim: ', {
            code,
            name,
            price,
            isReady,
            image,
            categoryId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }); // Debugging
    
        if ( !code || !name || !price || !isReady || !image || !categoryId) {
            console.error("Semua field harus diisi!");
            return;
        }
    
        try {
            await axios.post("/products", {
                code,
                name,
                price,
                isReady,
                image,
                categoryId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log("Data berhasil dikirim");
            navigate("/");
        } catch (error) {
            console.error("Gagal mengirim data:", error);
        }
    };
    
    return (
        <>
        <Navbar className="fluid mb-3 bg-body-tertiary">
            <Container>
                <Navbar.Brand>Add Products</Navbar.Brand>
            </Container>
        </Navbar>
        <Container className="fluid d-flex justify-content-center align-items-center">
            <div className="center w-100">
                <form onSubmit={saveProduct}>
                    <div className="field">
                        <label className="label">Product Code</label>
                        <InputGroup className="mb-3 w-50">
                            <Form.Control
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Code"
                            />
                        </InputGroup>
                    </div>
                    <div className="field">
                        <label className="label">Product Name</label>
                        <InputGroup className="mb-3 w-50">
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name"
                            />
                        </InputGroup>
                    </div>
                    <div className="field">
                        <label className="label">Product Price</label>
                        <InputGroup className="mb-3 w-50">
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter product price"
                            />
                        </InputGroup>
                    </div>
                    <div className="field">
                        <label className="label">Ready Stock</label>
                            <InputGroup className="mb-3 w-50">
                                <Form.Control
                                type="number"
                                value={isReady ? 1 : 0}
                                onChange={(e) => setIsReady(e.target.value === '1')}
                                placeholder="Enter product stock"
                                />
                            </InputGroup>
                    </div>
                    <div className="field">
                        <label className="label">Product Image</label>
                        <InputGroup className="mb-3 w-50">
                            <Form.Control
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Enter product image"
                            />
                        </InputGroup>
                    </div>
                    <div className="field">
                        <label className="label">Product Category</label>
                        <InputGroup className="mb-3 w-50">
                            <Form.Control
                                type="number"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                placeholder="Enter product category"
                            />
                        </InputGroup>
                    </div>
                    <div className="field">
                        <Button variant="success" type="submit">
                            Save
                        </Button>
                        <Button variant="warning" as={Link} to={'/products'}>
                            Back
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
        </>
    );
};

export default AddProduct;
