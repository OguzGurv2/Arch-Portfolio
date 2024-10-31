import { Project } from "./index_project.js";

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.querySelector("#intro");
    intro.scrollIntoView({ behavior: 'smooth' });

    let isScrolling = false;
    let anchorSection = true;
    
    function handleScroll(event) {
        debugger;
        if (Project.isLoadingFinished) {
            anchorSection = false;
            Project.isLoadingFinished = false;
            document.removeEventListener('wheel', handleScroll, { passive: false });
            document.addEventListener('wheel', debouncedScrollHandler, { passive: false });
            return;

        } else if (anchorSection) {
            return event.preventDefault(); 

        } else if (event.deltaY > 0 && !isScrolling) { 
            isScrolling = true; 
            const aboutSection = document.getElementById('about');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
    
            setTimeout(() => {
                isScrolling = false; 
            }, 300);
        }
    }
    
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }
    
    const debouncedScrollHandler = debounce(handleScroll, 100);
    document.addEventListener('wheel', handleScroll, { passive: false });

    document.querySelectorAll(".underline-anim").forEach((navElem, index) => {
        setTimeout(() => {
            navElem.classList.add("animate-in");
        }, index * 500); 
    });

    const projectList = [
        ["black-square", "png"],
        ["canford-heath", "jpg"],
        ["happy-fire-station", "png"],
        ["life-plus", "png"]
    ];

    for (let i = 0; i < projectList.length; i++) {
        new Project(projectList[i], i); 
    }
});
