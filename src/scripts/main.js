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

    $('.sub-navigation li').on('mouseenter', e => {
        $(e.currentTarget).find('p').addClass('show');
        $(e.currentTarget).on('mouseleave', () => {
            $(e.currentTarget).find('p').removeClass('show');
        })
    });

    function scrollTo(scrollDistance) {
        $('html, body').animate({scrollTop: scrollDistance}, 500);
    }

    // scroll to element
    function scrollToElement(link) {
        let target;
        let scrollDistance;
        if (link.attr('href')) {
            target = link.attr('href');
        } else if (link.attr('id')) {
            target = `#${link.attr('id')}`;
        };
        if (target == '#') {
            scrollDistance = 0;
        } else {
            let element = $(document).find(target);
            if (target == '#gear') {
                $('.process-gear').addClass('pg-right');
                element = $(document).find('#process');
            } else if (target == '#process') {
                $('.process-gear').removeClass('pg-right');
            };
            let windowWidth = $(window).width();
            let windowHeight = $(window).height();
            let headerHeight;
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
            // $('html, body').animate({scrollTop: 100}, 500);
            scrollTo(100);
        }
        // $('html, body').animate({scrollTop: scrollDistance}, 500);
        scrollTo(scrollDistance);
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

    function validateForm(input) {
        let valid = true;
        let form, inputs;
        if ($('body').attr('id') !== 'contact-page') {
            form = $(input).closest('form');
            inputs = $(form).find('input', 'textarea');
            console.log(inputs);
        } else {
            form = $(currentForm).find('.tab');
            inputs = $(form[currentTab]).find('input, textarea');
        }
        $(inputs).each(function() {
            if (!validateInput($(this))) {
                valid = false;
                return false;
            }
        });
        if (valid) {
            $(form).find('.submitBtn').removeAttr('disabled');
        } else {
            $(form).find('.submitBtn').prop('disabled', true);
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
        validateForm(input);
    });

    if ($('body').attr('id') == 'contact-page') {

        let currentForm;
        let currentTab = -1;
        let summaryElement = $('.summary-sentence');
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
        let frequencyInfo = {
            frequencyFirst: false,
            justOne: false,
        };
        let nominativePronoun = 'I';
        let accusativePronoun = 'you';
        let postStudentPunc = '.';
        let fullstopFrequency = '';

        $('input[name=Student]').change(() => {
            summaryObject.student = $('input[name=Student]:checked').val();
            if (summaryObject.student !== 'none') {
                summaryObject.bypass = false;
                if (summaryObject.student === 'myself') {
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
                updateExperience();
            } else {
                summaryObject.bypass = true;
            }
        });

        $('input[name=Instrument]').click(function() {
            let instruments = $('input[name=Instrument]:checked').map(function(){
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

        function updateExperience() {
            let experience = $('input[name=Experience]:checked').val();
            if (experience === 'returner') {
                $('#experience-p').html(` ${nominativePronoun} `);
                $('#edit-answer-experience').html('used to play,');
                $('#experience-end').html('but took a break.');
            } else {
                $('#experience-end').html('');
                if (experience === 'none') {
                    $('#experience-p').html(` ${nominativePronoun}'ve `);
                    $('#edit-answer-experience').html('never played before.');
                } else if (experience === 'beginner') {
                    $('#experience-p').html(` ${nominativePronoun}'ve been learning for `);
                    $('#edit-answer-experience').html('less than 2 years.');
                } else if (experience === 'intermediate') {
                    $('#experience-p').html(` ${nominativePronoun}’ve been `);
                    $('#edit-answer-experience').html('playing for a while.');
                } else if (experience === 'professional') {
                    $('#experience-p').html(` ${nominativePronoun} play `);
                    $('#edit-answer-experience').html('professionally.');
                }
            }
        }

        $('input[name=Experience]').change(() => {
            updateExperience();
        });

        $('input[name=Frequency]').change(() => {
            frequency = $('input[name=Frequency]:checked').val();
            if (frequency === 'weekly' || frequency === 'just one') {
                frequencyInfo.frequencyFirst = true;
                postStudentPunc = '.';
                fullstopFrequency = '';
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
                fullstopFrequency = '.';
            }
            summaryObject.frequency = frequency;
        });
        
        let availability = '';
        $('input[name=Availability]').change(() => {
            availability = $('input[name=Availability]:checked').val();
            if (availability == 'none') {
                availability = `${nominativePronoun} don't want to book a lesson now.`;
                summaryObject.available = false;
            } else {
                summaryObject.available = true;
            }
            summaryObject.availability = availability;
        });

        showTab(currentTab);

        function showTab(n) {
            let nextBtn = $('#nextBtn');
            $('.tab').css('display', 'none');
            if (n == -1) {
                $('.headers').hide();
                $('#start-page-contact').css('display', 'block');
                nextBtn.css('display', 'none');
            } else {
                let x = $(currentForm).find('.tab');
                let specificTab = $(x[n]);
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
                if (summaryObject.student === 'none') {
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
            let sentenceDiv = $('.summary-sentence').children();
            let sentence = {
                iWant: sentenceDiv[0],
                editAnswerFrequencyFirst: sentenceDiv[1],
                editAnswerInstruments: sentenceDiv[2],
                lessonsFor: sentenceDiv[3],
                editAnswerStudent: sentenceDiv[4],
                editAnswerFrequencySecond: sentenceDiv[5],
                fullstopFrequency: sentenceDiv[6],
                experienceP: sentenceDiv[7],
                editAnswerExperience: sentenceDiv[8],
                fullstopExperience: sentenceDiv[9],
                editAnswerAvailability: sentenceDiv[10],
                availabilityEnd: sentenceDiv[11]
            };
            $(sentenceDiv).hide();
            summaryElement.hide();
            $('#lessons-for').html('lessons for');
            $('.edit-answer-frequency').html(summaryObject.frequency + fullstopFrequency);
            $('#edit-answer-student').html(summaryObject.student + '.');
            $('#edit-answer-availability').html(summaryObject.availability);
            if (step > 0) {
                $(Array.from([sentence.iWant, sentence.lessonsFor, sentence.editAnswerStudent])).show();
            }
            if (step > 1) {
                $(Array.from([sentence.editAnswerInstruments])).show();
            }
            if (step > 2) {
                $(Array.from([sentence.experienceP, sentence.editAnswerExperience, sentence.fullstopExperience])).show();
            }
            if (step > 3) {
                $('#edit-answer-student').html(summaryObject.student + postStudentPunc);
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
            if (summaryObject.student === 'none') {
                $('#message-title').html('Ask away!');
            }
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
            let destination = $('.contact-option').index(event.currentTarget);
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
                $('.bypassable').addClass('disabled').prop('disabled', true).removeAttr('required').attr('placeholder', '').removeClass('invalid');
            } else {
                $('.bypassable').removeClass('disabled').prop('disabled', false).prop('required', 'required').attr('placeholder', 'e.g. Clarinet for short film');
                if (!validateInput($('.bypassable'))) {
                    $('.bypassable').addClass('invalid');
                }
            }
        });

        $('#form-back').on('click', () => {
            if (summaryObject.student === 'none' && currentTab !== 0) {
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
            showTab(currentTab);
        });

        $('#nextBtn').on('click', () => {
            if (summaryObject.bypass) {
                currentTab = 5;
            } else {
                currentTab += 1;
            }
            $('#nextBtn').prop('disabled', true);
            showTab(currentTab);
            if ($(document).width() < 900) {
                scrollTo(100);
            }
        });

    }

    // slick
    if ($('body').attr('id') == 'home-page' || $('body').attr('id') == 'recording-page') {
        $('.slick-quote').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            arrows: false,
            speed: 1000
        });

        $(window).on('orientationchange', function() {
            $('.slick-quote').slick('resize');
        });

        $('.slick-video').slick({
            autoplay: false,
            dots: true,
            arrows: true,
            speed: 900
        });
    }

    // youtube thumbnails
    function setYoutubeThumbnails(youtubes) {
        for (let i = 0; i < youtubes.length; i++) {
            if ($(youtubes[i]).hasClass('unloaded-thumbnail')) {
                let src;
                if ($(youtubes[i]).hasClass('facebook-video')) {
                    src = 'https://bsp-static.playbill.com/dims4/default/eddc159/2147483647/crop/6644x3740%2B0%2B2915/resize/970x546/quality/90/?url=http%3A%2F%2Fpb-asset-replication.s3.amazonaws.com%2Fc5%2Fb4%2F7fce0e31418ab9146014dcb572b6%2Fromantics-anonymous-2019-0036.jpg';
                } else {
                    src = 'https://i.ytimg.com/vi/' + youtubes[i].dataset.id + '/hqdefault.jpg';
                }
                let url = 'url(' + src + ')';
                $(youtubes[i]).css('background-image', url);
                $(youtubes[i]).removeClass('unloaded-thumbnail');
            }
        }
    }

    setYoutubeThumbnails($('#home-page .youtube-thumbnail-div'));
    setYoutubeThumbnails($('.load-first'));

    function iframeAttributes(div) {
        let data = {};
        if ($(div).hasClass('facebook-video')) {
            data = {
                'src': 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com' + div.dataset.id + '&show_text=false&autoplay=true',
                'frameborder': '0',
                'allowfullscreen': '1',
                'allow': 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                'class': 'youtube'
            }
        } else {
            data = {
                'src': 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1&rel=0&enablejsapi=1',
                'frameborder': '0',
                'modestbranding': '1',
                'show-info': '0',
                'allowfullscreen': '1',
                'allow': 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                'class': 'youtube'
            }
        }
        return data;
    }

    function createVideoIframe(div) {
        $(div).addClass('play');
        $('<iframe/>', iframeAttributes(div)).appendTo($(div));
    }

    $('.youtube-thumbnail-div').one('click', function() {
        createVideoIframe(this);
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
        setYoutubeThumbnails($(info.find('.unloaded-thumbnail')));
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
        let button = $(e.currentTarget);
        let section = button.closest('section');
        if (section.hasClass('full')) {
            scrollToElement(section);
            section.removeClass('full');
            section.addClass('short');
        } else {
            section.removeClass('short');
            section.addClass('full');
        };
    });

    $('#clients .show-hide').one('click', setYoutubeThumbnails($('#clients').find('.youtube-thumbnail-div')));
});