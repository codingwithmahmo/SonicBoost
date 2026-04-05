import React, { useState, useRef, useEffect } from "react";
import { SkipBack, Play, Pause, SkipForward, Volume2, VolumeX, Volume1, Music } from "lucide-react";

function Player({ currentSong, songs, onSongChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleProgressClick = (e) => {
    const bar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = bar.offsetWidth;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSkipNext = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    onSongChange(songs[nextIndex]);
  };

  const handleSkipPrev = () => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    onSongChange(songs[prevIndex]);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 flex items-center justify-center z-20">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Music size={18} />
          <p>Select a song to start playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-gray-100 flex items-center px-6 gap-6 z-20 shadow-lg">
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleSkipNext}
      />

      {/* Left — Song Info */}
      <div className="flex items-center gap-4 w-72 min-w-0">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded-xl object-cover shadow-md"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {currentSong.title}
          </p>
          <p className="text-xs text-gray-400 truncate mt-0.5">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Center — Controls + Progress */}
      <div className="flex flex-col items-center flex-1 gap-2">
        {/* Buttons */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleSkipPrev}
            className="text-gray-400 hover:text-black transition-colors duration-150"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-150 shadow-md"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={handleSkipNext}
            className="text-gray-400 hover:text-black transition-colors duration-150"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full max-w-lg">
          <span className="text-xs text-gray-400 w-8 text-right">
            {formatTime(currentTime)}
          </span>
          <div
            className="flex-1 h-1.5 bg-gray-200 rounded-full cursor-pointer relative group"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-black rounded-full transition-all duration-100 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-xs text-gray-400 w-8">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right — Volume */}
      <div className="flex items-center gap-3 w-36">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-gray-400 hover:text-black transition-colors"
        >
          {isMuted || volume === 0 ? <VolumeX size={20} /> : volume < 0.5 ? <Volume1 size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            setIsMuted(false);
          }}
          className="w-full accent-black cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Player;