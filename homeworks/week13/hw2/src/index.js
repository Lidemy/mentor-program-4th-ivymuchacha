/* eslint-disable */
import { getComments, addComments } from './api';
import { appendCommentToDOM, appendStyle } from './utils';
import { cssTemplate, getForm} from './templates';
import $ from 'jquery';

export function init(options){
  let siteKey = "";
  let apiUrl = "";
  let containerElement = null;
  let lastID = null;
  let commentsDOM = null;
  let commentsClassName;
  let commentsSelector;
  let formClassName;
  let formSelector;
  siteKey = options.siteKey;
  apiUrl = options.apiUrl;
  commentsClassName = `${siteKey}-comments`;
  formClassName = `${siteKey}-add-comments`;
  formSelector = '.' + formClassName;
  commentsSelector = '.' + commentsClassName;
  containerElement = $(options.containerElement);
  containerElement.append(getForm(formClassName, commentsClassName));
  appendStyle(cssTemplate);
  // 載入留言
  commentsDOM = $(commentsSelector);
  getNewComments();
  // 載入更多
  $('.loadMore').click(() => {
    getNewComments();
  });
  // 新增留言
  $(formSelector).submit((e) => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val(),
    };
    addComments((apiUrl, siteKey, newCommentData, data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      nicknameDOM.val('');
      contentDOM.val('');
      appendCommentToDOM(commentsDOM, newCommentData, true);
    });
  });

  function getNewComments() {
    const commentsDOM = $(commentsSelector);
    getComments((apiUrl, siteKey, lastID, data) => {
      if (!data) {
        alert(data.message);
        return;
      }
      const comments = data.comments;
      for (let comment of comments) {
        appendCommentToDOM(commentsDOM, comment);
      }
      const length = comments.length; 
      if (length < 5) {
        $('.loadMore').hide();
      } else {
        lastID = comments[length - 1].id;
      }
    });
  }
}
