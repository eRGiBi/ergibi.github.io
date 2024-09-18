const sections = document.querySelectorAll(
    'section.art, section.uni, .section.gym, section.piano, section.prog');
const toggleTheme = document.getElementById('toggle-theme');
const changingFonts = document.querySelectorAll('#front, #sl li a, footer, span, #cor');
const picsToInvert = document.querySelectorAll('#ghl, #mil')

function isScrolledIntoView(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const sectionHeight = rect.height;
    const scrollThreshold = sectionHeight * 0.2;

    return (rect.top - windowHeight + scrollThreshold) <= 0;
}
function handleScroll() {
    for (const section of sections) {
        if (isScrolledIntoView(section)) {
            section.style.opacity = String(1);
        }
    }
}
function changeTheme() {
    toLight ? changeToLight() : changeToDark();
}

function changeToLight(){
    toggleTheme.classList.remove('bi-moon-fill');
    toggleTheme.classList.add('bi-brightness-high-fill');
    document.body.style.backgroundColor = 'whitesmoke';
    picsToInvert.forEach(pic => {pic.style.filter="invert(100%)";})
    changingFonts.forEach(anchor => {anchor.style.color = "black";});

    localStorage.setItem("theme", "light");

    toLight = false;
}
function changeToDark(){
    toggleTheme.classList.remove('bi-brightness-high-fill');
    toggleTheme.classList.add('bi-moon-fill');
    document.body.style.backgroundColor = '#071920';
    picsToInvert.forEach(pic => {pic.style.filter="invert(0%)";})
    changingFonts.forEach(anchor => {anchor.style.color = "whitesmoke";});

    localStorage.setItem("theme", "dark");

    toLight = true;
}
// Check if there's a preference stored in local storage
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("theme") === "light") {
        changeToLight();
    }
});

if (JSON.parse(localStorage.getItem('dark-theme-enabled'))) {
    changeToLight();
}
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({matches:isDark}) => {
        isDark ? changeToDark() : changeToLight();
    })

let callback = (entries, observer)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.play();
        }
        else{
            entry.target.pause();
        }
    });
}

function elementResize(){


    if (window.innerWidth < 1000){
        document.getElementById("summary").style.textAlign = 'center';
        document.getElementById("summary").style.margin = '10wh 10wh 10wh 10wh';
        document.getElementById("summary").style.padding = '10wh 10wh 10wh 10wh';


        document.getElementById("sub-list").style.textAlign = 'center';
        document.getElementById("sub-list").style.margin = '0 auto';
        document.getElementById("sub-list-elem").style.padding = '10wh 10wh 10wh 10wh';
        document.getElementById("sub-list-elem").style.margin = '10wh 10wh 10wh 10wh';

    } else {

        document.getElementById("summary").style.textAlign = 'left';

        document.getElementById("sub-list").style.textAlign = 'right';
    }
}

// const playPromise = document.getElementById('#video').play();
//
// if (playPromise !== undefined) {
//     playPromise.then(_ => {
//         // Automatic playback started!
//         // Show playing UI.
//     })
//         .catch(error => {
//             document.getElementById('piano-background')
//                 .style.backgroundImage =  'url("images/me.jpg"';
//         });
// }

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};
let observer = new IntersectionObserver(callback, options);

let toLight = true;

window.addEventListener('scroll', handleScroll);
window.addEventListener("resize", elementResize);
toggleTheme.addEventListener('click', changeTheme);

observer.observe(document.querySelector('#piano-video'));

handleScroll();