# Academic Document Schema

## Tujuan

AcademicDocument adalah model data utama yang merepresentasikan seluruh karya ilmiah di dalam aplikasi. Semua engine (Composer, Formatter, Validator, Renderer) bekerja pada objek ini.

---

## Struktur

```text
AcademicDocument
├── metadata
├── institution
├── settings
├── blocks
├── assets
└── statistics
```

---

## metadata

Informasi identitas karya ilmiah.

| Field | Type |
|-------|------|
| title | string |
| subtitle | string |
| author | string |
| nim | string |
| studyProgram | string |
| faculty | string |
| university | string |
| degree | string |
| year | number |
| city | string |
| language | string |

---

## institution

Template institusi yang digunakan.

| Field | Type |
|-------|------|
| id | string |
| name | string |
| template | string |

---

## settings

Konfigurasi global dokumen.

| Field | Type |
|-------|------|
| paperSize | string |
| margin | object |
| fontFamily | string |
| fontSize | number |
| lineSpacing | number |
| paragraphSpacing | number |

---

## blocks

Array berisi seluruh bagian dokumen.

```text
[
  CoverBlock,
  ApprovalBlock,
  ValidationBlock,
  AbstractBlock,
  PrefaceBlock,
  TocBlock,
  ListTableBlock,
  ListFigureBlock,
  ChapterBlock,
  ReferenceBlock,
  AppendixBlock
]
```

---

## assets

Resource dokumen.

- logo
- signatures
- images

---

## statistics

Informasi hasil analisis.

- pageCount
- wordCount
- figureCount
- tableCount
- referenceCount

---

## Catatan

AcademicDocument adalah satu-satunya sumber data aplikasi.
