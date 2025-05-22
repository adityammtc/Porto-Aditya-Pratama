document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const tabPanes = Array.from(document.querySelectorAll('.tab-pane'));

    // Tentukan panel dan tombol aktif awal berdasarkan kelas 'active' di HTML
    let currentActiveButton = tabButtons.find(button => button.classList.contains('active'));
    let currentActivePane = tabPanes.find(pane => pane.classList.contains('active'));

    // Inisialisasi:
    // Sembunyikan semua panel yang tidak aktif dan siapkan posisinya
    // Panel aktif awal langsung ditampilkan tanpa animasi
    tabPanes.forEach(pane => {
        if (pane !== currentActivePane) {
            pane.style.display = 'none'; // Sembunyikan panel tidak aktif
            // Pastikan kelas-kelas animasi helper tidak ada
            pane.classList.remove('is-exiting-left', 'is-exiting-right', 'is-entering-from-left', 'active');
            // Set transform awal untuk masuk dari kanan (default)
            pane.style.transform = 'translateX(100%)';
            pane.style.opacity = '0';
        } else {
            // Panel aktif awal
            pane.style.display = 'block';
            pane.style.transform = 'translateX(0)';
            pane.style.opacity = '1';
            pane.classList.add('active'); // Pastikan kelas active ada
        }
    });

    function showTab(targetTabId) {
        const targetButton = tabButtons.find(button => button.dataset.tab === targetTabId);
        const targetPane = document.getElementById(targetTabId);

        // Jangan lakukan apa-apa jika target tidak ada atau sudah aktif
        if (!targetPane || targetPane === currentActivePane || !targetButton) {
            return;
        }

        const currentIndex = tabButtons.indexOf(currentActiveButton);
        const targetIndex = tabButtons.indexOf(targetButton);

        // 1. Animasikan keluar panel saat ini (currentActivePane)
        if (currentActivePane) {
            currentActivePane.classList.remove('active'); // Hapus 'active'
            currentActivePane.style.zIndex = '0'; // Taruh di belakang

            // Tentukan arah keluar
            if (targetIndex > currentIndex) { // Target ada di kanan, panel saat ini keluar ke kiri
                currentActivePane.classList.add('is-exiting-left');
            } else { // Target ada di kiri, panel saat ini keluar ke kanan
                currentActivePane.classList.add('is-exiting-right');
            }

            // Setelah animasi keluar selesai, sembunyikan panel lama
            // Gunakan { once: true } agar listener otomatis terhapus setelah sekali jalan
            currentActivePane.addEventListener('transitionend', function handleExit() {
                this.style.display = 'none';
                this.classList.remove('is-exiting-left', 'is-exiting-right');
                // Reset transform & opacity untuk penggunaan berikutnya (opsional, tapi baik)
                this.style.transform = 'translateX(100%)';
                this.style.opacity = '0';
            }, { once: true });
        }

        // 2. Siapkan panel target (targetPane) untuk masuk
        targetPane.classList.remove('is-exiting-left', 'is-exiting-right'); // Hapus kelas keluar jika ada
        targetPane.style.display = 'block'; // Penting: Jadikan block SEBELUM animasi
        targetPane.style.zIndex = '1'; // Taruh di depan

        // Tentukan posisi awal masuk
        if (targetIndex > currentIndex) { // Target dari kanan (panel saat ini bergerak ke kiri)
            targetPane.style.transform = 'translateX(100%)'; // Mulai dari kanan
            targetPane.classList.remove('is-entering-from-left');
        } else { // Target dari kiri (panel saat ini bergerak ke kanan)
            targetPane.style.transform = 'translateX(-100%)'; // Mulai dari kiri
            targetPane.classList.add('is-entering-from-left'); // Kelas ini sebenarnya hanya untuk penanda jika diperlukan
                                                              // karena transform diatur langsung via style
        }
        targetPane.style.opacity = '0'; // Pastikan transparan sebelum masuk

        // 3. Animasikan masuk panel target
        // Memberi browser sedikit waktu untuk "mencerna" display:block dan transform awal
        // sebelum memulai transisi ke state .active
        requestAnimationFrame(() => {
            // requestAnimationFrame lagi (atau setTimeout(0)) untuk memastikan
            // perubahan gaya sebelumnya diterapkan sebelum transisi dimulai.
            requestAnimationFrame(() => {
                targetPane.classList.add('active'); // Ini akan memicu transisi ke translateX(0) dan opacity:1
                targetPane.classList.remove('is-entering-from-left'); // Hapus kelas helper jika ada
            });
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

    console.log("Sistem tab dengan header sticky dan transisi slide siap!");
});
