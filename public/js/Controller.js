import gsap from "https://esm.sh/gsap";

export default class Controller {
    totalPhotos = 5;
    photos = [];
    mousePosition = {x: 0, y: 0};
    constructor() {
        console.log("Controller initialized!");
        this.init();
    }

    init() {
        
        document.querySelectorAll(".photo-wrapper").forEach((photo, index) => {
            const image = new Image(photo, index)
            this.photos.push(image);
        });

        // Get mouse position 
        document.addEventListener("mousemove", (e) => {
            this.mousePosition = {x: e.clientX, y: e.clientY};
        });

        // Make a loop using render frame
        this.loop();

        /*
        const photo = document.querySelector(".photo");
        if (photo) {
            const tl = gsap.timeline();
            // Use keyframes to move through points smoothly without stopping
            tl.to(photo, { 
                keyframes: [
                    { x: 100, y: 100 },
                    { x: 200, y: 100 }
                ],
                duration: 2, 
                ease: "power2.out" 
            });
        }
            */
    }

    loop(currentTime) {
        this.photos.map((photo) => {
            photo.update({
                mousePosition: this.mousePosition,
            });
        })
    
        requestAnimationFrame(this.loop.bind(this));
    }
}

class Image{

    isMouseDown = false;
    originalPosition = {x: 0, y: 0};
    originalMousePosition = {x: 0, y: 0};
    mousePosition = {x: 0, y: 0};
    transform = {x: 0, y: 0, rotation:0};
    speed = 0.1;
    rect;

    constructor(photoElement, index){
        this.photoElement = photoElement;
        this.index = index;


        this.rect = this.photoElement.getBoundingClientRect();
        this.originalPosition = {x: this.rect.x, y: this.rect.y};
        console.log(this.originalPosition, index);
        
        this.init();
    }

    init(){
        // add click and release functionality
        this.photoElement.addEventListener("mouseover", () => {
           //console.log("mouse over"); 
        });
        this.photoElement.addEventListener("mouseout", () => {
           //console.log("mouse out"); 
        });
        this.photoElement.addEventListener("mousedown", (e) => {
           this.onMouseDown(e); 
        });
        this.photoElement.addEventListener("mouseup", (e) => {
           this.onMouseUp(e); 
        });
    }

    update(data){
        this.mousePosition = data.mousePosition;

        if(this.isMouseDown){
            const dx = this.mousePosition.x - this.originalMousePosition.x;
            const dy = this.mousePosition.y - this.originalMousePosition.y;

            // Move to dx at speed. Destination is dx
            this.transform.x += (dx - this.transform.x) * this.speed;
            this.transform.y += (dy - this.transform.y) * this.speed;
            gsap.set(this.photoElement, {x: this.transform.x, y: this.transform.y, rotation: this.transform.rotation});
        }else{

        }

    }

    onMouseDown(e){
        this.isMouseDown = true;
        console.log("down")
        this.originalPosition = {x: this.photoElement.offsetLeft, y: this.photoElement.offsetTop};
        this.originalMousePosition = {x: e.clientX, y: e.clientY};
    }

    onMouseUp(){
        console.log("up")
        this.isMouseDown = false;
        // Using GSAP move to orignal position
        gsap.to(this.photoElement, {duration: 0.5, x: 0, y: 0, ease:"power2.out"});
        this.transform.x = 0;
        this.transform.y = 0;
    }
}
