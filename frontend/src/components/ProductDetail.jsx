import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/ProductSlice.js";
import CardComponent from "./CardComponent.jsx";
import axios from "axios";
import { inputCart, updateCart } from "../features/CartSlice.js";
// import "./fixed.css";

const ProductDetail = () => {
  const products = useSelector((state) => state.product.data);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // const setCart = async (product) => {
  //   const response = await axios.get(`/carts?productId=${product.id}`);
  //   if (response.data && response.data.length > 0) {
  //     // update cart
  //     const orderItem = response.data[0];
  //     orderItem.qty = parseInt(orderItem.qty) + 1;
  //     orderItem.totalPrice = parseInt(orderItem.price) * parseInt(orderItem.qty);
  //     dispatch(updateCart(orderItem));
  //   } else {
  //     // insert cart
  //     const orderItem = {
  //       qty: 1,
  //       price: product.price,
  //       name: product.name,
  //       totalPrice: product.price,
  //       note: "",
  //       productId: product.id,
  //     };
  //     dispatch(inputCart(orderItem));
  //   }
  // };

//////////////////////////////////////////////////////////////


const setCart = async (product) => {
  if (!product || !product.id) {
    console.warn("⚠️ Produk tidak valid:", product);
    return;
  }

  console.log("🛒 Produk yang diklik:", product);

  // try {
    const response = await axios.get(`/carts?productId=${product.id}`);
    console.log("📦 Data Cart dari Backend:", response.data);

    if (response.data && response.data.length > 0) {
      const orderItem = response.data[0];
      orderItem.qty = parseInt(orderItem.qty) + 1;
      orderItem.totalPrice = parseInt(orderItem.price) * parseInt(orderItem.qty);
      console.log("🔄 Update Cart:", orderItem);
      dispatch(updateCart(orderItem));
    } else {
      const orderItem = {
        qty: 1,
        price: product.price,
        name: product.name,
        totalPrice: product.price,
        note: "Happy Shopping",
        productId: product.id,
      };
      console.log("➕ Input Cart:", orderItem);
      dispatch(inputCart(orderItem));
    }
  // } catch (error) {
  //   console.error("🔥 Kesalahan di setCart:", error.message);
  // }
};


  
  return (
    <>
      <Col md={7}>
        <h4>Display Product</h4>
        {error ? error : ""}
        <hr />
        {/* <Row>
          {products ? (
            products.map((item) => (
              <CardComponent key={item.id} product={item} setCart={setCart} />
            ))
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <p>No data</p>
          )}
        </Row> */}
        <Row>
        {products && products.length > 0 ? (
          products.map((item) => (
            <CardComponent key={item.id} product={item} setCart={setCart} />
            ))
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <p>No data</p>
          )}
        </Row>
      </Col>
    </>
  );
};

export default ProductDetail;