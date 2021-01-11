$(document).ready(() => {
    $('.instrument-list li').on('click', event => {
        $(event.currentTarget).siblings().removeClass('active');
        $(event.currentTarget).toggleClass('active');
    });
});