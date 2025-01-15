import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const EditProduct = () => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [isReady, setIsReady] = useState(0);
    const [image, setImage] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

useEffect(() => {
    getProductById();
}, []);

const updateProduct = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`/products/${id}`, {
            code,
            name,
            price,
            isReady,
            image,
            categoryId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
    });
    navigate("/products");
    } catch (error) {
    console.log(error);
    }
};

// const getProductById = async () => {
//     try {
//         console.log("ID dari useParams:", id); // Debugging ID
//         const response = await axios.get(`/products/${id}`);
//         console.log("Response dari Backend:", response.data); // Debugging response
//         console.log("isReady State:", isReady);
//         if (!response.data) {
//             throw new Error("Produk tidak ditemukan atau data kosong.");
//         }

//         setCode(response.data.code);
//         setName(response.data.name);
//         setPrice(response.data.price);
//         setIsReady(response.data.isReady);
//         setImage(response.data.image);
//         setCategoryId(response.data.categoryId);
//     } catch (error) {
//         console.error("Error fetching product:", error.message);
//     }
// };

const getProductById = async () => {
    try {
        console.log("ID dari useParams:", id); // Debugging ID
        
        if (!id) {
            throw new Error("ID tidak valid atau kosong.");
        }
        
        const response = await axios.get(`/products/${id}`);
        console.log("Response dari Backend:", response.data); // Debugging response

        if (!response.data) {
            throw new Error("Produk tidak ditemukan atau data kosong.");
        }

        setCode(response.data.code);
        setName(response.data.name);
        setPrice(response.data.price);
        setIsReady(response.data.isReady);
        setImage(response.data.image);
        setCategoryId(response.data.categoryId);
    } catch (error) {
        console.error("Error fetching product:", error.message);
    }
};



return (
    <Container className="fluid d-flex justify-content-center align-items-center">
            <div className="center w-100">
                <form onSubmit={updateProduct}>
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
                            Update
                        </Button>
                        <Button variant="warning" as={Link} to={'/products'}>
                            Back
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
  );
};

export default EditProduct;