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

    // slick
    $('.slick-quote').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        arrows: false,
        speed: 1000
    });

    $('.slick-video').slick({
        autoplay: false,
        dots: true,
        arrows: false,
        speed: 900,
        mobileFirst: true,
        responsive: [{
            breakpoint: 600,
            settings: {
                arrows: true
            }
        }]
    });

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

    $('.show-hide').on('click', () => {
        $('.recording-instrument-dropdown').removeClass('active');
        $('.recording-instrument-categories li').removeClass('active');
    })

    // recording process/gear mobile tabs
    $('.tablist li').on('click', event => {
        event.preventDefault();
        if ($(event.currentTarget).hasClass('active')) {
            return;
        } else {
            $('.tablist').children().toggleClass('active');
            $('.process-gear-tabs').toggleClass('active');
        };
    })
});