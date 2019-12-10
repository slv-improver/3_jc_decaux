function reloadSlide () {
    slideImg.src = 'images/' + urlList[slideCount];
    slideCaption.textContent = captionList[slideCount];
}

function slideNext () {
    if (slideCount < urlList.length-1) {
        slideCount++;
    } else {
        slideCount = 0;
    }
    reloadSlide();
}
function slidePrevious () {
    if (slideCount > 0) {
        slideCount--;
    } else {
        slideCount = urlList.length-1;
    }
    reloadSlide();
}

let urlList = ['people1.jpg', 'station3.jpg'];
let captionList = ['Bienvenue à : EnRoute, EnLigne', 'Venez prendre votre vélo à la station']

let slideImg = document.getElementById('slide').childNodes[1].childNodes[1];
let slideCaption = document.getElementById('slide').childNodes[1].childNodes[3];

let slideCount = 0;
reloadSlide();

let intervalId = setInterval(slideNext, 5000);

document.addEventListener('keyup', function(e) {
    if (e.keyCode === 39) {
        slideNext();
    } else if  (e.keyCode === 37) {
        slidePrevious();
    }
})

let btnPrevious = document.getElementById('nav-icons').childNodes[1];
let btnControl = document.getElementById('nav-icons').childNodes[3];
let btnNext = document.getElementById('nav-icons').childNodes[5];

btnPrevious.addEventListener('click', slidePrevious);
btnNext.addEventListener('click', slideNext);
btnControl.addEventListener('click', function(e) {
    if (e.target.textContent === 'pause') {
        clearInterval(intervalId);
        e.target.textContent = 'play_arrow';
    } else if (e.target.textContent === 'play_arrow') {
        intervalId = setInterval(slideNext, 5000);
        e.target.textContent = 'pause';
    }
})

/* API */
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Brisbane&apiKey=7b223c89d17e9f045f732705dd821673730331be", function(response) {
    let brisbane = JSON.parse(response);
    console.log(brisbane);
    brisbane.forEach(element => {
        L.marker([element.position.lat, element.position.lng]).addTo(mymap);
    });
});