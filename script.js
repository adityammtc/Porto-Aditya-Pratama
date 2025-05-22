document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Sembunyikan semua panel tab kecuali yang pertama (atau yang memiliki kelas 'active' di HTML)
    tabPanes.forEach(pane => {
        if (!pane.classList.contains('active')) {
            pane.style.display = 'none';
        } else {
            pane.style.display = 'block'; // Pastikan yang aktif terlihat
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTabId = this.dataset.tab; // Mendapatkan nilai dari atribut data-tab

            // 1. Sembunyikan semua panel tab
            tabPanes.forEach(pane => {
                pane.style.display = 'none';
                pane.classList.remove('active'); // Hapus kelas active dari semua panel
            });

            // 2. Hapus kelas 'active' dari semua tombol tab
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // 3. Tampilkan panel tab yang ditargetkan
            const targetPane = document.getElementById(targetTabId);
            if (targetPane) {
                targetPane.style.display = 'block';
                targetPane.classList.add('active'); // Tambahkan kelas active ke panel target
            }

            // 4. Tambahkan kelas 'active' ke tombol yang diklik
            this.classList.add('active');
        });
    });

    console.log("Sistem tab sederhana siap!");
});
