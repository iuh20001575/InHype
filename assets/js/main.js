const $ =  document.querySelector.bind(document);
const $$ =  document.querySelectorAll.bind(document);

// Các biến
const searchBtn = $('.heading__btn--search');
const modalForm = $('.modal-form');
const bodyForm = $('.modal-form .form .body-form')
const formElement = $('.modal-form .form .body-form .login-register');
const loginBtn = $('.menu__item.login');
const registerBtn = $('.menu__item.register');
const logoutBtn = $('.menu__item.logout');
const loginFormBtn = $('.header__form--login');
const registerFormBtn = $('.header__form--register');
const form = $('.form');
const inputElements = $$('.body-form input');
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

/* Bắt đầu lắng nghe sự kiện click search btn */

searchBtn.onclick = () => $('.search--input').classList.toggle('active');

/* Kết thúc lắng nghe sự kiện click search btn */

/* Xử lý form đăng kí / đăng nhấp */

function handelLoginForm() {
    isFormLogin = true;
    modalForm.classList.add('active');
    $('.header__form.active').classList.remove('active');
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
    $('.header__form.active').classList.remove('active');
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
                        <span>${data.username}</span> is incorrect. Lost your password?
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
        }
        else {
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