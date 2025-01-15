import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  categorySelectors,
  getAllCategory,
} from "../features/CategorySlice.js";
import React, { useEffect } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaUtensils } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";
import { TbBrandCakephp } from "react-icons/tb";
import { LuDessert } from "react-icons/lu";
import { GiNoodles } from "react-icons/gi";
import { getProduct, getProductByCategory } from "../features/ProductSlice.js";

const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector(categorySelectors.selectAll);
  const { data, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  function setActive(elem) {
    var a = document.getElementsByClassName("active");
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active");
    }
    elem.classList.add("active");
  }

  const setIcon = (categori) => {
    if (categori == 1) {
      return <FaUtensils />;
    } else if (categori == 2) {
      return <CiCoffeeCup />;
    } else if ( categori == 3) {
      return <LuDessert />;
    } else if ( categori == 4){
      return <TbBrandCakephp />
    } else{
      return <GiNoodles />
    }
  };

  const showAll = () => {
    dispatch(getProduct())
  .then((response) => {
    // console.log("All Products:", response.payload);
  })
  .catch((error) => {
    console.error("Error fetching all products:", error);
  });
  };

  const handleCategoryClick = (id) => {
    if (id) {
      dispatch(getProductByCategory(id));
    } else {
      dispatch(getProduct());
    }
  };

  console.log("Categories:", category);
  return (
    <>
      <Col md={2}>
        <h4>Category</h4>
        <p>{loading ? "Loading..." : ""}</p>
        <hr />
        <ListGroup key="all001">
          <ListGroup.Item
            id={`all001`}
            className="mb-1 shadow-sm"
            active
            action
            onClick={() => {
              setActive(document.getElementById(`all001`));
              showAll();
            }}
            
          >
            <IoFastFoodSharp /> All Product
          </ListGroup.Item>
        </ListGroup>
        {category &&
          category.map((item) => (
            <ListGroup key={item.id}>
              <ListGroup.Item
                id={`key${item.id}`}
                className="mb-1 shadow-sm"
                action
                onClick={() => {
                  setActive(document.getElementById(`key${item.id}`)),
                    handleCategoryClick(item.id);
                }}
              >
                {setIcon(item.id)} {item.name}
              </ListGroup.Item>
            </ListGroup>
          ))}
      </Col>
    </>
  );
};

export default Category;
// component ini sudah bagus