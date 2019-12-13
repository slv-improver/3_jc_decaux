function slidePlay() {
    slideNext();
}
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
function control(e) {
    if (e.target.textContent === 'pause') {
        clearInterval(intervalId);
        e.target.textContent = 'play_arrow';
    } else if (e.target.textContent === 'play_arrow') {
        intervalId = setInterval(slidePlay, 5000);
        e.target.textContent = 'pause';
    }
}

let urlList = ['people1.jpg', 'station3.jpg'];
let captionList = ['Bienvenue à : EnRoute, EnLigne', 'Venez prendre votre vélo à la station']

let slideImg = document.getElementById('slide').childNodes[1].childNodes[1];
let slideCaption = document.getElementById('slide').childNodes[1].childNodes[3];

let slideCount = 0;
reloadSlide();

let intervalId = setInterval(slidePlay, 5000);

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
btnControl.addEventListener('click', control);

/* API */
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Brisbane&apiKey=7b223c89d17e9f045f732705dd821673730331be", function(response) {
    let brisbane = JSON.parse(response);
    console.log(brisbane);
    brisbane.forEach(element => {
        let station = L.marker([element.position.lat, element.position.lng], {
            icon: bikeIcon}).addTo(mymap).bindPopup(element.address);
        station.addEventListener("click", function () {
            document.getElementById('station').style.display = 'block';
            document.getElementById('address').textContent = element.address;
            document.getElementById('places').textContent = element.bike_stands;
            document.getElementById('available').textContent = element.available_bike_stands;
        })
    });
});

/* hidden station details */
document.getElementById('mapid').addEventListener("click", function (e) {
    if (document.getElementById('mapid').style.outline === 'none') {
        document.getElementById('station').style.display = 'none';
    }
});
