document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Sembunyikan semua panel tab kecuali yang aktif pertama (jika ada)
    // dan pastikan tombol yang sesuai juga aktif.
    let activeTabFound = false;
    tabPanes.forEach(pane => {
        if (pane.classList.contains('active')) {
            pane.style.display = 'block'; // Tampilkan panel yang sudah ada kelas 'active'
            activeTabFound = true;
            // Pastikan tombol yang sesuai juga aktif
            const activeButton = document.querySelector(`.tab-button[data-tab="${pane.id}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        } else {
            pane.style.display = 'none'; // Sembunyikan panel lain
        }
    });

    // Jika tidak ada tab yang aktif secara default di HTML, aktifkan yang pertama
    if (!activeTabFound && tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons[0].classList.add('active');
        tabPanes[0].style.display = 'block';
        tabPanes[0].classList.add('active'); // Tambahkan juga kelas active ke pane
    }


    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTabId = this.dataset.tab;
            const targetPane = document.getElementById(targetTabId);

            // 1. Hapus kelas 'active' dari semua tombol
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // 2. Tambahkan kelas 'active' ke tombol yang diklik
            this.classList.add('active');

            // 3. Sembunyikan semua panel tab
            tabPanes.forEach(pane => {
                pane.style.display = 'none';
                pane.classList.remove('active');
            });

            // 4. Tampilkan panel tab yang target dan tambahkan kelas 'active'
            if (targetPane) {
                targetPane.style.display = 'block';
                targetPane.classList.add('active');
            }
        });
    });

    console.log("Sistem tab sederhana siap!");
});
