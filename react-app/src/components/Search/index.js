import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSymbol } from '../../store/ticker'
import styles from './style.module.css'

const Search = () => {
    const [keyword, setKeyword] = useState('')
    const [showSearchRes, setShowSearchRes] = useState(false)
    const [isSearchLoaded, setIsSearchLoaded] = useState(false)
    const [searchRes, setSearchRes] = useState([])
    const dispatch = useDispatch()

    const searchInput = e => {
        setKeyword(e.target.value)
    }

    // const clearSearch = () => {
    //     setShowSearchRes(false)
    // }

    useEffect(() => {
        setIsSearchLoaded(false)
        if(keyword.length){
            const url = '/api/stock/search/' + keyword
            fetch(url)
                .then(res => res.json())
                .then(res => {
                setSearchRes(res)
                setShowSearchRes(true)
                setIsSearchLoaded(true)
            })
        }else setShowSearchRes(false)

    }, [keyword])

    return (
        <div className='searchContainer'>
        <input
          type='text'
          onChange={searchInput}
        //   onBlur={clearSearch}
          onFocus={() => {if(searchRes.length) setShowSearchRes(true)}}
          value={keyword}
          className={styles.searchBar}
        />
        {
          showSearchRes &&
          <ul className={styles.searchResult}>
            {
            !!searchRes.length ?
              searchRes.map(res =>
                <li
                    className={styles.resultItem}
                    key={res.symbol}
                    onClick={() => {
                      dispatch(setSymbol(res.symbol, res.name))
                      setKeyword('')
                      setSearchRes([])
                    }}
                >
                    {`${res.symbol} - ${res.name}`}</li>) :
                <li>no search result</li>
            }
            { !isSearchLoaded && <li>Loading...</li> }
          </ul>
        }
      </div>
    )

}

export default Search
