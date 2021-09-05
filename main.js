// external js: isotope.pkgd.js

$('.grid').isotope({
  itemSelector: '.grid-item',
  masonry: {
    columnWidth: 310,
    gutter: 35,
    horizontalOrder: false
  }
});

// rotating lines
document.querySelectorAll(".line-wrapper").forEach(line => {
  line.addEventListener("mouseover", function () {
    this.classList.add("animating")   
    this.classList.add("hovering")                      
  }) 
  
  line.addEventListener("mouseout", function () {
     this.classList.remove("hovering")                      
  })
  
  line.addEventListener("animationiteration", function () {
    if (!this.classList.contains("hovering")) {
       this.classList.remove("animating")
    }
  })
})

// spinning square
const container = document.querySelector("div.spinning-square")

const params = { 
  width: 270, 
  height: 270 
}

const two = new Two(params)
two.appendTo(container)

const shape = two.makeRectangle(135, 135, 100, 100)
shape.fill = "#f9bc31"
shape.noStroke()
shape.rotation = Math.PI * 0.25

two.bind("update", function () {
  shape.rotation+= 0.02
})

two.play()

// clock
// Set up a function that puts in two things...
// picks a clock in HTML
// and gives it a time diff, default is 0
function runClock(clock, timediff=0) {
  
  // whats the time right now? lets get the full date from JS
  var now = new Date()
  
  // add the time diff to UTC (aka GMT) and make it a 12 hour clock by using the 'modulo' – think 15 remainder 12
  var hour = ((now.getUTCHours() + timediff) % 12)
  
  // get the mins, secs and millis
  var min = now.getUTCMinutes()
  var sec = now.getUTCSeconds()
  var ms = now.getUTCMilliseconds()
  
  // pick the elements in HTML for each individual clock
  var hourHand = clock.querySelector(".hour")
  var minHand = clock.querySelector(".minute")
  var secHand = clock.querySelector(".second")
  
  // 6 degrees per second, due to 360/60
  // 0.006 due to millisecond
  var secRotation = (sec * 6) + (ms * 0.006)
  
  // 0.1 due to 6 deg per min, divide by 60 seconds
  var minRotation = (min * 6) + (sec * 0.1)
  
  // 30 as it's 360/12 – 12 hour clock – and add a 0.1deg per minute too otherwise it will just jump on the hour
  var hourRotation = (hour * 30) + (min * 0.1)
  
  // add the rotations in degrees!
  hourHand.style.transform = "rotate(" + hourRotation + "deg)"
  minHand.style.transform = "rotate(" + minRotation + "deg)"
  secHand.style.transform = "rotate(" + secRotation + "deg)"
  
  // run this same function again and again
  requestAnimationFrame(function () {
    // same clock, same time diff!
    runClock(clock, timediff)
  })
}

// pick the melbourne clock in summer time: UTC +10
runClock(document.querySelector(".clock-melbourne"), 10)

