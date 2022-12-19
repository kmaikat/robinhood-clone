import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
// import { getDailyPrices, getMinutelyPrices, getOneDayPrices, labelFormatter } from '../../util/util'

import { getDailyPrices, getMinutelyPrices, getOneDayPrices, labelFormatter } from '../../util/util2'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPrice, setStartingPrice, setIsHovering } from '../../store/price'
import PlaceHolder from '../PlaceHolder'


const DrawChart = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [allData, setAllData] = useState({});
    const [color, setColor] = useState('#5ac53b');
    const [isRealtime, setIsRealtime] = useState(false);
    // const buyingPower = useSelector(state => state.session.user.buyingPower)
    const assets = Object.values(useSelector(state => state.session.user.assets));
    const symbol = 'AAPL';
    const name = 'User';
    // const [isTooltip, setIsTooltip] = useState(true)

    const [range, setRange] = useState(0)
    const term = '1D'
    // const terms = ['1D', '1W', '1M', '3M', 'YTD', '1Y', '5Y']

    const selected = {
        borderBottom: `2px solid ${color}`,
        color: color,
        fontWeight: 500
    };
    const dispatch = useDispatch();
    let realtimeId;

    const setCategories = () => {
        const offsetEST = 18000000;
        const todayDateEST = new Date(new Date().getTime() - offsetEST).toISOString().split('T')[0];

        const res = [];

        let hour = 9;
        let minute = 30;

        while (hour < 17) {
            res.push(`${todayDateEST} ${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`);
            if (minute < 55) minute += 5;
            else {
                minute = 0;
                hour++;
            }

            if (hour >= 16 && minute > 0) hour++;
        }

        return res;
    };

    const getData = async () => {
        const { data, categories } = ['3M', 'YTD', '1Y', '5Y'].includes(term) ? await getDailyPrices(symbol, term) : await getMinutelyPrices(symbol, term);
        setChart(data, categories);
        setIsLoaded(true);
    };

    const getIdx = () => {
        const offset = 18000000;
        const estTime = new Date(new Date().getTime() - offset).toISOString().replace('T', ' ');
        const [hour, minute] = estTime.split(' ')[1].split(':');
        let idx = 0;
        let time = 9 * 60 + 30;
        while (time < hour * 60 + minute * 1) {
            idx++;
            time += 5;
        }

        return { idx, hour, minute, estTime };
    };

    const getOneDayData = async () => {
        const { data, categories, realtime } = await getOneDayPrices(symbol);
        if (realtime) {
            const rtCategories = setCategories();
            if (categories.length)
                rtCategories[categories.length - 1] = categories[categories.length - 1];
            else {
                const { idx, estTime } = getIdx();
                for (let i = 1; i <= idx; i++)
                    data.push(data[0]);
                rtCategories[idx] = estTime;
            }

            setChart([...data, ...Array(rtCategories.length - data.length).fill(null)], rtCategories);
        } else setChart(data, categories);
        setIsRealtime(realtime);
        setIsLoaded(true);
    };

    const setChart = (data, categories) => {
        let assetCost = assets.map(asset => asset.quantity * asset.avgPrice).reduce((sum, cost) => sum + cost, 0);
        const reverseData = data.reverse();

        let newData = [1];
        for (let index = 1; index < reverseData.length; index++) {
            newData.push(reverseData[index] / reverseData[index - 1]);
        };
        newData = newData.map(v => {
            assetCost = v * assetCost;
            return v * assetCost;
        }).reverse();


        setAllData({
            series: [{
                name,
                data: newData
            }],
            categories
        });
        setRange(categories.length);
        dispatch(setCurrentPrice(newData.reduce((p, c) => c || p)));
        dispatch(setStartingPrice(newData[0]));
        setColor(newData[0] <= newData.reduce((p, c) => c || p) ? '#5ac53b' : '#ec5e2a');
    };

    useEffect(() => {
        if (isRealtime && term === '1D') realtimeId = setTimeout(async () => {
            await getOneDayData();
        }, 5000);
    }, [isRealtime, allData]);

    useEffect(() => {
        setIsLoaded(false);

        if (term === '1D') getOneDayData();
        else {
            clearTimeout(realtimeId);
            getData();
        }


    }, [term, symbol]);

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
                                        id: 'stock-chart',
                                        animations: { enabled: false },
                                        type: 'line',
                                        height: 300,
                                        parentHeightOffset: 0,
                                        zoom: { enabled: false },
                                        events: {
                                            mouseMove: (e, chartContext, config) => {
                                                if (config.dataPointIndex >= 0) {
                                                    // setIsTooltip(!!allData.series[0].data[config.dataPointIndex])
                                                    dispatch(setCurrentPrice(allData.series[0].data.slice(0, config.dataPointIndex + 1).reduce((p, c) => c || p) || allData.series[0].data[allData.series[0].data.length - 1]));
                                                }
                                                dispatch(setIsHovering(true));
                                            },
                                            mouseLeave: () => {
                                                dispatch(setCurrentPrice(allData.series[0].data.reduce((p, c) => c || p)));
                                                dispatch(setIsHovering(false));
                                                // setIsTooltip(true)
                                            }
                                        },
                                        toolbar: { show: false },
                                        // sparkline: { enabled: true }
                                    },
                                
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
                        />
                    </div>
                </>
                : <PlaceHolder />
            }
        </div>
    );
};

export default DrawChart;
