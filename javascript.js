
const sections = document.querySelectorAll(
    'section.uni, .section.gym, section.piano');

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

window.addEventListener('scroll', handleScroll);

handleScroll();



