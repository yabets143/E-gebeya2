import React, { useState, useEffect } from 'react';
import './ManageProducts.css'; // Import the CSS file for styling

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        categoryID: 0,
        color: '',
        size: '',
        stockQuantity: 0,
        imageURL: '',
        brand: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5021/api/ProductController2')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5021/api/ProductController2/${id}`, {
            method: 'DELETE',
        })
            .then(() => setProducts(products.filter(product => product.productID !== id)))
            .catch(error => console.error('Error deleting product:', error));
    };

    const handleSave = () => {
        fetch(`http://localhost:5021/api/ProductController2/${editingProduct.productID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingProduct),
        })
            .then(response => response.json())
            .then(updatedProduct => {
                setProducts(products.map(product => 
                    product.productID === updatedProduct.productID ? updatedProduct : product
                ));
                setIsEditing(false);
                setEditingProduct(null);
            })
            .catch(error => console.error('Error updating product:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="manage-products">
            <h1>Manage Products</h1>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Brand</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productID}>
                            <td>{product.productID}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.categoryID}</td>
                            <td>{product.color}</td>
                            <td>{product.size}</td>
                            <td>{product.stockQuantity}</td>
                            <td><img src={product.imageURL} alt={product.name} className="product-image" /></td>
                            <td>{product.brand}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(product.productID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <div className="edit-form">
                    <h2>Edit Product</h2>
                    {Object.keys(editingProduct).map(key => (
                        key !== 'productID' && (
                            <label key={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                                <input
                                    type={typeof editingProduct[key] === 'number' ? 'number' : 'text'}
                                    name={key}
                                    value={editingProduct[key]}
                                    onChange={handleChange}
                                />
                            </label>
                        )
                    ))}
                    <div className="form-buttons">
                        <button className="save-btn" onClick={handleSave}>Save</button>
                        <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageProducts;