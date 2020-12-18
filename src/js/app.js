/* eslint-disable */
/**
 * #SVG4EVERYBODY
 */
jQuery(function ($) {
  svg4everybody({});
});


/**
 * Menu Toggle
 */
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('#burger');
  const menu = document.querySelector('#mobile-nav');
  const closeTriggers = document.querySelectorAll('[data-close-nav]');

  function toggleMenu() {
    document.body.classList.toggle('is-nav-mobile-open');

    if (menu.matches('.is-closed')) {
      menu.classList.replace('is-closed', 'is-open');
    } else {
      menu.classList.replace('is-open', 'is-closed');
    }
  };

  function closeMenu() {
    menu.classList.replace('is-open', 'is-closed');
    document.body.classList.remove('is-nav-mobile-open');
  };

  burger.addEventListener('click', toggleMenu);

  closeTriggers.forEach(trigger => {
    trigger.addEventListener('click', closeMenu);
  });

});


/**
 * Video
 */
document.addEventListener('DOMContentLoaded', () => {

  function findVideos() {
    let videos = document.querySelectorAll('.js-video');

    if (videos !== undefined || videos !== null) {
      for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
      }
    } else {
      return;
    }
  }

  function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let LinkHref = link.href;
    let media = video.querySelector('.video__media');
    let mediaSource = video.querySelector('picture [type="image/webp"]');
    let id = parseLinkURL(LinkHref);
    let imageSrc = {
      webp: 'https://i.ytimg.com/vi_webp/' + id + '/maxresdefault.webp',
      jpg: 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg',
    };
    let button = video.querySelector('.video__button');

    mediaSource.setAttribute('srcset', imageSrc.webp);
    media.setAttribute('src', imageSrc.jpg);

    window.addEventListener('load', () => {
      let isLoaded = mediaSource.complete && mediaSource.naturalHeight !== 0;

      if (!isLoaded) mediaSource.remove();
    });

    video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
  }

  function parseLinkURL(url){
    let regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    let match = url.match(regExp);

    return (match&&match[1].length == 11)? match[1] : false;
  }

  function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  }

  function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  findVideos();
});


/**
 *
 */
$(function () {
const $ = window.$;
const duration = 300;

// Открытие аккордеона
$.fn.accordionShow = function () {
  const
    block = this,
    parent = block.parents('.js-accordion'),
    selector = block.data('target'),
    content = $(selector);

  if (block.hasClass('is-disabled')) return;

  parent
    .find('.js-accordion-button')
    .removeClass('is-active')
    .attr('aria-expanded', false);

  parent
    .find('.js-accordion-content')
    .removeClass('is-active')
    .slideUp(duration);

  block
    .addClass('is-active')
    .attr('aria-expanded', true);

  content
    .slideDown(duration)
    .addClass('is-active');
};

// Закрытие аккордеона
$.fn.accordionHide = function () {
  const
    block = this,
    selector = block.data('target'),
    content = $(selector);

  content
    .slideUp(duration)
    .removeClass('is-active');

  block
    .removeClass('is-active')
    .attr('aria-expanded', false);
};

// Работа кнопки аккордеона
function accordion () {
  $(document).on('click', '.js-accordion-button', function (e) {
    if (e.target.tagName === 'a') {
      e.preventDefault();
    }

    const
      block = $(this),
      isActive = block.hasClass('is-active');

    isActive ? block.accordionHide() : block.accordionShow();
  });
}

accordion ();

});
