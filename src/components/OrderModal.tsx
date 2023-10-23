import React, { useState } from 'react';
import ReceiptModal from './ReceiptModal';
import { OrderModalProps } from 'type';

function OrderModal({ cart, formatRevenue, totalPrice, closeModal, isModalOpen }: OrderModalProps) {
    const [receiptModal, setReceiptModal] = useState(false);
    const [ordererName, setOrdererName] = useState('');
    const [ordererNumber, setOrdererNumber] = useState('');
    const [nameError, setNameError] = useState('');
    const [numberError, setNumberError] = useState('');

    const handleOrdererName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setOrdererName(name);
        if (!/^[a-zA-Z가-힣\s]+$/.test(name)) {
            setNameError('올바른 이름을 입력하세요.');
        } else {
            setNameError('');
        }
    }

    const handleOrdererNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = e.target.value;
        setOrdererNumber(number);
        if (!/^\d{3}-\d{3,4}-\d{4}$/.test(number)) {
            setNumberError('올바른 연락처를 입력하세요 (예: 010-1234-5678)');
        } else {
            setNumberError('');
        }
    }

    const openReceiptModal = () => {
        if (!nameError && !numberError) {
            setReceiptModal(true);
        }
    }

    return (
        <>
            <div className="order-modal" style={receiptModal ? { display: 'none' } : { display: 'flex' }}>
                <h3 className='order-info'>주문자 정보 입력
                    <button className="modal-close" onClick={closeModal}>닫기 X</button>
                </h3>
                <form action='#' onSubmit={openReceiptModal}>
                    <label>주문자명</label>
                    <input type="text" placeholder='이름을 입력하세요' required onChange={handleOrdererName} />
                    {nameError && <p className="error">{nameError}</p>}
                    <label>연락처</label>
                    <input type="text" placeholder='010-1234-5678' required onChange={handleOrdererNumber} />
                    {numberError && <p className="error">{numberError}</p>}

                    <button type='submit' className="modal-open">주문하기</button>
                </form>
            </div>

            {receiptModal && (
                <ReceiptModal
                    cart={cart} formatRevenue={formatRevenue} totalPrice={totalPrice} closeModal={closeModal}
                    ordererName={ordererName}
                    ordererNumber={ordererNumber}
                />
            )}
        </>
    )
}

export default OrderModal;
