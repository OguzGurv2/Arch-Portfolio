document.addEventListener("DOMContentLoaded", () => {

    class Project {
        constructor(id) {
            this.id = id;
            this.path = directoryPath + this.id + "/img1.png";
            this.init();
        }
    
        init() {
            this.node = document.createElement("img");
            this.node.id = this.id;
            this.node.classList.add("project-img")
            this.node.alt = this.id;
            this.node.src = this.path;
            this.node.style.opacity = 0;
            intro.append(this.node);
            
            this.node.addEventListener('load', () => {
                // this.node.style.left = `${(intro.clientWidth - this.node.clientWidth) / 2}px`; // Off-screen left
                // this.node.style.top = `${(intro.clientHeight - this.node.clientHeight) / 2}px`;  // Off-screen top
                // setTimeout( () => {
                    this.setPosition();
                    this.node.style.opacity = 1;
                // }, 1000);
            });        
        }

        setPosition() {

            this.x = Math.floor((Math.random() * (intro.clientWidth - this.node.clientWidth)));
            this.y = Math.floor((Math.random() * (intro.clientHeight - this.node.clientHeight)));
            
            this.node.style.left = `${this.x}px`;
            this.node.style.top = `${this.y}px`;
        }
    
    }

    const directoryPath = "./src/content/projects/";
    const intro = document.querySelector("#intro");

    const projectList = [
        "black-square",
        "canford-heath"
    ];

    for (let i = 1; i < 2; i++) {
        new Project(projectList[i]);
    }
});