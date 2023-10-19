import React, { useEffect, useState } from 'react';

interface Props {
    readonly id: number;
    readonly title: string;
    readonly brand: string;
    readonly photo: string;
    readonly price: number;
    quantity?: number; // 상품 수량을 나타내는 속성 추가
}

function LandingPage() {
    // 상품 목록, 장바구니, 총 가격을 상태로 관리
    const [products, setProducts] = useState<Props[]>([]);
    const [cart, setCart] = useState<Props[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // 상품 데이터를 가져오는 함수
    const fetchDatas = (url: string) => {
        fetch(url)
            .then(response => response.json())
            .then(response => {
                setProducts(response.products);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // 컴포넌트가 로드될 때 상품 데이터를 가져옴
    useEffect(() => {
        const url = "https://e2b7f9c0-20f2-48cf-8037-e93a5743b0e9.mock.pstmn.io/cart";
        fetchDatas(url);
    }, []);

    // 숫자를 금액 형식으로 변환하는 함수
    const formatRevenue = (revenue: number) => {
        if (typeof revenue === 'number') {
            return revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return "N/A";
        }
    }

    // 장바구니에 상품을 추가하는 함수
    const addToCart = (product: Props) => {
        if (!cart.some((item) => item.id === product.id)) {
            setCart([...cart, product]);
            setTotalPrice(totalPrice + product.price);
        }
    }

    // 장바구니에서 상품을 제거하는 함수
    const removeFromCart = (productId: number) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);

        // 상품 제거에 따라 업데이트된 총 가격 계산
        const newTotalPrice = updatedCart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
        setTotalPrice(newTotalPrice);
    }

    // 상품 수량을 감소시키는 함수
    const decreaseQuantity = (productId: number) => {
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: (item.quantity || 1) - 1 } : item
        );
        setCart(updatedCart);

        // 수량 변경에 따라 업데이트된 총 가격 계산
        const newTotalPrice = updatedCart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
        setTotalPrice(newTotalPrice);
    }

    // 상품 수량을 증가시키는 함수
    const increaseQuantity = (productId: number) => {
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
        setCart(updatedCart);

        // 수량 변경에 따라 업데이트된 총 가격 계산
        const newTotalPrice = updatedCart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
        setTotalPrice(newTotalPrice);
    }

    return (
        <div>
            <div id="sectionWrap" className='productCom'>
                <input type="text" id="searchInput" placeholder="검색어 입력" />
                <h3>상품목록</h3>
                <ul className="productIn">
                    {products.map((product, index) => (
                        <li key={index}>
                            <img src={`/images/${product.photo}`} alt={product.title} />
                            <h4>[{product.brand}]</h4>
                            <p>{product.title}</p>
                            <h3>{formatRevenue(product.price)}원</h3>
                            <button
                                id='add-remove-toggle'
                                className={cart.some((item) => item.id === product.id) ? "remove-from-cart" : "add-to-cart"}
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

            <div id="sectionWrap" className='cartCom'>
                <h3>장바구니</h3>
                <div className="cartDrag">
                    <ul className="cartTit">
                        <li>상품</li>
                        <li>상품금액</li>
                        <li>수량</li>
                        <li>총액</li>
                    </ul>
                    <ul className="cartUl">
                        {cart.map((cartProduct, index) => (
                            <li key={index}>
                                <ul className="cartItem" >
                                    <li>
                                        <img src={`/images/${cartProduct.photo}`} alt={cartProduct.photo} />
                                        <span>[{cartProduct.brand}]</span>
                                        <h5>{cartProduct.title}</h5>
                                    </li>
                                    <li>
                                        <p>{formatRevenue(cartProduct.price)}원</p>
                                    </li>
                                    <li>
                                        <button
                                            className="decrease-quantity"
                                            onClick={() => decreaseQuantity(cartProduct.id)}
                                        >
                                            -
                                        </button>
                                        <span>{cartProduct.quantity || 1}</span>
                                        <button
                                            className="increase-quantity"
                                            onClick={() => increaseQuantity(cartProduct.id)}
                                        >
                                            +
                                        </button>
                                    </li>
                                    <li>{formatRevenue((cartProduct.price || 0) * (cartProduct.quantity || 1))} 원</li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                    <span className="totalPrice">총 가격: {formatRevenue(totalPrice)} 원</span>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
