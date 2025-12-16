# WebGIS Indeks Kekumuhan Kabupaten Indramayu

WebGIS untuk pemetaan dan analisis tingkat kekumuhan permukiman di Kabupaten Indramayu.

## 🚀 Deployment ke GitHub Pages

### Metode 1: Menggunakan GitHub Actions (Otomatis)

1. **Setup Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO-NAME.git
   git push -u origin main
   ```

2. **Aktifkan GitHub Pages:**
   - Buka repository di GitHub
   - Masuk ke **Settings** → **Pages**
   - Di **Source**, pilih **GitHub Actions**
   - Workflow akan otomatis berjalan setiap kali push ke branch main

3. **Akses Website:**
   - URL: `https://USERNAME.github.io/REPO-NAME/`
   - Tunggu 2-3 menit untuk build pertama kali

### Metode 2: Manual dengan gh-pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```

3. **Setup GitHub Pages:**
   - Buka **Settings** → **Pages**
   - Di **Source**, pilih branch **gh-pages**
   - Klik **Save**

## 📁 Struktur Folder

```
webgis-indramayu/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions config
├── public/
│   ├── data/
│   │   ├── geotiff/           # File .tif
│   │   └── metadata.json
│   ├── _redirects             # SPA routing
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Map/
│   │   └── UI/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .nojekyll                   # Disable Jekyll
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚠️ Troubleshooting

### Error 404 pada main.jsx
**Solusi:**
- Pastikan `base: './'` ada di `vite.config.js`
- Pastikan file `.nojekyll` ada di root folder
- Clear cache browser (Ctrl + Shift + R)

### Assets tidak load
**Solusi:**
- Gunakan relative path: `./data/...` bukan `/data/...`
- Check console browser untuk error path

### Data GeoTIFF tidak muncul
**Solusi:**
- Pastikan file `.tif` ada di `public/data/geotiff/`
- Check network tab untuk status download
- Pastikan nama file di `metadata.json` sesuai

## 📝 Catatan Penting

1. **File GeoTIFF:** Letakkan semua file `.tif` di folder `public/data/geotiff/`
2. **Base Path:** Jangan ubah `base: './'` di `vite.config.js`
3. **Branch:** Pastikan push ke branch `main` untuk trigger GitHub Actions
4. **Build Time:** First build bisa 3-5 menit tergantung ukuran file

## 🎯 Features

- ✅ Layer switching dengan visualisasi dinamis
- ✅ Legenda yang berubah sesuai layer aktif
- ✅ Transparansi otomatis untuk no-data pixels
- ✅ Warna solid untuk data pixels
- ✅ Responsive design (mobile-friendly)
- ✅ Layer komposit eksklusif (ID 12)
- ✅ 11 parameter analisis kekumuhan

## 📄 License

MIT License

## 👥 Credits

- **Data:** Pemerintah Kabupaten Indramayu
- **Analysis:** Tim WebGIS Indramayu
- **Basemap:** OpenStreetMap Contributors