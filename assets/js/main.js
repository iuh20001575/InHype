// Các biến
const searchBtn = document.querySelector('.heading__btn--search');
const modalForm = document.querySelector('.modal-form');
const bodyForm = document.querySelector('.modal-form .form .body-form')
const formElement = document.querySelector('.modal-form .form .body-form .login-register');
const loginBtn = document.querySelector('.menu__item.login');
const registerBtn = document.querySelector('.menu__item.register');
const logoutBtn = document.querySelector('.menu__item.logout');
const loginFormBtn = document.querySelector('.header__form--login');
const registerFormBtn = document.querySelector('.header__form--register');
const form = document.querySelector('.form');
const inputElements = document.querySelectorAll('.body-form input');
const backToTopBtn = document.querySelector('.back-to-top');
const barsBtn = document.querySelector('.heading__bars');
const headingMenu = document.querySelector('.heading__menu');
const KEY_USERS = JSON.parse(localStorage.getItem('KEY_USERS')) || [];

var isFormLogin;
var showPassword = false;
const iconsInput = {
    user: '<i class="fas fa-user"></i>',
    password: '<i class="fas fa-unlock"></i>',
    mail: '<i class="far fa-envelope"></i>',
    eyeShow: '<i class="show far fa-eye"></i>',
    eyeHidden: '<i class="hidden far fa-eye-slash"></i>'
};


/* Start Handler Margin-top: Attribute: margin-top */

document.querySelectorAll('[margin-top]').forEach(element =>
    element.style.marginTop = element.getAttribute('margin-top') + 'px');

document.querySelectorAll('[margin-bottom]').forEach(element =>
    element.style.marginBottom = element.getAttribute('margin-bottom') + 'px');

/* End Handler Margin-top: Attribute: margin-top */

/* Bắt đầu lắng nghe sự kiện click search btn */

searchBtn.onclick = () => document.querySelector('.search--input').classList.toggle('active');

/* Kết thúc lắng nghe sự kiện click search btn */

/* Xử lý form đăng kí / đăng nhấp */

function handelLoginForm() {
    isFormLogin = true;
    modalForm.classList.add('active');
    document.querySelector('.header__form.active').classList.remove('active');
    loginFormBtn.classList.add('active');
    formElement.innerHTML = `
        <div class="error-messenger"></div>
        <div class="file-group">
            <label for="">
                ${iconsInput.mail}
            </label>
            <input type="text" name="username" required placeholder="Email or Username" class="">
        </div>
        <div class="file-group">
            <label for="">
                ${iconsInput.password}
            </label>
            <input type="password" name="password" autocomplete required placeholder="Password" class="">
            <div class="eye">
                ${iconsInput.eyeShow}
                ${iconsInput.eyeHidden}
            </div>
        </div>
        <div class="file-group">
            <input type="checkbox" name="remember-me" id="checkbox" checked>
            <label class="checkbox" for="checkbox">Remember me</label>
        </div>
        <div class="file-group">
            <button class="submit">Log in</button>
        </div>
        <div class="re-pass">Forgot your password?</div>
    `;
    bodyForm.classList.remove('body-form--repass')
}

function handelRegisterForm() {
    isFormLogin = false;
    modalForm.classList.add('active');
    document.querySelector('.header__form.active').classList.remove('active');
    registerFormBtn.classList.add('active');
    formElement.innerHTML = `
        <div class="error-messenger"></div>
        <div class="file-group">
            <label for="">
                ${iconsInput.user}
            </label>
            <input type="text" name="username" required placeholder="Username*" class="">
        </div>

        <div class="file-group half gap">
            <label for="">
                ${iconsInput.user}
            </label>
            <input type="text" name="firstName" required placeholder="First name*" class="">
        </div>

        <div class="file-group half gap">
            <label for="">
                ${iconsInput.user}
            </label>
            <input type="text" name="lastName" required placeholder="Last name" class="">
        </div>

        <div class="file-group">
            <label for="">
                ${iconsInput.mail}
            </label>
            <input type="email" name="email" required placeholder="Email*" class="">
        </div>

        <div class="file-group">
            <input type="checkbox" id="checkbox" checked required>
            <label class="checkbox" for="checkbox">I agree with the <a href="">Privacy policy</a>.</label>
        </div>

        <div class="file-group">
            <button class="submit">Create account</button>
        </div>
    `;
    bodyForm.classList.remove('body-form--repass')
}

function handelCloseForm() {
    isFormLogin = undefined;
    formElement.innerHTML = '';
    if (modalForm.classList.contains('active'))
        modalForm.classList.remove('active');
}

loginBtn.addEventListener('click', handelLoginForm)

registerBtn.addEventListener('click', handelRegisterForm);

