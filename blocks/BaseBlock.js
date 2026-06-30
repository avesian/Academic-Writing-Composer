/**
* BaseBlock.js
* Academic Writing Composer
* Base Block Class
  */

export default class BaseBlock {

```
constructor(data = {}) {

    this.id = data.id || this.generateId();

    this.type = data.type || "block";

    this.content = data.content || "";

    this.enabled = data.enabled !== undefined
        ? data.enabled
        : true;

    this.order = data.order || 0;

    this.page = data.page || null;

}

generateId() {

    return (
        "block-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 10)
    );

}

setContent(content) {

    this.content = content;

    return this;

}

getContent() {

    return this.content;

}

setPage(page) {

    this.page = page;

    return this;

}

render() {

    return this.content;

}

toJSON() {

    return {

        id: this.id,

        type: this.type,

        content: this.content,

        enabled: this.enabled,

        order: this.order,

        page: this.page

    };

}



