import styles from '../modules/Card.module.css';
import Track from './Track';
function Card({name, artist, album, functionHandler}: Track & {functionHandler : (track : Track)=> void}): JSX.Element {
    return (
        <div className={styles.card}>
            <p className={styles.title}>{name}</p>
            <p>{artist} | {album}</p>
            <button onClick={()=>functionHandler({name, artist, album})}> </button>
        </div>
    )
}


export default Card;