import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSymbol } from '../../store/ticker'
import { Link } from 'react-router-dom'
import styles from './style.module.css'

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const [showSearchRes, setShowSearchRes] = useState(false)
  const [isSearchLoaded, setIsSearchLoaded] = useState(false)
  const [searchRes, setSearchRes] = useState([])
  const [isHoveringOnSearchRes, setIsHoveringOnSearchRes] = useState(false)
  const dispatch = useDispatch()

  const searchInput = e => {
    if(/^[A-Za-z]*$/.test(e.target.value))
      setKeyword(e.target.value)
  }

  const clearSearch = () => {
    if(!isHoveringOnSearchRes)
      setShowSearchRes(false)
  }

  const searchResStyling = (str, word) => {
    const idx = str.toLowerCase().indexOf(word.toLowerCase())
    const len = word.length

    return idx >= 0 ? (
      <><span>{str.substring(0, idx)}</span><span className={styles.searchKeyword}>{str.substring(idx, idx + len)}</span><span>{str.substring(idx + len)}</span></>
    ) : <span>{str}</span>
  }

  useEffect(() => {
      setIsSearchLoaded(false)

      if(keyword.length){
        setShowSearchRes(true)
        const url = '/api/stock/search/' + keyword
        fetch(url)
            .then(res => res.json())
            .then(res => {
            setSearchRes(res)
            setIsSearchLoaded(true)
        })
      }else{
        setShowSearchRes(false)
        setSearchRes([])
      }

  }, [keyword])

  return (
      <div className={styles.searchContainer}>
        <input
          type='text'
          onChange={searchInput}
          onBlur={clearSearch}
          onFocus={() => {setShowSearchRes(!!(searchRes.length || keyword.length))}}
          value={keyword}
          className={styles.searchBar}
        />
        <div className={styles.iconContainer}><i className="fa-solid fa-magnifying-glass fa-lg"></i></div>
        {
          showSearchRes &&
          <ul
            className={styles.searchResult}
            onMouseEnter={() => setIsHoveringOnSearchRes(true)}
            onMouseLeave={() => setIsHoveringOnSearchRes(false)}
          >
            {
            !!searchRes.length ?
              searchRes.map(res =>
                <Link to={`/stocks/${res.symbol}`}>
                  <li
                      className={styles.resultItem}
                      key={res.symbol}
                      onClick={() => {
                        dispatch(setSymbol(res.symbol, res.name))
                        setIsHoveringOnSearchRes(false)
                        setKeyword('')
                        setSearchRes([])
                      }}
                  >
                    <div className={styles.symbolContainer}>{searchResStyling(res.symbol, keyword)}</div>
                    <div className={styles.companyContainer}>{searchResStyling(res.name, keyword)}</div>
                  </li>
                </Link>) :
                isSearchLoaded && <li style={{padding: '4px 1rem'}}>No search result</li>
            }
          { !isSearchLoaded && <li style={{padding: '4px 1rem'}}>Loading...</li> }
        </ul>
      }
    </div>
  )

}

export default Search
