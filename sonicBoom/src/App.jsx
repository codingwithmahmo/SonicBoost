import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import songs from "./data/songs";

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLibraryItem, setActiveLibraryItem] = useState("All Songs");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Track recently played songs
  useEffect(() => {
    if (currentSong) {
      setRecentlyPlayed((prev) => {
        const filtered = prev.filter((id) => id !== currentSong.id);
        return [currentSong.id, ...filtered].slice(0, 50);
      });
    }
  }, [currentSong]);

  // Toggle favorite
  const toggleFavorite = (songId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(songId)) {
        newFavorites.delete(songId);
      } else {
        newFavorites.add(songId);
      }
      return newFavorites;
    });
  };

  // Filter songs based on library item and category
  const getFilteredSongs = () => {
    let baseSongs = songs;

    // Filter by library item
    if (activeLibraryItem === "Favorites") {
      baseSongs = baseSongs.filter((song) => favorites.has(song.id));
    } else if (activeLibraryItem === "Recently Played") {
      baseSongs = baseSongs.filter((song) => recentlyPlayed.includes(song.id));
      baseSongs.sort(
        (a, b) => recentlyPlayed.indexOf(a.id) - recentlyPlayed.indexOf(b.id)
      );
    }

    // Filter by category (only if not in a library view other than All Songs)
    if (activeLibraryItem === "All Songs") {
      baseSongs = baseSongs.filter(
        (song) =>
          activeCategory === "All" || song.category === activeCategory
      );
    }

    // Filter by search
    baseSongs = baseSongs.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.genre.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });

    return baseSongs;
  };

  const filteredSongs = getFilteredSongs();

  // Get title
  const getTitle = () => {
    if (activeLibraryItem === "Favorites") return "Favorite Songs";
    if (activeLibraryItem === "Recently Played") return "Recently Played";
    return activeCategory === "All" ? "All Songs" : `${activeCategory} Music`;
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeLibraryItem={activeLibraryItem}
        onLibraryChange={setActiveLibraryItem}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300 relative z-0">
        {/* Topbar */}
        <div className="flex flex-col gap-4 px-4 md:px-8 py-4 md:py-6 border-b border-gray-100 bg-white sticky top-0 z-30 pt-16 md:pt-4">
          {/* Title and Song Count */}
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {getTitle()}
            </h2>
            <span className="text-xs md:text-sm text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">
              {filteredSongs.length} songs
            </span>
          </div>
          {activeLibraryItem !== "Recently Played" && (
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}
        </div>

        {/* Song List */}
        <div className="flex-1 overflow-y-auto px-2 md:px-4 pt-4">
          <SongList
            songs={filteredSongs}
            currentSong={currentSong}
            onSongSelect={setCurrentSong}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
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