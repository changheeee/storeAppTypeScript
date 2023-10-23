export interface Props {
    readonly id: number;
    readonly title: string;
    readonly brand: string;
    readonly photo: string;
    readonly price: number;
    quantity?: number; // 상품 수량을 나타내는 속성 추가
}

export interface CartProps {
    cart: Props[];
    formatRevenue: (revenue: number) => string;
    decreaseQuantity: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    totalPrice: number;
}

export interface ProductListProps {
    products: Props[];
    cart: Props[];
    formatRevenue: (revenue: number) => string;
    addToCart: (product: Props) => void;
    removeFromCart: (productId: number) => void;
}

export interface OrderModalProps {
    cart: Props[]; 
    formatRevenue: (revenue: number) => string;
    totalPrice: number;
    closeModal: () => void;
    isModalOpen: boolean; // isModalOpen 추가

}


export interface ReceiptModalProps {
    cart: Props[]; 
    formatRevenue: (revenue: number) => string;
    totalPrice: number;
    closeModal: () => void;
    ordererName: string;
    ordererNumber: string;
}