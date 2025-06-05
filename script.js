document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Fungsi untuk menampilkan tab aktif dan menyembunyikan yang lain
    function activateTab(targetTabId) {
        tabPanes.forEach(pane => {
            pane.style.display = 'none';
            pane.classList.remove('active');
            // Pause semua video di tab yang tidak aktif
            pane.querySelectorAll('video').forEach(video => video.pause());
        });
        tabButtons.forEach(btn => btn.classList.remove('active'));

        const targetButton = document.querySelector(`.tab-button[data-tab="${targetTabId}"]`);
        const targetPane = document.getElementById(targetTabId);

        if (targetButton && targetPane) {
            targetButton.classList.add('active');
            targetPane.style.display = 'block';
            targetPane.classList.add('active');

            // Jika tab yang aktif memiliki slider, inisialisasi/reset slider dan mainkan video pertama
            const activeSliderContainer = targetPane.querySelector('.video-slider-container');
            if (activeSliderContainer) {
                const sliderId = activeSliderContainer.id;
                if (sliders[sliderId]) {
                    sliders[sliderId].goToSlide(0, true); // true untuk autoplay
                }
            } else {
                 // Jika tab yang aktif adalah featured, coba mainkan video featured
                if (targetTabId === 'featured') {
                    const featuredVideo = targetPane.querySelector('.project-breakdown video');
                    if (featuredVideo) {
                        // featuredVideo.play().catch(e => console.log("Autoplay featured video diblokir:", e));
                        // Biarkan controls default saja untuk featured video, tidak perlu autoplay paksa via JS
                    }
                }
            }
        }
    }

    let defaultActiveTabId = null;
    tabButtons.forEach(button => {
        if (button.classList.contains('active')) {
            defaultActiveTabId = button.dataset.tab;
        }
    });

    if (defaultActiveTabId) {
        activateTab(defaultActiveTabId);
    } else if (tabButtons.length > 0) {
        activateTab(tabButtons[0].dataset.tab);
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            activateTab(this.dataset.tab);
        });
    });

    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- LOGIKA SLIDER VIDEO ---
    const sliders = {}; // Objek untuk menyimpan instance slider

    function initializeVideoSlider(containerId) {
        const sliderContainer = document.getElementById(containerId);
        if (!sliderContainer) {
            console.warn(`Slider container #${containerId} not found.`);
            return null;
        }

        const sliderWrapper = sliderContainer.querySelector('.video-slider-wrapper');
        const slides = Array.from(sliderContainer.querySelectorAll('.video-slide-item'));
        const prevButton = sliderContainer.querySelector('.slider-nav.prev');
        const nextButton = sliderContainer.querySelector('.slider-nav.next');
        const dotsContainer = sliderContainer.querySelector('.slider-dots');
        
        if (!sliderWrapper || slides.length === 0 || !prevButton || !nextButton || !dotsContainer) {
            console.warn(`Missing elements for slider #${containerId}.`);
            return null;
        }

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Buat dots
        dotsContainer.innerHTML = ''; // Kosongkan dots sebelumnya jika ada
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.addEventListener('click', () => goToSlide(index, true));
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));

        function updateSlider() {
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Pause semua video
            slides.forEach(slide => {
                const video = slide.querySelector('video');
                if (video && !video.paused) {
                    video.pause();
                }
            });
        }
        
        function playCurrentVideo() {
            const currentSlide = slides[currentIndex];
            const video = currentSlide.querySelector('video');
            if (video) {
                video.currentTime = 0; // Mulai dari awal
                video.play().catch(error => {
                    console.log(`Autoplay untuk video di slide ${currentIndex} diblokir atau gagal:`, error);
                    // Browser mungkin memerlukan interaksi pengguna untuk autoplay dengan suara
                });
            }
        }

        function goToSlide(index, shouldPlay = false) {
            currentIndex = (index + totalSlides) % totalSlides; // Looping
            updateSlider();
            if (shouldPlay) {
                playCurrentVideo();
            }
        }

        prevButton.addEventListener('click', () => goToSlide(currentIndex - 1, true));
        nextButton.addEventListener('click', () => goToSlide(currentIndex + 1, true));

        // Inisialisasi slider ke slide pertama
        goToSlide(0, false); // Jangan autoplay saat inisialisasi awal, biarkan tab activation yang handle

        console.log(`Slider #${containerId} initialized with ${totalSlides} slides.`);
        
        return { goToSlide, slides }; // Kembalikan objek dengan metode dan properti yang mungkin berguna
    }

    // Inisialisasi semua slider yang ada di halaman
    // Pastikan ID container slider unik
    sliders['animation-slider-container'] = initializeVideoSlider('animation-slider-container');
    sliders['editing-slider-container'] = initializeVideoSlider('editing-slider-container');

    // Ketika tab berubah, pastikan video di slider pertama tab baru dimainkan (jika ada slider)
    // Ini sudah ditangani di dalam fungsi activateTab

    console.log("Sistem tab, footer, dan slider video siap!");
});
