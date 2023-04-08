import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyABCE05u-QC9JErTA0Ing46YpgBXDinDG4",
  authDomain: "la-galerita.firebaseapp.com",
  databaseURL: "https://la-galerita-default-rtdb.firebaseio.com",
  projectId: "la-galerita",
  storageBucket: "la-galerita.appspot.com",
  messagingSenderId: "613692365225",
  appId: "1:613692365225:web:05f777c93e0c24ac140cb8",
  measurementId: "G-GETQR6R54H"
});

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref('products');
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
    <div>
      <div>
        <img src="/img/gale.jpg" alt="image description" />
        <p>Your text goes here</p>
      </div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h2>
          <img className='product-image' src={product.image} alt={product.name} />
        </div>
      ))}
    </div>
  );
}

export default Home;
