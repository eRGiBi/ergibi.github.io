
const sections = document.querySelectorAll(
    'section.uni, .section.gym, section.piano, section.prog');
const tbtn = document.getElementById('theme-btn');
const changingFonts = document.querySelectorAll('#front, #sl li a, footer');
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
            section.style.opacity = 1;
        }
    }
}
function changeTheme() {
    toLight ? changeToLight() : changeToDark();
}

function changeToLight(){
    document.body.style.backgroundColor = 'whitesmoke';
    picsToInvert.forEach(pic => {pic.style.filter="invert(100%)";})
    changingFonts.forEach(anchor => {anchor.style.color = "black";});

    toLight = false;
}
function changeToDark(){
    document.body.style.backgroundColor = '#071920';
    picsToInvert.forEach(pic => {pic.style.filter="invert(0%)";})
    changingFonts.forEach(anchor => {anchor.style.color = "whitesmoke";});

    toLight = true;
}

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({matches:isDark}) => {
        isDark ? changeToDark() : changeToLight();
    })



let toLight = true;

window.addEventListener('scroll', handleScroll);

tbtn.addEventListener('click', changeTheme);

handleScroll();



