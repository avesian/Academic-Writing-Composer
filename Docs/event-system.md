# event-system.md

# Event System

## Tujuan

Core menggunakan Event untuk komunikasi antar modul.

---

## Event

### Document

* document:create
* document:load
* document:update
* document:save
* document:export

---

### Block

* block:create
* block:update
* block:compose
* block:render

---

### Template

* template:load
* template:change

---

### Validation

* validation:start
* validation:finish

---

### Renderer

* render:start
* render:finish

---

## Prinsip

Engine tidak saling memanggil secara langsung.

Komunikasi dilakukan melalui Event Dispatcher.
