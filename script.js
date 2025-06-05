/* Reset Dasar & Gaya Global - TETAP SAMA */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #121212;
    color: #e0e0e0;
    font-size: 16px;
}

.portfolio-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

h1, h2, h3, h4, h5, h6 {
    color: #ffffff;
    margin-top: 0;
    margin-bottom: 0.75em;
}

p {
    margin-bottom: 1em;
}

a {
    color: #bb86fc;
    text-decoration: none;
}

a:hover {
    color: #ffffff;
    text-decoration: underline;
}

/* Header Sticky - TETAP SAMA */
.site-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: #1a1a1a;
    padding: 20px 0;
    border-bottom: 2px solid #333333;
    text-align: center;
}

.site-header h1 {
    font-size: 2.5em; 
    letter-spacing: 0.5px; 
    margin-bottom: 20px;
    margin-top: 0;
}

/* Navigasi Tab - TETAP SAMA */
.tab-navigation ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
}

.tab-navigation .tab-button {
    background-color: #2a2a2a;
    color: #e0e0e0;
    border: 1px solid #444;
    padding: 12px 25px;
    font-size: 1.1em;
    font-weight: 500;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
    outline: none;
    margin-bottom: 5px;
}

.tab-navigation .tab-button:hover {
    background-color: #3a3a3a;
    border-color: #666;
    transform: translateY(-2px);
}

.tab-navigation .tab-button.active {
    background-color: #bb86fc;
    color: #121212;
    border-color: #bb86fc;
    font-weight: bold;
    box-shadow: 0 0 10px rgba(187, 134, 252, 0.3);
}

/* Area Konten Tab - TETAP SAMA */
.tab-content-area {
    padding-top: 30px;
    padding-bottom: 30px;
}

.tab-pane {
    display: none;
    padding: 20px;
    background-color: #1e1e1e;
    border-radius: 8px;
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
}

.tab-pane.active {
    display: block;
}

.tab-pane h2 {
    font-size: 2.2em;
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
    margin-bottom: 25px;
    margin-top: 0;
}

.project-breakdown h3 {
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 1.5em;
    color: #f0f0f0;
}

/* Styling untuk Video Wrapper (Umum dan Featured Project) */
.video-wrapper { 
    width: 100%;
    background-color: #222; 
    border-radius: 6px;
    overflow: hidden;      
    position: relative;
    margin-bottom: 10px; /* Jarak ke caption */
}

.video-wrapper video {
    max-width: 100%;
    width: 100%;
    height: auto;
    display: block;
    border-radius: 4px; 
}

.video-caption { 
    font-size: 0.9em;
    color: #ccc;
    text-align: center;
    padding-top: 5px; 
    margin-bottom: 0; 
}

/* Styling untuk Image Wrapper (UV Map) - Tetap sama */
.image-wrapper {
    width: 100%; background-color: #2a2a2a; border-radius: 6px;
    margin-top: 15px; margin-bottom: 25px; padding: 15px;
    box-sizing: border-box; text-align: center;
}
.image-wrapper img { max-width: 100%; height: auto; display: inline-block; border-radius: 4px; }
.image-wrapper p { color: #888; margin: 0; }


/* Styling untuk Model Sketchfab di Featured Project - Tetap sama */
.featured-model-wrapper {
    width: 100%; background-color: #222; border-radius: 6px;
    margin-top: 15px; margin-bottom: 25px; padding: 0; overflow: hidden;
}
.featured-model-wrapper .sketchfab-embed-wrapper { width: 100%; height: 450px; }
.featured-model-wrapper .sketchfab-embed-wrapper iframe { width: 100%; height: 100%; border: none; }

/* --- STYLING GALERI TEXTURING (GRID) - TETAP SAMA --- */
#texturing .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-top: 20px;
}

/* Ini adalah item individual dalam grid (UNTUK TEXTURING) */
#texturing .gallery-item { 
    background-color: #2a2a2a;
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

