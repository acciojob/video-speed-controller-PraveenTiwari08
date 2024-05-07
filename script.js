const player = document.querySelector('.player__video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggleButton = document.querySelector('.toggle'); // Select the toggle button
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackRateSlider = document.querySelector('input[name="playbackRate"]');
const rewindButton = document.querySelector('.rewind'); // Select the rewind button
const skipButtons = document.querySelectorAll('[data-skip]');

function togglePlay() {
  if (player.paused) {
    player.play();
    toggleButton.textContent = '❚ ❚';
  } else {
    player.pause();
    toggleButton.textContent = '►';
  }
}

function updateProgressBar() {
  const percent = (player.currentTime / player.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function skip() {
  player.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  player[this.name] = this.value;
}

function handleProgressClick(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}

player.addEventListener('timeupdate', updateProgressBar);
toggleButton.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', handleRangeUpdate);
playbackRateSlider.addEventListener('input', handleRangeUpdate);
skipButtons.forEach(button => button.addEventListener('click', skip));
progress.addEventListener('click', handleProgressClick);

// Export the functions if you are using Cypress
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    togglePlay,
    updateProgressBar,
    skip,
    handleRangeUpdate,
    handleProgressClick
  };
}
