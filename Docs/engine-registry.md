# engine-registry.md

# Engine Registry

## Tujuan

Engine Registry adalah pusat registrasi seluruh engine yang digunakan sistem.

Engine bekerja pada AcademicDocument.

---

## Struktur

```text
EngineRegistry
├── ParserEngine
├── ComposerEngine
├── FormatterEngine
├── ValidatorEngine
├── RendererEngine
└── ExportEngine
```

---

## Engine

### Parser Engine

Tugas

* membaca DOCX
* membaca metadata
* membaca heading
* membaca tabel
* membaca gambar

Output

AcademicDocument

---

### Composer Engine

Tugas

* menyusun block
* mengurutkan block
* membentuk AcademicDocument

---

### Formatter Engine

Tugas

* margin
* font
* spacing
* heading
* numbering
* caption

---

### Validator Engine

Tugas

* struktur
* sitasi
* daftar pustaka
* heading
* margin
* tabel
* gambar

Output

Validation Report

---

### Renderer Engine

Tugas

Mengubah AcademicDocument menjadi:

* DOCX
* HTML
* PDF

---

### Export Engine

Tugas

* Download
* Save
* Print

---

## Pipeline

```text
Parser
    ↓
Composer
    ↓
Formatter
    ↓
Validator
    ↓
Renderer
    ↓
Exporter
```
