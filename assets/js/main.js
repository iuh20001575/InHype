const $ =  document.querySelector.bind(document);
const $$ =  document.querySelectorAll.bind(document);

const searchBtn = $('.heading__btn--search');

/* Bắt đầu lắng nghe sự kiện click search btn */

searchBtn.onclick = () => {
    const searchInput = $('.search--input');
    searchInput.classList.toggle('active');
}

/* Kết thúc lắng nghe sự kiện click search btn */

/* Xử lý form đăng kí / đăng nhấp */

const modalForm = $('.modal-form');
const bodyForm = $('.modal-form .form .body-form')
const formElement = $('.modal-form .form .body-form form');
const loginBtn = $('.menu__item.login');
const registerBtn = $('.menu__item.register');
const loginFormBtn = $('.header__form--login');
const registerFormBtn = $('.header__form--register');
const form = $('.form');
const inputElements = $$('.body-form input');

const iconsInput = {
    user: '<i class="fas fa-user"></i>',
    password: '<i class="fas fa-unlock"></i>',
    mail: '<i class="far fa-envelope"></i>',
    eyeShow: '<i class="show far fa-eye"></i>',
    eyeHidden: '<i class="hidden far fa-eye-slash"></i>'
};
var showPassword = false;

function handelLoginForm() {
    modalForm.classList.add('active');
    $('.header__form.active').classList.remove('active');
    loginFormBtn.classList.add('active');
    formElement.innerHTML = `
        <div class="file-group">
            <label for="">
                ${iconsInput.mail}
            </label>
            <input type="text" required placeholder="Email or Username" class="">
        </div>
        <div class="file-group">
            <label for="">
                ${iconsInput.password}
            </label>
            <input type="password" autocomplete required placeholder="Password" class="">
            <div class="eye">
                ${iconsInput.eyeShow}
                ${iconsInput.eyeHidden}
            </div>
        </div>
        <div class="file-group">
            <input type="checkbox" name="" id="checkbox" checked>
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
    modalForm.classList.add('active');
    $('.header__form.active').classList.remove('active');
    registerFormBtn.classList.add('active');
    formElement.innerHTML = `
        <div class="file-group">
            <label for="">
                ${iconsInput.user}
            </label>
            <input type="text" required placeholder="Username*" class="">
        </div>

        <div class="file-group half gap">
            <label for="">
                ${iconsInput.user}
            </label>
            <input type="text" required placeholder="First name*" class="">
        </div>

        <div class="file-group half gap">
            <label for="">
                ${iconsInput.user}
            </label>
            <input type="text" required placeholder="Last name" class="">
        </div>

        <div class="file-group">
            <label for="">
                ${iconsInput.mail}
            </label>
            <input type="email" required placeholder="Email*" class="">
        </div>

        <div class="file-group">
            <input type="checkbox" name="" id="checkbox" checked>
            <label class="checkbox" for="checkbox">I agree with the <a href="">Privacy policy</a>.</label>
        </div>

        <div class="file-group">
            <button class="submit">Create account</button>
        </div>
    `;
    bodyForm.classList.remove('body-form--repass')
}

function handelCloseForm() {
    formElement.innerHTML = '';
    modalForm.classList.remove('active');
}

loginBtn.addEventListener('click', handelLoginForm)

registerBtn.addEventListener('click', handelRegisterForm)

form.addEventListener('click', (e) => {
    if (e.target.closest('.eye')) {
        $('.body-form .file-group div').classList.toggle('active');
        $('.modal-form input[autocomplete]').type = showPassword ? 'password' : 'text';
        showPassword = !showPassword;
    }
    else if (e.target.closest('.close'))
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

modalForm.addEventListener('click', handelCloseForm)

inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
        if (inputElement.value === '')
            inputElement.classList.remove('active');
        else
            inputElement.classList.add('active');
    })
})

/* Xử lý form đăng kí / đăng nhấp */