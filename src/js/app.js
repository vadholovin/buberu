/* eslint-disable */

/**
 * SVG4EVERYBODY
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

  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) return;

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    let toLeft = xDiff > 0;

    if ( menu.classList.contains('is-open') ) {
      if (Math.abs(xDiff) > Math.abs(yDiff) && toLeft) {
        closeMenu();
      }
    }

    xDown = null;
    yDown = null;
  };

  burger.addEventListener('click', toggleMenu);
  closeTriggers.forEach(trigger => {
    trigger.addEventListener('click', closeMenu);
  });
  menu.addEventListener('touchstart', handleTouchStart);
  menu.addEventListener('touchmove', handleTouchMove);

});

/**
 * Header scroll
 */
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.js-header');
  const headerTop = header.querySelector('.site-navline');
  const offset = (headerTop !== null) ? headerTop.offsetHeight : 50;

  function fixHeader() {
    const posY = window.pageYOffset || document.documentElement.scrollTop;

    if (posY > offset) {
      header.classList.add('is-scrolled');
    } else{
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', fixHeader);
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
 * Accordion
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


/**
 * Toggle dropdown
 */
document.addEventListener('DOMContentLoaded', () => {
  const poppers = document.querySelectorAll('.js-popper-wrapper');

  if (poppers !== undefined || poppers !== null) {
    poppers.forEach(popper => {
      const trigger = popper.querySelector('.js-popper-trigger');
      const content = popper.querySelector('.js-popper-content');
      const mainEvent = trigger.dataset.popperEvent || 'click';
      let popperInstance = null;

      function create() {
        popperInstance = Popper.createPopper(trigger, content, {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 0],
              },
            },
          ],
        });
      }

      function destroy() {
        if (popperInstance) {
          popperInstance.destroy();
          popperInstance = null;
        }
      }

      function show() {
        content.setAttribute('data-popper-show', '');
        create();
      }

      function hide() {
        content.removeAttribute('data-popper-show');
          destroy();
      }

      let showEvents, hideEvents;

      if (mainEvent === 'hover') {
        showEvents = ['mouseenter', 'focus'];
        hideEvents = ['mouseleave', 'blur'];
      } else {
        showEvents = ['click', 'focus'];
        hideEvents = ['click', 'blur'];
      }

      showEvents.forEach(event => {
        if (mainEvent === 'hover') {
          popper.addEventListener(event, function() {
            this.setAttribute('data-popper-active', '');
          });
        }

        trigger.addEventListener(event, show);
      });

      hideEvents.forEach(event => {
        if (mainEvent === 'hover') {
          popper.addEventListener(event, function() {
            this.removeAttribute('data-popper-active');
            hide();
          });
        } else {
          trigger.addEventListener(event, hide);
        }

      });
    });
  }
});


/**
 * Tooltips
 */
document.addEventListener('DOMContentLoaded', function() {
  tippy('.js-tippy', {
    maxWidth: 200,
  });
});


/**
 * Tabs
 */
jQuery(function ($) {
  function tabs() {
    // data-tab-target - вешается на таб
    // data-tab и tab-group  - на содержимое таба
    // tab-group должен быть одинаковый у всех табов одной группы (в одном контейнере, например)
    const options = {
      activeClass: 'is-active',
    };

    $(document).on('click', '[data-tab-target]', function (e) {
      e.preventDefault();
      const $tab = $(this),
        tabTarget = $tab.data('tab-target'),
        $content = $(document).find('[data-tab="' + tabTarget + '"]'),
        tabGroup = $content.data('tab-group');


      $tab
        .addClass(options.activeClass)
        .parent()
        .siblings()
        .find('.' + options.activeClass)
        .removeClass(options.activeClass);

      $(document)
        .find('[data-tab-group="' + tabGroup + '"]')
        .hide()
        .removeClass(options.activeClass);

      $content.show(0, function () {
        $(this).addClass(options.activeClass);
      });
    });
  }

  tabs();
});


/**
 * Select2
 */
jQuery(function ($) {
  $.fn.select2.defaults.set("minimumResultsForSearch", "-1");
  $.fn.select2.defaults.set("language", "ru");
  $.fn.select2.defaults.set("width", "100%");

  $('.js-filters-select').select2({});
});