form.addEventListener('click', (e) => {
    if (e.target.closest('.eye')) {
        document.querySelector('.body-form .file-group div').classList.toggle('active');
        document.querySelector('.modal-form input[autocomplete]').type = showPassword ? 'password' : 'text';
        showPassword = !showPassword;
    } else if (e.target.closest('.close'))
        handelCloseForm();
    else if (e.target.closest('.header__form--register'))
        handelRegisterForm();
    else if (e.target.closest('.header__form--login'))
        handelLoginForm();
    else if (e.target.closest('.re-pass'))
        bodyForm.classList.add('body-form--repass')
    else if (e.target.closest('.back-login'))
        bodyForm.classList.remove('body-form--repass')
    e.stopPropagation();
})

modalForm.addEventListener('click', handelCloseForm);

inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
        if (inputElement.value === '')
            inputElement.classList.remove('active');
        else
            inputElement.classList.add('active');
    })
})

/* Xử lý form đăng kí / đăng nhấp */

/* Start Lưu thông tin người dùng khi đăng kí */

function handelLogout() {
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
}

function handelLogin() {
    handelCloseForm();
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
}

function innerHTMLElement(element, htmlInner) {
    element.style.display = 'block';
    element.innerHTML = `${htmlInner}`;
}

formElement.onsubmit = (e) => {
    const inputElementForms = formElement.querySelectorAll('input[name]');
    var data = {};
    inputElementForms.forEach(input => data[input.name] = input.value);
    if (isFormLogin) {
        const dataUser = KEY_USERS.find(value => {
            var res = JSON.parse(localStorage.getItem(value));
            return data.username === res.username || data.username === res.email;
        })
        if (dataUser) {
            if (data.password === dataUser.username)
                handelLogin();
            else {
                const messengerErrorElement = formElement.querySelector('.error-messenger');
                if (messengerErrorElement)
                    innerHTMLElement(messengerErrorElement, `
                        <span>ERROR</span>:
                        The password you entered for the email address 
                        <span>document.querySelector{data.username}</span> is incorrect. Lost your password?
                    `);
            }
        } else {
            const messengerErrorElement = formElement.querySelector('.error-messenger');
            if (messengerErrorElement)
                innerHTMLElement(messengerErrorElement, `
                    <span>ERROR</span>:
                    The Username or email you entered is incorrect.
                `);
        }
    } else {
        console.log(data);
        var messengerError = '';
        if (KEY_USERS.find(value => value === data.username))
            messengerError += `<div><span>ERROR</span>: This username is already registered. Please choose another one.</div>`;
        if (KEY_USERS.find(value => {
                var res = JSON.parse(localStorage.getItem(value));
                return data.email === res.email;
            }))
            messengerError += `<div><span>ERROR</span>: This email is already registered, please choose another one.</div>`;
        if (messengerError === '') {
            KEY_USERS.push(data.username);
            localStorage.setItem(data.username, JSON.stringify(data));
            localStorage.setItem('KEY_USERS', JSON.stringify(KEY_USERS));
            const messengerErrorElement = formElement.querySelector('.error-messenger');
            if (messengerErrorElement)
                innerHTMLElement(messengerErrorElement, 'Registration was successful, reloading page.');
        } else {
            console.log(messengerError);
            const messengerErrorElement = formElement.querySelector('.error-messenger');
            if (messengerErrorElement)
                innerHTMLElement(messengerErrorElement, messengerError);
        }
    }
    e.preventDefault();
}

logoutBtn.addEventListener('click', handelLogout)

/* End Lưu thông tin người dùng khi đăng kí */

/* Start Handel Navbar */

jQuery.fn.animateAuto = function(prop, speed, callback) {
    var elem, height, width;

    return this.each(function(i, el) {
        el = jQuery(el), elem = el.clone().css({
            "height": "auto",
            "width": "auto"
        }).appendTo("body");
        height = elem.css("height"),
            width = elem.css("width"),
            elem.remove();

        if (prop === "height")
            el.animate({
                "height": height
            }, speed, callback);
        else if (prop === "width")
            el.animate({
                "width": width
            }, speed, callback);
        else if (prop === "both")
            el.animate({
                "width": width,
                "height": height
            }, speed, callback);
    });
};

document.querySelector('.heading__menu-sub-item').onclick = e => {
    e.stopPropagation();
};

$(".heading__bars").bind("click", function(e) {
    if (window.screen.availWidth <= 1024)
        e.preventDefault();
    document.querySelector('.heading__menu').classList.toggle('active');
    if (document.querySelector('.heading__menu').classList.contains('active'))
        $(".heading__menu").animateAuto("height", 200);
    else
        document.querySelector('.heading__menu').style.height = 0;
});

$(".sub__item").bind("click", function(e) {
    var subElement = this.querySelector('.sub__item-list');
    if (subElement) {
        e.stopPropagation();
        e.preventDefault();
        subElement.classList.toggle('active');
        if (subElement.classList.contains('active')) {
            document.querySelector('.heading__menu').style.height = 'unset';
            document.querySelector('.sub__menu').style.height = 'unset';
            document.querySelector('.heading__menu-item').style.height = 'unset';
            $(`.${Array.from(subElement.classList).join('.')}`).animateAuto("height", 200);
        } else
            subElement.style.height = 0;
    }
});

