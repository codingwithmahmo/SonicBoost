# Audio Setup Guide for SonicBoost

## ✅ What's Ready

The Player component is fully configured with:
- ▶️ Play/Pause
- ⏭️ Skip Next/Previous
- 📊 Progress Bar with seek
- 🔊 Volume Control with Mute
- ⏱️ Time Display (current / total)
- Auto-skip to next song when finished

All songs are mapped to audio file paths: `/audio/song-1.mp3` to `/audio/song-32.mp3`

---

## 🎵 How to Add Real Music

### Step 1: Download Audio Files
Choose one of the three options:

**Option A: Royalty-Free Music (Recommended)**
- Visit: [Pexels Music](https://www.pexels.com/search/music/)
- Or: [Pixabay Music](https://pixabay.com/music/)
- Or: [Incompetech](https://www.incompetech.com/)
- Download MP3 versions of songs matching your playlist

**Option B: YouTube to MP3**
- Use tools like `youtube-dl` or online converters
- Convert YouTube videos to MP3 format

**Option C: Personal Music Files**
- Use your own collection of MP3 files

### Step 2: Place Files in Correct Location
1. Navigate to: `sonicBoom/public/audio/`
2. Create the `audio` folder if it doesn't exist
3. Place MP3 files with names: `song-1.mp3`, `song-2.mp3`, etc. (up to `song-32.mp3`)

### Step 3: That's It! 🎉
The player will automatically find and play them.

---

## 📝 File Naming Reference

```
sonicBoom/public/audio/
├── song-1.mp3   (Blinding Lights - The Weeknd)
├── song-2.mp3   (HUMBLE. - Kendrick Lamar)
├── song-3.mp3   (Levitating - Dua Lipa)
├── song-4.mp3   (Bohemian Rhapsody - Queen)
├── song-5.mp3   (Shape of You - Ed Sheeran)
├── song-6.mp3   (God's Plan - Drake)
├── song-7.mp3   (Someone Like You - Adele)
├── song-8.mp3   (Smells Like Teen Spirit - Nirvana)
├── song-9.mp3   (Kesariya - Arijit Singh)
├── song-10.mp3  (Tum Hi Ho - Arijit Singh)
├── song-11.mp3  (Chaiyya Chaiyya - Sukhwinder Singh)
├── song-12.mp3  (Kal Ho Naa Ho - Sonu Nigam)
├── song-13.mp3  (Apna Bana Le - Arijit Singh)
├── song-14.mp3  (Raataan Lambiyan - Jubin Nautiyal)
├── song-15.mp3  (Dil Diyan Gallan - Atif Aslam)
├── song-16.mp3  (Bajirao Mastani - Shreya Ghoshal)
├── song-17.mp3  (Pasoori - Ali Sethi & Shae Gill)
├── song-18.mp3  (Woh Lamhe - Atif Aslam)
├── song-19.mp3  (Afreen Afreen - Nusrat Fateh Ali Khan)
├── song-20.mp3  (Tera Woh Pyar - Momina & Asim)
├── song-21.mp3  (Khair Mangda - Atif Aslam)
├── song-22.mp3  (Karde Karam Tu - Samar Jafri)
├── song-23.mp3  (Rockstar - Ali Zafar)
├── song-24.mp3  (Mera Bichra Yaar - Strings)
├── song-25.mp3  (Zama Sterga - Rahim Shah)
├── song-26.mp3  (Da Wror Sandara - Sardar Ali Takkar)
├── song-27.mp3  (Khkule Janana - Rahim Shah)
├── song-28.mp3  (Lewane Lewane - Gulzar Alam)
├── song-29.mp3  (Stargo Wale - Naghma)
├── song-30.mp3  (Zra Me Yara - Rahim Shah)
├── song-31.mp3  (Pa Makhke De - Haroon Bacha)
└── song-32.mp3  (Meena Kawom - Sitara Younas)
```

---

## 🔧 Testing Without Audio Files

The player will work even without audio files - you can:
1. Click Play/Pause button (will show no audio error in console)
2. Test the UI and controls
3. Add audio files later and everything will work immediately

---

## 📱 Playback Features

| Feature | Details |
|---------|---------|
| **Play/Pause** | Click center button or use player UI |
| **Skip** | Use ⏭️ buttons to go next/prev song |
| **Seek** | Click anywhere on progress bar to jump |
| **Volume** | Drag volume slider 0-100% |
| **Mute** | Click speaker icon to toggle mute |
| **Time Display** | Shows current time / total duration |
| **Auto Skip** | Automatically plays next song when current ends |

---

## ❓ Troubleshooting

**Audio not playing?**
- Check file names match `song-X.mp3` format
- Files must be in `sonicBoom/public/audio/` folder
- Refresh the browser
- Check browser console for CORS errors

**No files in folder but default still showing?**
- Browser might be caching old state
- Hard refresh: `Ctrl+Shift+Del` (Windows) or `Cmd+Shift+Del` (Mac)

---

## 🎬 Quick Setup (5 minutes)

1. Go to Pexels Music or Pixabay
2. Search for a song name from the playlist
3. Download the MP3
4. Rename to `song-X.mp3` (matching the order)
5. Place in `sonicBoom/public/audio/`
6. Refresh browser
7. Click Play! 🎵

---

Done! Your music player is ready! 🚀
