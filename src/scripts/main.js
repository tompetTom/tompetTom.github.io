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
        var scrollDistance;
        if (link.attr('href')) {
            target = link.attr('href');
        } else if (link.attr('id')) {
            target = `#${link.attr('id')}`;
        };
        if (target == '#') {
            scrollDistance = 0;
        } else {
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
                headerHeight = 60;
            } else if (windowWidth < 900 && windowHeight < windowWidth) {
                headerHeight = 0;
            } else if (windowWidth >= 600 && windowWidth < 900 && windowHeight > windowWidth) {
                headerHeight = 55;
            } else {
                headerHeight = 67;
            };
            scrollDistance = element.offset().top - headerHeight;
        }
        if (scrollDistance < 50 && $(document).scrollTop() < 50) {
            $('html, body').animate({scrollTop: 100}, 500);
        }
        $('html, body').animate({scrollTop: scrollDistance}, 500);
    };

    $('.scroll-link').on('click', event => {
        event.preventDefault();
        scrollToElement($(event.currentTarget));
    });

    // contact page
    function validateEmail(email) {
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
        return regex.test(email);
    }

    function validateInput(input) {
        let valid = true;
        let prop = input.prop('type');
        if (prop == 'email') {
            if (!validateEmail(input.val())) {
                valid = false;
            }
        } else if (prop == 'text' || $(input).is('textarea')) {
            if (input.val().length <= 1 && input.attr('required')) {
                valid = false;
            }
        }
        return valid;
    }

    function validateForm() {
        let valid = true;
        let tab = $(currentForm).find('.tab');
        let inputs = $(tab[currentTab]).find('input, textarea');
        console.log(inputs);
        // A loop that checks every input field in the current tab:
        $(inputs).each(function() {
            if (!validateInput($(this))) {
                valid = false;
                return false;
            }
        });
        if (valid) {
            $(tab).find('.submitBtn').removeAttr('disabled');
        } else {
            $(tab).find('.submitBtn').prop('disabled', true);
        }
        return valid;
    }

    $('input, textarea').blur(e => {
        let input = $(e.currentTarget)
        if (!validateInput(input)) {
            input.addClass('invalid');
        }
    });

    $('input, textarea').on('change paste keyup', function() {
        let input = $(this);
        if (input.hasClass('invalid')) {
            if (validateInput(input)) {
                input.removeClass('invalid');
            }
        }
        validateForm();
    });

    if ($('body').attr('id') == 'contact-page') {

        var currentForm;
        var currentTab = -1;
        // var topic;
        let summaryObject = {
            instrument: '',
            lessons: 'lessons',
            student: '',
            frequency: '',
            experience: '',
            availability: '',
            available: true,
            frequencyFirst: false,
            bypass: false
        };
        var summarySentence = '';
        var summaryElement = $('.summary-sentence');
        var student = '';
        var nominativePronoun = '';
        var accusativePronoun = '';
        let postStudentPunc = '.';
        let fullstopFrequency = '';
        let fullstopExperience = '';

        $('input[name=Student]').change(() => {
            student = $('input[name=Student]:checked').val();
            if (student !== 'none') {
                summaryObject.bypass = false;
                summaryObject.student = student;
                // $('#edit-answer-student').html(student);
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
                summaryObject.bypass = true;
                // currentTab = 4;
            }
        });
        var instruments = [];
        $('input[name=Instrument]').click(function() {
            instruments = $('input[name=Instrument]:checked').map(function(){
                return $(this).val()
            }).get();
            if (instruments.length === 1) {
                $('#edit-answer-instruments').html(instruments);
            } else if (instruments.length === 2) {
                $('#edit-answer-instruments').html(instruments.join(' and '));
            } else if (instruments.length > 2) {
                $('#edit-answer-instruments').html(instruments.slice(0, (instruments.length - 1)).join(', ') + ' and ' + instruments[instruments.length - 1]);
            }
        });
        var experience = '';
        $('input[name=Experience]').change(() => {
            experience = $('input[name=Experience]:checked').val();
            // $('#fullstop-experience').html('.');
            if (experience === 'none') {
                summaryObject.experience = ` ${nominativePronoun}'ve <span id="edit-answer-experience">never played before</span>.`;
                $('#experience-p').html(` ${nominativePronoun}'ve `);
                $('#edit-answer-experience').html('never played before.');
            } else if (experience === 'beginner') {
                summaryObject.experience = ` ${nominativePronoun}'ve been learning for <span id="edit-answer-experience">less than 2 years</span>.`;
                $('#experience-p').html(` ${nominativePronoun}'ve been learning for `);
                $('#edit-answer-experience').html('less than 2 years.');
            } else if (experience === 'intermediate') {
                summaryObject.experience = ` ${nominativePronoun}’ve been <span id="edit-answer-experience">learning for a while</span>.`;
                $('#experience-p').html(` ${nominativePronoun}’ve been `);
                $('#edit-answer-experience').html('learning for a while.');
            } else if (experience === 'professional') {
                summaryObject.experience = ` ${nominativePronoun} play <span id="edit-answer-experience">professionally</span>.`;
                $('#experience-p').html(` ${nominativePronoun} play `);
                $('#edit-answer-experience').html('professionally.');
            } else if (experience === 'returner') {
                summaryObject.experience = ` ${nominativePronoun} <span id="edit-answer-experience">used to play</span>, but took a break.`;
                $('#experience-p').html(` ${nominativePronoun} `);
                $('#edit-answer-experience').html('used to play,');
                $('#experience-end').html('but took a break.');
            } else {
                validationError = 'An error occurred. Please try reloading the page.';
            }
        });
        let frequencyInfo = {
            frequencyFirst: false,
            justOne: false,
        };
        $('input[name=Frequency]').change(() => {
            frequency = $('input[name=Frequency]:checked').val();
            let span = $('.edit-answer-frequency');
            span.html(frequency);
            if (frequency === 'weekly' || frequency === 'just one') {
                frequencyInfo.frequencyFirst = true;
                if (frequency === 'just one') {
                    frequencyInfo.justOne = true;
                    $('#trial-option').hide();
                } else {
                    frequencyInfo.justOne = false;
                    $('#trial-option').show();
                }
            } else {
                frequencyInfo.frequencyFirst = false;
                frequencyInfo.justOne = false;
                $('#trial-option').show();
                postStudentPunc = ',';
                summaryObject.student = student;
                fullstopFrequency = '.';
                // span.html(frequency + '.');
            }
            // $('.edit-answer-frequency').html(frequency + fullstopFrequency);
            // $('#edit-answer-student').html(student + postStudentPunc);
            summaryObject.frequency = frequency;
            summaryObject.student = student;
        });
        var availability = '';
        $('input[name=Availability]').change(() => {
            availability = $('input[name=Availability]:checked').val();
            if (availability == 'none') {
                availability = `${nominativePronoun} don\'t want to book a lesson now.`;
                summaryObject.available = false;
            } else {
                summaryObject.available = true;
            }
            summaryObject.availability = availability;
        });
        var comments = '';
        var name = '';
        var email = '';
        var validationError = '';

        showTab(currentTab);

        function showTab(n) {
            let nextBtn = $('#nextBtn');
            $('.tab').css('display', 'none');
            if (n == -1) {
                $('.headers').hide();
                $('#start-page-contact').css('display', 'block');
                nextBtn.css('display', 'none');
            } else {
                var x = $(currentForm).find('.tab');
                var specificTab = $(x[n]);
                specificTab.css('display', 'block');
                $('.headers').show();
                if (n == (x.length - 1)) {
                    nextBtn.css('display', 'none');
                } else {
                    if (specificTab.find('.checked').length) {
                        nextBtn.removeAttr('disabled');
                    } else {
                        nextBtn.prop('disabled', true);
                    }
                    nextBtn.css('display', 'block');
                }
                updateProgressBar(n);
            }
            if (n > 0) {
                $('#message-title').html('Anything else to add?');
                updateSummary(n);
                if (student === 'none') {
                    summaryElement.hide();
                } else {
                    summaryElement.show();
                }
            } else {
                summaryElement.hide();
            }
            validateForm();
        }

        function updateSummary(step) {
            if (summaryObject.bypass) {
                summarySentence = '';
            }
            let sentenceDiv = $('.summary-sentence').children();
            let sentence = {
                iWant: sentenceDiv[0],
                editAnswerFrequencyFirst: sentenceDiv[1],
                editAnswerInstruments: sentenceDiv[2],
                lessonsFor: sentenceDiv[3],
                editAnswerStudent: sentenceDiv[4],
                postStudentPunc: sentenceDiv[5],
                editAnswerFrequencySecond: sentenceDiv[6],
                fullstopFrequency: sentenceDiv[7],
                experienceP: sentenceDiv[8],
                editAnswerExperience: sentenceDiv[9],
                fullstopExperience: sentenceDiv[10],
                editAnswerAvailability: sentenceDiv[11],
                availabilityEnd: sentenceDiv[12]
            };
            let fullSentence = '';
            $(sentenceDiv).hide();
            summaryElement.hide();
            $('#lessons-for').html('lessons for');
            $('.edit-answer-frequency').html(summaryObject.frequency + fullstopFrequency);
            $('#edit-answer-student').html(summaryObject.student + postStudentPunc);
            $('#edit-answer-availability').html(summaryObject.availability);
            if (step > 0) {
                $(Array.from([sentence.iWant, sentence.lessonsFor, sentence.editAnswerStudent])).show();
                fullSentence = $(sentence.iWant).text() + $(sentence.lessonsFor).text() + $(sentence.editAnswerStudent).text() + $(sentence.postStudentPunc).text();
                console.log(fullSentence);
                summarySentence = $.parseHTML(fullSentence);
            }
            if (step > 1) {
                $(Array.from([sentence.editAnswerInstruments])).show();
            }
            if (step > 2) {
                $(Array.from([sentence.experienceP, sentence.editAnswerExperience, sentence.fullstopExperience])).show();
            }
            if (step > 3) {
                if (frequencyInfo.frequencyFirst) {
                    $(Array.from([sentence.editAnswerFrequencyFirst])).show();
                    if (frequencyInfo.justOne) {
                        $('#lessons-for').html('lesson for');
                    }
                } else {
                    $(Array.from([sentence.editAnswerFrequencySecond, sentence.fullstopFrequency])).show();
                }
            }
            if (step > 4) {
                if (!summaryObject.available) {
                    $(sentence.editAnswerAvailability).show();
                } else {
                    $(Array.from([sentence.editAnswerAvailability, sentence.availabilityEnd])).show();
                }
            }
            if (student === 'none') {
                $('#message-title').html('Ask away!');
            } else {
                summarySentence += summaryObject.availability;
            }
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

        function createProgressBar() {
            let bar = $('.progress-bar');
            let div = '<div></div>';
            let steps = $(currentForm).find('.tab');
            let noOfSteps = steps.length;
            if (noOfSteps > 1) {
                $(bar).removeClass('incognito');
            } else {
                $(bar).addClass('incognito');
            }
            bar.html(div.repeat(noOfSteps));
        }

        function updateProgressBar(tab) {
            let bar = $('.progress-bar');
            let divs = $(bar).children('div');
            if (divs.length) {
                for (let i = 0; i < divs.length; i++) {
                    $(divs[i]).removeClass('complete');
                    $(divs[i]).removeClass('active');
                    if (i < tab) {
                        $(divs[i]).addClass('complete');
                    } else if (i === tab) {
                        $(divs[i]).addClass('active');
                    }
                }
            }
        }

        $('.contact-option').on('click', event => {
            var destination = $('.contact-option').index(event.currentTarget);
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
            createProgressBar();
            showTab(currentTab);
        });

        // Visible checkboxes and activate #nextBtn
        $('input').change(e => {
            let input = $(e.currentTarget);
            let type = input.attr('type');
            if (type == 'checkbox' || type == 'radio') {
                $('input:checked').parent('label').addClass('checked');
                $('input:not(:checked)').parent('label').removeClass('checked');
                if (input.closest('div').find('input:checked')) {
                    $('#nextBtn').removeAttr('disabled');
                }
            }
        });

        $('.bypass').on('click', event => {
            let label = $(event.currentTarget);
            if (!label.hasClass('checked')) {
                $('.bypassable').addClass('disabled').prop('disabled', true).attr('placeholder', '').removeClass('invalid');
            } else {
                $('.bypassable').removeClass('disabled').prop('disabled', false).attr('placeholder', 'e.g. Clarinet for short film');
            }
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

        $('.summary-sentence span').on('click', event => {
            let prevTab = currentTab;
            let span = $(event.currentTarget);
            let id = span.attr('id');
            switch (id) {
                case 'edit-answer-student':
                    currentTab = 0;
                    break;
                case 'edit-answer-instruments':
                    currentTab = 1;
                    break;
                case 'edit-answer-experience':
                    currentTab = 2;
                    break;
                case 'frequency-span-1':
                    currentTab = 3;
                    break;
                case 'frequency-span-2':
                    currentTab = 3;
                    break;
                case 'edit-answer-availability':
                    currentTab = 4;
                    break;
            }
            showTab(currentTab, prevTab);
        });

        $('#nextBtn').on('click', () => {
            if (!validationError) {
                if (summaryObject.bypass) {
                    currentTab = 5;
                } else {
                    currentTab += 1;
                }
                $('#nextBtn').prop('disabled', true);
                showTab(currentTab);
            } else {
                $('#error').html(validationError);
            }
        });

    }

    // slick
    if ($('.slick-quote')) {
        $('.slick-quote').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            arrows: false,
            speed: 1000
        });
    }

    if ($('.slick-video')) {
        $('.slick-video').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            speed: 900
        });
    }

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
        if (section.hasClass('full')) {
            scrollToElement(section);
            section.removeClass('full');
            section.addClass('short');
        } else {
            section.removeClass('short');
            section.addClass('full');
        };
    });
});