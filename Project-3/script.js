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


// Event listener on clicking the big play icon 
centerBtn.addEventListener('click', togglePlayPause);

// Function to play/pause video on clicking the big play icon 
function togglePlayPause() {
    if (video.paused) {
        video.play();
        centerBtn.style.display = "none";
    } else {
        video.pause();
        centerBtn.style.display = "block";
    }
}

// Function to show/hide the big play button on clicking the video element  
video.onclick = function () {
    if (video.paused) {
        centerBtn.style.display = "block";
    } else {
        centerBtn.style.display = "none";
    }
}

// Function to show/hide the big play button on clicking the play button  
play.onclick = function () {
    if (video.paused) {
        centerBtn.style.display = "block";
    } else {
        centerBtn.style.display = "none";
    }
}

// Function to stop video and to show/hide big play icon 
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

// Function for showing volume slider
volumeIcon.onmouseover = function () {
    volume.style.display = "block";
}

// Function for hiding volume slider
video.onmouseout = function () {
    volume.style.display = "none";
}

// Function for toggling volume icon on mute through volume slider
volume.onmousemove = function () {
    if (video.volume === 0) {
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

// Event listener on toggling full screen button
fullScreen.addEventListener('click', toggleFullScreen);

// Function for entering and exiting fullscreen
function toggleFullScreen() {
    if (screen && screen.width > 600) {
    if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            controls.style.cssText = "width: 100%; position:fixed; top: 92%; border-bottom-left-radius: 0; border-bottom-right-radius: 0;";
            video.style.cssText = "width: 100%; height: 100%; border-top-left-radius: 0; border-top-right-radius: 0;";
            videoPlayer.style.cssText = "min-height: 0";
            document.getElementById('h1').style.display = "none";
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            controls.style.cssText = "width: 60%;";
            video.style.cssText = "width: 60%;";
            document.getElementById('h1').style.display = "block";
            videoPlayer.style.cssText = "min-height: 100vh";
        }
    } else {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }  
    }
}    

// Function for hiding/showing custom video controls when mouse is active/inactive
var timeout;
var timePeriod = 2000;
document.addEventListener('mousemove', function() {
  controls.style.display = "block";
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    controls.style.display = "none";
  }, timePeriod)
});
