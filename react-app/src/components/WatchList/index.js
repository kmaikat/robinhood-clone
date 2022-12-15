import * as watchlistAction from '../../store/watchlist';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NewWatchList from './watchlist_form';
import UpdateButton from './Update/UpdateButton';
import SmallChart from '../SmallChart';
// import StockPrice from './StockPrice';
import { Modal } from "../Modals/Modal";
// import UpdateWatchlistForm from "./Update/watchlist_updateForm";
// import UpdateWatchlistForm from "./Update/watchlist_updateForm";
import { Link } from 'react-router-dom';
import RemoveStockBtn from './Delete/RemoveStock.js';
import './index.css';

const WatchList = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.watchlists);
    const [openForm, setOpenForm] = useState(false);
    const [openings, setOpenings] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        show: false,
        content: <></>
    });

    useEffect(() => {
        dispatch(watchlistAction.fetchUserWatchlists())
    }, [dispatch]);

    const createWatchlist = () => {
        setOpenForm(true);
    }
    if (!data.watchlists) {
        return (
            <div className='watchlist-container'>
                <div className='watchlist-header'>
                    <div>
                        <div>Lists</div>
                    </div>
                    <div>
                        <button>+</button>
                    </div>
                </div>
            </div>
        )
    }

    const watchlists = Object.values(data.watchlists);

    const handleClickBtn = (i) => () => {
        const newOpenings = {
            ...openings,
            [i]: !openings[i]
        };
        setOpenings(newOpenings);
    };


    return (
        <div className='watchlist-container'>
            <header>
                <div className='watchlist-header'>
                    <div className='watchlist-header-label'>Lists</div>
                    <button className='btn-open btn-add watchlist-btn' onClick={createWatchlist}><i className="fa-solid fa-plus"></i></button>
                </div>
            </header>
            {openForm && <NewWatchList openForm={openForm} setOpenForm={setOpenForm} />}
            <div>
                {watchlists && watchlists.map(
                    (watchlist, i) => (
                        <div className='watchlist-content' key={watchlist.id}>
                            <div className='watchlist-content-header' onClick={handleClickBtn(i)}>
                                <div className='watchlist-wrapper-head'>
                                    <div className='watchlist-icon'>
                                        <img src="https://cdn.robinhood.com/emoji/v0/128/1f4a1.png"/>
                                    </div>
                                    <div className='watchlist-name'>
                                        {watchlist.name}
                                    </div>
                                </div>
                                <div className='watchlist-btn-container'>
                                    {modalInfo.show && (
                                        <Modal>
                                            {modalInfo.content}
                                        </Modal>
                                    )}
                                    <UpdateButton i={i} watchlist={watchlist} openModal={(content) => setModalInfo({ show: true, content })} closeModal={() => setModalInfo({ show: false })} />
                                    <button className='btn-openstock watchlist-btn'>
                                        <i className={`fa-solid fa-angle-up ${openings[i] ? "watchlist-opening" : "watchlist-closing"}`}></i>
                                    </button>
                                </div>
                            </div>
                            {openings[i] &&
                                <div className='watchlist-stocks-container'>
                                    {watchlist.watchlist_stocks.length > 0 &&
                                        watchlist.watchlist_stocks.map(stock => (
                                            <div className='watchlist-minigraph'>
                                                {/* <Link to={`/stocks/${stock.stock_symbol}`}> */}
                                                    <SmallChart symbol={stock.stock_symbol} />
                                                {/* </Link> */}
                                                <RemoveStockBtn symbol={stock.stock_symbol} watchlist={watchlist} stockId={stock.id} />
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default WatchList
