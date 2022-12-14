import { useSelector } from "react-redux"
import { useState } from 'react'

import AppMainNavBar from "../AppMainNavBar/AppMainNavBar"
import ModalProfile from "./ModalProfile"
import ProfileFrame from "./ProfileFrame"
import styles from './profile.module.css'

import { amountFormatter } from "../../util/util2"

const ProfilePage = () => {
    const user = useSelector(state => state.session.user)
    const [isModalOn, setIsModalOn] = useState(false)

    return (
        <>
            {isModalOn && <ModalProfile user={user} setIsModalOn={setIsModalOn}/>}
            <AppMainNavBar />
            <div className={styles.mainContainer}>
                <div className={styles.profileContainer}>
                    <div className={styles.profile}>
                        <div style={{display: 'flex'}}>
                            <ProfileFrame id={user.id} imageUrl={user.imageUrl} />
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
        </>
    )
}

export default ProfilePage
