export const VOLUME_SPIKE_COUNT = 50;

export function summarizeVolumeSpikes(volumeSpikes: number[]): number[] {
  const totalSpikes = volumeSpikes.length;
  const volumeSummary: number[] = [];

  for (let i = 0; i < VOLUME_SPIKE_COUNT; i++) {
    const start = Math.floor((totalSpikes / VOLUME_SPIKE_COUNT) * i);
    const end = Math.floor((totalSpikes / VOLUME_SPIKE_COUNT) * (i + 1));
    const spikes = volumeSpikes.slice(start, end);
    const average = spikes.reduce((a, b) => a + b, 0) / spikes.length;
    volumeSummary.push(Math.round(average));
  }

  if (totalSpikes < VOLUME_SPIKE_COUNT) {
    fillVolumeSummary(volumeSummary);
  }

  return volumeSummary;
}


// Replace all NaNs with wave to the next non-NaN value
// Example: [1, NaN, NaN, 7] => [1, 3, 5, 7]

export function fillVolumeSummary(volumeSummary: number[]) {
  for (let i = 0; i < volumeSummary.length; i++) {
    if (isNaN(volumeSummary[i])) {
      let j = i + 1;
      while (isNaN(volumeSummary[j])) j++;
      const nextNonNaN = volumeSummary[j];
      const prevNonNaN = volumeSummary[i - 1] ?? 0;
      const diff = nextNonNaN - prevNonNaN;
      const step = diff / (j - i + 1);
      for (let k = i; k < j; k++) {
        volumeSummary[k] = Math.round(prevNonNaN + step * (k - i + 1));
      }
    }
  }
}
