import React, { useState } from "react";
import "./App.css"; // Import the CSS file for styling

const App = () => {
  const [followersFile, setFollowersFile] = useState(null);
  const [followingFile, setFollowingFile] = useState(null);
  const [uniqueValues, setUniqueValues] = useState([]);

  const handleFollowersUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result);
        setFollowersFile(jsonData);
      } catch (error) {
        console.error("Error parsing followers.json:", error);
      }
    };

    reader.readAsText(file);
  };

  const handleFollowingUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result);
        setFollowingFile(jsonData);
      } catch (error) {
        console.error("Error parsing following.json:", error);
      }
    };

    reader.readAsText(file);
  };

  const compareFiles = () => {
    if (followersFile && followingFile) {
      const followersValues = followersFile.map(
        (follower) => follower.string_list_data[0].value
      );
      const followingValues = followingFile.relationships_following.map(
        (following) => following.string_list_data[0].value
      );

      const uniqueValues = followingValues.filter(
        (value) => !followersValues.includes(value)
      );
      setUniqueValues(uniqueValues);
    }
  };

  return (
    <div className="app-container">
      <h1>Unfollowers App</h1>

      <div className="section-container">
        <section>
          <h2>Followers list</h2>
          <input type="file" accept=".json" onChange={handleFollowersUpload} />
        </section>

        <section>
          <h2>Following list</h2>
          <input type="file" accept=".json" onChange={handleFollowingUpload} />
        </section>
      </div>

      <button onClick={compareFiles}>Compare</button>

      {uniqueValues.length > 0 && (
        <div className="result-container">
          <h2>Unfollowers list:</h2>
          <ul>
            {uniqueValues.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
