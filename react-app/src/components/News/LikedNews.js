import React, { useEffect, useState} from "react";
import "../../stylesheets/SymbolNews.css"

const LikedNews = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch("/api/news/liked").then(r => r.json()).then(r => setArticles(r));
    }, [])

    return (
        <div className="news-container">
            <div id="news-heading-container">
                <div className="news-heading">News</div>
            </div>
            {articles.map(article => {
                return (
                    <a href={article.url} target="_blank" rel="noopener noreferrer" >
                        <div id="stock-news-container">
                            <div id="stock-news-inner-container">
                                <div id="stock-news-source-container">
                                    <div id="all-news-source">
                                        {article.source}
                                    </div>
                                    <div id="all-news-bottom-half">
                                        <div id="all-news-title-and-tickers">
                                            <div id="all-news-article-title">
                                                {article.title}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="stock-news-image-container">
                                    <img src={article.image} />
                                </div>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    )
}

export default LikedNews;
