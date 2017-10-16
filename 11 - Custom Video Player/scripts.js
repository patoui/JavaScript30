const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// My attempt
// const player = document.querySelector('video.player__video.viewer');
// const play = document.querySelectorAll('.player__button');
// const toggle = document.querySelector('.player__button.toggle');
// const volume = document.querySelector('input[name=volume]');
// const playbackRate = document.querySelector('input[name=playbackRate]');

// let isPlaying = false;

// function handleTogglePlay(e) {
//     if (! this.dataset.hasOwnProperty('skip')) {
//         if (isPlaying) {
//             player.pause();
//             toggle.innerText = '►';
//         } else {
//             player.play();
//             toggle.innerText = '❚❚';
//         }
//         isPlaying = ! isPlaying;
//     }
//     if (this.dataset.hasOwnProperty('skip')) {
//         player.currentTime = player.currentTime + parseInt(this.dataset.skip);
//     }
// }

// function handleVolume(e) {
//     player.volume = this.value;
// }

// function handlePlaybackRate(e) {
//     player.playbackRate = this.value;
// }

// player.addEventListener('click', handleTogglePlay);
// play.forEach(button => {
//     button.addEventListener('click', handleTogglePlay);
// });
// volume.addEventListener('change', handleVolume);
// playbackRate.addEventListener('change', handlePlaybackRate);