#texturing .gallery-item .sketchfab-embed-wrapper {
    width: 100%; height: 300px; position: relative;
    background-color: #222; border-radius: 6px; overflow: hidden;
}
#texturing .gallery-item .sketchfab-embed-wrapper iframe { display: block; width: 100%; height: 100%; border: none; }
#texturing .gallery-item .sketchfab-embed-wrapper p {
    font-size: 12px !important; font-weight: normal !important; margin: 8px 5px 0px 5px !important;
    color: #b0b0b0 !important; text-align: center; line-height: 1.4; padding-top: 0;
}
#texturing .gallery-item .sketchfab-embed-wrapper p a { font-weight: bold !important; color: #bb86fc !important; }
#texturing .gallery-item .sketchfab-embed-wrapper p a:hover { color: #ffffff !important; text-decoration: underline !important; }


/* --- STYLING UNTUK VIDEO SLIDER (BARU) --- */
.video-slider-container {
    position: relative;
    max-width: 800px; /* Lebar maksimum slider, sesuaikan jika perlu */
    margin: 30px auto; /* Pusatkan slider */
    background-color: #2a2a2a; /* Latar belakang kontainer slider */
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;
}

.video-slider {
    position: relative;
    overflow: hidden; /* Penting untuk menyembunyikan slide yang tidak aktif */
}

/* .gallery-item di dalam .video-slider adalah slide individual */
.video-slider .gallery-item {
    display: none; /* Sembunyikan semua slide secara default */
    animation: fadeEffect 0.7s ease-in-out; /* Efek fade sederhana */
    /* Hapus style grid jika ada yang terwarisi */
    /* max-width, margin-left, margin-right yang mengatur item grid dihapus */
}

.video-slider .gallery-item.active-slide {
    display: block; /* Tampilkan slide yang aktif */
}

/* Styling untuk video wrapper vertikal di dalam slider */
.video-slider .vertical-video-wrapper {
    max-width: 360px; /* Batasi lebar video vertikal agar tidak terlalu lebar */
    margin-left: auto;
    margin-right: auto;
}


@keyframes fadeEffect {
    from {opacity: 0.6;}
    to {opacity: 1;}
}

.slider-button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%); /* Pusatkan tombol secara vertikal */
    width: auto;
    padding: 16px;
    color: white;
    font-weight: bold;
    font-size: 24px;
    background-color: rgba(0,0,0,0.4);
    border: none;
    user-select: none; /* Cegah teks tombol terseleksi */
    transition: background-color 0.3s ease;
    z-index: 10; /* Pastikan tombol di atas konten slide */
}

.slider-button.prev {
    left: -50px; /* Posisikan di luar kontainer sedikit */
    border-radius: 0 5px 5px 0;
}

.slider-button.next {
    right: -50px; /* Posisikan di luar kontainer sedikit */
    border-radius: 5px 0 0 5px;
}

/* Penyesuaian posisi tombol jika layar kecil */
@media (max-width: 900px) {
    .slider-button.prev {
        left: 5px; /* Masuk ke dalam kontainer */
    }
    .slider-button.next {
        right: 5px; /* Masuk ke dalam kontainer */
    }
}


.slider-button:hover {
    background-color: rgba(187, 134, 252, 0.7); /* Warna hover ungu */
}

.slider-button:disabled {
    background-color: rgba(0,0,0,0.2);
    color: #666;
    cursor: default;
    opacity: 0.5;
}


/* Hapus atau komentari styling grid untuk #animation dan #editing yang lama */
/* 
#animation .gallery, #editing .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}
#animation .gallery-item, #editing .gallery-item {
    background-color: #2a2a2a;
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}
#video-sonetto.gallery-item,
#video-die-with-smile.gallery-item {
    max-width: 360px; 
    margin-left: auto; 
    margin-right: auto;
}
*/


/* Footer - TETAP SAMA */
.site-footer {
    text-align: center; padding: 25px 0; background-color: #1f1f1f;
    color: #aaaaaa; border-top: 2px solid #333333;
    font-size: 0.9em; margin-top: 30px;
}
