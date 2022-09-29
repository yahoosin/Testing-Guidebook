const Generic = require('./Generic.page');
class Editor extends Generic {
    constructor () {
    super('./editor')
    }

    get $title () { return $('[data-qa-id="editor-title"]'); }
    get $description () { return $('[data-qa-id="editor-description"]'); }
    get $body () { return $('[data-qa-id="editor-body"] textarea'); }
    get $tags () { return $('[data-qa-id="editor-tags"]'); }
    get $publish () { return $('[data-qa-id="editor-publish"]'); }

    async submitArticle({ title, description, body, tags }) {
        await this.$title.setValue(title);
        await this.$description.setValue(description);
        await this.$body.setValue(body);
        await tags.forEach(async (tag) => {
            await this.$tags.setValue(tag);
            await this.$tags.keys('Enter');
        });
        await this.$publish.click();
    }
}
module.exports = Editor;