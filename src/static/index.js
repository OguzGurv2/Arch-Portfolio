import { Project } from "./index_project.js";

document.addEventListener("DOMContentLoaded", () => {
    const projectList = [
        ["black-square", "png"],
        ["canford-heath", "jpg"],
        ["happy-fire-station", "png"],
        ["life-plus", "png"]
    ];

    const sections = document.querySelectorAll("section");
    const intro = sections[0];
    const about = sections[1];

    const aboutImg = about.querySelector(".img-container");
    const aboutContent = about.querySelector(".about-content");
    const aboutHeader = aboutContent.querySelector("h1");
    const aboutParagraph = aboutContent.querySelector("p");

    const aboutList = [aboutImg, aboutHeader, aboutParagraph];

    let lastScrollY = window.scrollY;
    let sectionObservable = false;
    let targetSection;

    intro.scrollIntoView({ behavior: 'smooth' , block: 'start' });

    setTimeout(() => {
        aboutList.forEach(element => aboutObserver.observe(element));
        sections.forEach((section, i) => {
            if (i !== 0) {
                sectionObserver.observe(section);
            }
        });
    }, 1500);

    document.querySelectorAll(".underline-anim").forEach((navElem, index) => {
        setTimeout(() => {
            navElem.classList.add("slide-in");
        }, index * 500);
    });

    projectList.forEach((project, index) => {
        new Project(project, index);
    });

    const navLinks = document.querySelectorAll('#nav-bar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) { 
            event.preventDefault(); 
            const targetSection = document.querySelector(this.getAttribute('href')); 
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("slide-in");
                }, 
                300 * aboutList.indexOf(entry.target));
            };
        });
    }, { threshold: 0.9 });

    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
    
    const updateScrollPosition = debounce((e) => {
        lastScrollY = window.scrollY; 
        e.preventDefault();
        if (sectionObservable) {
            sectionObservable = false;
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100); 
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.1 && lastScrollY < window.scrollY) {
                targetSection = entry.target;
                sectionObservable = true;
            }
        });
    }, { threshold: 0.1 });

    window.addEventListener('scroll', updateScrollPosition);
});
