import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";

// const routeDefinitions = createRoutesFromElements([
//   <Route path="/" element={<HomePage />} />,
//   <Route path="/products" element={<ProductsPage />} />,
// ]);

// const router = createBrowserRouter(routeDefinitions);

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
