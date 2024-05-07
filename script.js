const player = document.querySelector('.player__video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playButton = document.querySelector('.player__button');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackRateSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');

function togglePlay() {
  if (player.paused) {
    player.play();
    playButton.textContent = '❚ ❚';
  } else {
    player.pause();
    playButton.textContent = '►';
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
playButton.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', handleRangeUpdate);
playbackRateSlider.addEventListener('input', handleRangeUpdate);
skipButtons.forEach(button => button.addEventListener('click', skip));
progress.addEventListener('click', handleProgressClick);
