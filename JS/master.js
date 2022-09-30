// toggle spin class on Icon

document.querySelector(".toggle-setting .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
}

// Switch Colors
let maincolors = window.localStorage.getItem("color-option");
const colorsLi = document.querySelectorAll(".colors-list li");
if (maincolors !== null) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color-option"));
    colorsLi.forEach(li => {
        li.classList.remove("active");
    })
    document.querySelector(`[data-color="${window.localStorage.getItem("color-option")}"]`).classList.add("active");
}

colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        colorsLi.forEach(li => {
            li.classList.remove("active");
        })
        e.target.classList.add("active")
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        localStorage.setItem("color-option", e.target.dataset.color);

    })
})
// --------------------------------------------------------------------
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
        randomizeImgs();
    }
    else {
        backgroundOption = false;
        randomizeImgs();
    }
    //Remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(el => {
        el.classList.remove("active");
    })
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }
    else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}
const randomBackground = document.querySelectorAll(".random-backgrounds span");
randomBackground.forEach(span => {
    span.addEventListener("click", (e) => {
        randomBackground.forEach(span => {
            span.classList.remove("active");
        })
        e.target.classList.add("active");
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background-option", true);
        }
        else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);
        }
    })
})


/////------------------------------------------------------------------//////
// select landing page element
let landing = document.querySelector(".landing-Page");

// Get Array of Images 
let arr = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];


function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {

            let random = Math.floor(Math.random() * arr.length);
            landing.style.backgroundImage = 'url("../Images/' + arr[random] + '")';

        }, 3000);
    }
}

//////-------------------------------------------------------------------------//////

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // skill offset Top
    let skillOffsetTop = ourSkills.offsetTop;

    // skill outer Height (margin & padding بيحسب كمان ال )
    let skillOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = window.innerHeight;

    // Window Scroll Top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillOffsetTop + skillOuterHeight - windowHeight)) {
        let allSkill = document.querySelectorAll(".skills .skill-box span");
        allSkill.forEach(s => {
            s.style.width = s.dataset.progress;
        })
    }
}

//////-------------------------------------------------------------------------///////

let allImages = document.querySelectorAll(".gallery img");
allImages.forEach(img => {
    img.addEventListener("click", (e) => {
        // create overlay Element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        //create the popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box"

        // check for alt
        if (img.alt !== null) {
            let imageHeading = document.createElement("h3");
            let imageHeadingText = document.createTextNode(img.alt);
            imageHeading.appendChild(imageHeadingText);
            popupBox.appendChild(imageHeading);
        }

        // create the image
        let popupImage = document.createElement("img");
        // set Image src
        popupImage.src = img.src;
        // Add Image to Popup-box
        popupBox.appendChild(popupImage);
        // Append popup-box to body
        document.body.appendChild(popupBox);

        // create the close span
        let closeSpan = document.createElement("span");
        let closebuttonText = document.createTextNode("X");
        closeSpan.appendChild(closebuttonText);
        closeSpan.className = "close-button"

        // Add close button to popup box
        popupBox.appendChild(closeSpan);

    });
});

//مش موجودة اصلا في الصفحة علشان كده عملتها بالشكل ده  close button ال 
document.addEventListener("click", function (e) {
    if (e.target.className === "close-button") {

        // Remove current popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
})

//////-----------------------------------------------------------------------////////

// select All bullets

const AllBullets = document.querySelectorAll(".nav-bullets .bullets");
scrollTosomewhere(AllBullets);

/////-----------------------------------------------------------------------/////////

// Select All Links
const AllLinks = document.querySelectorAll(".landing-Page ul li");
scrollTosomewhere(AllLinks);

/////------------------------------------------------------------------------///////

function scrollTosomewhere(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
//////-------------------------------------------------------------------------/////
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalstorage = localStorage.getItem("bullets_option");

if (bulletLocalstorage !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    })
    if (bulletLocalstorage === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}


bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {

        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullets_option", "block")
        }
        else {
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullets_option", "none")
        }
        handleActive(e);
    })
})

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");
    });

    // Add Active Class On Self
    ev.target.classList.add("active");

}

/////--------------------------------------------------------------------////

document.querySelector(".reset-option").onclick = function () {
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");

    window.location.reload();

}

/////---------------------------------------------------------------///////

// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open")
}

document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open")
        }
    }
})

// Stop Propagation on Menu
tLinks.addEventListener("click", (e) => {
    e.stopPropagation();
})

