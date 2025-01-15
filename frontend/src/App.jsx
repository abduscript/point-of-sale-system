// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import NavbarComponent from './components/NavbarComponent.jsx';
// import ProductList from './components/ProductList.jsx';
// import AddProduct from './components/AddProduct.jsx';
// import Transaction  from './components/Transaction.jsx';
// import Home from './Home.jsx';
// import EditProduct from './components/EditProduct.jsx';

// function App() {
//   return (
//     <Router>
//       {/* <NavbarComponent /> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/add" element={<AddProduct />} />
//         <Route path="/details" element={<Transaction />} />
//         <Route path="/edit-product/:id" element={<EditProduct />} />
//         <Route path="/products" element={<ProductList />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavbarComponent from './components/NavbarComponent.jsx';
import ProductList from './components/ProductList.jsx';
import AddProduct from './components/AddProduct.jsx';
import Transaction from './components/Transaction.jsx';
import Home from './Home.jsx';
import EditProduct from './components/EditProduct.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Import halaman baru
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

// Import Auth Context
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <NavbarComponent /> */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/details" element={<Transaction />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
                <Home />
              </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
