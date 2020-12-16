/* eslint-disable */
/**
 * #SVG4EVERYBODY
 */
jQuery(function ($) {
  svg4everybody({});
});


/**
 * Video
 */
document.addEventListener('DOMContentLoaded', () => {

  if (document.querySelectorAll('.js-video') !== 'undefined' && document.querySelectorAll('.js-video') != null) {
    function findVideos() {
      let videos = document.querySelectorAll('.js-video');

      for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
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
  }
});

