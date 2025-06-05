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
                if (sliders[sliderId] && sliders[sliderId].slides.length > 0) { // Pastikan ada slide
                    sliders[sliderId].goToSlide(0, true); // true untuk autoplay
                } else if (sliders[sliderId] && sliders[sliderId].slides.length === 0) {
                    // Handle kasus slider kosong jika diperlukan (mis. tampilkan pesan)
                    console.log(`Slider #${sliderId} tidak memiliki slide.`);
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
            // console.warn(`Slider container #${containerId} not found.`); // Komentari jika terlalu berisik
            return null;
        }

        const sliderWrapper = sliderContainer.querySelector('.video-slider-wrapper');
        const slideItems = Array.from(sliderContainer.querySelectorAll('.video-slide-item')); // Ganti nama variabel agar lebih jelas
        const prevButton = sliderContainer.querySelector('.slider-nav.prev');
        const nextButton = sliderContainer.querySelector('.slider-nav.next');
        const dotsContainer = sliderContainer.querySelector('.slider-dots');
        
        if (!sliderWrapper || !prevButton || !nextButton || !dotsContainer) { // Tidak perlu cek slideItems.length di sini
            // console.warn(`Missing essential elements for slider #${containerId}.`); // Komentari jika terlalu berisik
            return null;
        }
        
        if (slideItems.length === 0) {
            // console.log(`No slides found for slider #${containerId}. Hiding navigation.`); // Komentari jika terlalu berisik
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            dotsContainer.style.display = 'none';
            return { goToSlide: () => {}, slides: [] }; // Kembalikan objek dummy jika tidak ada slide
        } else {
            prevButton.style.display = 'flex'; // Pastikan tombol terlihat jika ada slide
            nextButton.style.display = 'flex';
            dotsContainer.style.display = 'block'; // atau 'flex' jika dots mau di-flexbox
        }


        let currentIndex = 0;
        const totalSlides = slideItems.length;

        // Buat dots
        dotsContainer.innerHTML = ''; 
        slideItems.forEach((_, index) => {
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

            slideItems.forEach((slide, idx) => {
                const video = slide.querySelector('video');
                if (video && !video.paused && idx !== currentIndex) { // Pause video yang tidak aktif
                    video.pause();
                }
            });
        }
        
        function playCurrentVideo() {
            if (totalSlides === 0) return; // Jangan lakukan apa-apa jika tidak ada slide
            const currentSlide = slideItems[currentIndex];
            const video = currentSlide.querySelector('video');
            if (video) {
                video.currentTime = 0; 
                video.play().catch(error => {
                    console.log(`Autoplay untuk video di slide ${currentIndex} (${containerId}) diblokir atau gagal:`, error);
                });
            }
        }

        function goToSlide(index, shouldPlay = false) {
            if (totalSlides === 0) return; // Jangan lakukan apa-apa jika tidak ada slide
            currentIndex = (index + totalSlides) % totalSlides; 
            updateSlider();
            if (shouldPlay) {
                playCurrentVideo();
            }
        }

        prevButton.addEventListener('click', () => goToSlide(currentIndex - 1, true));
        nextButton.addEventListener('click', () => goToSlide(currentIndex + 1, true));

        goToSlide(0, false); 
        
        // console.log(`Slider #${containerId} initialized with ${totalSlides} slides.`); // Komentari jika terlalu berisik
        
        return { goToSlide, slides: slideItems }; 
    }

    sliders['animation-slider-container'] = initializeVideoSlider('animation-slider-container');
    sliders['editing-slider-container'] = initializeVideoSlider('editing-slider-container');
    
    // Panggil activateTab untuk tab yang aktif saat load, untuk memastikan video pertama dimainkan jika ada slider
    if (defaultActiveTabId) {
        activateTab(defaultActiveTabId);
    } else if (tabButtons.length > 0 && tabButtons[0].dataset.tab) {
        activateTab(tabButtons[0].dataset.tab);
    }


    console.log("Sistem tab, footer, dan slider video siap!");
});
