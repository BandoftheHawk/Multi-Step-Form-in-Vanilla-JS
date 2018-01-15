const starListLength = 6;
let hoveredElement, unhoveredElements, clickedElements, currentQuestion, starRating, currentSlide, firstSlideTrue;
const servicelist = ['Availability', 'Staff Friendliness','Information','Loyalty Card', 'Location', 'Opening Hours', 'Solutions', 'Wait Time'];

window.addEventListener('DOMContentLoaded', populateForm); //Populate form based on array {could easily be adapted to have these arrays come from database or JSON data}
document.addEventListener('click', clickhanding); // Click element, Save input
document.getElementsByClassName('done')[0].addEventListener('click', thirdSlide);
document.querySelectorAll('div.chapter-nav span')[0].addEventListener('click', firstSlide);
document.querySelectorAll('div.chapter-nav span')[1].addEventListener('click', secondSlide);
document.querySelectorAll('div.chapter-nav span')[2].addEventListener('click', thirdSlide);
document.addEventListener('mousemove',starWatch);


function clickhanding(e) {
   clickedElement = document.elementFromPoint(e.pageX, e.pageY);
    if (firstSlideTrue == 1) {
        if (clickedElement.classList.contains('empty-star')) {
            for (let i = 0; i < clickedElement.dataset.no; i++) {
                let filledStar = document.getElementsByClassName('empty-star')[i];
                filledStar.classList.add("fill-star");
            }
        }

        if (clickedElement.dataset.no !== undefined && clickedElement.classList.contains("empty-star")) {
            starRating = clickedElement.dataset.no;
            console.log(starRating);
            document.getElementById('star-rating').value = starRating;
            secondSlide();
        }
    }
    if (clickedElement.dataset.no !== undefined && clickedElement.classList.contains("unselected")) {
        let actualInput = document.getElementById(clickedElement.dataset.no);
        if(actualInput.checked) {
            clickedElement.classList.remove("selected");
            actualInput.checked = false;
        } else {
            clickedElement.classList.add("selected");
            actualInput.checked = true;
        }
    }
}

function populateForm() {
    //Populate stars
    if (document.querySelector(".star-list")){
        for (let i = 1; i < starListLength; i++) {
            document.querySelector(".star-list").innerHTML += '<li class="empty-star" data-no="' + i  + '"> </li>'
            Object.assign(document.querySelectorAll('h3')[0].style,{display:"block"});
        }
    }
    currentSlide = document.getElementsByTagName('span')[2];
    firstSlide();
    //Populate Service List
    if (document.querySelector(".hidden")){
        for (let i = 1; i < servicelist.length; i++) {
            let id = servicelist[i].toLowerCase().replace(/ /g,'');
            document.querySelector(".service-list").innerHTML += '<li class="unselected" data-no="' + id  + '">' + servicelist[i]  + '</li>'
            document.querySelector(".hidden").innerHTML += '<input id="' + id /*Removing spaces */ + '" type="checkbox" name= "'+ id + '">'
        }
    }
}

function starWatch(e) {
    if (firstSlideTrue == 1) {
        hoveredElement = document.elementFromPoint(e.pageX, e.pageY);

        if (hoveredElement.classList.contains('empty-star')) {
            for (let i = 0; i < hoveredElement.dataset.no; i++) {
                let filledStar = document.getElementsByClassName('empty-star')[i];
                filledStar.classList.add("fill-star");
            }
        }
        else {
            unhoveredElements = document.querySelectorAll('.empty-star');
            for (let i = 0; i < unhoveredElements.length; i++){
                 unhoveredElements[i].classList.remove("fill-star");
            }
        }
    }
}

function circleNav(Element) {
    currentSlide.style.fontSize = "30px";
    Element.style.fontSize = "36px";
    Element.style.color = "#ff7400";
    currentSlide = Element;
    return Element;
}
// Load First Slide
function firstSlide() {
    Object.assign(document.getElementsByClassName('starting-questions')[0].style,{visibility:"visible"});
    Object.assign(document.querySelectorAll('h3')[0].style,{display:"block"});
    Object.assign(document.getElementsByClassName('service-questions')[0].style,{display:'none',});
    Object.assign(document.getElementsByClassName('comment-and-submit')[0].style,{visibility:"hidden",display:"none",});
    circleNav(document.getElementsByTagName('span')[2]);
    firstSlideTrue = 1;
}
// Load Seecond Slide
function secondSlide() {
    Object.assign(document.querySelectorAll('h3')[0].style,{display:"none"});
    Object.assign(document.getElementsByClassName('service-questions')[0].style,{position:"relative",display:"block"});
    Object.assign(document.getElementsByClassName('comment-and-submit')[0].style,{position:"absolute",visibility:"hidden",display:"none",});
    document.getElementsByTagName('span')[3].style.fontSize = "24px";
    circleNav(document.getElementsByTagName('span')[3]);
    console.log(starRating);
    firstSlideTrue = 0;
    // Check how high the score was, if below 3 display different question
    if (starRating < 3) {
        Object.assign(document.getElementsByTagName('h3')[0].style,{display:"none"});
        Object.assign(document.getElementsByTagName('h3')[1].style,{display:"none"});
        Object.assign(document.getElementsByTagName('h3')[2].style,{display:"block"});
    } else {
        Object.assign(document.querySelectorAll('h3')[0].style,{display:"none"});
        Object.assign(document.querySelectorAll('h3')[1].style,{display:"block"});
        Object.assign(document.querySelectorAll('h3')[2].style,{display:"none"});
    }
}
// Load Third Slide
function thirdSlide(event) {
    Object.assign(document.querySelectorAll('h3')[0].style,{display:"none"});
    Object.assign(document.getElementsByClassName('service-questions')[0].style,{display:'none',});
    Object.assign(document.getElementsByClassName('comment-and-submit')[0].style,{visibility:'visible',display:"block",position:"relative"});;
    Object.assign(document.querySelectorAll('h3')[3].style,{display:"block"});
    circleNav(document.getElementsByTagName('span')[4]);
    firstSlideTrue = 0;
}
