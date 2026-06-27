# error-handling.md

# Error Handling

## Tujuan

Standarisasi penanganan error pada seluruh Core Engine.

---

## Struktur Error

| Field    | Type   |
| -------- | ------ |
| code     | string |
| message  | string |
| source   | string |
| severity | string |

---

## Severity

INFO

WARNING

ERROR

FATAL

---

## Contoh

```json
{
    "code":"BLOCK_NOT_FOUND",
    "message":"ApprovalBlock tidak ditemukan.",
    "source":"ComposerEngine",
    "severity":"ERROR"
}
```

---

## Prinsip

* Semua Engine mengembalikan format error yang sama.
* Error tidak menghentikan proses kecuali severity = FATAL.
* Error disimpan dalam AcademicDocument.logs.
