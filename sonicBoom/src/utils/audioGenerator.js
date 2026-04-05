// Generate simple test tone audio - for placeholder/demo purposes
export const generateTestAudio = (durationSeconds = 15) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const audioBuffer = audioContext.createBuffer(1, sampleRate * durationSeconds, sampleRate);
  const data = audioBuffer.getChannelData(0);

  // Generate a simple sine wave tone (440 Hz - musical note A4)
  for (let i = 0; i < audioBuffer.length; i++) {
    data[i] = Math.sin((i / sampleRate) * 440 * 2 * Math.PI) * 0.3;
  }

  return audioBuffer;
};

// Create a blob URL from audio buffer for testing
export const createAudioBlobUrl = (durationSeconds = 15) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const audioBuffer = audioContext.createBuffer(1, sampleRate * durationSeconds, sampleRate);
  const data = audioBuffer.getChannelData(0);

  // Generate tone
  for (let i = 0; i < audioBuffer.length; i++) {
    data[i] = Math.sin((i / sampleRate) * 440 * 2 * Math.PI) * 0.3;
  }

  // Convert to WAV and create blob
  const wav = audioBufferToWav(audioBuffer);
  const blob = new Blob([wav], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

// Helper to convert AudioBuffer to WAV format
function audioBufferToWav(audioBuffer) {
  const length = audioBuffer.length * audioBuffer.numberOfChannels * 2 + 44;
  const arrayBuffer = new ArrayBuffer(length);
  const view = new DataView(arrayBuffer);
  const channels = [];
  let offset = 0;
  let pos = 0;

  // Write WAV header
  const setUint16 = (data) => {
    view.setUint16(pos, data, true);
    pos += 2;
  };
  const setUint32 = (data) => {
    view.setUint32(pos, data, true);
    pos += 4;
  };

  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"
  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // chunk size
  setUint16(1); // PCM
  setUint16(audioBuffer.numberOfChannels);
  setUint32(audioBuffer.sampleRate);
  setUint32(audioBuffer.sampleRate * 2 * audioBuffer.numberOfChannels); // avg. byte rate
  setUint16(audioBuffer.numberOfChannels * 2); // block-align
  setUint16(16); // 16-bit
  setUint32(0x61746164); // "data" - chunk
  setUint32(length - pos - 4); // chunk length

  const volume = 0.8;
  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
    channels.push(audioBuffer.getChannelData(i));
  }

  while (pos < length) {
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      const s = Math.max(-1, Math.min(1, channels[i][offset]));
      view.setInt16(pos, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      pos += 2;
    }
    offset++;
  }

  return arrayBuffer;
}
