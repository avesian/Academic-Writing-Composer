# Plugin System

## Tujuan

Plugin memungkinkan penambahan fitur tanpa mengubah Core Engine.

---

## Jenis Plugin

### Block Plugin

Menambahkan Block baru.

Contoh

* DeclarationBlock
* AcknowledgementBlock
* BiographyBlock

---

### Validator Plugin

Menambahkan aturan validasi.

Contoh

* Margin Validator
* Heading Validator
* Citation Validator
* Reference Validator

---

### Formatter Plugin

Menambahkan formatter.

Contoh

* APA Formatter
* IEEE Formatter
* Caption Formatter

---

### Renderer Plugin

Menambahkan format export.

Contoh

* DOCX
* PDF
* HTML

---

## Lifecycle

Load Plugin

↓

Register

↓

Initialize

↓

Ready

---

## Prinsip

* Core tidak bergantung pada plugin.
* Plugin dapat diaktifkan atau dinonaktifkan.
* Plugin harus menggunakan interface resmi Core.
