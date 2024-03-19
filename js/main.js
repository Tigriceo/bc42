(() => {
    function swiperSlider() {
        const heroMain = document.querySelectorAll('[data-slider="team-slider"]');
        if (heroMain) {
            heroMain.forEach(slider => {
                let pagination = slider.querySelector('.swiper-pagination');
                swiper = new Swiper(slider.querySelector('.swiper'), {
                    speed: 1500,
                    centeredSlides: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: pagination,
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<li class="' + className + '"></li>';
                        },
                    },
                    on: {
                        transitionStart: function () {
                            let previousIndex = this.previousIndex;
                            let previousSlide = slider.getElementsByClassName('swiper-slide')[previousIndex];
                            if (previousSlide) {
                                setTimeout(function () {
                                    previousSlide.classList.remove('is-play');
                                }, 1000);
                            }
                        },
                        transitionEnd: function () {
                            let activeIndex = this.activeIndex;
                            let activeSlide = slider.getElementsByClassName('swiper-slide')[activeIndex];
                            activeSlide.classList.add('is-play');
                        },
                    }

                });
            });
        }
    }
    window.addEventListener('load', swiperSlider, false);

    // mobile меню

    const mobileMenu = document.querySelector('.js-menu-container');
    const openMenuBtn = document.querySelector('.js-open-menu');
    const closeMenuBtn = document.querySelector('.js-close-menu');

    const toggleMenu = () => {
        const isMenuOpen =
            openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
        openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
        mobileMenu.classList.toggle('is-open');

        const scrollLockMethod = !isMenuOpen
            ? 'disableBodyScroll'
            : 'enableBodyScroll';
        bodyScrollLock[scrollLockMethod](document.body);
    };

    openMenuBtn ? openMenuBtn.addEventListener('click', toggleMenu) : null;
    closeMenuBtn ? closeMenuBtn.addEventListener('click', toggleMenu) : null;

    // Close the mobile menu on wider screens if the device orientation changes
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
        if (!e.matches || !mobileMenu || !openMenuBtn) return;
        mobileMenu.classList.remove('is-open');
        openMenuBtn.setAttribute('aria-expanded', false);
        bodyScrollLock.enableBodyScroll(document.body);
    });
})();