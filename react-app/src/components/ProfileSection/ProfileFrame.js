import { useSelector, useDispatch } from "react-redux"
import { uploadProfileImage, deleteProfileImage } from "../../store/session"
import { useRef, useState } from 'react'
import styles from './profile.module.css'

const ProfileFrame = ({ setIsModalMessage, setIsErrorOccured }) => {
    const dispatch = useDispatch()
    const uploadBtn = useRef(null)
    const user = useSelector(state => state.session.user)
    const [isLoading, setIsLoading] = useState(false)

    const handleUpload = e => {
        if(!e.target.files) return

        setIsLoading(true)

        const file = e.target.files[0]

        dispatch(uploadProfileImage(file))
            .then(res => {
                setIsErrorOccured(res)
                setIsModalMessage(true)
                setIsLoading(false)
            })
    }

    const handleRemove = () => {
        setIsLoading(true)
        dispatch(deleteProfileImage())
            .then(res => {
                setIsErrorOccured(res)
                setIsModalMessage(true)
                setIsLoading(false)
            })
    }

    const loading = () => {
        return (
            <div className={styles.addProfile} style={{cursor: 'wait'}}>
                <i className={`fa-solid fa-spinner ${styles.loading}`}></i>
            </div>
        )
    }

    return (
        <div className={styles.profilePictureFrame}>
            {
                user.imageUrl ?
                <>
                    <div className={styles.profileImage}><img src={user.imageUrl} alt='profile' /></div>
                    {
                        isLoading ? loading() :
                        <div className={styles.addProfile} onClick={handleRemove}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    }
                </> :
                <>
                    <svg className={styles.noProfile} width="48" height="48" viewBox="0 0 48 48" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM15.2821 29.1225C14.372 27.5072 15.7973 25.7987 17.6514 25.7987H30.6128C32.4669 25.7987 33.8922 27.5072 32.982 29.1225C31.2366 32.2202 27.9272 34.3108 24.1321 34.3108C20.3369 34.3108 17.0276 32.2202 15.2821 29.1225ZM31.4105 18.9579C31.4105 20.4728 30.1885 21.7009 28.6811 21.7009C27.1737 21.7009 25.9517 20.4728 25.9517 18.9579C25.9517 17.4429 27.1737 16.2148 28.6811 16.2148C30.1885 16.2148 31.4105 17.4429 31.4105 18.9579ZM19.5824 21.7009C21.0899 21.7009 22.3119 20.4728 22.3119 18.9579C22.3119 17.4429 21.0899 16.2148 19.5824 16.2148C18.075 16.2148 16.853 17.4429 16.853 18.9579C16.853 20.4728 18.075 21.7009 19.5824 21.7009Z"></path></svg>
                        {
                            isLoading ? loading() :
                            <>
                                <input type='file' hidden id='upload-btn' accept="image/png, image/gif, image/jpeg" ref={uploadBtn} onChange={handleUpload}/>
                                <label htmlFor='upload-btn' className={styles.addProfile}>
                                    {isLoading ? <i className={`fa-solid fa-spinner ${styles.loading}`}></i> : <i className="fa-solid fa-plus"></i>}
                                </label>
                            </>
                        }
                </>
            }
        </div>
    )
}

export default ProfileFrame
