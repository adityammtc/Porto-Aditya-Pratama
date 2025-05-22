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
        tabButtons[0].classList.add('active');
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
        currentButton.classList.remove('active');
        currentPane.classList.remove('active'); // Ini akan memicu visibility: hidden dll.

        // Segera aktifkan tombol target
        targetButton.classList.add('active');

        // Tentukan arah slide dan siapkan panel target di luar layar
        if (targetIndex > currentActiveIndex) { // Panel baru datang dari kanan
            currentPane.style.left = '-100%'; // Panel saat ini keluar ke kiri
            currentPane.style.opacity = '0';

            targetPane.style.left = '100%';   // Panel target mulai dari kanan
            targetPane.style.opacity = '0';
        } else { // Panel baru datang dari kiri
            currentPane.style.left = '100%';  // Panel saat ini keluar ke kanan
            currentPane.style.opacity = '0';

            targetPane.style.left = '-100%';  // Panel target mulai dari kiri
            targetPane.style.opacity = '0';
        }

        // Beri sedikit waktu browser untuk memproses posisi awal sebelum transisi
        requestAnimationFrame(() => {
            // Sekarang set kelas 'active' pada panel target dan geser ke posisi akhir
            // Ini penting agar styling seperti max-height dari kelas .active diterapkan
            // bersamaan dengan dimulainya transisi masuk.
            targetPane.classList.add('active');
            targetPane.style.left = '0';
            targetPane.style.opacity = '1';
        });

        currentActiveIndex = targetIndex;
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            showTab(index);
        });
    });

    console.log("Sistem tab portofolio dengan slide kiri-kanan dan scroll internal siap!");
});
