import { Project } from "./index_project.js";
import { Path } from "./index_about.js";

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
    const projects = sections[2];
    
    const navLinks = document.querySelectorAll('#nav-bar a');
    const aboutHeader = document.querySelector("#about-header");
    const milestoneList1 = document.querySelector("#first-milestones");
    const milestoneList2 = document.querySelector("#second-milestones");

    let observer;

    projectList.forEach((project, index) => {
        new Project(project, index);
    });

    document.querySelectorAll(".underline-anim").forEach((navElem, index) => {
        setTimeout(() => {
            navElem.classList.add("animate-in");
        }, index * 500); 
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetId == "#about") {
                targetSection.style.display = "grid";
                targetSection.style.height = "200vh";
            } else {
                targetSection.style.display = "flex";
                targetSection.style.height = "100vh";
            }
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {            
                animateMilestones(entry.target);
                observer.unobserve(entry.target);
                if (entry.target.id == "first-milestones") {
                    window.removeEventListener("scroll", observeMilestone1);
                    setTimeout(() => {
                        new Path(milestoneList1.querySelector(".canvas"), milestoneList2.querySelector(".canvas"));
                    }, 1000)
                } else if (entry.target.id == "second-milestones") {
                    window.removeEventListener("scroll", observeMilestone2);   
                } else {
                    aboutHeader.classList.add("animate-in");

                    window.removeEventListener("scroll", observeAboutHeader);   
                }
            }
        });
    };

    observer = new IntersectionObserver(observerCallback, {
        threshold: 0.9
    });
    
    const observeAboutHeader = () => {
        observer.observe(aboutHeader);
    }
    const observeMilestone1 = () => {
        observer.observe(milestoneList1);
    };
    const observeMilestone2 = () => {
        observer.observe(milestoneList2);
    };

    window.addEventListener("scroll", observeMilestone1);
    window.addEventListener("scroll", observeMilestone2);
    window.addEventListener("scroll", observeAboutHeader);

    function animateMilestones(list) {
        const milestones = list.querySelectorAll('.milestone');
        milestones.forEach((milestone, i) => {
            let t;
            if (list.id == "first-milestones") {
                t = i == 1 ? 2 
                    :i == 2 ? 1
                    : 0;
            } else {
                t = i == 1 ? 0 
                :i == 2 ? 2
                : 1;
            }

            setTimeout(() => {
                milestone.classList.add("fade-in");
            }, 500 * t);
        });
    }
});
