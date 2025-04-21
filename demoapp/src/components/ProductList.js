// import React from "react";
// import "./../style/ProductList.css"; // Make sure to create and import this CSS file
// import { useNavigate } from "react-router-dom";
// function ProductList({ products, addProductToCart }) {
//   const navigate = useNavigate();
//   const handleProductClick = (product) => {
//     navigate(`/book-details/${product.bookID}`, { state: { product } });
//   };
//   return (
//     <div className="products">
//       {products.map((product) => (
        
//         <div className="product" key={product.bookID} onClick={() => handleProductClick(product)} style={{ cursor: "pointer" }}>
//           <img className="product-image" src={product.imageURL} alt={product.title} />
//           <div className="product-info">
//             <h4 className="product-name">{product.title}</h4>
//             <p className="product-author">Author: {product.author.authorName}</p>
//             <p className="product-category">Category: {product.category.categoryName}</p>
//             <span className="product-price">{product.price} Rs</span>
//           </div>
//           <div className="button">
//             <button className="btnss" onClick={() => addProductToCart(product)}>
//               Add to cart
//             </button>

            
//           </div>

//           {/* <div className="buttons">
//             <button className="btn">Detail</button>
//             <button className="btn" onClick={() => addProductToCart(product)}>
//               Add to cart
//             </button>

            
//           </div> */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProductList;



import React from "react";
import "./../style/ProductList.css"; // Make sure to create and import this CSS file
import { useNavigate } from "react-router-dom";

function ProductList({ products, addProductToCart }) {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/book-details/${product.bookID}`, { state: { product } });
  };

  const handleAddToCartClick = (event, product) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the product div
    addProductToCart(product);
  };

  return (
    <div className="products">
      {products.map((product) => (
        <div className="product" key={product.bookID} onClick={() => handleProductClick(product)} style={{ cursor: "pointer" }}>
          <img className="product-image" src={product.imageURL} alt={product.title} />
          <div className="product-info">
            <h4 className="product-name">{product.title}</h4>
            <p className="product-author">Author: {product.author.authorName}</p>
            <p className="product-category">Category: {product.category.categoryName}</p>
            <span className="product-price">{product.price} Rs</span>
          </div>
          <div className="button">
            <button className="btnss" onClick={(event) => handleAddToCartClick(event, product)}>
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
