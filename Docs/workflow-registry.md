# workflow-registry.md

# Workflow Registry

## Tujuan

Workflow Registry mendefinisikan alur kerja aplikasi.

Setiap workflow terdiri dari beberapa engine.

---

## Workflow

### Import Workflow

```text
Upload DOCX
    ↓
Parser
    ↓
AcademicDocument
```

---

### Compose Workflow

```text
Metadata
    ↓
Template
    ↓
Composer
    ↓
AcademicDocument
```

---

### Format Workflow

```text
AcademicDocument
    ↓
Formatter
    ↓
Formatted Document
```

---

### Validation Workflow

```text
AcademicDocument
    ↓
Validator
    ↓
Validation Report
```

---

### Export Workflow

```text
AcademicDocument
    ↓
Renderer
    ↓
Exporter
    ↓
DOCX
```

---

## Catatan

Workflow bersifat independen.

Satu workflow tidak boleh bergantung langsung pada workflow lain.
