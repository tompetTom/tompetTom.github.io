$(document).ready(() => {
    $('.instrument-list li').on('click', event => {

        if ($(event.currentTarget).hasClass('active')) {
            $(event.currentTarget).removeClass('active');
        } else {
            $(event.currentTarget).siblings().removeClass('active');
            $(event.currentTarget).addClass('active');
        };

        // if (!$(event.currentTarget).siblings().hasClass('hide')) {
        //     $(event.currentTarget).siblings().slideUp().addClass('hide');
        // } else {
        //     $('.instrument-details').slideUp().addClass('hide');
        //     $(event.currentTarget).siblings().slideDown().removeClass('hide');
        // };
    });
});