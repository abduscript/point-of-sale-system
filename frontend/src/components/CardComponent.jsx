import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const CardComponent = ({ product, setCart }) => {
  return (
    <Col md={4} xs={10} className="mb-4">
      <Card className="shadow" onClick={() => setCart(product)}>
        <Card.Img variant="top" src={"/img/" + product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>$ {product.price.toLocaleString("id-US")}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

CardComponent.propTypes = {
  product: PropTypes.object,
  setCart: PropTypes.func,
};

export default CardComponent;
//component ini sudah bagus