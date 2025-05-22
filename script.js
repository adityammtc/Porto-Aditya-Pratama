document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const tabPanes = Array.from(document.querySelectorAll('.tab-pane'));
    let currentActiveButton = tabButtons.find(button => button.classList.contains('active'));
    let currentActivePane = tabPanes.find(pane => pane.classList.contains('active'));

    // Inisialisasi
    tabPanes.forEach(pane => {
        if (pane !== currentActivePane) {
            pane.style.display = 'none'; // Pastikan hanya panel aktif yang display block awal
            // Posisi transform awal sudah diatur di CSS
        } else {
            pane.style.display = 'block';
            // Agar transisi masuk tidak terjadi saat load pertama, kita set langsung
            pane.style.transform = 'translateX(0)';
            pane.style.opacity = '1';
        }
    });

    function showTab(targetTabId) {
        const targetButton = tabButtons.find(button => button.dataset.tab === targetTabId);
        const targetPane = document.getElementById(targetTabId);

        if (!targetPane || targetPane === currentActivePane || !targetButton) {
            return;
        }

        const currentIndex = tabButtons.indexOf(currentActiveButton);
        const targetIndex = tabButtons.indexOf(targetButton);

        // 1. Animasikan keluar panel saat ini
        if (currentActivePane) {
            currentActivePane.classList.remove('active'); // Hapus active agar tidak mengganggu
            if (targetIndex > currentIndex) { // Target ada di kanan, panel saat ini keluar ke kiri
                currentActivePane.classList.add('is-exiting-left');
            } else { // Target ada di kiri, panel saat ini keluar ke kanan
                currentActivePane.classList.add('is-exiting-right');
            }

            // Setelah animasi keluar selesai, sembunyikan panel lama
            currentActivePane.addEventListener('transitionend', function handleExitTransition() {
                this.style.display = 'none';
                this.classList.remove('is-exiting-left', 'is-exiting-right');
                // Kembalikan ke posisi transform default (untuk masuk dari kanan lain kali)
                this.style.transform = 'translateX(100%)';
                this.removeEventListener('transitionend', handleExitTransition);
            });
        }

        // 2. Siapkan panel target untuk masuk
        // Hapus kelas exiting jika ada (dari interaksi cepat sebelumnya)
        targetPane.classList.remove('is-exiting-left', 'is-exiting-right');

        if (targetIndex > currentIndex) { // Target dari kanan (default)
            targetPane.classList.remove('is-entering-from-left'); // Pastikan tidak dari kiri
            targetPane.style.transform = 'translateX(100%)'; // Posisi awal di kanan
        } else { // Target dari kiri
            targetPane.classList.add('is-entering-from-left');
            targetPane.style.transform = 'translateX(-100%)'; // Posisi awal di kiri
        }
        targetPane.style.opacity = '0'; // Pastikan transparan sebelum masuk
        targetPane.style.display = 'block'; // Jadikan block agar bisa dianimasikan

        // 3. Animasikan masuk panel target
        // Beri sedikit waktu browser untuk render display:block dan transform awal
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { // Double rAF untuk kestabilan
                targetPane.classList.add('active'); // Ini akan memicu transform: translateX(0) dan opacity: 1 dari CSS
                targetPane.classList.remove('is-entering-from-left'); // Hapus kelas helper
            });
        });


        // Update tombol aktif
        if (currentActiveButton) currentActiveButton.classList.remove('active');
        targetButton.classList.add('active');

        currentActiveButton = targetButton;
        currentActivePane = targetPane;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTabId = this.dataset.tab;
            showTab(targetTabId);
        });
    });

    console.log("Sistem tab dengan header sticky dan simulasi slide (transform) siap!");
});
