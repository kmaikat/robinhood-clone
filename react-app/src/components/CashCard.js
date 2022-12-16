const CashCard = () => {
    return (
        <div className="cashcard-container">
            <div className="cashcard-section-one">
                <div className="cashcard-section-one-headline ele1">
                    <div className="cashcard-section-one-headline-h1">
                        <span style={{ color: "#c3f53c" }}>This is what investing looks like</span>
                    </div>
                </div>

                <div className="cashcard-section-one-headline ele2">
                    <div className="cashcard-section-one-headline-h2">
                        <span style={{ color: "#c3f53c" }}>Turn purchases into stocks and crypto with the Robinhood CashCard.</span>
                    </div>
                </div>
                <div className="cashcard-section-one-headline ele3">
                    <button>Sign up now</button>
                </div>
            </div>
            <div className="cashcard-section-two">
                <div className="cashcard-section-two-headline">
                    <span style={{ color: "black" }}>It is the debit card with weekly bonuses that helps you invest as you spend.</span>
                </div>
            </div>
            <div className="cashcard-section-three">
                <div className="cashcard-section-three-content-1">
                    <div className="cashcard-section-three-itemblock">
                        <img className="cashcard-section-three-item" src="https://v.fastcdn.co/u/62ba1c13/61243602-0-rhyui-1.png"/>
                    </div>
                    <div className='cashcard-section-three-headline'>
                        <div className="cashcard-section-three-itemblock-title">
                            <span style={{ color: "#c3f53c" }}>Earn stock and crypto rewards</span>
                        </div>
                        <div className="cashcard-section-three-itemblock-label1">
                            <span style={{ color: "#c3f53c" }}>Earn a 10-100% bonus on your weekly round-ups. And it’s all invested in your choice of stocks and crypto.</span>
                        </div>
                        <div className="cashcard-section-three-itemblock-label2">
                            <span style={{ color: "#c3f53c" }}>
                            Round-ups are capped at $100 per week and bonuses are capped at $10 per week.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cashcard-section-three-content-2">
                    <div className='cashcard-section-three-content-2-headline'>
                        <div className="cashcard-section-three-content-2-title">
                            <span style={{ color: "#c3f53c" }}>Cash back at your favorite brands</span>
                        </div>
                        <div className="cashcard-section-three-content-2-label">
                            <span style={{ color: "#c3f53c" }}>Earn cash back when you spend on offers from participating brands. No activation required.</span>
                        </div>
                        
                    </div>
                    <div className="cashcard-section-three-itemblock">
                        <img className="cashcard-section-three-item" src="https://v.fastcdn.co/u/62ba1c13/61243633-0-RHYillo1.png"/>
                    </div>

                </div>
                <div className="cashcard-section-three-content-1">
                    <div className="cashcard-section-three-itemblock">
                        <img className="cashcard-section-three-item" src="https://v.fastcdn.co/u/62ba1c13/61243648-0-RHYillo2.png"/>
                    </div>
                    <div className='cashcard-section-three-headline'>
                        <div className="cashcard-section-three-itemblock-title">
                            <span style={{ color: "#c3f53c" }}>Invest with every paycheck</span>
                        </div>
                        <div className="cashcard-section-three-itemblock-label1">
                            <span style={{ color: "#c3f53c" }}>Automatically invest part of every paycheck in your choice of stocks and crypto.Plus, get paid up to two days early with direct deposit.</span>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="cashcard-section-four">
                <div className="cashcard-section-three-content">
                    <h1>No hidden fee</h1>
                    <p>No in-your-face fees, either. When you use your Robinhood Cash Card, there are never monthly fees, in-network ATM fees, or overdraft fees—and you won't need to maintain a minimum balance.</p>
                </div>
            </div>
        </div>
    )
}

export default CashCard
