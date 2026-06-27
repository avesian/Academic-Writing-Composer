# Block System

## Tujuan

Seluruh bagian dokumen direpresentasikan sebagai Block.

Composer hanya mengenal Block, bukan halaman.

---

## Struktur Block

```text
Block
├── id
├── type
├── title
├── enabled
├── order
├── settings
└── content
```

---

## Jenis Block

### Front Matter

- CoverBlock
- ApprovalBlock
- ValidationBlock
- OriginalityBlock
- MottoBlock
- DedicationBlock
- AbstractBlock
- AbstractEnglishBlock
- PrefaceBlock
- TocBlock
- ListTableBlock
- ListFigureBlock

### Main Matter

- ChapterBlock

### Back Matter

- ReferenceBlock
- AppendixBlock

---

## Lifecycle

Load

↓

Validate

↓

Compose

↓

Render

---

## Prinsip

- Block independen.
- Block dapat diaktifkan/nonaktifkan.
- Urutan block dapat diubah melalui template.
- Setiap block memiliki renderer sendiri.
