/*  
clipScroll
A really basic scroll mask thingo.

Author: Mechetle
*/

let cS = {
  options: {
    debug: false,
  },
};

let wrapper = document.querySelectorAll(".cS");
let heightOfWin = window.innerHeight;
// Update this everytime on window change size
window.addEventListener('resize', () => {
  heightOfWin = window.innerHeight;
});

function pixelToInt(px) {
  return px.replace("px", "");
}

wrapper.forEach(el => {
  let heightOfWrap = el.offsetHeight;
  // Update this everytime on window change size
  window.addEventListener('resize', () => {
    heightOfWrap = el.offsetHeight;
  });
  let relHeight = heightOfWrap - heightOfWin;

  let rectTop = el.getBoundingClientRect().top + window.scrollY;
  let ticking = false;
  
  // Getting last span tag:
  let filled = el.querySelector("span:last-of-type");
  
  // declaring variables that will later calc:
  let percentage, val;

  // get line height of the text, then it will be used in the clip style to fix the gap:
  let computedStyle = window.getComputedStyle(document.querySelector("h1"));
  let fontSize = pixelToInt(computedStyle.fontSize);
  let lineHeight = pixelToInt(computedStyle.lineHeight);
  let lh_gap, lh_ratio;

  if (lineHeight != fontSize) {
    lh_gap = fontSize - lineHeight;
    lh_ratio = fontSize / lineHeight;
  } else {
    lh_gap = 0;
    lh_ratio = 1;
  }
  console.log(lh_gap);
  

  function updateClipping(scrollPos) {
    // This is so it works for every div or section with it applied on.
    sectionSrollPos = scrollPos - rectTop;
    // This is necessary so it stops calculating another el that is not visible on screen
    if (sectionSrollPos >= 0) {
      percentage = sectionSrollPos / relHeight;
      val = (1 - percentage) * 100;

      // When somehow if the user is first spawned in a section of a page previous text will be filled in.
      if (sectionSrollPos > relHeight) {
        filled.style.clipPath = `inset(0 0 -${lh_gap}px 0)`;
      }
      
      // only apply when it is visible
      if (val >= 0) {
        // apply to the layer:
        filled.style.clipPath = `inset(calc(${val}% * ${lh_ratio}) 0px -${lh_gap}px 0px)`;

        // If debugging setting is on then show scroll info:
        if (cS.options.debug) {
          console.log(sectionSrollPos + " / " + relHeight);
          console.log(val);
        }
      }
    }
  }

  document.addEventListener('scroll', function(e) {
    lastKnownScrollPos = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateClipping(lastKnownScrollPos);
        ticking = false;
      });

      ticking = true;
    }
  });
});
