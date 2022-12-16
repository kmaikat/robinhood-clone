import { useEffect, useState } from "react";
import { getOneDayPrices } from "../../../util/util2";
const StockPrice = ({ symbol }) => {
    const [prices, setPrices] = useState({ curr: 0, diff: 0 })
    useEffect(() => {
        getData();
    }, []);

    const diffFormatter = diff => {
        const sign = diff >= 0 ? '+' : '-'
        return `${sign}${Math.abs(diff).toFixed(2)}%`
    }

    const getData = async () => {
        const { data } = await getOneDayPrices(symbol, true);
        const curr = data.reduce((p, c) => c || p)

        setPrices({curr, diff: curr - data[0]})
    }

    return (
        <>
            <div className="tab-table-content">{`$${prices.curr.toFixed(2)}`}</div>
            <div className={prices.diff < 0 ? 'pricediff-color-change tab-table-content' : 'pricediff-color tab-table-content'}>{diffFormatter(prices.diff)}</div>
        </>
    );
}

export default StockPrice
