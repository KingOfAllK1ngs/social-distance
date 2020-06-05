const menuBtn = document.querySelector('.m-menu');
const menu = document.querySelector(".menu-sidebar");

menuBtn.addEventListener('click', function () {
    menu.classList.toggle('active');
});

const publishButton = document.getElementById('publish'),
    postContainer = document.getElementById('create-post'),
    date = new Date();


let userDetails = {
    name: document.getElementById('userName').textContent,
    photo: document.getElementById('userAvatar').src,
    options: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    },
    time: date.toLocaleString("ru", this.options),
    message: document.getElementById('userPostMessage'),
    messageText: ""
};
userDetails.message.addEventListener('input', function () {
    userDetails.messageText = userDetails.message.value;
});

setInterval(function() {
    if (userDetails.message.value.length < 3) {
        publishButton.classList.remove('active');
        publishButton.setAttribute('disabled', 'disabled');
    } else {
        publishButton.classList.add('active');
        publishButton.removeAttribute('disabled', 'disabled'); 
    }
},100);


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

publishButton.addEventListener('click', function (name, photo, time, message) {
    name = userDetails.name;
    photo = userDetails.photo;
    time = userDetails.time;
    message = userDetails.messageText;

    setTimeout(function() {
        userDetails.message.value = "";
    },100);

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