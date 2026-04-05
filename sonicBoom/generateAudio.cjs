const fs = require('fs');
const path = require('path');

// Create audio folder if it doesn't exist
const audioDir = path.join(__dirname, 'public', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
  console.log(`✓ Created folder: ${audioDir}`);
}

// Function to generate WAV file with a tone
function generateWavFile(filename, frequency, duration = 15) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * duration);

  // Create WAV file header
  const header = Buffer.alloc(44);
  const view = new DataView(header.buffer);

  // "RIFF" chunk descriptor
  view.setUint32(0, 0x46464952, true);                    // "RIFF"
  view.setUint32(4, 36 + numSamples * 2, true);           // file size - 8
  view.setUint32(8, 0x45564157, true);                    // "WAVE"

  // "fmt " sub-chunk
  view.setUint32(12, 0x20746d66, true);                   // "fmt "
  view.setUint32(16, 16, true);                           // subchunk1 size
  view.setUint16(20, 1, true);                            // PCM format
  view.setUint16(22, 1, true);                            // mono
  view.setUint32(24, sampleRate, true);                   // sample rate
  view.setUint32(28, sampleRate * 2, true);               // byte rate
  view.setUint16(32, 2, true);                            // block align
  view.setUint16(34, 16, true);                           // bits per sample

  // "data" sub-chunk
  view.setUint32(36, 0x61746164, true);                   // "data"
  view.setUint32(40, numSamples * 2, true);               // data size

  // Generate audio data (simple sine wave)
  const audioData = Buffer.alloc(numSamples * 2);
  const audioView = new DataView(audioData.buffer);

  for (let i = 0; i < numSamples; i++) {
    const sample = Math.sin((i / sampleRate) * frequency * 2 * Math.PI) * 0.3;
    const s16 = Math.max(-1, Math.min(1, sample));
    const int16 = s16 < 0 ? s16 * 0x8000 : s16 * 0x7fff;
    audioView.setInt16(i * 2, int16, true);
  }

  // Combine header and audio data
  const wav = Buffer.concat([header, audioData]);

  // Write file
  fs.writeFileSync(path.join(audioDir, filename), wav);
  console.log(`✓ Generated: ${filename}`);
}

// Define songs with unique frequencies (Hz)
const songFrequencies = [
  { id: 1, name: 'song-1.mp3', freq: 440 },    // Blinding Lights (A4)
  { id: 2, name: 'song-2.mp3', freq: 494 },    // HUMBLE. (B4)
  { id: 3, name: 'song-3.mp3', freq: 523 },    // Levitating (C5)
  { id: 4, name: 'song-4.mp3', freq: 587 },    // Bohemian Rhapsody (D5)
  { id: 5, name: 'song-5.mp3', freq: 659 },    // Shape of You (E5)
  { id: 6, name: 'song-6.mp3', freq: 740 },    // God's Plan (F#5)
  { id: 7, name: 'song-7.mp3', freq: 830 },    // Someone Like You (G#5)
  { id: 8, name: 'song-8.mp3', freq: 440 },    // Smells Like Teen Spirit (A4)

  { id: 9, name: 'song-9.mp3', freq: 466 },    // Kesariya (A#4)
  { id: 10, name: 'song-10.mp3', freq: 523 },  // Tum Hi Ho (C5)
  { id: 11, name: 'song-11.mp3', freq: 587 },  // Chaiyya Chaiyya (D5)
  { id: 12, name: 'song-12.mp3', freq: 659 },  // Kal Ho Naa Ho (E5)
  { id: 13, name: 'song-13.mp3', freq: 494 },  // Apna Bana Le (B4)
  { id: 14, name: 'song-14.mp3', freq: 740 },  // Raataan Lambiyan (F#5)
  { id: 15, name: 'song-15.mp3', freq: 830 },  // Dil Diyan Gallan (G#5)
  { id: 16, name: 'song-16.mp3', freq: 440 },  // Bajirao Mastani (A4)

  { id: 17, name: 'song-17.mp3', freq: 466 },  // Pasoori (A#4)
  { id: 18, name: 'song-18.mp3', freq: 523 },  // Woh Lamhe (C5)
  { id: 19, name: 'song-19.mp3', freq: 587 },  // Afreen Afreen (D5)
  { id: 20, name: 'song-20.mp3', freq: 659 },  // Tera Woh Pyar (E5)
  { id: 21, name: 'song-21.mp3', freq: 494 },  // Khair Mangda (B4)
  { id: 22, name: 'song-22.mp3', freq: 740 },  // Karde Karam Tu (F#5)
  { id: 23, name: 'song-23.mp3', freq: 830 },  // Rockstar (G#5)
  { id: 24, name: 'song-24.mp3', freq: 440 },  // Mera Bichra Yaar (A4)

  { id: 25, name: 'song-25.mp3', freq: 466 },  // Zama Sterga (A#4)
  { id: 26, name: 'song-26.mp3', freq: 523 },  // Da Wror Sandara (C5)
  { id: 27, name: 'song-27.mp3', freq: 587 },  // Khkule Janana (D5)
  { id: 28, name: 'song-28.mp3', freq: 659 },  // Lewane Lewane (E5)
  { id: 29, name: 'song-29.mp3', freq: 494 },  // Stargo Wale (B4)
  { id: 30, name: 'song-30.mp3', freq: 740 },  // Zra Me Yara (F#5)
  { id: 31, name: 'song-31.mp3', freq: 830 },  // Pa Makhke De (G#5)
  { id: 32, name: 'song-32.mp3', freq: 440 },  // Meena Kawom (A4)
];

console.log('🎵 Generating sample audio files...\n');

songFrequencies.forEach(song => {
  generateWavFile(song.name, song.freq, 15);
});

console.log(`\n✅ Done! Generated ${songFrequencies.length} sample audio files in: ${audioDir}`);
console.log('\n📝 These are test tones with different frequencies so each song sounds different.');
console.log('   You can now test the music player UI!\n');
console.log('💡 To replace with real music:');
console.log('   1. Download MP3 files from Pexels, Pixabay, or YouTube');
console.log('   2. Place them in the audio folder with names: song-1.mp3, song-2.mp3, etc.');
console.log('   3. Refresh the browser\n');
