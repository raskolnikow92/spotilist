function Searchbar({onSearch, value}: {onSearch: (searchTerm: string) => void; value: string}) {
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>):void => {
        onSearch(e.target.value);
    }
    return (
        <div>
            <form>
                <input type="text" placeholder="Search for a song" value={value} onChange={changeHandler}/>
            </form>
            
        </div>
    )
}

export default Searchbar;