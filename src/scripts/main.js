$(document).ready(() => {
    $('.instrument-category').on('click', event => {
        if (!$(event.currentTarget).siblings().hasClass('hide')) {
            $(event.currentTarget).siblings().slideUp().addClass('hide');
        } else {
            $('.instrument-details').slideUp().addClass('hide');
            $(event.currentTarget).siblings().slideDown().removeClass('hide');
        };

        // $('.instrument-details').each(() => {
        //     if ($(this) !== $(event.currentTarget).siblings()) {
        //         $(this).addClass('hide');
        //     };
        // });
    });
});