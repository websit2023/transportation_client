import { createContext, useCallback, useContext, useState } from "react";

interface Order {
    scheduleId: string
    totalPrice: number
    selectedSeats: { seat_number: number, available: boolean }[]
}

interface OrderContextInterface {
    order: Order | null
    addNewOrder: (order: Order) => void
    cancelOrder: () => void
}

const OrderContext = createContext({} as OrderContextInterface)

export function useOrder() {
    return useContext(OrderContext)
}

export default function OrderProvider({ children }: { children: any }) {
    const [order, setOrder] = useState<Order | null>(null)

    const addNewOrder = useCallback((order: Order) => {
        setOrder(order)
    }, [])

    const cancelOrder = useCallback(() => {
        setOrder(null)
    }, [])

    return (
        <OrderContext.Provider value={{
            order,
            addNewOrder,
            cancelOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}