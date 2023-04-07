import React, { useState } from 'react';
import inicialProducts from '../../inicialProducts.json';

function ProductForm() {
  const [products, setProducts] = useState(inicialProducts);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // store the file object

  const addProduct = () => {
    const reader = new FileReader();
    reader.readAsDataURL(image); // read the file content as a Base64 string
    reader.onloadend = () => {
      const newProduct = { name, description, price, image: reader.result };
      fetch('https://la-galerita-default-rtdb.firebaseio.com/products.json', {
        method: 'POST',
        body: JSON.stringify(newProduct)
      })
      .then(response => response.json())
      .then(data => {
        const newId = data.name;
        const updatedProducts = [...products, { id: newId, ...newProduct }];
        setProducts(updatedProducts);
        setName('');
        setDescription('');
        setPrice('');
        setImage(null);
      })
      .catch(error => console.error(error));
    };
  };

  const editProduct = (id, newName, newDescription, newPrice, newImage) => {
    const newProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, name: newName, description: newDescription, price: newPrice, image: newImage };
      }
      return product;
    });
    setProducts(newProducts);

    fetch(`https://la-galerita-default-rtdb.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        price: newPrice,
        image: newImage
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };


  const deleteProduct = (id) => {
    const newProducts = products.filter(product => product.id !== id);
    setProducts(newProducts);
  };

  useState(() => {
    fetch('https://la-galerita-default-rtdb.firebaseio.com/products.json')
      .then(response => response.json())
      .then(data => {
        const loadedProducts = [];
        for (const key in data) {
          loadedProducts.push({ id: key, ...data[key] });
        }
        setProducts(loadedProducts);
      })
      .catch(error => console.error(error));
  }, []);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <img src={product.image} alt={product.name} />
              </td>
              <td>
                <input type="file" onChange={handleImageChange} />
              </td>
              <td>
                <button onClick={() => editProduct(product.id, name, description, price, image)}>Edit</button>
              

              </td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add a new product</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
      </label>
      <br />
      <label>
        Image:
        <input type="file" onChange={handleImageChange} />
      </label>
      <br />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}
export default ProductForm;