# validation-report-schema.md

# Validation Report Schema

## Tujuan

Semua Validator menghasilkan format laporan yang sama.

---

## Struktur

```text
ValidationReport
├── score
├── passed
├── warnings
├── errors
└── summary
```

---

## score

Nilai kepatuhan.

Range

0 - 100

---

## warnings

Daftar peringatan.

Contoh

* Font tidak konsisten
* Heading tidak sesuai
* Caption tidak ditemukan

---

## errors

Kesalahan yang harus diperbaiki.

Contoh

* BAB III tidak ditemukan
* Daftar pustaka kosong

---

## summary

Ringkasan hasil validasi.

---

## Contoh

```json
{
  "score": 92,
  "passed": true,
  "warnings": [
    "Heading level tidak konsisten"
  ],
  "errors": [],
  "summary": "Dokumen memenuhi sebagian besar aturan template."
}
```
