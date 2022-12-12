import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/AllNews.css"

const AllNews = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch("/api/news").then(r => r.json()).then(r => setArticles(r))
    }, [])
    return (
        <div>
            {articles.map(article => {
                return (
                    <a href={article.url} target="_blank" rel="noopener noreferrer" >
                        <div>
                            <div>
                                <div>
                                    {article.source}
                                </div>
                                <div>
                                    {article.title}
                                </div>
                                <ul>
                                    {article.tickers?.map(ticker => <li key={ticker}>{ticker}</li>)}
                                </ul>
                            </div>
                            <div>
                                <div>
                                    <img src={article.image} />
                                </div>
                            </div>
                        </div>
                    </a>
                )
            })}
        </div>
    )
}

export default AllNews
