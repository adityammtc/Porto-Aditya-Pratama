document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const tabPanes = Array.from(document.querySelectorAll('.tab-pane'));
    let currentActivePane = tabPanes.find(pane => pane.classList.contains('active'));

    // Inisialisasi: Pastikan hanya panel aktif awal yang terlihat
    tabPanes.forEach(pane => {
        if (pane === currentActivePane) {
            pane.style.display = 'block'; // Langsung block
            // Set opacity ke 1 setelah sedikit delay agar transisi terlihat saat load pertama (jika diinginkan)
            // setTimeout(() => { pane.style.opacity = '1'; }, 50); // Optional, bisa juga langsung opacity 1
            pane.style.opacity = '1'; // Atau langsung saja
        } else {
            pane.style.display = 'none';
            pane.style.opacity = '0';
        }
    });

    function showTab(targetTabId) {
        const targetPane = document.getElementById(targetTabId);

        if (!targetPane || targetPane === currentActivePane) {
            return; // Jika panel tidak ada atau sama dengan yang aktif, tidak ada aksi
        }

        // Sembunyikan panel yang aktif saat ini (fade out)
        if (currentActivePane) {
            currentActivePane.style.opacity = '0';
            // Tunggu transisi fade out selesai sebelum mengganti display ke none
            currentActivePane.addEventListener('transitionend', function handleTransitionEnd() {
                if (this.style.opacity === '0') { // Pastikan ini karena fade out
                    this.style.display = 'none';
                    this.classList.remove('active');
                }
                this.removeEventListener('transitionend', handleTransitionEnd);
            });
        }

        // Tampilkan panel target (fade in)
        targetPane.style.display = 'block';
        targetPane.classList.add('active');
        // Beri sedikit waktu agar display:block diterapkan sebelum transisi opacity
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { // Double rAF untuk kestabilan
                 targetPane.style.opacity = '1';
            });
        });


        // Update tombol aktif
        tabButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.tab === targetTabId) {
                button.classList.add('active');
            }
        });

        currentActivePane = targetPane; // Update panel aktif saat ini
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTabId = this.dataset.tab;
            showTab(targetTabId);
        });
    });

    console.log("Sistem tab portofolio dengan header sticky dan fade transition siap!");
});
