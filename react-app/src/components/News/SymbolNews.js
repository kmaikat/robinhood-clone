import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addArticleToDb, deleteArticleFromDb, getArticlesFromDb } from "../../store/news";
import "../../stylesheets/AllNews.css";
import "../../stylesheets/SymbolNews.css";

const SymbolNews = () => {
    const [articles, setArticles] = useState([]);
    const [isLiked, setIsLiked] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    const likedArticles = useSelector(state => state.news)
    const dispatch = useDispatch()
    const { symbol } = useParams();

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
        setArticles([])
        fetch(`/api/news/${symbol}`).then(r => r.json()).then(r => setArticles(r));
    }, [symbol]);

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
                                    <div id="all-news-bottom-half" className="symbol-news-bottom-half">
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
                                        <div id="all-news-article-like">
                                            {article.url in likedArticles ? <i className="fa-solid fa-bookmark" id="news-saved" onClick={e => handleDeleteToggle(e, article)} /> : <i className="fa-regular fa-bookmark" id="news-not-saved" onClick={e => handleAddToggle(e, article)} />}
                                        </div>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
};

export default SymbolNews;
