export class Path {
    static list = [];
    constructor(startPoint, target) {
        const parentRect = about.getBoundingClientRect();
        
        this.x1 = ((parentRect.right - (startPoint.offsetLeft + startPoint.offsetWidth / 2)) / parentRect.width) * 100; 
        this.y1 = ((startPoint.offsetTop + startPoint.offsetHeight - 25 - parentRect.top) / parentRect.height) * 100;

        this.x2 = ((parentRect.right - (target.offsetLeft + target.offsetWidth / 2)) / parentRect.width) * 100; 
        this.y2 = ((target.offsetTop + target.offsetHeight + 25 - parentRect.top) / parentRect.height) * 100;

        this.hDifference = Math.floor(this.x1 - this.x2); 
        this.vDifference = Math.floor((this.y2 - this.y1) / 10); 
        this.delay = Math.floor((-this.hDifference) / this.vDifference);
        console.log(this.delay)

        this.handleLineCreation();
    }

    handleLineCreation() {
        setTimeout(() => {
            this.createNode(1); 
            setTimeout(() => {
                this.createNode(2); 
            }, 500);
            setTimeout(() => {
                this.createNode(3); 
            }, this.delay * 500 + 500);
        }, 2000);
    }

    createNode(i) {
        const newNode = document.createElement("a");
        newNode.classList.add("dotted-line");

        about.append(newNode);

        newNode.style.position = "absolute";
        
        if (i !== 2) {
            newNode.style.setProperty('--final-height', `${this.vDifference}%`);
            newNode.style.setProperty('--final-height', `${this.vDifference}%`);
        }  else {
            newNode.style.setProperty('--final-width', `${-this.hDifference}%`);
            newNode.style.setProperty('--delay', `${this.delay * 500}ms`);
        }

        if (i === 1) {
            newNode.style.right = `${this.x1}%`; 
            newNode.style.top = `${this.y1}%`; 
            newNode.style.height = `${this.vDifference}%`; 
            newNode.classList.add("grow-height");
        } else if (i === 3) {
            newNode.style.right = `${this.x1 - this.hDifference}%`; 
            newNode.style.top = `${this.y1 + this.vDifference}%`; 
            newNode.style.height = `${this.vDifference}%`; 
            newNode.classList.add("grow-height");
        } else { 
            newNode.style.right = `${this.x1}%`; 
            newNode.style.top = `${this.y1 + this.vDifference}%`; 
            newNode.style.backgroundRepeat = "repeat-x"; 
            newNode.style.width = `${-this.hDifference}%`;
            newNode.classList.add("grow-width");
        }

        newNode.style.transform = "translate(0, 0)";  
        newNode.style.opacity = 1;
    }
}
