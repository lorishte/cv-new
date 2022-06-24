const menuLinks = $('.navigation__link');
const headerHeight = $('.header').height() + 70;
const progressBars = $('.progress-bar__filler');
const resPhone = 700;
const menu = $('.navigation__list')
let toggleMenuBtn = $('#toggle-menu-btn');
const personalInfo = $('.person')


$(document).on('scroll', function () {
    activeMenuOnScroll();
    showHidePerson();
});

// Toggle navigation -- Phone

toggleMenuBtn.click(function () {

    if (menu.hasClass('open')) {
        menu.removeClass('open')
        $(this).removeClass('clicked');
    } else {
        menu.addClass('open')
        $(this).addClass('clicked');
    }
})


// Change menu color on scroll
function activeMenuOnScroll() {

    let scrollPos = $(document).scrollTop() + headerHeight;

    // Add class 'active' to pressed menu link, remove class 'active' from current active menu link
    menuLinks.each(function () {
        let currLink = $(this);
        let targetedSection = $(currLink.attr('href'));

        if (Math.floor(targetedSection.position().top) <= scrollPos
            && targetedSection.position().top + targetedSection.height() > scrollPos) {
            currLink.addClass('active');
        } else {
            currLink.removeClass('active');
        }
    });
}


// Add progress bar labels
progressBars.each(function (i = 0) {
    let fill_value = $(this).text();
    i = i * 50
    $(this).delay(i).animate(
        {width: fill_value},
        {duration: 1000},
        {
            specialEasing: {
                width: "easeInOutBounce"
            },
        })
});


// Smooth scroll
$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[href=""]')
    .on('click', function (e) {
            e.preventDefault();
            $(document).off('scroll');

            let target = $(this).attr('href'); //Get the target
            let scrollToPosition = $(target).offset().top - headerHeight;

            $('html, body')
                .animate({'scrollTop': scrollToPosition}, 1000);

            $(document).on('scroll', activeMenuOnScroll);

            // Hide menu after click (mobile)
            if (window.innerWidth <= resPhone) {
                $(document).on('scroll', showHidePerson);

                setTimeout(() => {
                    menu.removeClass('open')
                    toggleMenuBtn.removeClass('clicked');
                }, 1000)
            }
        }
    );


function showHidePerson() {
    //Check if resolution is bigger
    if (window.innerWidth <= resPhone) {
        let wScroll = $(this).scrollTop();

        if (wScroll > 300) {
            personalInfo.addClass('visible');
        } else {
            personalInfo.removeClass('visible');
        }
    }
}












