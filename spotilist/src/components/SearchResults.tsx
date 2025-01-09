import Card from "./Card";
import Track from "./Track";
import styles from '../modules/SearchResults.module.css';
function SearchResults({tracks, onAdd, searched}: {tracks: Track[], onAdd: (track: Track) => void, searched: string}): JSX.Element {
    const clickHandler = (track: Track):void => {
        onAdd(track);
    }
    return (
        <div>
            <h2 className={styles.header}>Search Results for "{searched}"</h2>
            
                <div>
                {tracks.map((track: any, key: number) => (
                <Card
                    key={key}
                    name={track.name}
                    artist={track.artist}
                    album={track.album}
                    functionHandler={clickHandler}
                />
                ))}
            </div>
        </div> 
    );
    
    }

export default SearchResults;