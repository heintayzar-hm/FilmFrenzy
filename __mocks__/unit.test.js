/**
 * @jest-environment jsdom
 */

import Show from '../src/modules/show.js';

document.body.innerHTML = `<h3 class="comments-header">Comments(<span id="comments-length"></span>)</h3><div class="comments">
                          </div>
                          <h3 class="comment-header">Add a comment</h3>
                          <form id="" class="form comment-form">
                          <input class="input-box input-name" placeholder="Your Name" required>
                          <textarea class="input-box" rows="10" placeholder="Your Insight" required></textarea>
                          <button class="input-btn" type='submit'>Submit</button>
                          </form>`;
describe('When we test function for adding and counting', () => {
  const page = new Show();
  const randomNum = Date.now();
  const commentsEl = document.querySelector('.comments');
  test('First0 add, should output 1', async () => {
    await page.addComment(randomNum, 'Hein Tay Zar', 'Worker').then(async (res) => {
      if (res === true) {
        const comments = await page.getComments(randomNum);
        commentsEl.innerHTML = page.toComments(comments.data);
        page.commentsLength();
      }
    });
    const numberOfComments = await page.commentsLength();
    expect(numberOfComments).toBe(1);
  });

  test('Another Add, Should output 2', async () => {
    await page.addComment(randomNum, 'Hein Tay Zar2', 'Worker2').then(async (res) => {
      if (res === true) {
        const comments = await page.getComments(randomNum);
        commentsEl.innerHTML = page.toComments(comments.data);
        page.commentsLength();
      }
    });
    const numberOfComments = await page.commentsLength();
    expect(numberOfComments).toBe(2);
  });

  test('Object test', async () => {
    await page.addComment(randomNum, 'Hein Tay Zar3', 'Worker3').then(async (res) => {
      if (res === true) {
        const comments = await page.getComments(randomNum);
        commentsEl.innerHTML = page.toComments(comments.data);
        page.commentsLength();
        // get final one
        expect(comments.data[2].comment).toBe('Worker3');
      }
    });
  });
});
