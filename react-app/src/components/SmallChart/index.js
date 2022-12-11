import Chart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import { getOneDayPrices } from '../../util/util2'

const SmallChart = ({ symbol }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [allData, setAllData] = useState({})
    const [color, setColor] = useState('#5ac53b')
    const [isRealtime, setIsRealtime] = useState(false)

    const setChart = (data, categories) => {
        setAllData({
            series: [{
                data
            }],
            categories
        })
        setColor(data[0] < data[data.length - 1] ? '#5ac53b' : '#ec5e2a')
    }

    const getOneDayData = async () => {
        const { data, categories, realtime } = await getOneDayPrices(symbol, true)
        setChart(data, categories)

        setIsRealtime(realtime)
        setIsLoaded(true)
    }

    useEffect(() => {
        getOneDayData()
    }, [])

    useEffect(() => {
        if(isRealtime) { setTimeout(async () => {await getOneDayData()}, 60000) }
    }, [isRealtime, allData])

    return (
        isLoaded ?
        <Chart
            series={allData.series}
            options={{
                chart: {
                    animations: { enabled: false },
                    type: 'line',
                    zoom: { enabled: false },
                    toolbar: { show: false },
                    parentHeightOffset: 0,
                },
                colors: [color],
                xaxis: { labels: { show: false }},
                yaxis: {
                    labels: { show: false },
                    min: () => Math.min(...allData.series[0].data),
                    max: () => Math.max(...allData.series[0].data)
                },
                grid: { show: false },
                stroke: {
                    width: 1.5,
                },
                legend: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                },
            }}
            height={80}
            width={140}
        /> :
        'Loading...'
    )
}

export default SmallChart
