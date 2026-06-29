/**
 * BlockFactory.js
 */

export default class BlockFactory {
    constructor() {
        // Daftar tipe blok yang didukung
        this.types = {
            paragraph: ParagraphBlock
        };
    }

    create(type, data = {}) {
        const BlockClass = this.types[type];
        
        if (!BlockClass) {
            console.warn(`Block type "${type}" tidak ditemukan.`);
            return null;
        }
        
        return new BlockClass(data);
    }
}

// Class dasar untuk Paragraf agar tidak error saat dipanggil
class ParagraphBlock {
    constructor(data = {}) {
        this.id = data.id || "block-" + Math.random().toString(36).substr(2, 9);
        this.type = "paragraph";
        this.content = data.content || "";
    }

    render() {
        return `<p>${this.content}</p>`;
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            content: this.content
        };
    }
}
