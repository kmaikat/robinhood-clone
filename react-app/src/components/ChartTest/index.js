import '../../stylesheets/chart.css'
import ChartDrawing from '../ChartDrawing'
import Search from '../Search'
import SmallChart from '../SmallChart'

const ChartTest = () => {
    const sample = ['aapl', 'googl', 'coty', 'nio']
    return (
      <div style={{padding: '1rem'}}>
        <Search />
        <ChartDrawing />
        {
          sample.map(symbol => <SmallChart key={symbol} symbol={symbol} />)
        }
      </div>
    )
}

export default ChartTest
