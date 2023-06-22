import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProductsTunk } from '../store/product.thunk'
import { productActions } from '../store/product.Slice'

const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
    decrementHandler,
    incrementHandler,
}) => {
    const totalPrice = total.toFixed(2)
    const enebled = total === 0
    const disable = availableCount === orderedQuantity
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${totalPrice}</td>
            <td>
                <button
                    onClick={() => incrementHandler(id, price)}
                    className={styles.actionButton}
                    disabled={disable}
                >
                    +
                </button>
                <button
                    onClick={() => decrementHandler(id, price)}
                    className={styles.actionButton}
                    disabled={enebled}
                >
                    -
                </button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsTunk())
    }, [])
    const { products, isLoading, error, totalPrice } = useSelector(
        (state) => state.product
    )
    const incrementHandler = (id, price) => {
        dispatch(productActions.incrementByPrice(price))
        dispatch(productActions.increment(id))
    }
    const decrementHandler = (id, price) => {
        dispatch(productActions.decrementByPrice(price))
        dispatch(productActions.decrement(id))
    }
    const price = totalPrice.toFixed(2)
    let discount = 0

    if (totalPrice > 1000) {
        discount = totalPrice * 0.1
    }
    const count = discount.toFixed(2)
    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                {isLoading && <LoadingIcon />}
                <h4 style={{ color: 'red' }}>{error}</h4>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th># Available</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <Product
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                availableCount={item.availableCount}
                                price={item.price}
                                orderedQuantity={item.quantity}
                                total={item.total}
                                incrementHandler={incrementHandler}
                                decrementHandler={decrementHandler}
                            />
                        ))}
                    </tbody>
                </table>
                <h2>Order summary</h2>
                <p>Discount: $ {count}</p>
                <p>Total: $ {price}</p>
            </main>
        </div>
    )
}

export default Checkout
