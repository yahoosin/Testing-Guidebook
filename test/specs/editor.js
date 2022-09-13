const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const { user1 } = require('../fixtures/users');
const auth = new Auth();
const editor = new Editor();

describe('Post Editor', function () {
    before(function () {
    auth.load();
    auth.login(user1);
    });

    beforeEach(function () {
    editor.load();
    });

    it('should let you publish a new post', function () {
        editor.submitArticle({title: 'New Article', description: 'Test Description', body: 'Test Body',tags: ['Tag1']});
        // expect to be on new article page
        expect(browser).toHaveUrl('articles/test-title', { containing: true });
        // to avoid making a lot of articles, let's just click the delete button 
        //$('button*=Delete Article').click();
        });
        
});

