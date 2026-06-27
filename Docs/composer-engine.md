# Composer Engine

## Tujuan

Composer menyusun seluruh Block menjadi satu AcademicDocument utuh.

Composer tidak mengetahui format DOCX.

---

## Pipeline

Metadata

↓

Template

↓

Load Blocks

↓

Compose

↓

AcademicDocument

↓

Renderer

---

## Tahapan

### 1. Load Metadata

Mengambil data identitas karya ilmiah.

### 2. Load Template

Mengambil aturan institusi.

### 3. Build Block

Membuat seluruh block sesuai template.

### 4. Compose

Menggabungkan seluruh block berdasarkan urutan.

### 5. Render

Mengirim AcademicDocument ke Renderer.

---

## Pseudocode

```javascript
document = new AcademicDocument();

composer.loadMetadata();

composer.loadTemplate();

composer.buildBlocks();

composer.compose();

renderer.render(document);
```

---

## Prinsip

- Composer tidak mengubah isi block.
- Composer hanya mengatur urutan.
- Renderer bertanggung jawab menghasilkan DOCX.
- Validator bekerja setelah proses compose.
