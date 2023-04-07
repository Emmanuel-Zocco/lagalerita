import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../firebase';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const dbRef = firebase.db.ref(`products/${id}`);
    dbRef.on('value', (snapshot) => {
      const productData = snapshot.val();
      setProduct(productData);
    });
    return () => {
      dbRef.off('value');
    };
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product-detail-container'>
      <img className='product-detail-image' src={product.image} alt={product.name} />
      <div className='product-detail-details'>
        <h2 className='product-detail-name'>{product.name}</h2>
        <p className='product-detail-description'>{product.description}</p>
        <p className='product-detail-price'>${product.price}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
