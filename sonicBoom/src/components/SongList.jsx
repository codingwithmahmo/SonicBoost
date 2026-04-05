import React from "react";
import { Music2, Play, Heart } from "lucide-react";

function SongList({ songs, currentSong, onSongSelect, favorites = new Set(), onToggleFavorite }) {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Music2 size={48} className="mb-4" />
        <p className="text-lg font-semibold text-gray-600">No songs found</p>
        <p className="text-sm mt-1">Try searching something else</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto pb-32 relative z-0">
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:grid grid-cols-12 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-100 sticky top-0 bg-white z-10">
        <span className="col-span-1 text-center">#</span>
        <span className="col-span-5">Title</span>
        <span className="col-span-3">Artist</span>
        <span className="col-span-2">Genre</span>
        <span className="col-span-1 text-right">Time</span>
      </div>

      {/* Rows */}
      {songs.map((song, index) => (
        <div key={song.id}>
          {/* Desktop Grid View */}
          <div
            onClick={() => onSongSelect(song)}
            className={`hidden md:grid grid-cols-12 px-4 py-3 items-center cursor-pointer rounded-xl mx-2 my-0.5 transition-all duration-150 group
              ${currentSong?.id === song.id
                ? "bg-black text-white"
                : "hover:bg-gray-50 text-gray-800"
              }`}
          >
            {/* Index / Playing */}
            <span className={`col-span-1 text-center text-sm font-medium flex justify-center
              ${currentSong?.id === song.id ? "text-white" : "text-gray-400"}`}>
              {currentSong?.id === song.id ? (
                <Play size={16} className="animate-pulse fill-current" />
              ) : (
                index + 1
              )}
            </span>

            {/* Cover + Title */}
            <div className="col-span-5 flex items-center gap-3">
              <img
                src={song.cover}
                alt={song.title}
                className="w-10 h-10 rounded-lg object-cover shadow-sm"
              />
              <div>
                <p className={`text-sm font-semibold leading-tight
                  ${currentSong?.id === song.id ? "text-white" : "text-gray-900"}`}>
                  {song.title}
                </p>
                <p className={`text-xs mt-0.5
                  ${currentSong?.id === song.id ? "text-gray-300" : "text-gray-400"}`}>
                  {song.category}
                </p>
              </div>
            </div>

            {/* Artist */}
            <span className={`col-span-3 text-sm
              ${currentSong?.id === song.id ? "text-gray-300" : "text-gray-500"}`}>
              {song.artist}
            </span>

            {/* Genre Tag */}
            <span className="col-span-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                ${currentSong?.id === song.id
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500"
                }`}>
                {song.genre}
              </span>
            </span>

            {/* Duration + Favorite */}
            <div className="col-span-1 flex items-center justify-end gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(song.id);
                }}
                className={`p-1 rounded transition-all duration-150 ${
                  favorites.has(song.id)
                    ? currentSong?.id === song.id
                      ? "text-red-400"
                      : "text-red-500"
                    : currentSong?.id === song.id
                    ? "text-gray-300 hover:text-red-400"
                    : "text-gray-300 hover:text-red-500 group-hover:opacity-100"
                }`}
                title={favorites.has(song.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  size={16}
                  className={favorites.has(song.id) ? "fill-current" : ""}
                />
              </button>
              <span className={`text-sm text-right min-w-10
                ${currentSong?.id === song.id ? "text-gray-300" : "text-gray-400"}`}>
                {song.duration}
              </span>
            </div>
          </div>

          {/* Mobile Card View */}
          <div
            onClick={() => onSongSelect(song)}
            className={`md:hidden px-3 py-3 rounded-xl mx-1 my-1 cursor-pointer transition-all duration-150 group
              ${currentSong?.id === song.id
                ? "bg-black text-white"
                : "hover:bg-gray-50 text-gray-800"
              }`}
          >
            <div className="flex items-center gap-3">
              {/* Index / Playing */}
              <span className={`text-sm font-medium flex-shrink-0 w-6 flex justify-center
                ${currentSong?.id === song.id ? "text-white" : "text-gray-400"}`}>
                {currentSong?.id === song.id ? (
                  <Play size={16} className="animate-pulse fill-current" />
                ) : (
                  index + 1
                )}
              </span>

              {/* Cover + Info */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover shadow-sm flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold truncate
                    ${currentSong?.id === song.id ? "text-white" : "text-gray-900"}`}>
                    {song.title}
                  </p>
                  <p className={`text-xs truncate
                    ${currentSong?.id === song.id ? "text-gray-300" : "text-gray-500"}`}>
                    {song.artist}
                  </p>
                </div>
              </div>

              {/* Duration + Favorite */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(song.id);
                  }}
                  className={`p-1 rounded transition-all duration-150 ${
                    favorites.has(song.id)
                      ? currentSong?.id === song.id
                        ? "text-red-400"
                        : "text-red-500"
                      : currentSong?.id === song.id
                      ? "text-gray-300 hover:text-red-400"
                      : "text-gray-300 hover:text-red-500"
                  }`}
                  title={favorites.has(song.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    size={16}
                    className={favorites.has(song.id) ? "fill-current" : ""}
                  />
                </button>
                <span className={`text-xs min-w-8 text-right
                  ${currentSong?.id === song.id ? "text-gray-300" : "text-gray-400"}`}>
                  {song.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SongList;