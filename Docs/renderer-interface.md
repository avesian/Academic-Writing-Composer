# Renderer Interface

## Tujuan

Renderer bertugas mengubah AcademicDocument menjadi format keluaran.

Composer tidak mengetahui format file.

---

## Arsitektur

```text
AcademicDocument

↓

Renderer

↓

Output
```

---

## Renderer yang didukung

* DOCX Renderer
* HTML Renderer
* PDF Renderer
* Markdown Renderer (opsional)

---

## Interface

Semua Renderer harus mengimplementasikan method berikut.

```text
initialize()

renderDocument()

renderBlock()

save()

download()
```

---

## Pipeline

AcademicDocument

↓

Loop seluruh Block

↓

Render setiap Block

↓

Gabungkan

↓

Output File

---

## Tanggung Jawab

Renderer bertanggung jawab terhadap:

* layout
* page break
* page numbering
* typography
* table
* image
* export

Renderer tidak boleh mengubah isi Block.
