/**
 * ThesisTemplate.js
 * Academic Writing Composer
 */

import DocumentTemplate from "./editor/DocumentTemplate.js";

export default class ThesisTemplate extends DocumentTemplate {

    constructor() {

        super("thesis");

        this
            .add("title")
            .add("chapter", {
                number: 1,
                title: "PENDAHULUAN"
            })
            .add("heading", {
                level: 2,
                content: "Latar Belakang"
            })
            .add("paragraph")

            .add("heading", {
                level: 2,
                content: "Rumusan Masalah"
            })
            .add("paragraph")

            .add("heading", {
                level: 2,
                content: "Tujuan Penelitian"
            })
            .add("paragraph")

            .add("chapter", {
                number: 2,
                title: "TINJAUAN PUSTAKA"
            })
            .add("paragraph")

            .add("chapter", {
                number: 3,
                title: "METODE PENELITIAN"
            })
            .add("paragraph")

            .add("chapter", {
                number: 4,
                title: "HASIL DAN PEMBAHASAN"
            })
            .add("paragraph")

            .add("chapter", {
                number: 5,
                title: "PENUTUP"
            })
            .add("paragraph");

    }

}
