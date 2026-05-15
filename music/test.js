/* Code written by Trung Huynh
All code is produced without the use of AI
*/

// !! SETUP !!
// get rid of the white space margin
document.body.style.margin   = 0
document.body.style.overflow = `hidden`

// creating and resizing a canvas element
const cnv  = document.createElement ('canvas')
cnv.width = window.innerWidth
cnv.height = window.innerHeight

// get audio player element
const music = document.getElementById ('music')
music.play()
music.volume = 0.5

// get progress bar element
const bar = document.getElementById ('bar')

// dynamic values used for drawing stars based on current audio settings
let brightness = 0 // accepts 0 to 1
let brightnesschase = 1 // a value that brightness will "chase" after for smooth transitions


// !! AUDIO PLAYER LOGIC !!
// update progress bar
music.addEventListener('timeupdate', function() { 
    bar.style.width = cnv.width * music.currentTime / music.duration 
})

// toggle play/pause on click
cnv.addEventListener('mouseup', function() {
    if (!music.paused) {
        music.pause()
        brightnesschase = 0
    } else {
        music.play()
        brightnesschase = 1
    }
})


// !! CANVAS RENDERING !!
// moving the canvas behind everything else
cnv.style.zIndex = '-1'

// resize the canvas whenever the window is resized
window.onresize = function() {
    cnv.width = window.innerWidth
    cnv.height = window.innerHeight
}

// attaching the canvas element to the DOM
document.body.appendChild (cnv)

// getting the context object
const ctx = cnv.getContext (`2d`)

// create an array of stars that will orbit around a fixed point
let stars = []
for (let i = 0; i <= 1000; i++) {
    // each array element will consist of its own array, consisting of:
    // [rotation offset, distance from center, length, brightness]
    let star = []

    // pick random position based on rotation offset and window height
    star.push(360 * Math.random())
    star.push(cnv.height * Math.random())

    // pick random size between 25 and 125
    star.push(25 + 100 * Math.random())

    // pick random brightness between 0 and 1, favouring lower values
    star.push(Math.random() ** 2)

    // push this sub-array into the main array
    stars.push(star)
}

// animate stars orbiting
let orbit = 0

// draw each star
function drawStars () {    
    // draw background
    ctx.fillStyle = `#070012`
    ctx.fillRect (0, 0, cnv.width, cnv.height)

    // animate stars orbiting
    orbit++

    // update chase values
    brightness += Math.max(Math.min(brightnesschase - brightness, 0.01), -0.01)

    // colour stars white
    for (const array in stars) {
        // set pivot location
        const xpivot = cnv.width / 2
        const ypivot = cnv.height * 1.5

        // set star's opacity
        const opacity = stars[array][3] * brightness

        // set star's distance from pivot
        const radius = stars[array][1] * 1.15 + cnv.height * 0.5

        // set star's position relative to offset, with speed relative to radius
        const startpos = stars[array][0] + orbit * (1000 + radius ** 1.2 ) / 10000000

        // set star's length, divided by radius to maintain relative length
        const endpos = startpos + (stars[array][2] / radius)

        // set opacity
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`

        // draw line
        ctx.beginPath();
        ctx.arc(xpivot, ypivot, radius, startpos, endpos);
        ctx.stroke();
    }
    requestAnimationFrame (drawStars)
}

requestAnimationFrame (drawStars)