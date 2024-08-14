const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
  currentindex: 0,
  maxindex: 1345,
};

let imageloaded = 0;
const images = [];

window.addEventListener("resize", function () {
  Loadimage(Math.floor(this.frames.currentindex));
});

function preloading() {
  for (var i = 1; i <= frames.maxindex; i++) {
    const imageurl = `./frames/frame_${i.toString().padStart("4", "0")}.jpeg`;
    const img = new Image();
    img.src = imageurl;
    //  console.log(img);
    img.onload = () => {
      imageloaded++;
      if (imageloaded === frames.maxindex) {
        // console.log("all image loaded");
        Loadimage(frames.currentindex);
        startanimation();
      }
    };

    images.push(img);
  }
}
function Loadimage(index) {
  if (index >= 0 && index <= frames.maxindex) {
    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scalex = canvas.width / img.width;
    const scaley = canvas.height / img.height;
    const scale = Math.max(scalex, scaley);

    const newwidth = img.width * scale;
    const newheight = img.height * scale;

    const offsetx = (canvas.width - newwidth) / 2;
    const offsety = (canvas.height - newheight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetx, offsety, newwidth, newheight);
    frames.currentindex = index;
  }
}

function startanimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: " top top",
      end: "bottom bottom",
      scrub: 4,
      // markers:true
      // yoyo:true,
    },
  });
  function updateframe(index) {
    return {
      currentindex: index,
      ease:"linear",
      onUpdate: function () {
        Loadimage(Math.floor(frames.currentindex));
      },
    };
  }

  tl.to(frames, updateframe(100),"first")
  .to(".animate1",{opacity:0,ease:"linear"},"first")

  .to(frames, updateframe(200),"second")
  .to(".animate2",{opacity:1,ease:"linear"},"second")

  .to(frames, updateframe(250),"second1")
  .to(".animate2",{opacity:0,ease:"linear"},"second1")

  .to(frames, updateframe(350),"third")
  .to(".animate3",{opacity:1,ease:"linear"},"third")
  
  .to(frames, updateframe(400),"fourth")
  .to(".animate3",{opacity:1,ease:"linear"},"fourth")
  
  .to(frames, updateframe(450),"fifth")
  .to(".animate3",{opacity:0,ease:"linear"},"fifth")

  .to(frames, updateframe(550),"sixth")
  .to(".panel",{x:"0%",ease:"expo"},"sixth")

  .to(frames, updateframe(650),"seventh")
  .to(".panel",{x:"0%",ease:"expo"},"seventh")
  
  .to(frames, updateframe(750),"eight")
  .to(".panel",{opacity:0,ease:"linear"},"eight")

  .to(frames, updateframe(850),"ninth")
  .to("canvas",{scale: .5,ease:"linear"},"ninth")

  .to(frames, updateframe(950),"tenth")
  .to(".panelism",{opacity:1,ease:"expo"},"tenth")

  .to(frames, updateframe(1050),"tenth")
  .to(".panelism span",{width:200,ease:"expo"},"tenth")

  .to(frames, updateframe(1150),"tenth")
  .to("canvas",{scale:1,ease:"linear"},"tenth")

  .to(frames, updateframe(1250),"eleventh")
  .to(".panelism",{scale:2,ease:"circ"},"eleventh")

  .to(frames, updateframe(1340),"twelth")
  .to(".panelism",{scale:2,ease:"circ"},"twelth")
}

const lenis = new Lenis()


function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
preloading();

document.querySelectorAll(".headings h3")
.forEach((elem)=>{
  gsap.from(elem,{
    scrollTrigger:{
      trigger: elem,
      start:"top 90%",
      end:"bottom 10%",
      scrub :2,
      // markers:true
    },
    opacity:.3
  })
})