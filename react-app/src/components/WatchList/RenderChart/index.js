import { useState, useEffect } from 'react'
import SmallChart from "../../SmallChart"
import styles from './render.module.css'

const RenderChart = ({ symbol }) => {
    const [prices, setPrices] = useState({curr: 0, diff: 0})
    const [color, setColor] = useState(prices.diff >= 0 ? '#5ac53b' : '#ec5e2a')

    const diffFormatter = diff => {
        const sign = diff >= 0 ? '+' : '-'
        return `${sign}${Math.abs(diff).toFixed(2)}%`
    }

    useEffect(() => {
        setColor(prices.diff >= 0 ? '#5ac53b' : '#ec5e2a')
    }, [prices])

    return (
        <div className={styles.container}>
            <div className={styles.symbol}>{symbol}</div>
            <SmallChart symbol={symbol} setPrices={setPrices} />
            <div>
                <div>{`$${prices.curr.toFixed(2)}`}</div>
                <div style={{color}}>{diffFormatter(prices.diff)}</div>
            </div>
        </div>
    )
}

export default RenderChart
