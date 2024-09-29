import React, { useState, useEffect } from "react";
import "../index.css";

const ProductsByFrontEnd = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const fetchData = async () => {
    try {
      setLoading(true);
      const rawResultData = await fetch(
        "https://dummyjson.com/products?limit=100"
      );
      if (rawResultData.ok) {
        const result = await rawResultData.json();
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
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="products">
            {products.length &&
              products.slice(pages * 10 - 10, pages * 10).map((prod, index) => {
                return (
                  <span className="product__single" key={prod.id}>
                    <img src={prod.thumbnail} alt={prod.title} />
                    <span>{prod.title}</span>
                  </span>
                );
              })}
          </div>
          <div className="pagination">
          <span className={(pages > 1) ? "" : "pagination__disabled"}>⬅️</span>
            {products.length > 0 &&
              [...Array(products.length / 10)].map((_, index) => (
                <span
                  onClick={() => setPages(index + 1)}
                  key={index}
                  className={pages === index + 1 ? "pagination__selection" : ""}
                >
                  {index + 1}
                </span>
              ))}
            <span className={(pages < products.length / 10) ? "" : "pagination__disabled"}>➡️</span>
          </div>
        </>
      )}
    </>
  );
};

export default ProductsByFrontEnd;
