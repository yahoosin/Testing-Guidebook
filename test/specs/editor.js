const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const Article = require('../pageObjects/Article.page');
const Chance = require('chance');

const { user1 } = require('../fixtures/users');
const auth = new Auth();
const editor = new Editor();
const article = new Article();

if (!process.env.SEED) {
    // store as a string since that's how the SEED environment variable is passed in
    process.env.SEED = Math.random().toString();
}
    console.log(
    `ChanceJS Seed: ${process.env.SEED} - Pass in using 'SEED=${process.env.SEED}'`
    );
    const chance = new Chance(process.env.SEED);

describe('Post Editor', async ()=> {
    before(async ()=> {
        await auth.load();
        await auth.login(user1);
    });

    beforeEach(async ()=> {
        await editor.load();
    });

    describe('"Unsaved Changes" alerts', async ()=> {
        beforeEach(async ()=> {
            await editor.$title.setValue('Unsaved Change');
        });

        it('should alert you when using browser navigation', async ()=> {
            // try refreshing the page
            await browser.refresh();
            // validate alert is showing
            await expect(await browser.isAlertOpen()).toBe(true);
        });

        it('should warn you when trying to change URL', async ()=> {
            // try going to the homepage
            await $('=Home').click();
            const alertText = await browser.getAlertText();
            await expect(alertText).toEqual('Do you really want to leave? You have unsaved changes!');
            //accept the alert to avoid it from preventing further tests from executing
            await browser.acceptAlert();
        });
    });

    it('should load page properly', async ()=> {
        await expect(browser).toHaveUrl(editor.url.href);
        await expect(editor.$title).toExist();
        await expect(editor.$description).toExist();
        await expect(editor.$body).toExist();
        await expect(editor.$tags).toExist();
        await expect(editor.$publish).toExist();
    });

    it('should let you publish a new post', async ()=> {
        const articleDetails = {
        title: chance.sentence({ words: 3 }),
        description: chance.sentence({ words: 7 }),
        body: chance.paragraph({ sentences: 4 }),
        tags: [chance.word(), chance.word()]
        };

        await editor.submitArticle(articleDetails);

        await expect(article.$title).toHaveText(articleDetails.title);
        await expect(article.$body).toHaveText(articleDetails.body);
        await expect(article.$tags).toEqual(articleDetails.tags);

        const slug = articleDetails.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

        // expect to be on new article page
        await expect(browser).toHaveUrl(`articles/${slug}`, { containing: true });

        // to avoid making a lot of articles, let's just click the delete button to
        // clean it up. We'll talk about a better way to clean it later on.
        await article.$delete.click();
    });
        
});

