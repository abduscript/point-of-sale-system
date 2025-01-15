import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveOrder } from "../features/CartSlice.js";
import Swal from "sweetalert2";

//
const TotalCart = ({ carts }) => {
  const dispatch = useDispatch();
  let sum = 0;

  // Pastikan carts adalah array dan memiliki data yang valid
  if (Array.isArray(carts) && carts.length > 0) {
    sum = carts.reduce(function (result, item) {
      return result + parseInt(item.totalPrice);
    }, 0);
  }

// const saveCartData = async (data) => {
//   if (!data || data.length === 0) {
//     console.warn("⚠️ Data cart kosong atau tidak valid!");
//     Swal.fire("Error!", "No cart data can be saved.", "error");
//     return;
//   }

//   const user = JSON.parse(localStorage.getItem('user'));
//   if (!user) {
//     return alert('User not logged in');
//   }

//   const orderData = {
//     date: new Date(),
//     total: sum,
//     details: data.map(item => ({
//       id: item.id,
//       qty: item.qty,
//       price: item.price,
//       name: item.name,
//       note: item.note,
//       totalPrice: item.totalPrice,
//     })),
//     username: user.username,
//   };

//   dispatch(saveOrder(orderData));
//   Swal.fire("Order Success!", "Thanks For Your Visited", "success");
// };



const saveCartData = async (data) => {
  // Validasi data cart
  if (!data || data.length === 0) {
    console.warn("⚠️ Data cart kosong atau tidak valid!");
    Swal.fire("Error!", "No cart data can be saved.", "error");
    return;
  }

  // Ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.username) {
    console.warn("⚠️ User data tidak ditemukan di localStorage!");
    Swal.fire("Error!", "User not logged in. Please log in to proceed.", "error");
    return;
  }

  // Hitung total harga jika variabel `sum` tidak tersedia
  // const total = data.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

  // Struktur data order
  const orderData = {
    date: new Date().toISOString(), // Gunakan format ISO untuk konsistensi
    total: sum,
    details: data.map(item => ({
      id: item.id,
      qty: item.qty,
      price: item.price,
      name: item.name,
      note: item.note || "", // Default jika note kosong
      totalPrice: item.totalPrice || 0,
    })),
    username: user.username,
  };

    dispatch(saveOrder(orderData));
    Swal.fire("Order Success!", "Thanks for your visit!", "success");
  // } catch (error) {
  //   console.error("❌ Gagal menyimpan pesanan:", error);
  //   Swal.fire("Error!", "Failed to save order. Please try again.", "error");
  // }
};



  return (
    <div className="fixed-bottom">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="bg-body pt-2">
          <div className="px-3">
            <h4>
              Total Payment :{" "}
              <strong className="float-end me-3">
                $ {sum.toLocaleString("id-US")}
              </strong>
            </h4>
            <Button
              variant="primary"
              className="w-100 me-3 mb-3"
              size="lg"
              onClick={() => saveCartData(carts)}
            >
              <FaCartArrowDown /> Pay
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

TotalCart.propTypes = {
  carts: PropTypes.array,
};

export default TotalCart;
//component ini sudah bagus