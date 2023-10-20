import React, { useState } from 'react';
import { ProductListProps } from 'type';

function ProductList({
  products,
  cart,
  formatRevenue,
  addToCart,
  removeFromCart,
}: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) {
      return text;
    }
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  };

  const filteredProducts = products.filter(
    (product) => product.title.includes(searchTerm) || product.brand.includes(searchTerm),
  );

  return (
    <div id="sectionWrap" className="productCom">
      <input
        type="text"
        id="searchInput"
        placeholder="검색어 입력"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <h3>상품목록</h3>
      <ul className="productIn">
        {filteredProducts.map((product, index) => (
          <li key={index}>
            <img src={`/images/${product.photo}`} alt={product.title} />
            <h4
              dangerouslySetInnerHTML={{ __html: highlightSearchTerm(`[${product.brand}]`) }}
            ></h4>
            <p dangerouslySetInnerHTML={{ __html: highlightSearchTerm(product.title) }}></p>
            <h3>{formatRevenue(product.price)}원</h3>
            <button
              id="add-remove-toggle"
              className={
                cart.some((item) => item.id === product.id) ? 'remove-from-cart' : 'add-to-cart'
              }
              data-id={product.id}
              onClick={() => {
                if (cart.some((item) => item.id === product.id)) {
                  removeFromCart(product.id);
                } else {
                  addToCart(product);
                }
              }}
            >
              {cart.some((item) => item.id === product.id) ? '제거' : '담기'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
