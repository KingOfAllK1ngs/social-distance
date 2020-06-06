window.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.m-menu');
    const menu = document.querySelector(".menu-sidebar");

    menuBtn.addEventListener('click', function () {
        menu.classList.toggle('active');
    });


    // GET DATA FROM JSON DATA BASE

    const getData = async function (url) {
        const response = await fetch(url);


        if (!response.ok) {
            throw new Error(`Какого хера я не могу получить файл по этому адресу???? ${url}, короче ${response.status} нот фаунд!!`);
        }
        publishButton.style.display = "none";
        return await response.json();
    };

    // GET DATA FROM JSON DATA BASE

    let publishButton = document.getElementById('publish'),
        postContainer = document.getElementById('create-post'),
        date = new Date(),
        modalLogIn = document.getElementById('modalLogIn'),
        modalLogOut = document.getElementById('modalLogOut'),
        modalNewUser = document.getElementById('modalNewUser'),
        modal = document.querySelector('.modal'),
        close = document.querySelector('.close'),
        modalTabs = document.querySelectorAll('.tab-btn'),
        modalTabFields = document.querySelectorAll('.field'),
        userAvatar = document.querySelectorAll('.user-avatar'),


        message = document.getElementById('userPostMessage'),
        userNameShort = document.getElementById('userNameShort');
        userNameFull = document.getElementById('userNameFull'),
        loginInput = document.getElementById('loginInput'),
        loginInputPassword = document.getElementById('loginInputPassword'),
        logInButton = document.getElementById('logInButton'),
        warningLogin = document.getElementById('warningLogin'),
        warningPassword = document.getElementById('warningPassword');


    function tab1() {
        modal.style.display = "flex";
        modalTabFields[0].style.display = "block";
        modalTabs[0].classList.add('active');
        modalTabs[1].classList.remove('active');
        modalTabFields[1].style.display = "none";
    }

    function tab2() {
        modal.style.display = "flex";
        modalTabFields[1].style.display = "block";
        modalTabs[1].classList.add('active');
        modalTabs[0].classList.remove('active');
        modalTabFields[0].style.display = "none";
    }
    modalLogIn.addEventListener('click', function (e) {
        e.preventDefault();
        tab1();
    });

    modalNewUser.addEventListener('click', function (e) {
        e.preventDefault();
        tab2();
    });

    modalTabs[0].addEventListener('click', function (e) {
        e.preventDefault();
        tab1();
    });
    modalTabs[1].addEventListener('click', function (e) {
        e.preventDefault();
        tab2();
    });

    function closeModal() {
        modal.style.display = "none";
    }

    close.addEventListener('click', function () {
        closeModal();
    });



    getData('../db/db.json').then(function (data) {
        let admin = data[0],
            userDenis = data[1],
            guest = data[2];



        admin.time = date.toLocaleString("ru", this.options);
        admin.msg = message;

        userDenis.time = date.toLocaleString("ru", this.options);
        userDenis.msg = message;

        admin.msg.addEventListener('input', function () {
            admin.messageText = admin.msg.value;
        });

        userDenis.msg.addEventListener('input', function () {
            userDenis.messageText = userDenis.msg.value;
        });

        loginInput.addEventListener('keydown', function () {

            for (let i = 0; i < data.length; i++) {

                if (data[i].loginName != loginInput.value) {
                    warningLogin.style.display == "block";
                    logInButton.setAttribute('disabled', 'disabled');
                } else {
                    warningLogin.style.display == "none";
                    logInButton.removeAttribute('disabled', 'disabled');
                }
            }



        });
        loginInputPassword.addEventListener('keyup', function () {
            if (loginInputPassword.value.length < 2) {
                warningPassword.style.display == "block";
                logInButton.setAttribute('disabled', 'disabled');
            } else {
                warningPassword.style.display == "none";
                logInButton.removeAttribute('disabled', 'disabled');
            }

        });
        // logInButton

        function setPageParameters(a) {
            
            for (let i = 0; i < userAvatar.length; i++) {

                if (userAvatar[i].classList.contains('den') || userAvatar[i].classList.contains('fig')) {
                    userAvatar[i].src = userAvatar[i].src;
                } else {
                    userAvatar[i].src = a.photo;
                }
            }

            userNameFull.textContent = a.fullName;
            userNameShort.textContent = a.shortName;

            if (a.posting == false) {
                publishButton.style.display = "none";
            } else {
                publishButton.style.display = "block";
            }

            publishButton.addEventListener('click', function (name, photo, time, message) {
                name = a.fullName;
                photo = a.photo;
                time = a.time;
                message = a.messageText;

                setTimeout(function () {
                    a.msg.value = "";
                }, 100);

                postContainer.insertAdjacentHTML('afterend', `
             <div class="post">
             <div class="post-header">
                 <div class="user">
                     <img class="user-avatar" src="${photo}" style="border-radius: 50%;" alt="avatar"></img>
                     <div class="post-info">
                         <a href="#" class="post-author">${name}</a>
                         <div class="post-info-time">
                             <span class="post-time">${time}</span>
                             <svg width="14" height="14" class="setting-icon">
                                 <use xlink:href="img/icons.svg#setting"></use>
                             </svg>
                         </div>
                     </div>
                 </div>
                 <button class="post-header-button">
                    <div class="options-list">
                        <ul>
                            <li><span data-delete="deletePost">Удалить пост</span></li>
                        </ul>
                    </div>
                     <svg width="24" height="24" class="post-button-icon">
                         <use xlink:href="img/icons.svg#dots"></use>
                     </svg>
                 </button>
             </div>
             <div class="post-content">
                 <p class="post-text">
                     ${message}
                 </p>
                <!-- сюда можно впихнуть картинку -->
             </div>     
             <div class="post-footer">
                 <button class="post-button">
                     <svg width="24" height="24" class="post-button-icon">
                         <use xlink:href="img/icons.svg#like"></use>
                     </svg>
                     <span class="post-button-text">0</span>
                 </button>
                 <button class="post-button">
                     <svg width="24" height="24" class="post-button-icon">
                         <use xlink:href="img/icons.svg#chat"></use>
                     </svg>
                     <span class="post-button-text">0</span>
                 </button>
                 <button class="post-button">
                     <svg width="24" height="24" class="post-button-icon">
                         <use xlink:href="img/icons.svg#share"></use>
                     </svg>
                     <span class="post-button-text">0</span>
                 </button>
             </div>
         </div>
             `);

            });
        }

        function logIn() {
            if (admin.loginName == loginInput.value && admin.password == loginInputPassword.value) {
                setPageParameters(admin);
            } else if (userDenis.loginName == loginInput.value && userDenis.password == loginInputPassword.value) {
                setPageParameters(userDenis);
            } else if (loginInput.value == " " && loginInputPassword.value == " ") {
                setPageParameters(guest);
            }
            modalLogOut.style.display = "block";
            modalLogIn.style.display = "none";
            modalNewUser.style.display = "none";
        }

        logInButton.addEventListener('click', function () {
            logIn();
            loginInput.value = "";
            loginInputPassword.value = "";
            closeModal();
        });

        setInterval(function () {
            if (message.value.length < 3) {
                publishButton.classList.remove('active');
                publishButton.setAttribute('disabled', 'disabled');
            } else {
                publishButton.classList.add('active');
                publishButton.removeAttribute('disabled', 'disabled');
            }
        }, 100);

        function checkAuthorized() {
            for (let i = 0; i < data.length; i++) {
                if (data[i].loginName == admin.loginName) {
                    setPageParameters(admin);
                } else {
                    setPageParameters(guest);
                }
            }

        }
        checkAuthorized();

        function logOut() {
            setPageParameters(guest);
            modalLogOut.style.display = "none";
            modalLogIn.style.display = "block";
            modalNewUser.style.display = "block";
            checkAuthorized();            
        }
        modalLogOut.addEventListener('click', function (e) {
            e.preventDefault();
            logOut();
        });
    });
    document.body.addEventListener('click', function (event) {
        let target = event.target;
        if (target.closest('span[data-delete="deletePost"]')) {
            target.closest('.post').style.cssText = "opacity:0;transition:.3s linear;";
            setTimeout(function () {
                target.closest('.post').remove();
            }, 500);
        }

        if (target.closest('.info-panel button')) {
            target.closest('.warnings').style.right = "-100%";
        }
    });

    function checkUser() {
        if (localStorage.getItem('Login') == 'Григорий Каданер') {
            console.log('Yesss');
        }
    }
    checkUser();
});