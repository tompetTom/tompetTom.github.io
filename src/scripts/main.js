$(document).ready(() => {

    // header scrolling
    if ($(document).scrollTop() < 300) {
        $(document).on('scroll', () => {
            if ($(document).scrollTop() > 50) {
                $('.landing-section').find('.tagline').addClass('fade');
            };
            if ($(document).scrollTop() > 200) {
                $('#title').children().addClass('small');
                $('header').addClass('scroll');
            };
            if ($(document).scrollTop() < 50) {
                $('#title').children().removeClass('small');
                $('header').removeClass('scroll');
            };
            if ($(document).scrollTop() < 15) {
                $('.landing-section').find('.tagline').removeClass('fade');
            };
        });
    };

    // mobile nav
    $('.hamburger-close').on('click', e => {
        $(e.currentTarget).closest('nav').toggleClass('closed');
    });

    // scroll to element
    function scrollToElement(link) {
        var target;
        if (link.attr('href')) {
            target = link.attr('href');
        } else if (link.attr('id')) {
            target = `#${link.attr('id')}`;
        };
        var element = $(document).find(target);
        if (target == '#gear') {
            $('.process-gear').addClass('pg-right');
            element = $(document).find('#process');
        } else if (target == '#process') {
            $('.process-gear').removeClass('pg-right');
        };
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var headerHeight;
        if (windowWidth < 600) {
            headerHeight = 0;
        } else if (windowWidth < 900 && windowHeight < windowWidth) {
            headerHeight = 0;
        } else if (windowWidth >= 600 && windowWidth < 900 && windowHeight > windowWidth) {
            headerHeight = 55;
        } else {
            headerHeight = 67;
        };
        var scrollDistance = element.offset().top - headerHeight;
        $('html, body').animate({scrollTop: scrollDistance}, 500);
    };

    $('.scroll-link').on('click', event => {
        event.preventDefault();
        scrollToElement($(event.currentTarget));
    });

    // slick
    var slickMinimal = {
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        arrows: false,
        speed: 1000
    };

    var slickControls = {
        autoplay: false,
        dots: true,
        arrows: true,
        speed: 900
    };

    $('.slick-quote').slick({slickMinimal});
    $('.slick-video').slick({slickControls});

    // homepage instrument list
    $('.instrument-list li').on('click', event => {
        $(event.currentTarget).siblings().removeClass('active');
        $(event.currentTarget).toggleClass('active');
    });

    // recording instrument list
    $('.recording-instrument-categories li').on('click', event => {
        let image = $(event.currentTarget);
        let info;
        if (image.hasClass('flutes')) {
            info = $('#flutes-info');
        } else if (image.hasClass('clarinets')) {
            info = $('#clarinets-info');
        } else if (image.hasClass('recorders')) {
            info = $('#recorders-info');
        } else if (image.hasClass('world-flutes')) {
            info = $('#world-flutes-info');
        } else if (image.hasClass('saxophones')) {
            info = $('#saxophones-info');
        };
        image.siblings().removeClass('active').children('.caption').removeClass('hover');
        image.toggleClass('active');
        info.siblings().removeClass('active');
        info.toggleClass('active');
    });

    $('.caption').mouseenter(event => {
        $(event.currentTarget).addClass('hover').mouseleave(() => {
            $(event.currentTarget).removeClass('hover');
        });
    });

    $('.collapse-instrument-dropdown').on('click', () => {
        $('#recording-instruments')[0].scrollIntoView({
            behavior: 'smooth'
        });
        $('.recording-instrument-dropdown').removeClass('active');
        $('.recording-instrument-categories li').removeClass('active');
    });

    // recording process/gear mobile tabs
    $('.pg-headings h2').on('click', event => {
        if ($(event.currentTarget).hasClass('left')) {
            $('.process-gear').removeClass('pg-right');
        } else if ($(event.currentTarget).hasClass('right')) {
            $('.process-gear').addClass('pg-right');
        };
    });

    $('.pg-track').on('swipeleft', () => {
        $('.process-gear').addClass('pg-right');
    });

    $('.pg-track div').on('swiperight', () => {
        $('.process-gear').removeClass('pg-right');
    });

    // show/hide button
    $('.show-hide').on('click', e => {
        var button = $(e.currentTarget);
        var section = button.closest('section');
        // var id = section.attr('id');
        if (section.hasClass('full')) {
            console.log('full (1)');
            scrollToElement(section);
            console.log('full (2)');
            section.removeClass('full');
            section.addClass('short');
            console.log('full (3)');
        } else {
            console.log('short (1)');
            section.removeClass('short');
            section.addClass('full');
            console.log('short (2)');
        };
    });
});