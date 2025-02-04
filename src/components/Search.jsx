//import React from 'react'
import searchIcon from '../assets/search.svg'
// eslint-disable-next-line react/prop-types
const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src={searchIcon} alt=""/>
                <input type="text" placeholder="Search MovieBuzz" value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
        </div>
    )
}
export default Search
