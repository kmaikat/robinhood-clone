const ADD_TO_NEWS = "news/add"
const REMOVE_FROM_NEWS = "news/delete"
const SEED_NEWS = "news/read"

export const addArticlesToStore = articles => {
    return {
        type: SEED_NEWS,
        articles
    }
}

export const addArticleToStore = article => {
    return {
        type: ADD_TO_NEWS,
        article
    }
}

export const removeArticleFromStore = article => {
    return {
        type: REMOVE_FROM_NEWS,
        article
    }
}

export const getArticlesFromDb = () => async dispatch => {
    const response = await fetch(`/api/news/liked`)
    if (response.ok) {
        const articles = await response.json()
        dispatch(addArticlesToStore(articles))
    }
}

export const addArticleToDb = article => async dispatch => {
    const repsonse = await fetch("/api/news/liked", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    })

    if (repsonse.ok) {
        const article = await repsonse.json()
        dispatch(addArticleToStore(article))
    }
}

export const deleteArticleFromDb = article => async dispatch => {
    const repsonse = await fetch(`/api/news/liked/${article.id}`, {
        method: "DELETE"
    })
    if (repsonse.ok) {
        dispatch(removeArticleFromStore(article))
    }
}

const newsReducer = (state = {}, action) => {
    switch (action.type) {
        case SEED_NEWS: {
            const newState = { ...state }
            for (const article of action.articles) {
                newState[article["article_link"]] = article
            }
            return newState
        }
        case ADD_TO_NEWS: {
            const newState = { ...state }
            newState[action.article["article_link"]] = action.article
            return newState
        }

        case REMOVE_FROM_NEWS: {
            const newState = { ...state }
            delete newState[action.article["article_link"]]
            return newState
        }
        default:
            return state
    }
}

export default newsReducer
