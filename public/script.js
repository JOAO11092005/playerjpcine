const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const timeDisplay = document.getElementById('videoTime');
const seekBar = document.getElementById('videoSeek');
const muteIcon = document.getElementById('muteIcon');
const fullscreenIcon = document.getElementById('fullscreenIcon');
const videoContainer = document.getElementById('videoContainer');
const videoControls = document.querySelector('.video-controls');

let mouseMoveTimeout;

// Função para ocultar controles
function hideControls() {
    videoControls.classList.add('hidden');
}

// Função para mostrar controles
function showControls() {
    videoControls.classList.remove('hidden');
}

// Atualiza o temporizador quando o mouse se move
function resetMouseMoveTimeout() {
    showControls(); // Mostra os controles
    clearTimeout(mouseMoveTimeout); // Limpa o timeout anterior
    mouseMoveTimeout = setTimeout(hideControls, 3000); // Oculta após 3 segundos de inatividade
}

// Inicializa o timeout de inatividade
document.addEventListener('mousemove', resetMouseMoveTimeout);

// Controle de play/pause
function togglePlayPause() {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Retroceder vídeo
function rewindVideo(seconds) {
    video.currentTime = Math.max(0, video.currentTime - seconds);
}

// Avançar vídeo
function forwardVideo(seconds) {
    video.currentTime = Math.min(video.duration, video.currentTime + seconds);
}

// Atualiza barra de progresso e tempo
function updateProgress() {
    seekBar.value = (video.currentTime / video.duration) * 100;
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}`;
}

// Permite buscar na linha do tempo
function seekVideo() {
    video.currentTime = (seekBar.value / 100) * video.duration;
}

// Controla mudo
function toggleMute() {
    video.muted = !video.muted;
    muteIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}

// Controla modo fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        fullscreenIcon.className = 'fas fa-compress';
    } else {
        document.exitFullscreen();
        fullscreenIcon.className = 'fas fa-expand';
    }
}

// Eventos para atualizar a interface
video.addEventListener('timeupdate', updateProgress);
seekBar.addEventListener('input', seekVideo);

// Inicia o monitoramento do movimento do mouse
resetMouseMoveTimeout();

async function loadVideo() {
    try {
        // Solicita o link de vídeo com token do servidor
        const response = await fetch('/api/getVideoLink');
        const data = await response.json();

        // Atualiza o player com o link obtido
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = data.videoUrl;
        videoPlayer.load();
        videoPlayer.play();
    } catch (error) {
        console.error("Erro ao carregar o vídeo:", error);
    }
}

// Carrega o vídeo quando a página for carregada
window.onload = loadVideo;