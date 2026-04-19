// BACKGROUND ANIMATION LOGIC
function initBackgroundAnimation() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w, h;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    const particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: Math.random() * 0.6 - 0.3, // slight horizontal drift
            vy: Math.random() * 1.5 + 0.5, // falling downwards
            size: Math.random() * 2.5 + 0.5,
            color: Math.random() > 0.7 ? '#00f3ff' : '#ffffff', // mostly white stars with some cyan
            alpha: Math.random() * 0.8 + 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, w, h);
        for (let p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y > h) p.y = 0; // Wrap at bottom so they fall endlessly
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();
}

initBackgroundAnimation();

// JS PIXEL CAKE DRAWING
function drawPixelCake() {
    const canvas = document.getElementById('cake-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 160;
    const grid = 16;
    const p = size / grid;
    
    // 16x16 pixel art pattern
    const pixels = [
        [0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0],
        [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
        [0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
        [0,2,2,2,1,2,2,1,2,2,1,2,2,2,0,0],
        [0,2,1,1,1,1,1,1,1,1,1,1,1,2,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,3,1,1,3,1,1,3,1,1,3,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
        [0,0,5,5,5,5,5,5,5,5,5,5,5,5,0,0],
    ];
    
    const colors = {
        0: 'transparent',
        1: '#FF69B4', // Pink cake body
        2: '#FFFFFF', // White icing
        3: '#FF1493', // Deep pink cherry/dots/flame
        4: '#00F3FF', // Cyan candle
        5: '#B0A8BA', // Grey plate
    };
    
    ctx.clearRect(0, 0, size, size);
    for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
            if (pixels[y][x] !== 0) {
                ctx.fillStyle = colors[pixels[y][x]];
                ctx.fillRect(x * p, y * p, p, p);
            }
        }
    }
}

// Flame flicker animation
setInterval(() => {
    const canvas = document.getElementById('cake-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const p = 160 / 16;
    
    // Toggle flame (row 0, col 7)
    const isFlameOn = Math.random() > 0.5;
    ctx.clearRect(7*p, 0*p, p, p);
    if (isFlameOn) {
        ctx.fillStyle = '#FF1493';
        ctx.fillRect(7*p, 0*p, p, p);
    }
}, 300);

drawPixelCake();

// Landing page click handler
if (document.getElementById('landing')) {
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
        
        // Fire Confetti
        if (typeof confetti === 'function') {
            fireConfetti();
        }
        
        // Start floating decorations
        createFloatingDecorations();
        
        // Start countdown
        startCountdown();
    });
}

// Confetti burst animation
function fireConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 },
        zIndex: 1000
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#ff1493', '#b026ff']
    });
    fire(0.2, {
        spread: 60,
        colors: ['#00f3ff', '#ffffff']
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#ff69b4', '#b026ff', '#00f3ff']
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ['#ffffff', '#ff1493']
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ['#ff1493', '#b026ff']
    });
}

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
            // Once countdown finishes, confetti keeps popping if we're on the main page!
            if (Math.random() < 0.1 && typeof confetti === 'function') {
                confetti({
                    particleCount: 15,
                    spread: 40,
                    origin: { y: 0.4 },
                    colors: ['#ff1493', '#00f3ff']
                });
            }
        }
        
        const days = Math.floor(Math.max(0, diff) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((Math.max(0, diff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((Math.max(0, diff) % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((Math.max(0, diff) % (1000 * 60)) / 1000);
        
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
    
    const decorations = ['💖', '✨', '🌟', '💫', '💜', '💙', '🩷'];
    
    function createItem() {
        if (!document.getElementById('floating-decorations')) return;
        
        const el = document.createElement('div');
        el.className = 'floating-item';
        el.textContent = decorations[Math.floor(Math.random() * decorations.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 8 + 10) + 's';
        el.style.animationDelay = Math.random() * 5 + 's';
        el.style.fontSize = (Math.random() * 10 + 15) + 'px';
        container.appendChild(el);
        
        setTimeout(() => {
            el.remove();
        }, 18000);
    }
    
    for (let i = 0; i < 15; i++) {
        setTimeout(createItem, Math.random() * 3000);
    }
    
    setInterval(createItem, 800);
}

// Also run floating decorations on wish pages without a landing
if (!document.getElementById('landing') && document.getElementById('floating-decorations')) {
    createFloatingDecorations();
}