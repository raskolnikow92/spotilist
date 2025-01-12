import Card from "./Card";
import Track from "./Track";
import styles from '../modules/PlayList.module.css';

function PlayList({playListName, setPlayListName, playList, onRemove}: {playListName: string, setPlayListName: React.Dispatch<React.SetStateAction<string>>, playList: Track[], onRemove : (track: Track) => void}): JSX.Element {
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setPlayListName(e.target.value);
    }
    const clickHandler = (track: Track):void => {
        onRemove(track);
    }
    return (
        <div>
            <input type="text" value={playListName} onChange={changeHandler}/>
            {playList.map((track: Track, key: number) => {
                return <Card name={track.name} artist={track.artist} album={track.album} functionHandler={clickHandler}></Card>
            })}
            
        </div>
    )
}
export default PlayList;