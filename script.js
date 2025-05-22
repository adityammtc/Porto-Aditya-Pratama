document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Fungsi untuk menampilkan tab tertentu dan menyembunyikan yang lain
    function showTab(tabId) {
        // Sembunyikan semua panel konten dan hapus kelas aktif dari tombol
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            // Jika Anda ingin memastikan display: none diterapkan sebelum transisi berikutnya
            // pane.style.display = 'none'; // Baris ini bisa di-uncomment jika ada masalah flicker
        });
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Tampilkan panel yang dipilih dan set tombolnya sebagai aktif
        const selectedPane = document.getElementById(tabId);
        const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);

        if (selectedPane && selectedButton) {
            // Penting: set display block SEBELUM memicu transisi opacity/transform
            // Untuk browser modern, perubahan kelas yang memicu display:block dan opacity/transform
            // dalam satu siklus event loop biasanya cukup.
            // Jika ada masalah, Anda bisa memaksa reflow atau menggunakan setTimeout(..., 0)
            // tapi biasanya tidak diperlukan.

            selectedPane.classList.add('active');
            selectedButton.classList.add('active');
        } else {
            console.error(`Tab atau pane dengan ID "${tabId}" tidak ditemukan.`);
        }
    }

    // Tambahkan event listener ke setiap tombol tab
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabIdToActivate = this.dataset.tab; // Ambil nilai dari data-tab
            showTab(tabIdToActivate);
        });
    });

    // (Opsional) Tampilkan tab pertama secara default jika tidak ada yang 'active' di HTML
    // Kode HTML kita sudah menandai tab pertama sebagai aktif, jadi ini lebih sebagai pengaman.
    const initiallyActiveButton = document.querySelector('.tab-button.active');
    if (initiallyActiveButton) {
        const initialTabId = initiallyActiveButton.dataset.tab;
        // Kita sudah set kelas 'active' di HTML, jadi tidak perlu panggil showTab() lagi
        // kecuali jika kita ingin memastikan logikanya berjalan.
        // Untuk sekarang, biarkan saja karena HTML sudah benar.
    } else if (tabButtons.length > 0) {
        // Jika tidak ada yang aktif di HTML, aktifkan yang pertama
        showTab(tabButtons[0].dataset.tab);
    }

    console.log("Sistem tab portofolio siap!");
});
