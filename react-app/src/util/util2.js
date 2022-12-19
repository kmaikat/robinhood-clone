const storeData = async (ticker, unit) => {
    const url = 'https://www.alphavantage.co/query';
    const func = unit === 'daily' ? 'TIME_SERIES_DAILY_ADJUSTED' : 'TIME_SERIES_INTRADAY';
    const res = await fetch('/api/stock/get-key');
    const { apikey } = await res.json();

    let fullUrl = `${url}?function=${func}&symbol=${ticker}&outputsize=full&apikey=${apikey}`;
    if (unit === 'minutely') fullUrl += '&interval=5min';

    let response;
    let allData;

    const series = {
        data: [],
        categories: [],
        date: new Date().toISOString().split('T')[0],
    };

    try {
        response = await fetch(fullUrl);
        allData = await response.json();
        if ('Error Message' in allData) throw new Error();

        const prices = Object.entries(allData[unit === 'daily' ? "Time Series (Daily)" : "Time Series (5min)"]);

        if (unit === 'daily')
            for (let i = prices.length - 1; i >= 0; i--) {
                if (prices[i][1]["8. split coefficient"] * 1 !== 1) series.data = series.data.map(p => p / prices[i][1]["8. split coefficient"]);
                series.data.push(prices[i][1]["4. close"] * 1);
                series.categories.push(prices[i][0]);
                // series.categories.push(labelFormatter(prices[i][0]))
            }
        else
            for (let i = prices.length - 1; i >= 0; i--) {
                const [hour, minute] = prices[i][0].split(' ')[1].split(':');
                const time = hour * 60 + minute * 1;

                if (minute[1] === '0' && time >= 570 && time <= 960) {
                    series.data.push(prices[i][1]["4. close"] * 1);
                    series.categories.push(prices[i][0]);
                    // series.categories.push(labelFormatter(prices[i][0]))
                }
            }
    } catch {
        sessionStorage.setItem('data', JSON.stringify(series));
    } finally {
        let result = JSON.parse(sessionStorage.getItem('data'));

        if (!result) result = {};
        if (!result[ticker]) result[ticker] = {};
        result[ticker][unit] = series;

        sessionStorage.setItem('data', JSON.stringify(result));
    }
};

// const allPrices = async ticker => {
//     const series = await getData(ticker, 'daily')

//     const data = {
//         data : [],
//         categories: [],
//     }

//     for(let i = (series.data.length - 1) % 5; i < series.data.length; i += 5){
//         data.data.push(series.data[i])
//         data.categories.push(series.categories[i])
//     }

//     return data
// }

export const getMinutelyPrices = async (ticker, t) => {
    const series = await getData(ticker, 'minutely');

    const res = {
        data: [],
        categories: []
    };

    if (t === '1W') {
        if (!series.data.length) return res;
        const latestDate = new Date(series.categories[series.categories.length - 1].split(' ')[0]);

        let idx = -1;
        let i = series.categories.length - 1;

        while (i >= 0 && idx === -1) {
            const thisDate = new Date(series.categories[i].split(' ')[0]);

            if (latestDate.getTime() > thisDate.getTime() && latestDate.getDay() === thisDate.getDay())
                idx = i + 1;
            else i--;
        }

        res.data = series.data.slice(idx);
        res.categories = series.categories.slice(idx);
    } else {
        series.categories.forEach((d, i) => {
            // const minute = d.split(':')[1].split(' ')[0]
            const minute = d.split(' ')[1].split(':')[1];

            if (minute === '00') {
                res.data.push(series.data[i]);
                res.categories.push(d);
            }
        });
    }

    return res;
};

