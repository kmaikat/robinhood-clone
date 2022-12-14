import styles from './placeholder.module.css'

const PlaceHolder = ({ height }) => {
    return <div className={styles.placeholder} style={{height: `${height || 329}px`}}><i className={`fa-solid fa-spinner ${styles.loading}`}></i></div>
}

export default PlaceHolder
