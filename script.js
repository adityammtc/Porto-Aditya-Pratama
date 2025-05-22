document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button')); // Ubah NodeList jadi Array
    const tabPanes = Array.from(document.querySelectorAll('.tab-pane'));   // Ubah NodeList jadi Array
    let currentActiveIndex = tabButtons.findIndex(button => button.classList.contains('active'));

    // Jika tidak ada yang aktif di HTML, set yang pertama sebagai aktif
    if (currentActiveIndex === -1 && tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
        tabPanes[0].classList.add('active');
        currentActiveIndex = 0;
    }

    // Atur posisi awal panel yang tidak aktif (selain yang pertama)
    // Ini penting karena kita tidak lagi menggunakan display:none
    tabPanes.forEach((pane, index) => {
        if (index !== currentActiveIndex) {
            pane.style.left = '100%'; // Default di kanan
            pane.style.opacity = '0';
        } else {
            pane.style.left = '0'; // Panel aktif pertama di tengah
            pane.style.opacity = '1';
        }
    });


    function showTab(targetIndex) {
        if (targetIndex === currentActiveIndex) return; // Jika tab yang sama diklik, tidak ada aksi

        const currentPane = tabPanes[currentActiveIndex];
        const targetPane = tabPanes[targetIndex];
        const currentButton = tabButtons[currentActiveIndex];
        const targetButton = tabButtons[targetIndex];

        // Hapus kelas aktif dari tombol dan panel saat ini
        currentButton.classList.remove('active');
        // currentPane.classList.remove('active'); // Kita akan atur left dan opacity manual

        // Tambah kelas aktif ke tombol dan panel target
        targetButton.classList.add('active');
        // targetPane.classList.add('active'); // Kita akan atur left dan opacity manual

        // Tentukan arah slide
        if (targetIndex > currentActiveIndex) { // Slide ke kiri (panel baru datang dari kanan)
            // Panel saat ini keluar ke kiri
            currentPane.style.left = '-100%';
            currentPane.style.opacity = '0';

            // Panel target masuk dari kanan
            targetPane.style.left = '100%'; // Pastikan posisi awal sebelum transisi
            targetPane.style.opacity = '0'; // Mulai transparan
            // Beri sedikit waktu browser untuk render posisi awal sebelum transisi
            requestAnimationFrame(() => {
                requestAnimationFrame(() => { // Double requestAnimationFrame untuk kestabilan
                    targetPane.style.left = '0';
                    targetPane.style.opacity = '1';
                });
            });

        } else { // Slide ke kanan (panel baru datang dari kiri)
            // Panel saat ini keluar ke kanan
            currentPane.style.left = '100%';
            currentPane.style.opacity = '0';

            // Panel target masuk dari kiri
            targetPane.style.left = '-100%'; // Pastikan posisi awal
            targetPane.style.opacity = '0';
             requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    targetPane.style.left = '0';
                    targetPane.style.opacity = '1';
                });
            });
        }

        // Update indeks aktif saat ini
        currentActiveIndex = targetIndex;
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            showTab(index);
        });
    });

    console.log("Sistem tab portofolio dengan slide siap!");
});
