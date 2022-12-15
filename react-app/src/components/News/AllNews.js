import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addArticlesToStore, addArticleToDb, getArticlesFromDb, deleteArticleFromDb } from "../../store/news";
import "../../stylesheets/AllNews.css"

const AllNews = () => {
    const [articles, setArticles] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    const likedArticles = useSelector(state => state.news)
    const dispatch = useDispatch()

    const handleAddToggle = (e, article) => {
        e.preventDefault()
        e.stopPropagation()
        const submission = {
            "user_id": currentUser.id,
            "title": article.title,
            "source": article.source,
            "image": article.image,
            "article_link": article.url
        }
        dispatch(addArticleToDb(submission))
        setIsLiked(!isLiked)
    }

    const handleDeleteToggle = (e, article) => {
        e.preventDefault()
        e.stopPropagation()

        const likedArticle = likedArticles[article.url]
        dispatch(deleteArticleFromDb(likedArticle))
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        dispatch(getArticlesFromDb())
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
                                        {article.url in likedArticles ? <i className="fa-solid fa-bookmark" id="news-saved" onClick={e => handleDeleteToggle(e, article)} /> : <i className="fa-regular fa-bookmark" id="news-not-saved" onClick={e => handleAddToggle(e, article)} />}
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

//
export default AllNews
