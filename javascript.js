const sections = document.querySelectorAll(
    'section.uni, .section.gym, section.piano, section.prog');
const toggleTheme = document.getElementById('toggle-theme');
const changingFonts = document.querySelectorAll('#front, #sl li a, footer, span');
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

    toLight = false;
}
function changeToDark(){
    toggleTheme.classList.remove('bi-brightness-high-fill');
    toggleTheme.classList.add('bi-moon-fill');
    document.body.style.backgroundColor = '#071920';
    picsToInvert.forEach(pic => {pic.style.filter="invert(0%)";})
    changingFonts.forEach(anchor => {anchor.style.color = "whitesmoke";});

    toLight = true;
}

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

    }
}

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