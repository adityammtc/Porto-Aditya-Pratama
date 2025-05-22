document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Fungsi untuk menampilkan tab aktif dan menyembunyikan yang lain
    function activateTab(targetTabId) {
        // 1. Hapus kelas 'active' dari semua tombol
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // 2. Sembunyikan semua panel tab
        tabPanes.forEach(pane => {
            pane.style.display = 'none';
            pane.classList.remove('active');
        });

        // 3. Temukan tombol dan panel yang target
        const targetButton = document.querySelector(`.tab-button[data-tab="${targetTabId}"]`);
        const targetPane = document.getElementById(targetTabId);

        if (targetButton && targetPane) {
            // 4. Tambahkan kelas 'active' ke tombol yang diklik
            targetButton.classList.add('active');
            // 5. Tampilkan panel tab yang target dan tambahkan kelas 'active'
            targetPane.style.display = 'block';
            targetPane.classList.add('active');
        }
    }

    // Cek apakah ada tab yang sudah memiliki kelas 'active' dari HTML
    let defaultActiveTabId = null;
    tabButtons.forEach(button => {
        if (button.classList.contains('active')) {
            defaultActiveTabId = button.dataset.tab;
        }
    });

    if (defaultActiveTabId) {
        activateTab(defaultActiveTabId);
    } else if (tabButtons.length > 0) {
        // Jika tidak ada, aktifkan tab pertama secara default
        activateTab(tabButtons[0].dataset.tab);
    }

    // Tambahkan event listener ke setiap tombol tab
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            activateTab(this.dataset.tab);
        });
    });

    // Update tahun di footer secara otomatis
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    console.log("Sistem tab dan footer siap!");
});
