document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const tabPanes = Array.from(document.querySelectorAll('.tab-pane'));
    let currentActiveIndex = -1;

    // Tentukan tab aktif awal dari HTML atau default ke yang pertama
    const initiallyActiveButton = tabButtons.find(button => button.classList.contains('active'));
    if (initiallyActiveButton) {
        currentActiveIndex = tabButtons.indexOf(initiallyActiveButton);
    } else if (tabButtons.length > 0) {
        currentActiveIndex = 0; // Default ke tab pertama jika tidak ada yang aktif di HTML
        if(tabButtons[0]) tabButtons[0].classList.add('active'); // Periksa apakah tabButtons[0] ada
    }

    // Inisialisasi posisi dan status panel
    tabPanes.forEach((pane, index) => {
        if (index === currentActiveIndex) {
            pane.style.left = '0';
            pane.style.opacity = '1';
            pane.classList.add('active'); // Pastikan kelas 'active' ada untuk styling visibility & max-height
        } else {
            pane.style.left = '100%'; // Default di kanan
            pane.style.opacity = '0';
            pane.classList.remove('active'); // Pastikan tidak ada 'active' di panel lain
        }
    });

    function showTab(targetIndex) {
        if (targetIndex === currentActiveIndex || targetIndex < 0 || targetIndex >= tabPanes.length) {
            return; // Tidak ada aksi jika tab sama, atau indeks tidak valid
        }

        const currentPane = tabPanes[currentActiveIndex];
        const targetPane = tabPanes[targetIndex];
        const currentButton = tabButtons[currentActiveIndex];
        const targetButton = tabButtons[targetIndex];

        // Nonaktifkan tombol dan panel saat ini
        if(currentButton) currentButton.classList.remove('active');
        if(currentPane) {
            currentPane.classList.remove('active'); // Ini akan memicu visibility: hidden dll.
        }


        // Segera aktifkan tombol target
        if(targetButton) targetButton.classList.add('active');

        // Tentukan arah slide dan siapkan panel target di luar layar
        if (targetIndex > currentActiveIndex) { // Panel baru datang dari kanan
            if(currentPane) {
                currentPane.style.left = '-100%';
                currentPane.style.opacity = '0';
            }
            if(targetPane) {
                targetPane.style.left = '100%';
                targetPane.style.opacity = '0';
            }
        } else { // Panel baru datang dari kiri
            if(currentPane) {
                currentPane.style.left = '100%';
                currentPane.style.opacity = '0';
            }
            if(targetPane) {
                targetPane.style.left = '-100%';
                targetPane.style.opacity = '0';
            }
        }

        // Beri sedikit waktu browser untuk memproses posisi awal sebelum transisi
        requestAnimationFrame(() => {
            if(targetPane) {
                targetPane.classList.add('active');
                targetPane.style.left = '0';
                targetPane.style.opacity = '1';
            }
        });

        currentActiveIndex = targetIndex;
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            showTab(index);
        });
    });

    // Jalankan inisialisasi untuk tab pertama jika ada
    if (currentActiveIndex !== -1 && tabPanes[currentActiveIndex]) {
        // Tidak perlu memanggil showTab, karena inisialisasi di atas sudah menangani tampilan awal
        // Cukup pastikan tab aktif pertama terlihat
        tabPanes[currentActiveIndex].style.left = '0';
        tabPanes[currentActiveIndex].style.opacity = '1';
        tabPanes[currentActiveIndex].classList.add('active');
    }


    console.log("Sistem tab portofolio dengan slide kiri-kanan dan scroll internal (v2) siap!");
});
