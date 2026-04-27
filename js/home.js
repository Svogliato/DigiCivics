/**
 * home.js - Homepage specific logic
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ['Spazio.', 'Mondo.', 'Futuro.', 'Responsabilità.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = isDeleting ? 40 : 120;

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2500; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; 
            }

            setTimeout(type, typingSpeed);
        }
        setTimeout(type, 1000);
    }

    // --- 2. Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    let started = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Use Intersection Observer to start counters when visible
    if (counters.length > 0) {
        const statsSection = document.querySelector('.stats-section');
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                started = true;
                startCounters();
            }
        }, { threshold: 0.5 });
        
        if(statsSection) observer.observe(statsSection);
    }

});
