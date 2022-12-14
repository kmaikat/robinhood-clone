import { useSelector } from "react-redux"
import { useState, useRef, useEffect } from 'react'

import AppMainNavBar from "../AppMainNavBar/AppMainNavBar"
import ModalProfile from "./ModalProfile"
import ProfileFrame from "./ProfileFrame"
import styles from './profile.module.css'

import { amountFormatter } from "../../util/util2"

const ProfilePage = () => {
    const user = useSelector(state => state.session.user)
    const message = useRef(null)
    const [isModalOn, setIsModalOn] = useState(false)
    const [isModalMessage, setIsModalMessage] = useState(false)
    let messageTimer = null

    useEffect(() => {
        if(isModalMessage){
            clearTimeout(messageTimer)
            setTimeout(() => {
                message.current.className = `${styles.modalMessage} ${styles.modalMessageOn}`
                messageTimer = setTimeout(closeMessage, 10000)
            })
        }

    }, [isModalMessage])

    const closeMessage = () => {
        clearTimeout(messageTimer)
        setIsModalMessage(false)
    }

    return (
        <>
            {isModalOn && <ModalProfile user={user} setIsModalOn={setIsModalOn} setIsModalMessage={setIsModalMessage} />}
            <AppMainNavBar />
            <div className={styles.mainContainer}>
                <div className={styles.profileContainer}>
                    <div className={styles.profile}>
                        <div style={{display: 'flex'}}>
                            <ProfileFrame setIsModalMessage={setIsModalMessage} />
                            <div className={styles.username}>
                                <div className={styles.name}>
                                    {user.nickname}
                                </div>
                                <div className={styles.joined}>
                                    {`@${user.username} · `} <span style={{color: 'rgb(106, 114, 120)'}}>joined {`${user.joinedAt.split(' ')[3]}`}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => setIsModalOn(true)}>Edit Profile</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.amount}>{amountFormatter(user.buyingPower)}</div>
                    <div>Total in Rockethood</div>
                </div>
            </div>
            {isModalMessage && <div ref={message} className={styles.modalMessage}>
                <div>
                    <i className="fa-solid fa-circle-check" style={{marginRight: '1rem'}}></i>
                    Change saved successfully
                </div>
                <div className={styles.closeBtn} onClick={() => setIsModalMessage(false)}>
                    <i className="fa-regular fa-xmark"></i>
                </div>
            </div>}
        </>
    )
}

export default ProfilePage
