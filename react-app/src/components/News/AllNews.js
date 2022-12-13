import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/AllNews.css"

const AllNews = () => {
    const [articles, setArticles] = useState([])
    const [isLiked, setIsLiked] = useState(false)

    const handleToggle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        fetch("/api/news").then(r => r.json()).then(r => setArticles(r))
    }, [])
    return (
        <div className="news-container">
            <div id="news-heading-container">
                <div className="news-heading">News</div>
            </div>
            {articles.map(article => {
                return (
                    <a href={article.url} target="_blank" rel="noopener noreferrer" >
                        <div id="all-news-container">
                            <div id="all-news-inner-container">
                                <div id="all-news-source-container">
                                    <div id="all-news-source">
                                        {article.source}
                                        {isLiked ? <i className="fa-solid fa-bookmark" id="news-saved" onClick={handleToggle}/> : <i className="fa-regular fa-bookmark" id="news-not-saved" onClick={handleToggle}/>}
                                    </div>
                                </div>
                                <div id="all-news-bottom-half">
                                    <div id="all-news-title-and-tickers">
                                        <div id="all-news-article-title">
                                            {article.title}
                                        </div>
                                        <ul id="all-news-ticker-container">
                                            {article.tickers.slice(0, 3)?.map(ticker => <li key={ticker}>{ticker}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <div>
                                            <div className="news-image-container">
                                                <img src={article.image} />
                                            </div>
                                        </div>
                                    </div>
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
