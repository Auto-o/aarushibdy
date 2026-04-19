// Landing page click handler
document.getElementById('landing').addEventListener('click', function() {
    // Hide landing
    document.getElementById('landing').classList.add('hidden');
    
    // Show main content
    document.getElementById('main-content').classList.remove('hidden');
    
    // Play music
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.6;
        music.play().catch(e => console.log('Music autoplay blocked:', e));
    }
    
    // Start floating decorations
    createFloatingDecorations();
    
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
            location.reload();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Floating decorations
function createFloatingDecorations() {
    const container = document.getElementById('floating-decorations');
    if (!container) return;
    
    const decorations = ['💖', '💕', '💗', '❤️', '💘', '⭐', '✨', '🌟', '💫', '🎉', '🎊', '🩷', '🩶', '🧡', '💝'];
    
    function createItem() {
        if (!document.getElementById('floating-decorations')) return;
        
        const el = document.createElement('div');
        el.className = 'floating-item';
        el.textContent = decorations[Math.floor(Math.random() * decorations.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 6 + 7) + 's';
        el.style.animationDelay = Math.random() * 5 + 's';
        el.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(el);
        
        setTimeout(() => {
            el.remove();
        }, 12000);
    }
    
    // Initial batch
    for (let i = 0; i < 12; i++) {
        setTimeout(createItem, Math.random() * 2000);
    }
    
    // Continuous
    setInterval(createItem, 600);
}

// Also run on wish pages
if (document.getElementById('floating-decorations')) {
    createFloatingDecorations();
}