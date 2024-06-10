import React, { useState } from 'react'; //uvozim react i hook use state

function SearchBar(props) {
  const [username, setUsername] = useState('');

  const handleInputChange = function(event) {
    setUsername(event.target.value);
  };

  const handleSearch = function() {
    props.onSearch(username);
  };

  return (
    <div>
      <input 
        type="text" 
        value={username} 
        onChange={handleInputChange} 
        placeholder="Enter GitHub username" 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
