const canvas = document.getElementById('canvas');
const body = document.getElementById('*');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let spots = [];
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined
}

body.addEventListener('mousemove', (event) => {
    let dx = mouse.x - event.x;
    let dy = mouse.y - event.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let count = Math.min(dist / 10 - Math.random() / 2, 3)
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < count; i++) {
        let part = new Particle();
        part.updateSpeed(2 + dist / 50);
        spots.push(part);
    }
})

body.addEventListener('mousedown', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 50; i++) {
        let part = new Particle();
        part.updateSpeed(70);
        spots.push(part);
    }

    for (let i = 0; i < 50; i++) {
        let part = new Particle();
        part.updateSpeed(10);
        spots.push(part);
    }
})

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 0.1;
        this.updateSpeed(3);
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    updateSpeed(speed) {
        this.size = Math.random() * (1.5 + speed / 80) + 0.1;
        this.speedX = Math.random() * speed - speed / 2;
        this.speedY = Math.random() * speed - speed / 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.03;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticle() {
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for (let j = i + 1; j < Math.min(spots.length, i + 8); j++) {
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 200) {
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size / 10;
                ctx.moveTo(spots[i].x, spots[i].y);
                ctx.lineTo(spots[j].x, spots[j].y);
                ctx.stroke();
            }
        }
        if (spots[i].size <= 0.3) {
            spots.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    window.requestAnimationFrame(animate);
}

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
})

animate();