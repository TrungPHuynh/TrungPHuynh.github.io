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

// attaching the canvas element to the DOM
document.body.appendChild (cnv)

// getting the context object
const ctx = cnv.getContext (`2d`)

// !! DRAGGING !!
// note: canvases do not have a specific drag function
//      this means that a custom solution has to be made

// create variables to detect mouse dragging position
let isDragging = false // false when mouse is up, true when mouse is down
let mouseX = 0 // X position of mouse relative to canvas (left to right)
let mouseY = 0 // Y position of mouse relative to canvas (top to bottom)

// get the starting drag position on mouse down
cnv.addEventListener('mousedown', startDraw)
function startDraw (event) {
    console.log("started dragging") // debug

    isDragging = true
    // update mouse position
    mouseX = event.clientX
    mouseY = event.clientY
    // update stroke position (prevents accidental line connections)
    strokeX = mouseX
    strokeY = mouseY

    // redraw the canvas
    requestAnimationFrame (drawFrame)
}

// update mouse position when the mouse moves
cnv.addEventListener('mousemove', drawing)
function drawing (event) {
    // update mouse position
    mouseX = event.clientX
    mouseY = event.clientY

    // redraw the canvas
    requestAnimationFrame (drawFrame)
}

// stop detecting mouse position on mouseup
cnv.addEventListener('mouseup', endDraw)
function endDraw (event) {
    console.log("stopped dragging") // debug

    isDragging = false
}

// stop detecting mouse position when mouse leaves the window
cnv.addEventListener('mouseout', endDraw)
function endDraw (event) {
    console.log("stopped dragging") // debug

    isDragging = false
}

// !! DRAWING !!

// create variables to track stroke position
let strokeX = mouseX    // the X position of the stroke
                        // attempts to update itself to equal mouseX each frame
let strokeY = mouseY    // the Y position of the stroke. behaves similar to strokeX

// !! CANVAS RENDERING !!

// moving the canvas behind everything else
cnv.style.zIndex = '-1'

// draw background
    ctx.fillStyle = '#12261a'
    ctx.fillRect (0, 0, cnv.width, cnv.height)

// resize the canvas whenever the window is resized
window.onresize = function() {
    // reset size
    cnv.width = window.innerWidth
    cnv.height = window.innerHeight

    // redraw background
    ctx.fillStyle = '#12261a'
    ctx.fillRect (0, 0, cnv.width, cnv.height)
}

// draw a new frame in the canvas and update variables
function drawFrame () { 
    // note: the background is NOT redrawn each frame to allow-
    //       the user's drawings to stay on screen

    // set line cap to round (prevents awkward breaks in lines)
    ctx.lineCap = "round"

    // draw line
    if (isDragging) {
        // coloured stroke
        ctx.strokeStyle = `rgb(255, 255, 255)`
        ctx.lineWidth = Math.random() ** 2 * 5 + 7.5
        ctx.beginPath()
        ctx.moveTo(strokeX, strokeY)
        ctx.lineTo(mouseX, mouseY)
        ctx.stroke()
        

        // draw over line with circles to make imperfections
        // get distance between current and previous mouse position
        distance = Math.sqrt(((strokeX - mouseX) ** 2) + ((strokeY - mouseY) ** 2))

        for (let i = 0; i < Math.ceil(distance); i++) {
            // choose a point on the path between strokeX/Y and mouseX/Y based on i
            // ... for math nerds this is called "linear interpolation"
            interpolate = Math.ceil(distance) / i
            circleX = mouseX + (interpolate * (strokeX - mouseX))
            circleY = mouseY + (interpolate * (strokeY - mouseY))

            // draw circle
            ctx.strokeStyle = `#12261a`
            ctx.lineWidth = Math.random() * 2
            ctx.beginPath();
            ctx.arc(Math.random() * 5 - 2.5 + circleX, 
            Math.random() * 5 - 2.5 + circleY, 
            1, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // update stroke position after calculations are complete
        strokeX = mouseX
        strokeY = mouseY
    }
}