document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const tabPanes = Array.from(document.querySelectorAll('.tab-pane'));
    const tabContentArea = document.querySelector('.tab-content-area'); // Ambil container tab

    let currentActiveButton = tabButtons.find(button => button.classList.contains('active'));
    let currentActivePane = tabPanes.find(pane => pane.classList.contains('active'));
    let isTransitioning = false; // Flag untuk mencegah klik ganda saat transisi

    // Inisialisasi:
    tabPanes.forEach(pane => {
        if (pane !== currentActivePane) {
            pane.style.opacity = '0'; // Mulai transparan
            pane.style.transform = 'translateX(100%)'; // Mulai dari sisi kanan
            pane.style.position = 'absolute'; // Semua panel non-aktif diposisikan absolut
            pane.style.top = '0';
            pane.style.left = '0';
            pane.style.display = 'none'; // Awalnya sembunyikan
            pane.classList.remove('active', 'is-exiting-left', 'is-exiting-right');
        } else {
            // Panel aktif awal
            pane.style.display = 'block';
            pane.style.position = 'relative'; // Panel aktif adalah relatif
            pane.style.opacity = '1';
            pane.style.transform = 'translateX(0)';
            pane.classList.add('active');
        }
    });

    function showTab(targetTabId) {
        if (isTransitioning) return; // Jika sedang transisi, abaikan klik

        const targetButton = tabButtons.find(button => button.dataset.tab === targetTabId);
        const targetPane = document.getElementById(targetTabId);

        if (!targetPane || targetPane === currentActivePane || !targetButton) {
            return;
        }

        isTransitioning = true; // Mulai transisi

        const currentIndex = tabButtons.indexOf(currentActiveButton);
        const targetIndex = tabButtons.indexOf(targetButton);

        // 1. Animasikan keluar panel saat ini (currentActivePane)
        if (currentActivePane) {
            const paneToExit = currentActivePane; // Simpan referensi
            paneToExit.classList.remove('active');
            paneToExit.style.zIndex = '0';
            // Penting: panel yang keluar harus absolute agar tidak menggeser
            paneToExit.style.position = 'absolute';


            if (targetIndex > currentIndex) {
                paneToExit.classList.add('is-exiting-left'); // Keluar ke kiri
            } else {
                paneToExit.classList.add('is-exiting-right'); // Keluar ke kanan
            }

            // Dengarkan transitionend di panel yang KELUAR
            paneToExit.addEventListener('transitionend', function handleExitTransition(event) {
                // Pastikan event berasal dari properti transform atau opacity
                if (event.propertyName !== 'transform' && event.propertyName !== 'opacity') {
                    return;
                }
                this.style.display = 'none';
                this.classList.remove('is-exiting-left', 'is-exiting-right');
                // Reset ke posisi siap masuk (default kanan)
                this.style.transform = 'translateX(100%)';
                this.style.opacity = '0';
                // this.style.position = 'absolute'; // sudah absolute
                this.removeEventListener('transitionend', handleExitTransition); // Hapus listener
            });
        }

        // 2. Siapkan panel target (targetPane) untuk masuk
        targetPane.classList.remove('is-exiting-left', 'is-exiting-right');
        targetPane.style.position = 'absolute'; // Sementara absolute selama persiapan
        targetPane.style.top = '0';
        targetPane.style.left = '0';
        targetPane.style.display = 'block'; // Tampilkan SEKARANG agar transform awal bisa diterapkan
        targetPane.style.zIndex = '1';    // Di atas panel yang keluar

        // Tentukan posisi awal masuk sebelum animasi
        if (targetIndex > currentIndex) { // Target masuk dari kanan
            targetPane.style.transform = 'translateX(100%)';
        } else { // Target masuk dari kiri
            targetPane.style.transform = 'translateX(-100%)';
        }
        targetPane.style.opacity = '0'; // Pastikan transparan

        // 3. Animasikan masuk panel target
        // Beri sedikit waktu (satu frame) agar browser mencatat perubahan display dan transform awal
        requestAnimationFrame(() => {
            // Paksa reflow/repaint (opsional, tapi kadang membantu)
            // void targetPane.offsetWidth;

            targetPane.classList.add('active'); // Ini akan memicu transisi CSS ke translateX(0) dan opacity:1
            targetPane.style.position = 'relative'; // Setelah mulai animasi, jadikan relatif

            // Dengarkan transitionend di panel yang MASUK untuk menandai akhir transisi keseluruhan
            targetPane.addEventListener('transitionend', function handleEnterTransition(event) {
                if (event.propertyName !== 'transform' && event.propertyName !== 'opacity') {
                    return;
                }
                isTransitioning = false; // Transisi selesai
                this.removeEventListener('transitionend', handleEnterTransition);
            }, { once: true }); // { once: true } akan menghapus listener setelah sekali jalan
        });


        // 4. Update tombol aktif
        if (currentActiveButton) currentActiveButton.classList.remove('active');
        targetButton.classList.add('active');

        // 5. Update referensi panel dan tombol aktif saat ini
        currentActiveButton = targetButton;
        currentActivePane = targetPane;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTabId = this.dataset.tab;
            showTab(targetTabId);
        });
    });

    console.log("Sistem tab dengan transisi slide (revisi) siap!");
});
