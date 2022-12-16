import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import { diffFormatter, amountFormatter } from "../../util/util2"
import styles from './price.module.css'

const PriceShow = () => {
    const { currentPrice, startingPrice, term, isHovering } = useSelector(state => state.price)
    // const companyName = 'User'
    const [isPos, setIsPos] = useState(currentPrice - startingPrice)
    const [color, setColor] = useState('#5ac53b')
    const terms = {
        '5Y': 'Past 5 Years',
        YTD: 'This Year',
        '1Y': 'Past Year',
        '3M': 'Past 3 Months',
        '1M': 'Past Month',
        '1W': 'Past Week',
        '1D': 'Today'
    }

    // const diffFormatter = (curr, start, isPositive) => {
    //     const valueDiff = Math.abs(curr - start).toFixed(2)
    //     const percDiff = Math.abs(((curr - start) / start * 100)).toFixed(2)
    //     const sign = isPositive ? '+' : '-'

    //     return `${sign}$${valueDiff} (${sign}${percDiff}%)`
    // }

    useEffect(() => {
        setIsPos(currentPrice >= startingPrice)
        setColor(currentPrice >= startingPrice ? '#5ac53b' : '#ec5e2a')
    }, [currentPrice, startingPrice])

    return (
        <div>
            {/* <div className={styles.nameAndPrice}>{companyName}</div> */}
            <div className={styles.nameAndPrice}>{currentPrice >= 0 ? amountFormatter(currentPrice) : '--.--'}</div>
            <div className={styles.diff}>
                <span style={{color}}>{diffFormatter(currentPrice, startingPrice, isPos)}</span>
                { !isHovering && <span className={styles.term}>{terms[term]}</span> }
            </div>
        </div>
    )
}

export default PriceShow
