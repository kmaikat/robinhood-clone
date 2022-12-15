import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateNicknameUsername } from '../../store/session'
import ProfileFrame from './ProfileFrame'
import styles from './profile.module.css'

const ModalProfile = ({ setIsModalOn, setIsModalMessage, setIsErrorOccured }) => {
    const dispatch = useDispatch()
    const modal = useRef(null)
    const inputUsername = useRef(null)
    const inputNickname = useRef(null)
    const user = useSelector(state => state.session.user)
    const [nickname, setNickname] = useState(user.nickname)
    const [username, setUsername] = useState(user.username)
    const [nickNameError, setNickNameError] = useState('')
    const [userNameError, setUserNameError] = useState('')
    const [showNickNameError, setShowNickNameError] = useState(false)
    const [showUserNameError, setShowUserNameError] = useState(false)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        setTimeout(() => (modal.current.className=`${styles.editProfileContainer} ${styles.moveUp}`), 0)

        return () => {document.body.style.overflow = ''}
    }, [])

    useEffect(() => {
        if(nickname.length < 1 || nickname.length > 20)
            setNickNameError('Your nickname must be between 1 and 20 characters long.')
        else if(/[^a-zA-Z\s\'\-]+/.test(nickname))
            setNickNameError('Your nickname can only have letters, spaces, \', and -.')
        else setNickNameError('')

        if(username.length < 3 || username.length > 20)
            setUserNameError('Your username must be between 3 and 20 characters long.')
        else if(/[^a-zA-Z\d\_]+/.test(username))
            setUserNameError('Your username can only have letters, numbers, and underscores.')
        else setUserNameError('')

    }, [nickname, username])

    useEffect(() => {
        if(showNickNameError)
            inputNickname.current.className=`${styles.inputContainer} ${styles.error}`
        else inputNickname.current.className=styles.inputContainer

        if(showUserNameError) inputUsername.current.className=`${styles.inputContainer} ${styles.error}`
        else inputUsername.current.className=styles.inputContainer

    }, [showNickNameError, showUserNameError])

    const handleSubmit = async () => {
        if(!nickNameError && !userNameError){
            const res = await dispatch(updateNicknameUsername(nickname, username))
            setIsErrorOccured(res)

            if(res){
                inputNickname.current.className = styles.inputNames
                inputUsername.current.className = styles.inputNames
                setShowNickNameError(false)
                setShowUserNameError(false)
                setIsModalOn(false)
            }

            setIsModalMessage(true)
        }
        else{
            if(nickNameError){
                setShowNickNameError(true)
                inputNickname.current.className=`${styles.inputNames} ${styles.error}`
            }
            if(userNameError){
                setShowUserNameError(true)
                inputUsername.current.className=`${styles.inputNames} ${styles.error}`
            }
        }
    }

    const closeModal = e => {
        setIsModalOn(false)
    }

    return (
        <div
            className={styles.modal}
            onMouseDown={closeModal}
        >
            <div ref={modal} className={styles.editProfileContainer} onMouseDown={e => e.stopPropagation()}>
                <div className={styles.editProfile}>
                    <div>Edit Profile</div>
                    <div style={{cursor: 'pointer'}} onClick={closeModal}><i className="fa-solid fa-xmark"></i></div>
                </div>
                <div className={styles.profilePictureContainer}>
                    <ProfileFrame setIsModalMessage={setIsModalMessage} setIsErrorOccured={setIsErrorOccured} />
                </div>
                <div style={{marginBottom: 0}} className={styles.namesContainer}>Nickname</div>
                <div>You'll see this at the top of your profile.</div>
                <div className={styles.inputContainer}  ref={inputNickname}>
                    <input type='text' className={styles.inputNames} value={nickname} onChange={e => setNickname(e.target.value)} />
                </div>
                <div className={styles.errorMessage}>{showNickNameError && nickNameError}</div>
                <div className={styles.namesContainer}>Username</div>
                <div className={styles.inputContainer} ref={inputUsername} >
                    <input type='text' className={styles.inputNames} value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className={styles.errorMessage}>{showUserNameError && userNameError}</div>
                <div className={styles.submitContainer}><button className={styles.saveChanges} onClick={handleSubmit}>Save Changes</button></div>
            </div>
        </div>
    )

}

export default ModalProfile
