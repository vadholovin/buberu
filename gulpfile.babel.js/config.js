/*
 * @title Config
 */

// Paths
exports.paths = {
  src: './src/',
  dest: './dist/',
  deploy: './dist/**/*',
  styles: {
    src: './src/styles/main.scss',
    watch: './src/styles/**/*.scss',
    modules: './src/modules/**/*.scss',
    templates: './src/templates/**/*.scss',
    dest: './dist/assets/css/',
    lint: './src/styles/**/*.s+(a|c)ss'
  },
  scripts: {
    src: './src/js/app.js',
    watch: './src/js/**/*.js',
    modules: './src/modules/**/*.js',
    dest: './dist/assets/js/',
  },
  templates: {
    src: './src/templates/pages/*.pug',
    watch: './src/templates/**/*.pug',
    modules: './src/modules/**/*.pug',
    dest: './dist/'
  },
  images: {
    src: './src/images/**/*',
    dest: './dist/assets/img',
  },
  icons: {
    src: './src/images/svg/*',
    dest: './dist/assets/img/sprites',
  },
  assets: {
    src: './src/assets/**/*',
    dest: './dist/assets/'
  },
  copy: {
    src: './src/static/*',
    dest: './dist/'
  },
  libs: {
    src: [
      // 'node_modules/jquery/dist/jquery.min.js',
      // 'node_modules/es6-object-assign/dist/object-assign-auto.min.js',
      // 'node_modules/intersection-observer/intersection-observer.js',
      'node_modules/svg4everybody/dist/svg4everybody.min.js',
      'node_modules/swiper/js/swiper.min.js',
      // 'node_modules/jarallax/dist/jarallax.min.js',
      // 'node_modules/jarallax/dist/jarallax-video.min.js',
      // 'node_modules/nouislider/distribute/nouislider.min.js',
      // 'node_modules/rellax/rellax.min.js',
      'node_modules/lozad/dist/lozad.min.js',
      // 'node_modules/aos/dist/aos.js',
      // 'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
      // 'node_modules/accordion-js/dist/accordion.min.js',
      // 'node_modules/sticky-sidebar/dist/jquery.sticky-sidebar.min.js',
      // 'node_modules/jquery-sticky/jquery.sticky.js',
      // 'node_modules/a11y_accordions/assets/js/aria.accordion.min.js',
      // 'node_modules/flatpickr/dist/flatpickr.min.js',
      // 'node_modules/flatpickr/dist/l10n/ru.js',
      // 'node_modules/@popperjs/core/dist/umd/popper.min.js',
      // 'node_modules/tippy.js/dist/tippy-bundle.umd.min.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
      // 'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
      // 'node_modules/cleave.js/dist/cleave.min.js',
      // 'node_modules/readmore-js/readmore.min.js',
      // 'node_modules/jquery.marquee/jquery.marquee.min.js',
      // 'node_modules/counterup2/dist/index.js',
      // 'node_modules/waypoints/lib/noframework.waypoints.min.js',
      // 'node_modules/slick-carousel/slick/slick.min.js',
      // 'node_modules/inputmask/dist/jquery.inputmask.min.js',
      // 'node_modules/inputmask/dist/inputmask.min.js',
      // 'node_modules/ismobilejs/dist/isMobile.min.js',
      // 'app/libs/micromodal/micromodal.polyfill.min.js',
      // 'app/libs/micromodal/micromodal.min.js',
    ]
  },
};
