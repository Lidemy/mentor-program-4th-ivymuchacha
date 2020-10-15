/* eslint-disable */
export const cssTemplate = `
.card { margin: 20px 0;}
.loadMore { margin: 10px 0;}
.hidden {visibility: hidden;}`;

export function getForm(className, commentsClassName) {
  return `<div>
    <form class="${className}">
      <div class="form-group">
        <label>Nickname</label>
        <input name="nickname" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>Comments</label>
        <textarea name="content" class="form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Send</button>
    </form>
    <div class="${commentsClassName}">
    </div>
    <button class="btn btn-primary loadMore" type="submit">Load More</button>
  <div>`;
}
