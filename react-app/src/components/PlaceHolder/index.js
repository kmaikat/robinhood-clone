import styles from './placeholder.module.css'

const PlaceHolder = ({ height }) => {
    console.log(height)
    return <div className={styles.placeholder} style={{height: `${height || 325}px`}}><i class="fa-solid fa-spinner"></i></div>
}

export default PlaceHolder