$(".heading__menu-item").bind("click", function(e) {
    var subElement = this.querySelector('.sub__menu') || this.querySelector('.heading__menu-sub-item');
    if (subElement) {
        subElement.classList.toggle('active');
        if (subElement.classList.contains('active')) {
            document.querySelector('.heading__menu').style.height = 'unset';
            $(`.${Array.from(subElement.classList).join('.')}`).animateAuto("height", 200);
        } else
            subElement.style.height = 0;
        e.stopPropagation();
        e.preventDefault();
    }
});

// barsBtn.addEventListener('click', () => {
//     // if (headingMenu.classList.contains('active'))
//     //     headingMenu.style.height = '0';
//     // else
//     //     headingMenu.style.height = '100%';
//     headingMenu.classList.toggle('active');
// });

window.onscroll = function(e) {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (window.innerWidth > 1024) {
        if (scrollTop > 500) {
            if (!headingMenu.classList.contains('scroll')) {
                headingMenu.classList.add('animation-show');
                setTimeout(() => headingMenu.classList.remove('animation-show'), 1000)
            }
            headingMenu.classList.add('scroll');
        } else
            headingMenu.classList.remove('scroll');
    } else {
        if (document.querySelector('.heading__menu.scroll'))
            headingMenu.classList.remove('scroll');
    }


    /* Back top top */
    if (scrollTop > 500)
        backToTopBtn.classList.add('active');
    else
        backToTopBtn.classList.remove('active');
};

/* End Handel Navbar */

/* Start Slider */

$(document).ready(function() {
    $('.slider-list').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        touchThreshold: 99,
        speed: 500,
    });
    $('.quick-take__list').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
        touchThreshold: 99,
        speed: 500,
        responsive: [{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
        ],
    });
    $('.slick-slider__col5').slick({
        // autoplay: true,
        // autoplaySpeed: 2000,
        arrows: false,
        touchThreshold: 99,
        // speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipeToSlide: true,
        infinite: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

/* End Slider */

/* Start BackgroundImage */

function setImageBackground(selector, arrayImage) {
    document.querySelectorAll(selector).forEach((element, index) =>
        element.style.backgroundImage = `url('/assets/img/${arrayImage[index]}')`);
}

function setBackgroundImage() {
    var srcImgsLeft = [
        'othxsvthtrc-555x360.jpg',
        'story2.jpg',
        'story3.jpg',
    ];
    setImageBackground('.selected__item .content-img--link', srcImgsLeft);
    var srcImgsRight = [
        'story4.jpg',
        'european-news1.jpg',
    ];
    setImageBackground('.selected__item-img', srcImgsRight);
    var imageSlickSliders = [
        'cmpce1fznue-555x360.jpg',
        'inhype2-photos-1-555x360.jpg',
        'g0ocjglcehu-555x360.jpg',
    ];
    setImageBackground('.quick-take__item-img', imageSlickSliders);
    var imageWorldWide = [
        'cmpce1fznue-555x360.jpg',
        'story2.jpg',
        'story4.jpg',
        'european-news1.jpg',
        'oops1oswe0m-1140x694.jpg',
        'inhype1-photos-3-1140x694.jpg',
    ];
    setImageBackground('.world-wide__item', imageWorldWide);
    var imagePosts = [
        'cmpce1fznue-555x360.jpg',
        'inhype2-photos-1-555x360.jpg',
        'othxsvthtrc-555x360.jpg',
        '5ddyhjk_kmu-555x360.jpg',
        'story2.jpg',
        'story3.jpg',
        'story4.jpg',
    ];
    setImageBackground('.posts__item .content-img--link', imagePosts);
    var imageCategories = [
        'whwybmtn3_0.jpg',
        'fmnti8haab8.jpg',
        'story2.jpg',
        'cmpce1fznue-555x360.jpg',
        'abi1mynlbga.jpg',
    ];
    setImageBackground('.categories__item', imageCategories);
    var fixedIncome = [
        'g0ocjglcehu-555x360.jpg',
        'inhype2-photos-1-555x360.jpg',
        'cmpce1fznue-555x360.jpg',
        'othxsvthtrc-555x360.jpg',
        'story3.jpg',
        'story2.jpg',
    ];
    setImageBackground('.fixed-income .content-img--link', fixedIncome);
}

setBackgroundImage();

/* End BackgroundImage */

/* Start Scroll Reveal */

ScrollReveal({
    reset: false,
    distance: '60px',
    duration: 2500,
    delay: 400
});
ScrollReveal().reveal('.content', {
    delay: 500,
    origin: 'bottom'
});
ScrollReveal().reveal('.content .content-list', {
    delay: 600,
    origin: 'bottom',
    interval: 200
});

/* End Scroll Reveal */

// Handel event click on back to top
backToTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Resize width
window.onresize = () => {
    var worldWideElement = document.querySelector('.world-wide');
    if (window.innerWidth < 1024) {
        worldWideElement.style.marginTop = '2px';
    } else {
        worldWideElement.style.marginTop =
            `${worldWideElement.getAttribute('margin-top')}px`;
    }
};