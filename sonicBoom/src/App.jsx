import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import songs from "./data/songs";

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSong, setCurrentSong] = useState(null);

  const filteredSongs = songs.filter((song) => {
    const matchesCategory =
      activeCategory === "All" || song.category === activeCategory;
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300 relative z-0">
        {/* Topbar */}
        <div className="flex flex-col gap-4 px-4 md:px-8 py-4 md:py-6 border-b border-gray-100 bg-white sticky top-0 z-30 pt-4 md:pt-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {activeCategory === "All" ? "All Songs" : `${activeCategory} Music`}
            </h2>
            <span className="text-xs md:text-sm text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">
              {filteredSongs.length} songs
            </span>
          </div>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Song List */}
        <div className="flex-1 overflow-y-auto px-2 md:px-4 pt-4">
          <SongList
            songs={filteredSongs}
            currentSong={currentSong}
            onSongSelect={setCurrentSong}
          />
        </div>
      </div>

      {/* Player */}
      <Player
        currentSong={currentSong}
        songs={filteredSongs}
        onSongChange={setCurrentSong}
      />
    </div>
  );
}

export default App;