document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const tabPanes = Array.from(document.querySelectorAll('.tab-pane'));

    let currentActiveButton = tabButtons.find(button => button.classList.contains('active'));
    let currentActivePane = tabPanes.find(pane => pane.classList.contains('active'));
    let isTransitioning = false;

    // Inisialisasi awal panel
    // Panel yang aktif di HTML akan memiliki style dari CSS .active
    // Panel lain kita sembunyikan dan siapkan
    tabPanes.forEach(pane => {
        if (pane !== currentActivePane) {
            pane.style.display = 'none';
            pane.style.opacity = '0';
            // Kita tidak set transform awal di sini, akan diatur saat showTab
        } else {
            // Untuk panel aktif awal, pastikan properti dasar ada
            // CSS .active sudah mengatur display, opacity, transform, position
        }
    });

    function showTab(targetTabId) {
        if (isTransitioning) return; // Abaikan klik jika sedang transisi

        const targetButton = tabButtons.find(button => button.dataset.tab === targetTabId);
        const targetPane = document.getElementById(targetTabId);

        // Jika target tidak valid atau sama dengan yang aktif, jangan lakukan apa-apa
        if (!targetPane || targetPane === currentActivePane || !targetButton) {
            return;
        }

        isTransitioning = true; // Mulai transisi

        const currentIndex = tabButtons.indexOf(currentActiveButton);
        const targetIndex = tabButtons.indexOf(targetButton);
        const slideToLeft = targetIndex > currentIndex; // True jika target ada di kanan (panel lama geser ke kiri)

        // 1. Animasikan KELUAR panel saat ini (currentActivePane)
        if (currentActivePane) {
            const paneToExit = currentActivePane;
            
            // Siapkan panel yang keluar untuk animasi
            paneToExit.style.position = 'absolute'; // Agar tidak mengganggu flow dan bisa ditumpuk
            paneToExit.style.top = '0';
            paneToExit.style.left = '0';
            paneToExit.style.width = '100%'; // Pastikan lebarnya tetap
            paneToExit.style.zIndex = '0';    // Di bawah panel yang akan masuk

            paneToExit.classList.remove('active'); // Hapus kelas active

            // Memicu animasi keluar dengan kelas CSS
            if (slideToLeft) {
                paneToExit.classList.add('is-exiting-left'); // CSS: transform: translateX(-100%); opacity: 0;
            } else {
                paneToExit.classList.add('is-exiting-right'); // CSS: transform: translateX(100%); opacity: 0;
            }
            
            // Setelah transisi keluar selesai
            paneToExit.addEventListener('transitionend', function handleExitTransition(event) {
                // Pastikan event dari properti yang benar untuk menghindari trigger ganda
                if (event.propertyName !== 'transform' && event.propertyName !== 'opacity') {
                    return;
                }
                this.style.display = 'none'; // Sembunyikan sepenuhnya
                this.classList.remove('is-exiting-left', 'is-exiting-right');
                // Reset transform dan opacity jika perlu untuk penggunaan berikutnya (opsional, CSS sudah menangani)
                // this.style.transform = ''; 
                // this.style.opacity = '';
                this.removeEventListener('transitionend', handleExitTransition);
            });
        }

        // 2. Siapkan panel TARGET (targetPane) untuk MASUK
        targetPane.style.display = 'block';    // Tampilkan agar bisa dianimasikan
        targetPane.style.position = 'absolute'; // Juga absolute selama persiapan dan transisi masuk
        targetPane.style.top = '0';
        targetPane.style.left = '0';
        targetPane.style.width = '100%';
        targetPane.style.zIndex = '1';       // Di atas panel yang keluar
        targetPane.classList.remove('is-exiting-left', 'is-exiting-right'); // Hapus sisa kelas keluar jika ada

        // Atur posisi awal sebelum animasi masuk (dari arah yang berlawanan dengan keluarnya panel lama)
        if (slideToLeft) { // Target masuk dari kanan
            targetPane.style.transform = 'translateX(100%)';
        } else { // Target masuk dari kiri
            targetPane.style.transform = 'translateX(-100%)';
        }
        targetPane.style.opacity = '0'; // Mulai transparan

        // 3. Animasikan MASUK panel target
        // Beri sedikit waktu (satu frame) agar browser mencatat perubahan display dan transform awal
        requestAnimationFrame(() => {
            // void targetPane.offsetWidth; // Paksa reflow/repaint jika perlu (kadang membantu)

            targetPane.classList.add('active'); // Ini akan memicu transisi CSS ke translateX(0) dan opacity:1
                                                // CSS .active juga akan mengatur position: relative;

            targetPane.addEventListener('transitionend', function handleEnterTransition(event) {
                if (event.propertyName !== 'transform' && event.propertyName !== 'opacity') {
                    return;
                }
                // Setelah animasi masuk selesai, pastikan position: relative; (sudah diatur oleh .tab-pane.active di CSS)
                // this.style.position = 'relative'; // Seharusnya tidak perlu jika CSS sudah benar
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
            showTab(this.dataset.tab);
        });
    });

    console.log("Sistem tab dengan transisi slide (revisi) siap!");
});
