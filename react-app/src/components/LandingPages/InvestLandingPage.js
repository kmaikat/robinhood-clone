import LandingPageNavbar from "../LandingPageNavbar";
import phoneSvg from "../../assets/phone.svg";
import signupImage from "../../assets/signup.png";
import "../../stylesheets/InvestLandingPage.css";
import { useHistory } from "react-router-dom";
function InvestLandingPage() {
    const history = useHistory();
    return (
        <div className="investing-landing-page-container">
            <div className="investing-landing-page-promo1">
                <div className="investing-landing-page-promo1-inner-container">
                    <img style={{ marginTop: "5.2rem" }} src={signupImage} />
                    <div className="investing-promo-1-content">
                        <h2>Investing doesn’t have to be that hard.</h2>
                        <p>Access stocks, ETFs, and more. Oh, and no commission fees. That’s right.
                            Zero. Nada. Zilch. Your first can even be bought by yourself!</p>
                        <button onClick={() => history.push("/sign-up")}>Get Started</button>
                        <p id="investing-page-disclaimer">Stocks not actually offered, Rockethood is not a real company.</p>
                    </div>
                </div>
            </div>
            <div className="investing-landing-page-promo2">
                <div className="invest-landing-page-promo2-inner-container">
                    <div className="investing-landing-page-promo2-text">
                        <h2 style={{ backgroundColor: "#d8ff6d", width: "fit-content" }}>Stocks</h2>
                        <h2>Invest in your favorite companies</h2>
                        <p>With thousands of stocks to choose from and Fractional Shares, you can put in as little as $1 towards the companies that could potentially add value to you and your future.</p>
                    </div>
                    <img src={phoneSvg} id="phone-svg" />
                </div>
            </div>
        </div>
    );
}

export default InvestLandingPage;