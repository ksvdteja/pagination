import { useEffect, useState } from "react";
import "./styles.css";

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

const PAGE_SIZE = 9;

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=162");
    const json = await data.json();
    setProducts(json.products);
  };
  const handlePageClick = (n) => {
    setCurrentPage(n);
  };
  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className="pagination-container">
        <button
          className="page-number"
          disabled={currentPage === 0}
          onClick={handlePrevClick}
        >
          ⬅️
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => handlePageClick(n)}
            className={"page-number " + (n === currentPage ? "active" : "")}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === noOfPages - 1}
          onClick={handleNextClick}
        >
          ➡️
        </button>
      </div>
      {!products ? (
        <h1>No Products found</h1>
      ) : (
        <div className="product">
          {products.slice(start, end).map((p) => (
            <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
          ))}
        </div>
      )}
    </div>
  );
}
