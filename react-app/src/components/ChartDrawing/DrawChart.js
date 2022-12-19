import Chart from 'react-apexcharts'
import { useEffect, useState } from 'react'
// import { getDailyPrices, getMinutelyPrices, getOneDayPrices, labelFormatter } from '../../util/util'
import { getDailyPrices, getMinutelyPrices, getOneDayPrices, labelFormatter } from '../../util/util2'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPrice, setStartingPrice, setTerm, setIsHovering } from '../../store/price'
import PlaceHolder from '../PlaceHolder'
import styles from './chart.module.css'

const DrawChart = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isNoData, setIsNoData] = useState(false)
    const [allData, setAllData] = useState({})
    const [color, setColor] = useState('#5ac53b')
    const [isRealtime, setIsRealtime] = useState(false)
    const { symbol, name } = useSelector(state => state.ticker)
    // const [isTooltip, setIsTooltip] = useState(true)
    const [range, setRange] = useState(0)
    const term = useSelector(state => state.price.term)
    const terms = ['1D', '1W', '1M', '3M', 'YTD', '1Y', '5Y']
    const selected = {
        borderBottom: `2px solid ${color}`,
        color: color,
        fontWeight: 500
    }
    const dispatch = useDispatch()
    const [realtimeId, setRealtimeId] = useState(null)

    const setCategories = () => {
        const offsetEST = 18000000
        const todayDateEST = new Date(new Date().getTime() - offsetEST).toISOString().split('T')[0]

        const res = []

        let hour = 9
        let minute = 30

        while(hour < 17){
            res.push(`${todayDateEST} ${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`)
            if(minute < 55) minute += 5
            else {
                minute = 0
                hour++
            }

            if(hour >= 16 && minute > 0) hour++
        }

        return res
    }

    const getData = async () => {
        const { data, categories } = ['3M', 'YTD', '1Y', '5Y'].includes(term) ? await getDailyPrices(symbol, term) : await getMinutelyPrices(symbol, term)
        // setIsNoData(true)
        setChart(data, categories)
        setIsLoaded(true)
    }

    const getIdx = () => {
        const offset = 18000000
        const estTime = new Date(new Date().getTime() - offset).toISOString().replace('T', ' ')
        const [hour, minute] = estTime.split(' ')[1].split(':')
        let idx = 0
        let time = 9 * 60 + 30
        while(time < hour * 60 + minute * 1){
            idx++
            time += 5
        }

        return {idx, hour, minute, estTime}
    }

    const getOneDayData = async () => {
        const { data, categories, realtime } = await getOneDayPrices(symbol)
        const rtCategories = setCategories()

        if(realtime){
            if(categories.length)
                rtCategories[categories.length - 1] = categories[categories.length - 1]
            else {
                const { idx, estTime } = getIdx()
                for(let i = 1; i <= idx; i++)
                    data.push(data[0])
                rtCategories[idx] = estTime
            }

            setChart([...data, ...Array(rtCategories.length - data.length).fill(null)], rtCategories)
        }else {
            if(data.length === 1)
                setChart(Array(rtCategories.length).fill(data[0]), rtCategories)
            else {
                if(data.length < rtCategories.length){
                    while(data.length < rtCategories.length){
                        data.push(data[data.length - 1])
                    }
                }
                setChart(data, rtCategories)
            }
        }
        setIsRealtime(realtime)
        setIsLoaded(true)
    }

    const setChart = (data, categories) => {
        if(!data.length) {
            dispatch(setStartingPrice(0))
            dispatch(setCurrentPrice(0))
            setIsNoData(true)
        }
        else {
            setIsNoData(false)
            setAllData({
                series: [{
                    name,
                    data
                }],
                categories
            })
            setRange(categories.length)

            dispatch(setCurrentPrice(data.reduce((p, c) => c || p, 0)))
            dispatch(setStartingPrice(data[0]))
            setColor(data[0] <= data.reduce((p, c) => c || p, 0) ? '#5ac53b' : '#ec5e2a')
        }
    }

    useEffect(() => {
        if(isRealtime && term === '1D') setRealtimeId(setTimeout(async () => {
            await getOneDayData()
        }, 5000))
        
        return () => {clearTimeout(realtimeId)}
    }, [isRealtime, allData])

    useEffect(() => {
        setIsLoaded(false)

        if(term === '1D') getOneDayData()
        else {
            clearTimeout(realtimeId)
            getData()
        }
    }, [term, symbol])

    return (
        <div>
        {
            isLoaded ?
            <>
                <div>
                    {isNoData ? <PlaceHolder isNoData={true} /> :
                    <Chart
                        series={allData.series}
                        options={{
                            chart: {
                                id: 'stock-chart',
                                animations: { enabled: false },
                                type: 'line',
                                height: 300,
                                parentHeightOffset: 0,
                                zoom: { enabled: false },
                                events: {
                                    mouseMove: (e, chartContext, config) => {
                                        if(config.dataPointIndex >= 0){
                                            // setIsTooltip(!!allData.series[0].data[config.dataPointIndex])
                                            dispatch(setCurrentPrice(allData.series[0].data.slice(0, config.dataPointIndex + 1).reduce((p, c) => c || p) || allData.series[0].data[allData.series[0].data.length - 1]))
                                        }
                                        dispatch(setIsHovering(true))
                                    },
                                    mouseLeave: () => {
                                        dispatch(setCurrentPrice(allData.series[0].data.reduce((p, c) => c || p, 0)))
                                        dispatch(setIsHovering(false))
                                        // setIsTooltip(true)
                                    }
                                },
                                toolbar: { show: false },
                                // sparkline: { enabled: true }
                            },
                            colors: [color],
                            width: '100%',
                            xaxis: {
                                categories: allData.categories,
                                position: 'top',
                                labels: {
                                    show: false,
                                    formatter: (value) => labelFormatter(value)
                                },
                                tooltip: {
                                    offsetY: 20,
                                },
                                range,
                            },
                            yaxis: {
                                labels: { show: false },
                            },
                            grid: { show: false },
                            stroke: {
                                width: 1.5,
                            },
                            legend: {
                                show: false,
                            },
                            tooltip: {
                                // enabled: isTooltip,
                                enabled: true,
                                items: { display: 'none' },
                                x: { show: false },
                            },
                        }}
                        height={300}
                    />}
                </div>
                <ul className={styles.termList}>
                    {
                        terms.map(t => <li style={t === term ? selected : {}} key={t} onClick={() => dispatch(setTerm(t))}>{t}</li>)
                    }
                </ul>
            </>
            : <PlaceHolder />
        }
        </div>
    );
}

export default DrawChart
