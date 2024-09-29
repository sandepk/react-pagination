import React, { useState, useEffect } from "react";
import "../index.css";

const ProductsByBackend = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchData = async () => {
    try {
      setLoading(true);
      const rawResultData = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${(pages-1)*10}`
      );
      if (rawResultData.ok) {
        const result = await rawResultData.json();
        console.log("Result:" , result);
        setTotalPages(Math.floor(result.total / 10))
        setProducts(result.products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pages]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="products">
            {products.length &&
              products.map((prod, index) => {
                return (
                  <span className="product__single" key={prod.id}>
                    <img src={prod.thumbnail} alt={prod.title} />
                    <span>{prod.title}</span>
                  </span>
                );
              })}
          </div>
          <div className="pagination">
            {pages > 1 && <span>⬅️</span>}
            {products.length > 0 &&
              [...Array(totalPages)].map((_, index) => (
                <span
                  onClick={() => setPages(index + 1)}
                  key={index}
                  className={pages === index + 1 ? "pagination__selected" : ""}
                >
                  {index + 1}
                </span>
              ))}
            {pages < totalPages && <span>➡️</span>}
          </div>
        </>
      )}
    </>
  );
};

export default ProductsByBackend;
