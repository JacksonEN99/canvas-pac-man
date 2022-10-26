const canvas = document.querySelector('canvas');
const cts = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Determines how wide pac-man's mouth is open
const radians = [
    Math.PI * (47/24),
    Math.PI * (46/24),
    Math.PI * (45/24),
    Math.PI * (44/24),
    Math.PI * (43/24),
    Math.PI * (41/24),
    Math.PI * (40/24),
    Math.PI * (39/24),
    Math.PI * (38/24),
    Math.PI * (37/24)
]

// Each pac-man gets selected to be one of the below colors
const colors = [
    '#829CFF',
    '#76ACE8',
    '#8FE2FF',
    '#76E8E8',
    '#82FFDC',
    '#33ff22',
    '#FFAACC'
];

// This works in conjunction with the 'radians' array above. When a pac-man hits the edges of the web browser, 
// it changes it current radian value to the matching radian value using the key value in the 'change' hash table below.
// Example: Suppose a bubble has it's 'this.radian' value set to radians[2], i.e. Math.PI * (45/24), it will get changed to radians[7],
// i.e. Math.PI * (39/24), because change[2] returns '7'
const change = {
    0: 9,
    1: 8,
    2: 7,
    3: 6,
    4: 5,
    5: 4,
    6: 3,
    7: 2,
    8: 1,
    9: 0,
};

class Circle {
    constructor() {
        this.direction = true;
        this.radian = Math.floor(Math.random() * radians.length);
        this.radius = (Math.random() * 30) + 15;
        this.x = Math.random() * (window.innerWidth  - this.radius * 2) + this.radius;
        this.y = Math.random() * (window.innerHeight - this.radius * 2) + this.radius;
        this.end = radians[this.radian];
        this.clockwise = Math.floor(Math.random() * 2) % 2 ? true : false;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.dx = (Math.random() - 0.5) * 10; //Velocity x-directon
        this.dy = (Math.random() - 0.5) * 10; //Velocity y-direction
    };

    draw() {
        cts.beginPath();
        if(this.clockwise) {
            cts.arc(this.x, this.y, this.radius, Math.PI, Math.PI * (3/2) + this.end , this.clockwise);
        }
        else {
            cts.arc(this.x, this.y, this.radius, 0, this.end, this.clockwise);
        } 
        cts.lineTo(this.x, this.y);
        cts.closePath();
        cts.strokeStyle = '#000000';
        cts.stroke();
        cts.fillStyle = this.color;
        cts.fill();
    };
    
    update() {
        this.draw();

        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -(this.dx);
            this.clockwise = this.clockwise ? false : true;
        }

        if(this.y + this.radius > innerHeight || this.y -this.radius < 0) {
            this.dy = -(this.dy);
            this.clockwise = this.clockwise ? false : true;
        }

        if(this.x + this.radius > innerWidth || this.x - this.radius < 0 || this.y + this.radius > innerHeight || this.y -this.radius < 0) {
            this.radian = change[this.radian];
            this.direction = this.direction ? false : true;

            if(this.radian === radians.length -1) { this.direction = false; }
            if(this.radian === 0) { this.direction = true; }

            if(this.radian < (radians.length -1) && this.direction) {
                this.radian++;
            }
            else if(this.radian > 0) {
                this.radian--;
            }

            this.end = radians[this.radian];
        }

        this.x += this.dx;
        this.y += this.dy;
    }
};

let circleArray = [];
const numOfCircles = 100;

for(let i = 0; i < numOfCircles; i++)
{
    circleArray.push(new Circle());
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function animate () {
    cts.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);
    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }  
};

animate();