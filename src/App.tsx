
//import './App.css'
import styles from './modules/App.module.css'
import SearchBar from './components/SearchBar'
import { useEffect, useState } from 'react';
import { getAccessToken, connect } from './util/Auth';
import SearchResults from './components/SearchResults';
import mocktracks from './util/MockTracks';
import PlayList from './components/PlayList';
import Track from './components/Track';



  
function App() {
 
  const api : string = 'https://api.spotify.com';
  const [search, setSearch] = useState('');
  const [playList, setPlayList] = useState<Track[]>([]);
  const client_id = import.meta.env.VITE_CLIENT_ID!;
  const client_secret = import.meta.env.VITE_CLIENT_SECRET!;

  const [token, setToken] = useState<string | null>(null);
  const [tokenExpireDate, setTokenExpireDate] = useState(0);
  const [playListName, setPlayListName] = useState('new playlist');
  
  const fetchToken = async () => {
    try{
      const completeToken = await getAccessToken(client_id, client_secret);
      //console.log(completeToken);
      //setToken(completeToken.access_token);
      //setTokenExpireDate(completeToken.expires_in)
    }catch(error){
      console.log("Failed to fetch Spotify token:", error);
    }
  }

  useEffect(()=>{
    connect();
    fetchToken();
    console.log(token);
  },[]);
  useEffect(()=>{
    if(tokenExpireDate <= 100){
      fetchToken()
    }
    const intervalId = setInterval(()=>{
      setTokenExpireDate(prev => prev -1);
    },1000);
    return () => clearInterval(intervalId);
  },[tokenExpireDate])

  const onSearch = (search: string):void => {
    setSearch(search);
  }

  const onAddToPlayList = (track: Track):void => {
    if(playList.some(t => t.name === track.name)){
      return;
    }
    setPlayList(prev => [...prev, track]);
  }
  const onRemoveFromPlayList = (track: Track):void => {
    setPlayList(prev => prev.filter(t => t.name !== track.name));
  }
  

  return (
    <>
    <div className={styles.backgroundimg}>
      <div>
        <h1>Spotilist</h1>
        <div className={styles.searchbar}>
          <SearchBar onSearch={onSearch} value={search}/>
        </div>

        <div className={styles.content}>
          <div className={styles.searchresults}>
          <SearchResults tracks={mocktracks} onAdd={onAddToPlayList} searched={search}/>
          </div>
          <div className={styles.playlist}>
          <PlayList playListName={playListName} setPlayListName={setPlayListName} playList={playList} onRemove={onRemoveFromPlayList}/>
          </div>
        </div>
        
      </div>
      
    </div>
    </>
  )
}

export default App;
