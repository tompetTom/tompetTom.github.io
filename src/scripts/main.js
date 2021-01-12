$(document).ready(() => {
    if ($(document).scrollTop() < 300) {
        $(document).on('scroll', () => {
            if ($(document).scrollTop() > 50) {
                $('.landing-section').find('.tagline').addClass('fade');
            }
            if ($(document).scrollTop() > 200) {
                $('#title').children().addClass('small');
                $('header').addClass('scroll');
                // $('.landing-section').find('.tagline').addClass('fade');
            };
            if ($(document).scrollTop() < 50) {
                $('#title').children().removeClass('small');
                $('header').removeClass('scroll');
                $('.landing-section').find('.tagline').removeClass('fade');
            }
        });
    };
    $('.instrument-list li').on('click', event => {
        $(event.currentTarget).siblings().removeClass('active');
        $(event.currentTarget).toggleClass('active');
    });
});