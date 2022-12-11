import Chart from 'react-apexcharts'
import { useEffect, useState } from 'react'
// import { getDailyPrices, getMinutelyPrices, getOneDayPrices, labelFormatter } from '../../util/util'
import { getDailyPrices, getMinutelyPrices, getOneDayPrices, labelFormatter } from '../../util/util2'
import { useSelector, useDispatch } from 'react-redux'
import { setPrice } from '../../store/price'

const DrawChart = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [allData, setAllData] = useState({})
    const [color, setColor] = useState('#5ac53b')
    const [term, setTerm] = useState('5Y')
    const [isRealtime, setIsRealtime] = useState(false)
    const { symbol, name } = useSelector(state => state.ticker)
    const terms = ['1D', '1W', '1M', '3M', 'YTD', '1Y', '5Y']
    const selected = {
        borderBottom: `2px solid ${color}`,
        color: color,
        fontWeight: 500
    }
    const dispatch = useDispatch()

    const getData = async () => {
        const { data, categories } = ['3M', 'YTD', '1Y', '5Y'].includes(term) ? await getDailyPrices(symbol, term) : await getMinutelyPrices(symbol, term)
        setChart(data, categories)
        setIsLoaded(true)
    }

    const getOneDayData = async () => {
        const { data, categories, realtime } = await getOneDayPrices(symbol)
        setChart(data, categories)
        setIsRealtime(realtime)
        setIsLoaded(true)
    }

    const setChart = (data, categories) => {
        setAllData({
            series: [{
                name,
                data
            }],
            categories
        })
        dispatch(setPrice(data[data.length - 1] || -1))
        setColor(data[0] < data[data.length - 1] ? '#5ac53b' : '#ec5e2a')
    }

    useEffect(() => {
        if(isRealtime) setTimeout(async () => {await getOneDayData()}, 60000)
    }, [isRealtime, allData])

    useEffect(() => {
        setIsLoaded(false)

        term === '1D' ? getOneDayData() : getData()

    }, [term, symbol])

    return (
        <div>
        {
            isLoaded ?
            <>
                <div>
                    <Chart
                        series={allData.series}
                        options={{
                            chart: {
                                animations: { enabled: false },
                                type: 'line',
                                zoom: { enabled: false },
                                events: {
                                    mouseMove: (e, chartContext, config) => { dispatch(setPrice(allData.series[0].data[config.dataPointIndex] || allData.series[0].data[allData.series[0].data.length - 1])) },
                                    mouseLeave: () => { dispatch(setPrice(allData.series[0].data[allData.series[0].data.length - 1])) }
                                },
                                toolbar: { show: false }
                            },
                            colors: [color],
                            xaxis: {
                                categories: allData.categories,
                                labels: {
                                    show: false,
                                    formatter: (value) => labelFormatter(value)
                                },
                                tooltip: {
                                    offsetY: -320,
                                },
                            },
                            yaxis: { labels: { show: false }},
                            grid: { show: false },
                            stroke: {
                                width: 1.5,
                            },
                            legend: {
                                show: false,
                            },
                            tooltip: {
                                enabled: true,
                                items: { display: 'none' },
                                x: { show: false },
                            },
                        }}
                        height={350}
                    />
                </div>
                <ul className='term-list'>
                    {
                        terms.map(t => <li style={t === term ? selected : {}} key={t} onClick={() => setTerm(t)}>{t}</li>)
                    }
                </ul>
            </>
            : 'Loading...'
        }
        </div>
    );
}

export default DrawChart
