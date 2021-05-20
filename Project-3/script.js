// Get DOM elements for JS code
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const centerBtn = document.getElementById('center-play');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const volumeIcon = document.getElementById('vol-icon');
const controls = document.getElementById('controls');
const videoPlayer = document.getElementById('video-player');
const fullScreen = document.getElementById('fullscreen');

// Create function for clicking on video
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Create function for updating the play / pause icons
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

// Create function to update the progress
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // Set the time for timestamp
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

// Create function to stop the video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Create function to update the video progress using the slider
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

// Event Listeners
// 1. Event Listeners for the video player
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

// 2. Event Listener for Play Button
play.addEventListener('click', toggleVideoStatus);

// 3. Event Listener for Stop Button
stop.addEventListener('click', stopVideo);

// 4. Event Listener for Progress Bar
progress.addEventListener('change', setVideoProgress);



centerBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    if (video.paused) {
        video.play();
        centerBtn.style.display = "none";
    } else {
        video.pause();
        centerBtn.style.display = "block";
    }
}

video.onclick = function () {
    if (video.paused) {
        centerBtn.style.display = "block";
    } else {
        centerBtn.style.display = "none";
    }
}

play.onclick = function () {
    if (video.paused) {
        centerBtn.style.display = "block";
    } else {
        centerBtn.style.display = "none";
    }
}

stop.onclick = function () {
    if (video.paused) {
        centerBtn.style.display = "block";
    } else {
        centerBtn.style.display = "none";
    }
}

// Function for updating timestamp to show total video duration
const currentTime = () => {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    timestamp.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    duration.innerHTML = `${durationMinutes}:${durationSeconds}`;
}
// Event listener for updating timestamp to show total video duration
video.addEventListener('timeupdate', currentTime);

// Function and event listener for controlling video volume through slider
volume.addEventListener('mousemove', e => {
    video.volume = e.target.value;
})


volumeIcon.onmouseover = function () {
    volume.style.display = "block";
}

video.onmouseout = function () {
    volume.style.display = "none";
}

volume.onmousemove = function () {
    if (video.volume === 0) {
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

fullScreen.addEventListener('click', toggleFullScreen);

function toggleFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }
}

fullScreen.addEventListener('click', closeFullScreen);
/* Close fullscreen */
function closeFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}




