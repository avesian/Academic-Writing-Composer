# template-schema.md

# Template Schema

## Tujuan

Template mendefinisikan aturan penulisan institusi.

---

## Struktur

```text
Template
├── metadata
├── layout
├── typography
├── numbering
├── blocks
├── citation
└── references
```

---

## metadata

| Field   | Type   |
| ------- | ------ |
| id      | string |
| name    | string |
| version | string |

---

## layout

* paperSize
* orientation
* marginTop
* marginBottom
* marginLeft
* marginRight

---

## typography

* fontFamily
* fontSize
* lineSpacing
* paragraphSpacing
* headingStyle

---

## numbering

* pageNumber
* chapterNumber
* headingNumber

---

## blocks

Urutan block.

```text
Cover

Approval

Validation

Abstract

TOC

Chapter

Reference

Appendix
```

---

## citation

* APA7
* IEEE
* Chicago
* Harvard

---

## references

Konfigurasi daftar pustaka.

* hangingIndent
* spacing
* sorting

```
```
