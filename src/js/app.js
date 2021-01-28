/* eslint-disable */

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

  'use strict';

  // class helper functions from bonzo https://github.com/ded/bonzo

  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;

  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }

  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }

  var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  // transport
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( classie );
  } else {
    // browser global
    window.classie = classie;
  }

  })( window );

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

      if (mainEvent === 'hover') {
        popper.addEventListener('mouseenter', (event) => {
          event.currentTarget.setAttribute('data-popper-active', '');
        });
        trigger.addEventListener('mouseenter', show, false);

        popper.addEventListener('mouseleave', (event) => {
          event.currentTarget.removeAttribute('data-popper-active');
          hide();
        });
        trigger.addEventListener('mouseleave', hide, false);
      } else {
        trigger.addEventListener('click', toggle, false);
      }

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

      function toggle() {
        if (content.hasAttribute('data-popper-show')) {
          hide();
        } else {
          show();
        }
      }

      function show() {
        content.setAttribute('data-popper-show', '');
        create();
        focusInput();
      }

      function hide() {
        if (!popper.hasAttribute('data-popper-active')) {
          content.removeAttribute('data-popper-show');
          destroy();
          blurInput();
        }
      }

      function focusInput() {
        const input = content.querySelector('input');

        if (input !== null) {
          content.querySelector('input').focus();
        }
      }

      function blurInput() {
        const input = content.querySelector('input');

        if (input !== null && input === document.activeElement) {
          input.blur();
        }
      }
    });
  }
});


/**
 * Tooltips
 */
document.addEventListener('DOMContentLoaded', function() {
  // Default options
  // tippy.setDefaults({
  //   allowHTML: true,
  // });

  tippy('.js-tippy', {
    maxWidth: 200,
  });

  tippy('.js-tippy-with-tpl', {
    content(reference) {
      const id = reference.getAttribute('data-template');
      const container = document.createElement('div');
      const linkedTemplate = document.getElementById(id);
      const node = document.importNode(linkedTemplate.content, true);
      container.appendChild(node);
      return container;
    },
  });
});


/**
 * Drag and Drop
 */
document.addEventListener('DOMContentLoaded', function(event) {
  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';

    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }

  let items = document.querySelectorAll('.js-draggable');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
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


/**
 * Form
 */
jQuery(function ($) {
  // Masks
  $('.js-phone-mask').inputmask({"mask": "+7 (999) 999-99-99"});
  $('.js-date-mask').inputmask("99.99.9999", { "placeholder": "дд.мм.гггг" });


  // Show password
  $(document).on('click', '.js-show-pass', function (e) {
    e.preventDefault();
    let $toggler = $(this);
    let $input = $(this).parent().find('input');
    let type = ($input.attr('type') === 'password') ? 'text' : 'password';

    $toggler.toggleClass('is-active');
    $input.attr('type', type);
  });
});


/**
 * Reset notifications
 */
jQuery(function ($) {
  $(document).on('click', '.button-reset', function (e) {
    e.preventDefault();
    const $btn = $(this);

    $btn.addClass('is-active');
  });
});


/**
 * Contenteditable fields
 */
document.addEventListener('DOMContentLoaded', function() {
  if (!String.prototype.trim) {
    (function() {
      // Make sure we trim BOM and NBSP
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function() {
        return this.replace(rtrim, '');
      };
    })();
  }

  const fields = document.querySelectorAll('.field-editable');

  fields.forEach(function(item) {
    const wrapper = item.closest('.inputbox--editable');

    if (item.textContent.trim() !== '') {
      classie.add(wrapper, 'filled');
    }

    wrapper.addEventListener('click', setFocus, false);
    item.addEventListener('focus', onInputFocus, false);
    item.addEventListener('blur', onInputBlur, false);
    item.addEventListener('keyup', onInputChange, false);
  });

  function setFocus(event) {
    const wrapper = event.currentTarget;
    const input = wrapper.querySelector('.field-editable');

    classie.add(wrapper, 'focused');
    input.focus();
  }

  function onInputChange(event) {
    const input = event.target;
    const wrapper = input.closest('.inputbox--editable');

    if (input.textContent.trim() === '') {
      classie.remove(wrapper, 'filled');
    } else {
      classie.add(wrapper, 'filled');
    }
  }

  function onInputFocus(event) {
    const wrapper = event.target.closest('.inputbox--editable');

    classie.add(wrapper, 'focused');
  }

  function onInputBlur(event) {
    const input = event.target;
    const wrapper = event.target.closest('.inputbox--editable');

    classie.remove(wrapper, 'focused');

    if (input.textContent.trim() === '') {
      classie.remove(wrapper, 'filled');
    }
  }
});


/**
 * Circle progress
 */
document.addEventListener('DOMContentLoaded', function() {
  const progresses = document.querySelectorAll('.js-circle-progress');

  if (progresses !== null) {
    progresses.forEach((item) => {
      const progressElement = item.querySelector('.circle-progress__current');
      const radius = item.querySelector('.circle-progress__back').getAttribute('r');
      const circumference = 2 * Math.PI * radius;
      const value = item.getAttribute('data-progress-value');

      function progress(value) {
        const progress = value / 100;
        const dashoffset = circumference * (1 - progress);

        progressElement.setAttribute('stroke-dasharray', circumference);
        progressElement.setAttribute('stroke-dashoffset', dashoffset);
      }

      progress(value);
    });
  }
});
