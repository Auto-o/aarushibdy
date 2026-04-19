// Landing page handling
document.getElementById('enter-btn').addEventListener('click', function() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    
    // Play music
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.5;
        music.play().catch(e => console.log('Music autoplay blocked'));
    }
    
    // Start floating animations
    createFloatingElements();
    
    // Start countdown
    startCountdown();
});

// Countdown to next April 20
function getNextBirthday() {
    const now = new Date();
    let nextBirthday = new Date(now.getFullYear(), 3, 20); // April = month 3 (0-indexed)
    
    if (now > nextBirthday) {
        nextBirthday = new Date(now.getFullYear() + 1, 3, 20);
    }
    
    return nextBirthday;
}

function startCountdown() {
    function updateCountdown() {
        const now = new Date();
        const nextBirthday = getNextBirthday();
        const diff = nextBirthday - now;
        
        if (diff <= 0) {
            // Birthday has passed, recalculate for next year
            location.reload();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Floating animations
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    const elements = ['💖', '💕', '💗', '❤️', '💘', '⭐', '✨', '🌟', '💫', '🎉', '🎊', '🩷', '🩶'];
    
    function createFloatingElement() {
        const el = document.createElement('div');
        el.className = 'floating-' + (Math.random() > 0.5 ? 'heart' : Math.random() > 0.5 ? 'star' : 'sparkle');
        el.textContent = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 5 + 5) + 's';
        el.style.animationDelay = Math.random() * 5 + 's';
        el.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(el);
        
        setTimeout(() => {
            el.remove();
        }, 10000);
    }
    
    // Create multiple elements initially
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingElement, Math.random() * 3000);
    }
    
    // Keep creating new elements
    setInterval(createFloatingElement, 800);
}