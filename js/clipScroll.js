/*  
clipScroll
A really basic scroll mask thingo
Author: Mechetle
*/

let wrapper = document.querySelectorAll(".exec");
// todo: update this everytime on window change size
let heightOfWin = window.innerHeight;

wrapper.forEach(el => {
  // todo: update this everytime on window change size
  let heightOfWrap = el.offsetHeight;
  
  let scrollPos = 0;
  let ticking = false;

  function doSomething(scrollPos) {
    console.log(scrollPos + " / " + (heightOfWrap - heightOfWin));
    percentage = scrollPos / (heightOfWrap - heightOfWin);
    let val = (1 - percentage) * 100;
    console.log(val);
    
    // apply to the layer
    let filled = document.querySelector(".exec span:last-of-type");
    filled.style.clipPath = `inset(${val}% 0 0 0)`;
  }

  document.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });
});
