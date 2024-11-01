export class Project {
    static list = [];
    static loadedCount = 0;
    static positioningIndex = 0;

    static positionImages() {
        if (this.positioningIndex < this.list.length) {
            const currentProject = this.list[this.positioningIndex];
            currentProject.setPosition();
            this.positioningIndex++;
            
            setTimeout(() => this.positionImages(), 1000); 
        } else {
            about.style.display = "grid";
            about.style.height = "200vh";
        }
    }    

    constructor(data, index) {
        this.id = data[0];
        this.format = data[1];
        this.path = "./src/content/projects/" + this.id + "/img1." + this.format;
        this.index = index;
        this.init();
        Project.list.push(this);
    }

    init() {
        this.node = document.createElement("img");
        this.node.id = this.id;
        this.node.classList.add("project-img");
        this.node.alt = this.id;
        this.node.src = this.path;
        this.node.style.opacity = 0; 
        intro.append(this.node);

        if (this.index === 0 || this.index === 2) {
            this.node.style.height = "150px";
        } else if (this.index === 3) {
            this.node.style.height = "75px";
        }

        this.node.addEventListener('load', this.handleLoad.bind(this));
    }

    handleLoad() {
        Project.loadedCount++; 
        if (Project.loadedCount === Project.list.length) {
            Project.positionImages();
        } 
    }

    setPosition() {
        this.isOverlapping = true; 
        let attempt = 0; 
        const maxAttempts = 10;

        while (this.isOverlapping && attempt < maxAttempts) {
            this.getPosition();
            this.isOverlapping = this.checkOverlap();
            attempt++;
        }

        this.node.style.left = `${this.x}px`; 
        this.node.style.top = `${this.y}px`;
        this.node.style.opacity = 1; 
        this.createOverview();
    }

    getPosition() {
        const min = 10;
        const maxX = intro.clientWidth - this.node.clientWidth - min;
        const maxY = intro.clientHeight - this.node.clientHeight - min; 

        this.x = Math.floor(Math.random() * (maxX - min)) + min;
        if (Math.floor((this.x / intro.clientWidth) * 100) < 36) {
            this.y = Math.floor(Math.random() * (maxY - 91) + 91);
        } else {
            this.y = Math.floor(Math.random() * (maxY - min)) + min;
        }
    }

    checkOverlap() {
        for (let project of Project.list) {
            if (project !== this) { 
                const existingNode = project.node;
                
                const a = {
                    x1: this.x,
                    y1: this.y,
                    x2: this.x + this.node.clientWidth,
                    y2: this.y + this.node.clientHeight
                };
                
                const b = {
                    x1: parseInt(existingNode.style.left, 10),
                    y1: parseInt(existingNode.style.top, 10),
                    x2: parseInt(existingNode.style.left, 10) + existingNode.clientWidth,
                    y2: parseInt(existingNode.style.top, 10) + existingNode.clientHeight
                };

                const overlaps = (a, b) => 
                    a.x1 < b.x2 && a.x2 > b.x1 && 
                    a.y1 < b.y2 && a.y2 > b.y1;

                if (overlaps(a, b)) {
                    return true; 
                }
            }
        }
        return false; 
    }

    createOverview() {
        fetch("./overview_template.html")
        .then((response) => response.text())
        .then((data) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            const template = doc.querySelector(`#project-overview-template`);

            if (template) {
                intro.append(template.content.cloneNode(true));
                this.overview = intro.lastElementChild;
                this.info = this.overview.querySelector("div");
    
                if (this.index === 3) {
                    this.info.querySelector("p").classList.add("limit-lines")
                }

                this.overview.style.width = `${this.node.clientWidth + 310}px`;
                this.overview.style.height = `${this.node.clientHeight + 20}px`;
                this.info.style.top = "10px";
                const leftmostPx = this.x + parseInt(this.overview.style.width) - 20;
                if (intro.clientWidth - leftmostPx < this.x) {
                    this.overview.style.left = `${this.x - 300}px`; 
                    this.info.style.left = "10px"
                } else {
                    this.overview.style.left = `${this.x - 10}px`; 
                    this.info.style.right = "10px"
                }
                this.overview.style.top = `${this.y - 10}px`;

                const projectTitle = this.id.replaceAll("-", " ");

                this.info.querySelector("a").textContent =  projectTitle;
                this.handleHover();
            }
        });
    }

    handleHover() {
        this.node.addEventListener("mouseover", () => {
            this.node.style.zIndex = 99;
            this.overview.style.zIndex = 98;
            this.overview.style.opacity = 1; 
            this.node.style.filter = "grayscale(0%) brightness(100%)"
        });

        this.node.addEventListener("mouseout", () => {
            this.overview.style.opacity = 0; 
            this.node.style.filter = "grayscale(100%) brightness(70%)"
            
            setTimeout(() => {
                this.node.style.zIndex = 1;
                this.overview.style.zIndex = 0;
            }, 100)
        });
    }
}