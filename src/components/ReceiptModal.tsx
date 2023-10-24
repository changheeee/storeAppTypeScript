import React from 'react';
import { ReceiptModalProps } from 'type';


function ReceiptModal({ cart, formatRevenue, totalPrice, closeModal, ordererName, ordererNumber }: ReceiptModalProps) {
  return (
    <div className="order-modal">
      <h3 className='order-info'>영수증
        <button className="modal-close" onClick={closeModal}>닫기 X</button>
      </h3>
      <div className='order-in-wrap'>
        <div className='orderer'>
          <h4>주문 정보</h4>
          <div className='order-in'>
            <p>
              <span>주문자명 </span>
              <strong>{ordererName}</strong>
            </p>
            <p>
              <span>연 &nbsp;락&nbsp; 처 </span>
              <strong>{ordererNumber}</strong>
            </p>
          </div>
        </div>
        <h4>주문 내역</h4>
        <div className='order-in'>
          <ul className='order-header'>
            <li>상품명</li>
            <li>수량</li>
            <li>금액</li>
          </ul>
          <ul className='modalItem'>
            {cart.map((cartProduct, index) => {
              const productPrice = cartProduct.price || 0;
              const quantity = cartProduct.quantity || 1;
              const productTotalPrice = formatRevenue(productPrice * quantity);

              return (
                <li key={index}>
                  <span className='title'>{cartProduct.title}</span>
                  <span className='quantity'>{cartProduct.quantity || 1}</span>
                  <strong className='total-price'>{productTotalPrice}원</strong>
                </li>
              )
            })}

          </ul>
        </div>
      </div>
      <h3 className='order-price'>결제금액 : {formatRevenue(totalPrice)}원</h3>
    </div>
  );
}

export default ReceiptModal;
