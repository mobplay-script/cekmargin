\# CLAUDE.md



Panduan kerja untuk Claude Code saat mengembangkan proyek \*\*Toolkit Seller Indonesia\*\*.



\## Project Overview



Toolkit Seller Indonesia adalah website micro-tool untuk membantu seller marketplace Indonesia menghitung harga jual, diskon, komisi, iklan, affiliate, stok, dan profit bersih.



Website ini bukan blog biasa dan bukan software akuntansi besar. Fokus utama proyek adalah membuat tool sederhana, cepat, mobile-friendly, dan mudah dipahami seller pemula.



Core question yang dijawab website ini:



> Kalau saya jual dengan harga ini, saya benar-benar untung atau tidak?



\## Main Goals



1\. Membantu seller menghitung profit sebelum menjual produk.

2\. Membantu seller mengetahui harga jual minimum.

3\. Membantu seller mengecek apakah diskon/promo masih aman.

4\. Membantu seller memahami biaya marketplace.

5\. Mengubah traffic SEO menjadi pengguna tool.

6\. Menjual template digital seperti Google Sheets untuk seller.

7\. Menjadi top-of-funnel untuk affiliate, sponsor, dan partner tools seller.



\## Target Users



Target utama:



\- Seller Shopee

\- Seller Tokopedia

\- Seller TikTok Shop

\- Reseller

\- Dropshipper

\- Pemilik online shop kecil

\- Brand rumahan

\- Seller pemula yang belum siap memakai software akuntansi

\- Seller yang masih memakai Excel atau Google Sheets



User kemungkinan besar memakai HP, tidak paham akuntansi rumit, dan ingin jawaban cepat.



\## Product Principles



\### 1. Tool-first, bukan blog-first



Setiap halaman utama harus mengutamakan alat interaktif.



Artikel boleh ada, tetapi fungsinya mendukung tool.



Format halaman ideal:



1\. Judul jelas

2\. Penjelasan singkat

3\. Kalkulator/tool

4\. Contoh perhitungan

5\. Kesalahan umum

6\. CTA template

7\. FAQ



\### 2. Mobile-first



Mayoritas user kemungkinan memakai smartphone.



Pastikan:



\- Input mudah diisi di HP

\- Tombol besar dan jelas

\- Layout tidak terlalu padat

\- Output langsung terlihat tanpa banyak scroll

\- Tidak ada tabel yang rusak di mobile



\### 3. Bahasa sederhana



Gunakan bahasa Indonesia yang mudah dipahami seller kecil.



Hindari istilah rumit seperti:



\- Gross margin

\- Net margin

\- Contribution margin

\- Cost structure

\- Break-even analysis



Gunakan istilah sederhana seperti:



\- Modal produk

\- Biaya packing

\- Biaya admin

\- Diskon

\- Komisi affiliate

\- Biaya iklan

\- Untung bersih

\- Harga jual minimum

\- Batas diskon aman



\### 4. Transparan dalam rumus



Setiap kalkulator harus menampilkan rumus atau penjelasan singkat.



User harus tahu angka berasal dari mana.



Jangan membuat output terlihat seperti keputusan mutlak. Gunakan bahasa estimasi.



Contoh:



\- “Estimasi profit bersih”

\- “Perkiraan harga jual minimum”

\- “Simulasi berdasarkan input Anda”



\### 5. Semua biaya harus bisa diubah manual



Fee marketplace bisa berubah.



Jangan hardcode biaya marketplace sebagai satu-satunya opsi.



Setiap kalkulator yang memakai fee harus menyediakan:



\- Preset default

\- Input manual

\- Catatan bahwa fee dapat berubah sewaktu-waktu



\### 6. Fokus pada keputusan praktis



Output kalkulator tidak cukup hanya angka.



Berikan status keputusan:



\- Aman

\- Tipis

\- Berisiko rugi

\- Rugi



Contoh output:



```txt

Status: Tipis

Profit bersih: Rp3.200

Margin akhir: 4,2%

Catatan: Harga ini masih untung, tetapi margin terlalu kecil jika ada retur atau biaya tambahan.