export const getDailyPrices = async (ticker, t) => {
    const series = await getData(ticker, 'daily');

    const res = {
        data: [],
        categories: []
    };

    const today = new Date();
    let targetDate;

    switch (t) {
        case '5Y':
            targetDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()).getTime();
            break;
        case '1Y':
            targetDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()).getTime();
            break;
        case 'YTD':
            targetDate = new Date(today.getFullYear(), 0, 1).getTime();
            break;
        case '3M':
            targetDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()).getTime();
            break;
        default:
            return res;
    }

    let idx = -1;

    // if this company closed before target date, return empty data
    if (targetDate > new Date(series.categories[series.categories.length - 1]).getTime()) return res;
    else if (targetDate < new Date(series.categories[0]).getTime()) idx = 0;

    let start = 0;
    let end = series.categories.length - 1;

    // binary search to find target date
    while (idx === -1 && start <= end) {
        const mid = ~~((start + end) / 2);
        const thisDate = new Date(series.categories[mid]).getTime();

        if (
            targetDate === thisDate ||
            (
                mid > 0 &&
                targetDate < thisDate &&
                targetDate > new Date(series.categories[mid - 1]).getTime()
            )
        ) idx = mid;
        else if (targetDate < thisDate) end = mid - 1;
        else start = mid + 1;
    }

    const newSeries = {
        data: series.data.slice(idx),
        categories: series.categories.slice(idx)
    };

    if (newSeries.data.length < 300) return newSeries;

    for (let i = newSeries.data.length % 5; i < newSeries.data.length; i += 5) {
        res.data.push(newSeries.data[i]);
        res.categories.push(newSeries.categories[i]);
    }

    return res;
};

export const getOneDayPrices = async (ticker, miniSize = false) => {
    let res;
    let jsonData;
    try {
        res = await fetch('https://yahoo-finance-api.vercel.app/' + ticker);
        if (!res.ok) throw new Error();
        jsonData = await res.json();
    } catch {
        return { data: [], categories: [] };
    }
    const data = jsonData.chart.result[0].indicators.quote[0].close;
    const categories = jsonData.chart.result[0].timestamp;

    const now = new Date().getTime();
    const start = jsonData.chart.result[0].meta.currentTradingPeriod.regular.start * 1000;
    const end = jsonData.chart.result[0].meta.currentTradingPeriod.regular.end * 1000;
    const realtime = now >= start && now < end;

    const result = { data: [], categories: [], realtime };
    const offset = jsonData.chart.result[0].meta.currentTradingPeriod.regular.gmtoffset;

    if (!!categories)
        categories.forEach((t, i) => {
            if ((!(miniSize ? t % 600 : t % 300) || i === categories.length - 1) && data[i]) {
                result.data.push(data[i]);
                result.categories.push(new Date((t + offset) * 1000).toISOString().replace('T', ' '));
            }
        });
    else result.data.push(jsonData.chart.result[0].meta.regularMarketPrice);

    return result;
};


const getData = async (ticker, unit) => {
    const d = JSON.parse(sessionStorage.getItem('data'));

    if (!d || !d[ticker] || !d[ticker][unit] || d[ticker][unit].date !== new Date().toISOString().split('T')[0]) {
        await storeData(ticker, unit);
    }

    return JSON.parse(sessionStorage.getItem('data'))[ticker][unit];
};

export const labelFormatter = value => {
    if (!value) return;
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const [date, time] = value.split(' ');
    const [y, m, d] = date.split('-');

    let res = `${months[m - 1]} ${d}, `;

    if (!time) return res + y;

    let [h, minute] = time.split(':');
    const ampm = h * 1 < 12 ? 'AM' : 'PM';
    h = h * 1 > 12 ? h - 12 : h;

    return `${res} ${h}:${minute} ${ampm}`;
};

export const amountFormatter = value => {
    if (!value) return 0;
    const [first, second] = value.toFixed(2).split('.');
    let res = '';
    let cnt = 0;

    for (let i = first.length - 1; i >= 0; i--) {
        if (!(cnt % 3) && cnt)
            res = ',' + res;

        res = first[i] + res;
        cnt++;
    }

    return `$${isNaN(res.replaceAll(',', '')) ? 0 : res}.${second || '00'}`;
};

export const diffFormatter = (curr, start, isPositive) => {
    const valueDiff = Math.abs(curr - start);
    const percDiff = Math.abs(((curr - start) / start * 100)).toFixed(2);
    const sign = isPositive ? '+' : '-';

    return `${sign}${amountFormatter(valueDiff)} (${sign}${start ? percDiff : '0.00'}%)`;
};
