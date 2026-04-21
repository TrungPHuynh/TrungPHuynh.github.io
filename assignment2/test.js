// -> test.js
// getting rid of the annoying white space margin
document.body.style.margin   = 0
document.body.style.overflow = `hidden`

// creating and resizing the canvas element
const cnv  = document.createElement ('canvas')
cnv.width = window.innerWidth
cnv.height = window.innerHeight

// attaching the canvas element to the DOM
document.body.appendChild (cnv)

// getting the context object
const ctx = cnv.getContext (`2d`)

// set starting position
let x_pos = cnv.width / 2
let y_pos = cnv.height / 2 - 100
let orbit = 0

function drawFrame () {
    ctx.fillStyle = `turquoise`
    ctx.fillRect (0, 0, cnv.width, cnv.height)
    
    ctx.fillStyle = `hotpink`
    ctx.fillRect (x_pos - 50, y_pos - 50, 100, 100)

    x_pos = cnv.width / 2 + Math.sin(orbit / 20) * 100
    y_pos = cnv.height / 2 - Math.cos(orbit / 20) * 100
    orbit++

    requestAnimationFrame (drawFrame)
}

requestAnimationFrame (drawFrame)