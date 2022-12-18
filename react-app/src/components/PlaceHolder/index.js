import styles from './placeholder.module.css'

const PlaceHolder = ({ height, isNoData = false }) => {
    return (
        <div className={styles.placeholder} style={{height: `${height || 329}px`}}>
            {isNoData ? 'No data available' : <i className={`fa-solid fa-spinner ${styles.loading}`}></i>}
        </div>
    )
}

export default PlaceHolder
