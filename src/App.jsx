import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from '../src/components/products';
import ProductDetail from '../src/components/productDetail'; // import the new component

import Header from '../src/components/header';
import Footer from '../src/components/footer';
import Home from '../src/components/home';
import ContactUs from '../src/components/contactUs';
import Cursos from './components/cursosyActividades';
import LoginForm from './components/login';
import ProductForm from '../src/components/productForm.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async (username, password) => {
    const validUsername = "admin";
    const validPassword = "lagalerita";
    const isAuthenticated = username === validUsername && password === validPassword;

    // Set isAuthenticated to true if the credentials match
    setIsAuthenticated(isAuthenticated);
    return isAuthenticated;
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }
  
      const data = await response.json();
      const isAuthenticated = data.isAuthenticated;
      setIsAuthenticated(isAuthenticated);
      return isAuthenticated;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} /> {/* new route */}
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route
            path="/login"
            element={<LoginForm authenticate={authenticate} redirectTo="/productForm" />}
          />
          <Route path="/productForm" element={<ProductForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
