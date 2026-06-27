# Academic Writing Composer v2 🎓📝

**Academic Writing Composer** adalah aplikasi berbasis peramban (*client-side web application*) yang dirancang khusus sebagai alat bantu digital bagi mahasiswa dan akademisi untuk menyusun serta menyelaraskan format karya ilmiah (skripsi, tesis, dan disertasi) secara otomatis dan instan.

Aplikasi ini berjalan sepenuhnya di sisi klien (*browser*), yang berarti dokumen Anda **tidak pernah dikirim ke server mana pun** sehingga kerahasiaan draf karya ilmiah Anda tetap terjaga 100%.

---

## ✨ Fitur Utama

* **Standardisasi Format Institusi Otomatis:** Menyesuaikan tata letak dokumen secara instan—termasuk ukuran margin (kiri, kanan, atas, bawah), ukuran font, dan spasi baris—sesuai dengan pedoman resmi universitas yang dipilih.
* **Pengukur Halaman Nyata & Multi-Section:** Memisahkan dokumen ke dalam struktur formal karya ilmiah Indonesia:
    * **Halaman Cover:** Otomatis digenerate dari metadata tanpa nomor halaman.
    * **Bagian Preliminary (Daftar Isi, dll):** Menggunakan penomoran angka Romawi kecil (`i, ii, iii, iv`).
    * **Bagian Body (Bab I - Penutup):** Menggunakan penomoran angka Arab (`1, 2, 3`) di posisi kanan bawah.
* **Generasi Daftar Isi Asli (Native Word TOC):** Bukan sekadar teks daftar isi statis biasa. Aplikasi ini menyisipkan kode bidang (*Field Code*) asli Microsoft Word (`TOC \o "1-3" \h \z \u`). Mahasiswa cukup klik kanan pada daftar isi di Word lalu pilih **"Update Field"** untuk memperbarui halaman secara dinamis.
* **Preview Instan & Cetak PDF:** Menyediakan ringkasan eksekutif jumlah Bab/Sub-bab terdeteksi serta fitur *Live Preview* yang mendukung pencetakan langsung ke PDF via browser (`Ctrl+P` / `⌘+P`).

---

## 🚀 Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan arsitektur *vanilla web stack* yang ringan tanpa memerlukan proses *compile* atau *build*:

* [Mammoth.js](https://github.com/mwilliamson/mammoth.js) — Digunakan untuk mengonversi berkas teks `.docx` mentah menjadi struktur HTML yang bersih.
* [Docx.js](https://docx.js.org/) — Digunakan untuk menyusun kembali objek HTML menjadi dokumen `.docx` baru dengan standarisasi komponen akademis (Multi-section, Footer, Page Numbering, dan Field Codes).
* **CSS Custom Properties & Vanilla JS** — Untuk antarmuka pengguna yang responsif, minimalis, dan berbasis komponen *state*.

---

## 🛠️ Cara Penggunaan

1.  **Siapkan Dokumen Word:** Pastikan judul bab menggunakan style **Heading 1**, sub-bab menggunakan **Heading 2**, dan anak sub-bab menggunakan **Heading 3** di Microsoft Word.
2.  **Konfigurasi di Aplikasi:**
    * Unggah file `.docx` Anda ke area *drop-zone*.
    * Pilih *Template Institusi* dan sesuaikan jenis karya (Skripsi/Tesis/Disertasi).
    * Isi *Metadata Dokumen* (Judul, Nama, NIM, Tahun) untuk otomatisasi halaman Cover.
3.  **Proses & Unduh:** Klik **Proses Dokumen**, tunggu log eksekusi selesai, lalu masuk ke halaman hasil untuk mengunduh berkas `.docx` yang telah terformat rapi atau mencetaknya langsung ke PDF.

---

## 🔒 Keamanan & Privasi

Aplikasi ini menerapkan prinsip **Zero-Server Architecture**. Seluruh pustaka JavaScript dimuat langsung di browser Anda, dan pemrosesan *file* dilakukan secara lokal menggunakan API `ArrayBuffer` dan `Blob`. File Anda aman dan privasi Anda terlindungi sepenuhnya.