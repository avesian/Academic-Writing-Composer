this.app.on("block:add", type => {

    console.log("ADD BLOCK:", type);

    const block = this.documentEditor.addBlock(type);

    console.log(block);

    console.log(
        this.documentEditor
            .getDocument()
            .getBlocks()
    );

    this.refresh();

});
