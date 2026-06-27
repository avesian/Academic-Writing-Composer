# engine-interface.md

# Engine Interface

## Tujuan

Seluruh Engine menggunakan interface yang sama.

---

## Interface

```text
initialize()

execute()

reset()

destroy()
```

---

## Input

AcademicDocument

---

## Output

AcademicDocument

atau

Report

---

## Engine

* ParserEngine
* ComposerEngine
* FormatterEngine
* ValidatorEngine
* RendererEngine
* ExportEngine

---

## Pipeline

```text
initialize()

↓

execute()

↓

return
```

---

## Prinsip

Engine bersifat stateless.

Engine tidak menyimpan data permanen.

Semua data berada pada AcademicDocument.
