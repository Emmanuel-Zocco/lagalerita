import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

//...
function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dbRef = firebase.db.ref('products');
    dbRef.on('value', (snapshot) => {
      const productsData = Object.entries(snapshot.val() || {}).map(
        ([key, value]) => ({
          id: key,
          ...value,
        })
      );
      setProducts(productsData);
    });
    return () => {
      dbRef.off('value');
    };
  }, []);

  return (
    <div className='product-container'>
      {products.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <div className='product-card'>
            <img className='product-image' src={product.image} alt={product.name} />
            <div className='product-details'>
              <h2 className='product-name'>{product.name}</h2>
              <p className='product-description'>{product.description}</p>
              <p className='product-price'>${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Products;

