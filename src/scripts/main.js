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

    // $('.sub-navigation li').mouseenter.find('p').addClass('show').mouseleave.removeClass('show');
    $('.sub-navigation li').on('mouseenter', e => {
        $(e.currentTarget).find('p').addClass('show');
        $(e.currentTarget).on('mouseleave', () => {
            $(e.currentTarget).find('p').removeClass('show');
        })
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

    // contact page
    var currentForm;
    var currentTab = -1;
    var topic;
    let summaryObject = {
        instrument: '',
        student: '',
        frequency: '',
        experience: '',
        availability: '',
        frequencyFirst: false
    };
    var summarySentence = '';
    var summaryElement = $('.summary-sentence');
    var student = '';
    var nominativePronoun = '';
    var accusativePronoun = '';
    $('input[name=Student]').change(() => {
        student = $('input[name=Student]:checked').val();
        if (student !== 'none') {
            summaryObject.student = `lessons for <span>${student}</span>`;
            if (student === 'myself') {
                nominativePronoun = 'I';
                accusativePronoun = 'you';
                dativePronoun = 'you';
            } else {
                nominativePronoun = 'They';
                accusativePronoun = 'they';
                dativePronoun = 'them';
            }
            $('.nominative-pronoun').html(nominativePronoun);
            $('.accusative-pronoun').html(accusativePronoun);
            $('.dative-pronoun').html(dativePronoun);
        } else {
            currentTab = 4;
        }
    });
    function capitalise(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    var instruments = [];
    $('input[name=Instrument]').click(function() {
        instruments = $('input[name=Instrument]:checked').map(function(){
            return $(this).val()
        }).get();
        if (instruments.length === 1) {
            summaryObject.instrument = `<span>${instruments}</span> `;
        } else if (instruments.length === 2) {
            summaryObject.instrument = `<span>${instruments.join(' and ')}</span> `;
        } else if (instruments.length > 2) {
            summaryObject.instrument = `<span>${instruments.slice(0, (instruments.length - 1)).join(', ') + ' and ' + instruments[instruments.length - 1]}</span> `;
        }
    });
    var experience = '';
    $('input[name=Experience]').change(() => {
        experience = $('input[name=Experience]:checked').val();
        if (experience === 'none') {
            summaryObject.experience = ` ${nominativePronoun}'ve <span>never played before</span>.`;
        } else if (experience === 'beginner') {
            summaryObject.experience = ` ${nominativePronoun} started <span>within the last couple of years</span>.`;
        } else if (experience === 'intermediate') {
            summaryObject.experience = ` ${nominativePronoun}’ve been <span>learning for a while</span>.`;
        } else if (experience === 'professional') {
            summaryObject.experience = ` ${nominativePronoun} play <span>professionally</span>.`;
        } else if (experience === 'returner') {
            summaryObject.experience = ` ${nominativePronoun} <span>used to play</span>, but took a break.`;
        } else {
            validationError = 'An error occurred. Please try reloading the page.';
        }
    });
    var frequency = '';
    $('input[name=Frequency]').change(() => {
        frequency = $('input[name=Frequency]:checked').val();
        if (frequency === 'weekly' || frequency === 'just one') {
            summaryObject.frequency = `<span>${frequency}</span> `;
            summaryObject.frequencyFirst = true;
        } else {
            summaryObject.frequency = `, <span>${frequency}</span>`;
            summaryObject.frequencyFirst = false;
        }
    });
    var availability = '';
    $('input[name=Availability]').change(() => {
        availability = $('input[name=Availability]:checked').val();
        if (availability !== 'none') {
            summaryObject.availability = ` <span>${availability}</span> generally work.`;
        }
    });
    var comments = '';
    var name = '';
    var email = '';
    var validationError = '';
    showTab(currentTab);

    function showTab(n) {
        $('.tab').css('display', 'none');
        if (n == -1) {
            $('.headers').hide();
            $('#start-page-contact').css('display', 'block');
            $('#nextBtn').css('display', 'none');
        } else {
            var x = $(currentForm).find('.tab');
            var specificTab = x[n];
            $(specificTab).css('display', 'block');
            $('.headers').show();
            if (n == (x.length - 1)) {
                $('#nextBtn').css('display', 'none');
            } else {
                $('#nextBtn').css('display', 'block');
            }
            // fixStepIndicator(n)
        }
        if (n > 0) {
            $('#message-title').html('Anything else to add?');
            updateSummary(n);
            summaryElement.show();
        } else {
            summaryElement.hide();
        }
    }

    function updateSummary(step) {
        if (step === 1) {
            summarySentence = 'I want ' + summaryObject.student + '.';
        } else if (step === 2) {
            summarySentence = 'I want ' + summaryObject.instrument + summaryObject.student + '.';
        } else if (step === 3) {
            summarySentence += summaryObject.experience;
        } else if (step === 4) {
            if (summaryObject.frequencyFirst) {
                summarySentence = 'I want ' + summaryObject.frequency + summaryObject.instrument + summaryObject.student + '.' + summaryObject.experience;
            } else {
                summarySentence = 'I want ' + summaryObject.instrument + summaryObject.student + summaryObject.frequency + '.' + summaryObject.experience;
            }
        } else if (step === 5) {
            if (student === 'none') {
                $('#message-title').html('Ask away!');
            } else {
                summarySentence += summaryObject.availability;
            }
        }
        summaryElement.html(summarySentence);
    }

    function nextPrev(n) {
        // This function will figure out which tab to display
        var x = currentForm.find('.tab');
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !validateForm()) return false;
        x[currentTab].style.display = 'none';
        currentTab = currentTab + n;
        // if you have reached the end of the form... :
        if (currentTab >= x.length) {
            //...the form gets submitted:
            document.getElementById('regForm').submit();
            return false;
        }

        showTab(currentTab);
    }

    function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = $('.tab');
    y = x[currentTab].getElementsByTagName('input');
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == '') {
        // add an 'invalid' class to the field:
        y[i].className += ' invalid';
        // and set the current valid status to false:
        valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        $('.step')[currentTab].className += ' finish';
    }
    return valid; // return the valid status
    }

    function fixStepIndicator(n) {
        var x = $('.step');
        x.removeClass('active');
        x[n].addClass('active');
    }

    var startingOptions = $('.contact-option');
    startingOptions.on('click', event => {
        var destination = startingOptions.index(event.currentTarget);
        switch (destination) {
            case 0:
                topic = 'recording';
                break;
            case 1:
                topic = 'performing';
                break;
            case 2:
                topic = 'lessons';
                break;
            case 3:
                topic = 'hello';
                break;
            case 4:
                topic = 'other';
                break;
        };
        currentForm = $('.form-container form')[destination];
        currentTab = 0;
        $('#start-page-contact').css('display', 'none');
        showTab(currentTab);
    });

    $('#form-back').on('click', () => {
        if (student === 'none' && currentTab !== 0) {
            currentTab = 0;
        } else {
            currentTab -= 1;
        }
        showTab(currentTab);
    });

    $('#form-restart').on('click', () => {
        currentTab = -1;
        showTab(currentTab);
    });

    $('#nextBtn').on('click', () => {
        if (!validationError) {
            currentTab += 1;
            showTab(currentTab);
        } else {
            $('#error').html(validationError);
        }
    });

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
        arrows: true,
        speed: 900
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