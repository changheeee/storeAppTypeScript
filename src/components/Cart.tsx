import React, { useState } from 'react';
import { CartProps } from 'type';
// import ReceiptModal from './ReceiptModal';
import OrderModal from './OrderModal';

function Cart({ cart, formatRevenue, decreaseQuantity, increaseQuantity, totalPrice }: CartProps) {

    const [isModalOpen, setModalOpen] = useState(false);

    // 모달 열기 함수
    const openModal = () => {
        setModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div id="sectionWrap" className="cartCom">
            <h3>장바구니</h3>
            <div className="cartDrag">
                <ul className="cartTit">
                    <li>상품</li>
                    <li>상품금액</li>
                    <li>수량</li>
                    <li>총액</li>
                </ul>
                <ul className="cartUl">
                    {cart.map((cartProduct, index) => {
                        const productPrice = cartProduct.price || 0;
                        const quantity = cartProduct.quantity || 1;
                        const productTotalPrice = formatRevenue(productPrice * quantity);

                        return (
                            <li key={index}>
                                <ul className="cartItem">
                                    <li>
                                        <img src={`/images/${cartProduct.photo}`} alt={cartProduct.photo} />
                                        <span>[{cartProduct.brand}]</span>
                                        <h5>{cartProduct.title}</h5>
                                    </li>
                                    <li>
                                        <p>{formatRevenue(productPrice)}원</p>
                                    </li>
                                    <li>
                                        <button
                                            className="quantity-button decrease-quantity"
                                            onClick={() => decreaseQuantity(cartProduct.id)}
                                        >
                                            -
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            className="quantity-button increase-quantity"
                                            onClick={() => increaseQuantity(cartProduct.id)}
                                        >
                                            +
                                        </button>
                                    </li>
                                    <li>{productTotalPrice} 원</li>
                                </ul>
                            </li>
                        );
                    })}
                </ul>
                <span className="totalPrice">주문합계:<strong>&nbsp;{formatRevenue(totalPrice)}&nbsp;</strong>  원</span>
            </div>
            <button className='order-btn' onClick={openModal}>주문하기</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <OrderModal
                        cart={cart}
                        formatRevenue={formatRevenue}
                        totalPrice={totalPrice}
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                    />
                    {/* <ReceiptModal cart={cart} formatRevenue={formatRevenue} totalPrice={totalPrice} closeModal={closeModal} /> */}
                </div>
            )}
        </div>
    );
}

export default Cart;
