# block-interface.md

# Block Interface

## Tujuan

Block Interface adalah kontrak yang wajib diimplementasikan oleh seluruh Block.

Semua Block diperlakukan sama oleh Composer.

---

## Struktur

| Property | Type    | Required |
| -------- | ------- | -------- |
| id       | string  | ✓        |
| type     | string  | ✓        |
| title    | string  | ✓        |
| category | string  | ✓        |
| order    | number  | ✓        |
| enabled  | boolean | ✓        |
| settings | object  | ✓        |
| content  | object  | ✓        |

---

## Lifecycle

```text
Create
    ↓
Initialize
    ↓
Compose
    ↓
Validate
    ↓
Render
```

---

## Methods

### initialize()

Menyiapkan block.

---

### compose(document)

Menyusun isi block berdasarkan metadata.

---

### validate()

Mengembalikan hasil validasi block.

---

### render(renderer)

Mengirim block ke renderer.

---

### export()

Menghasilkan object siap ekspor.

---

## Prinsip

* Block tidak mengetahui Block lain.
* Block tidak boleh mengubah AcademicDocument secara langsung.
* Semua perubahan dilakukan melalui Composer.
