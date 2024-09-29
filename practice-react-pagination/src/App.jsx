import React, { useState } from "react";
import "./index.css";
import ProductsByFrontEnd from "./Components/ProductsByFrontEnd";
import ProductsByBackend from "./Components/ProductsByBackend";

const App = () => {
  const [showProductsByFrontEnd, setShowProductsByFrontend] = useState(true);

  return (
    <div>
      <button
        onClick={() => {
          setShowProductsByFrontend(!showProductsByFrontEnd);
        }}
      >
        {showProductsByFrontEnd ? (
          <span>'showProducts By FrontEnd </span>
        ) : (
          <span>'showProducts by backend'</span>
        )}
      </button>
      {!showProductsByFrontEnd ? <ProductsByFrontEnd /> : <ProductsByBackend />}
    </div>
  );
};

export default App;
