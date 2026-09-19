document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Floating Emoji Particles
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
        const emojis = ['📖', '✨', '📚', '🖋️', '⭐', '🏆', '📈', '💡'];
        for (let i = 0; i < 16; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            p.style.left = `${Math.random() * 95}%`;
            p.style.top = `${Math.random() * 95}%`;
            p.style.animationDelay = `${Math.random() * 6}s`;
            p.style.animationDuration = `${8 + Math.random() * 6}s`;
            p.style.fontSize = `${1.1 + Math.random() * 1.4}rem`;
            particleContainer.appendChild(p);
        }
    }

    // 3. Stat Counter Numbers Animation
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        let hasCounted = false;
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !hasCounted) {
                    hasCounted = true;
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-count'), 10);
                        if (isNaN(target)) return;
                        const duration = 2000;
                        let startTime = null;

                        function step(currentTime) {
                            if (!startTime) startTime = currentTime;
                            const progress = Math.min((currentTime - startTime) / duration, 1);
                            const current = Math.floor(progress * target);
                            counter.textContent = target >= 1000 ? current.toLocaleString() : current;
                            if (progress < 1) {
                                requestAnimationFrame(step);
                            } else {
                                counter.textContent = target >= 1000 ? target.toLocaleString() : target;
                            }
                        }
                        requestAnimationFrame(step);
                    });
                }
            }, { threshold: 0.25 });
            observer.observe(statsSection);
        }
    }
});