import { Link } from "react-router-dom";

function ProductsPage() {
  return (
    <div>
      <h1>Products Page</h1>
      <ul>
        <li>
          <Link to="product1">Product 1</Link>
        </li>
        <li>
          <Link to="product2">Product 2</Link>
        </li>
        <li>
          <Link to="product3">Product 3</Link>
        </li>
      </ul>
    </div>
  );
}

export default ProductsPage;
