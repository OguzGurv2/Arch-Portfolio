export class Path {
    static list = [];
    constructor(firstNode, secondNode) {
        const rect1 = firstNode.getBoundingClientRect();
        this.x1 = rect1.left + rect1.width / 2;
        this.y1 = rect1.top + rect1.height - 75;

        const rect2 = secondNode.getBoundingClientRect();
        this.x2 = rect2.left + rect2.width / 2;
        this.y2 = rect2.top - 25;

        this.createLine();
    }
}
