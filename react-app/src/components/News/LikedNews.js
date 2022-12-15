import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticleFromDb, getArticlesFromDb } from "../../store/news";
import "../../stylesheets/SymbolNews.css"

const LikedNews = () => {
    const [articles, setArticles] = useState([])
    const likedArticles = useSelector(state => state.news)
    const dispatch = useDispatch()

    const handleDeleteToggle = (e, article) => {
        e.preventDefault()
        e.stopPropagation()

        const likedArticle = likedArticles[article.article_link]
        dispatch(deleteArticleFromDb(likedArticle))
    }

    useEffect(() => {
        dispatch(getArticlesFromDb())
        fetch("/api/news/liked").then(r => r.json()).then(r => setArticles(r));
    }, [])

    return (
        <div className="news-container">
            {articles.map(article => {
                return (
                    <a href={article.url} target="_blank" rel="noopener noreferrer" >
                        <div id="all-news-container">
                            <div id="all-news-inner-container">
                                <div id="all-news-source-container">
                                    <div id="all-news-source">
                                        {article.source}
                                        <div id="profile-liked-news-remove-button-container">
                                            <i className="fa-solid fa-x" id="profile-liked-news-remove-button" onClick={e => handleDeleteToggle(e, article)} />
                                        </div>
                                    </div>
                                </div>
                                <div id="all-news-bottom-half">
                                    <div id="all-news-title-and-tickers">
                                        <div id="all-news-article-title">
                                            {article.title}
                                        </div>
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

export default LikedNews;
