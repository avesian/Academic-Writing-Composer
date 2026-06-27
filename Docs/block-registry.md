Block Registry
Tujuan

Block Registry adalah pusat registrasi seluruh Block yang tersedia di sistem. Composer hanya mengambil Block dari Registry, bukan menginstansiasi Block secara langsung.

Struktur
BlockRegistry
├── CoverBlock
├── ApprovalBlock
├── ValidationBlock
├── OriginalityBlock
├── MottoBlock
├── DedicationBlock
├── AbstractBlock
├── AbstractEnglishBlock
├── PrefaceBlock
├── TocBlock
├── ListTableBlock
├── ListFigureBlock
├── ChapterBlock
├── ReferenceBlock
└── AppendixBlock
Interface Block

Setiap Block harus memiliki properti berikut.

Property	Type
id	string
type	string
title	string
category	string
enabled	boolean
order	number
Method

Semua Block wajib memiliki method berikut.

initialize()

compose()

validate()

render()

export()
Kategori
Front Matter
Cover
Approval
Validation
Originality
Motto
Dedication
Abstract
Abstract English
Preface
TOC
List Table
List Figure
Main Matter
Chapter
Back Matter
Reference
Appendix
Prinsip
Registry hanya menyimpan definisi Block.
Composer mengambil Block dari Registry.
Block dapat ditambah melalui plugin.
Block tidak saling bergantung.
