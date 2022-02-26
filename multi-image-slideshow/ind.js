//------------------ START OF PROGRAM ------------------//
// Set initial index and show slides
var index = 1;
var slides = document.getElementsByClassName("slide");
var dots = document.getElementsByClassName("dot");
var slideMode = 2; // 1 = fade-in, 2 = slide-in
var automatic = true;
// Show Slide #1
showSlideAtIndex(index);




//--------------------------------- FUNCTIONS --------------------------------// 


function slideRight() { //////////////////////////////////// RIGHT ARROW BUTTON FUNCTION ///////////////////////////////////////
    // ---------- CHANGE INDEX ---------- //
    var lastIndex = index;
    index++;
    if (index > slides.length) { index = 1; lastIndex = slides.length; }
    else if (index == 2) {lastIndex = 1;}
    //  --------- SWITCH ACTIVE DOT ----------- //
    dots[index - 1].classList.toggle('active');
    dots[lastIndex - 1].classList.toggle('active');
    // ---------------------------------- // 

    // HIDE ALL EXCEPT CURRENT AND PREVIOUS
    for (var i = 0; i < slides.length; i++) { // set all slides except current to not display
        if (i != index - 1 && i != lastIndex - 1) { slides[i].style.display = "none"; }
        else {slides[i].style.display = 'block'; } } // display all but current and last

    // ---------- ADD CLASSES ------------ //
    slides[lastIndex - 1].classList.add('slide-out-left', 'sliding-out');
    slides[index - 1].classList.add('slide-in-right');

    // -------- REMOVE CLASSES AND SET PREVIOUS SLIDE TO HIDDEN -------- ///
    setTimeout(() => {
        slides[lastIndex - 1].style.display = "none";
        slides[lastIndex - 1].classList.remove('slide-out-left', 'sliding-out');
        slides[index - 1].classList.remove('slide-in-right'); },   1000);

        console.log('index: ' + index);
        console.log('lastIndex: ' + index)
    return index;
}


function slideLeft() { //////////////////////////////////// RIGHT ARROW BUTTON FUNCTION ///////////////////////////////////////
    // ---------- CHANGE INDEX ---------- //
    var lastIndex = index;
    index--;
    if (index < 1) { index = slides.length; lastIndex = 1; }
    else if (index == slides.length - 1) {lastIndex = slides.length;}
    //  --------- SWITCH ACTIVE DOT ----------- //
    dots[index - 1].classList.toggle('active');
    dots[lastIndex - 1].classList.toggle('active');
    // ---------------------------------- // 

    // HIDE ALL EXCEPT CURRENT AND PREVIOUS
    for (var i = 0; i < slides.length; i++) { // set all slides except current to not display
        if (i != index - 1 && i != lastIndex - 1) { slides[i].style.display = "none"; }
        else {slides[i].style.display = 'block'; } } // display all but current and last

    // ---------- ADD CLASSES ------------ //
    slides[lastIndex - 1].classList.add('slide-out-right', 'sliding-out', 'temp');
    slides[index - 1].classList.add('slide-in-left');

    // -------- REMOVE CLASSES AND SET PREVIOUS SLIDE TO HIDDEN -------- ///
    setTimeout(() => {
        slides[lastIndex - 1].style.display = "none";
        slides[lastIndex - 1].classList.remove('slide-out-right', 'sliding-out', 'temp');
        slides[index - 1].classList.remove('slide-in-left'); },   1000);

    console.log('index: ' + index);
    console.log('lastIndex: ' + lastIndex);
    return index;
}



// --- change slides --- //
function changeSlide(indexChange) { // Next button: +1, Prev button: -1
    return showSlideAtIndex(index += indexChange); }

// --- jump to slide  --- //
function currentSlide(jumpToIndex) { // on dot click
    showSlideAtIndex(index = jumpToIndex); }


// --- display slide --- //
function showSlideAtIndex(index) {
    if (index > slides.length) { index = 1; } // reset if goes beyond right end
    if (index < 1) { index = slides.length } // reset if goes beyond left end
    for (var i = 0; i < slides.length; i++) { // set all slides except current to not display
        if (i != index - 1) { slides[i].style.display = "none"; } }
    for (var i = 0; i < dots.length; i++) { // set all dots to be not active
        dots[i].className = dots[i].className.replace(" active", ""); }
    slides[index - 1].style.display = "block"; // display current slide
    // ANIMATIONS
    if (slideMode == 2) { slides[index - 1].classList.add("slide-in"); } // add the 'slide-in' class
    else if (slideMode == 1) { slides[index - 1].classList.add("fade-in"); } 
    dots[index - 1].className += " active"; // display current dot
    return index; }




//------------------ DISPLAYING MULIPLE IMAGES ------------------//
var slidesGlobal = document.getElementsByClassName("slide"); // type: HTMLcollection, kind of like array
for (var j = 0; j < slidesGlobal.length; j++) {
    var slide_items = slidesGlobal[j].children 
    var number_of_images = (slide_items.length - 1) / 2;
    for (var i = 0; i < slide_items.length; i++)
    { // divide the default width of 80% of the screen, by the number of images on each slide
        slide_items[i].style.width = (80 / number_of_images) + "%"; // 80%, then 40%, then 26.67% ...
    }
}

if (automatic == true) {
    setInterval(() => { slideRight(); }, 5000)
}