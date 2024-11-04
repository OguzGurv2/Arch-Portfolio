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
    const aboutHeader = document.querySelector("#about-header");
    const milestoneList1 = document.querySelector("#first-milestones");
    const milestoneList2 = document.querySelector("#second-milestones");
    const projectsHeader = document.querySelector("#projects-header");

    let lastScrollY = window.scrollY;
    let sectionObservable = false;
    let targetSection;

    intro.scrollIntoView({ behavior: 'smooth' , block: 'start' });

    setTimeout(() => {
        [aboutHeader, milestoneList1, milestoneList2, projectsHeader].forEach(element => milestonesObserver.observe(element));
        sections.forEach( (section, i) => {
            if (i ==! 0) {
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
        link.addEventListener('click', () => {
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' , block: 'start' });
        });
    });

    const milestonesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target === milestoneList1 || entry.target === milestoneList2) {
                    animateMilestones(entry.target);
                } else {
                    setTimeout(() => {
                        entry.target.classList.add("slide-in");
                    }, 250);
                }
                milestonesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.9 });

    function animateMilestones(list) {
        const milestones = list.querySelectorAll('.milestone');
        milestones.forEach((milestone, i) => {
            let t;
            if (list.id == "first-milestones") {
                t = i == 1 ? 2 
                    : i == 2 ? 1
                    : 0;
            } else {
                t = i == 1 ? 0 
                    : i == 2 ? 2
                    : 1;
            }

            setTimeout(() => {
                milestone.classList.add("slide-in");
            }, 500 * t + 500);
        });
    }
 
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
    
    const updateScrollPosition = debounce(() => {
        lastScrollY = window.scrollY; 
        if (sectionObservable) {
            sectionObservable = false;
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300); 
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && lastScrollY < window.scrollY) {
                targetSection = entry.target;
                sectionObservable = true;
            }
        });
    }, { threshold: 0.1 });

    window.addEventListener('scroll', updateScrollPosition);
});
