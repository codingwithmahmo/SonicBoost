import React from "react";
import { Music2, Play } from "lucide-react";

function SongList({ songs, currentSong, onSongSelect }) {
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
      {/* Header */}
      <div className="grid grid-cols-12 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-gray-100 sticky top-0 bg-white z-10">
        <span className="col-span-1 text-center">#</span>
        <span className="col-span-5">Title</span>
        <span className="col-span-3">Artist</span>
        <span className="col-span-2">Genre</span>
        <span className="col-span-1 text-right">Time</span>
      </div>

      {/* Rows */}
      {songs.map((song, index) => (
        <div
          key={song.id}
          onClick={() => onSongSelect(song)}
          className={`grid grid-cols-12 px-4 py-3 items-center cursor-pointer rounded-xl mx-2 my-0.5 transition-all duration-150 group
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

          {/* Duration */}
          <span className={`col-span-1 text-right text-sm
            ${currentSong?.id === song.id ? "text-gray-300" : "text-gray-400"}`}>
            {song.duration}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SongList;