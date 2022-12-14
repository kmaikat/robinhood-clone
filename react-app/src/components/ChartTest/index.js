import '../../stylesheets/chart.css'
// import ChartDrawing from '../ChartDrawing'
// import Search from '../Search'
// import { useState } from 'react'
import RenderChart from '../WatchList/RenderChart'

const ChartTest = () => {
  const samples = ['AAPL', 'GOOGL', 'COTY']

  return (
    <div style={{padding: '1rem'}}>
      {samples.map(ticker => <RenderChart key={ticker} symbol={ticker} />)}
    </div>
  )
}

export default ChartTest
