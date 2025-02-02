//import React from 'react'

// eslint-disable-next-line react/prop-types
const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src="../assets/search.svg" alt=""/>
                <input type="text" placeholder="Search MovieBuzz" value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
        </div>
    )
}
export default Search
