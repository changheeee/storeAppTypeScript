import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import { Props } from 'type';

function CartPage() {
  // 상품 목록, 장바구니, 총 가격을 상태로 관리
  const [products, setProducts] = useState<Props[]>([]);
  const [cart, setCart] = useState<Props[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // 상품 데이터를 가져오는 함수
  const fetchDatas = (url: string) => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setProducts(response.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // 컴포넌트가 로드될 때 상품 데이터를 가져옴
  useEffect(() => {
    const url = 'https://e2b7f9c0-20f2-48cf-8037-e93a5743b0e9.mock.pstmn.io/cart';
    fetchDatas(url);
  }, []);

  // 숫자를 금액 형식으로 변환하는 함수
  const formatRevenue = (revenue: number) => {
    if (typeof revenue === 'number') {
      return revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return 'N/A';
    }
  };

  // 장바구니에 상품을 추가하는 함수
  const addToCart = (product: Props) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, product]);
      setTotalPrice(totalPrice + product.price);
    }
  };

  // 장바구니에서 상품을 제거하는 함수
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    // 상품 제거에 따라 업데이트된 총 가격 계산
    const newTotalPrice = updatedCart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0,
    );
    setTotalPrice(newTotalPrice);
  };

  // 상품 수량을 감소시키는 함수
  const decreaseQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: (item.quantity || 1) - 1 } : item,
    );
    setCart(updatedCart);

    // 수량 변경에 따라 업데이트된 총 가격 계산
    const newTotalPrice = updatedCart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0,
    );
    setTotalPrice(newTotalPrice);
  };

  // 상품 수량을 증가시키는 함수
  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
    );
    setCart(updatedCart);

    // 수량 변경에 따라 업데이트된 총 가격 계산
    const newTotalPrice = updatedCart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0,
    );
    setTotalPrice(newTotalPrice);
  };

  return (
    <div>
      <Cart
        cart={cart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        formatRevenue={formatRevenue}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default CartPage;
