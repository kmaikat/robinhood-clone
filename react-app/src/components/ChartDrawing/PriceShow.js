import { useSelector } from "react-redux"

const PriceShow = () => {
    const price = useSelector(state => state.price)
    const symbol = useSelector(state => state.ticker.symbol)

    return <div>${price >= 0 ? price.toFixed(2) : '--.--'} {symbol}</div>
}

export default PriceShow
