function startAd(){  
           var ttl = new TimelineLite();
    ttl.from("#t1", .2, {opacity:0})
        .to("#t1", .6, {opacity:0}, 3.2)
        .from("#t2", .6, {opacity:0}, 3.2)
        .to("#t2", .6, {opacity:0}, 5)
        .from("#t3", .6, {opacity:0}, 5)
        .to("#t3", .6, {opacity:0}, 7)
        .from("#t4", .6, {opacity:0}, 8.7)
        .to("#t4", .6, {opacity:0, y:-50,ease: Power3.easeIn}, 11.6)
        .from("#t5", .6, {opacity:0}, 12);
    
    var ptl = new TimelineLite();
    ptl.from("#p1", .6, {opacity:0, y:-190,ease: Power3.easeIn})
        .from("#p2", .6, {opacity:0, y:-190,ease: Power3.easeIn}, 3.8)
        .to("#p2", .4, {opacity:0, x:-5, y:-6,ease: Power3.easeIn}, 4.8)
        .from("#p2a", .4, {opacity:0, x:5, y:6,ease: Power3.easeIn}, 4.8)
        .to("#p1", .6, {x:-80,ease: Power3.easeIn}, 5.3)
        .to("#p2a", .6, {x:-80,ease: Power3.easeIn}, 5.3);
    
    var ftl = new TimelineLite();
    ftl.from("#bradSparkle", .6, {opacity:0, rotation:180});
    
    var ctl = new TimelineLite();
    ctl.from("#bradCtaButton", .6, { opacity:0,ease: Power3.easeIn});
    
    tl.add(ttl, 0);
    tl.add(ptl, 3);
    tl.add(ftl, 8.7);
    tl.add(ctl, 12);
    
    tl.totalDuration(15);
    
};

function addListeners(){
    document.getElementById("bradContent").addEventListener("click", clickthrough);
};

function clickthrough() {
    EB.clickthrough();
}


function animationComplete(evt){
};

function checkInit() {
              if (!EB.isInitialized()) {
                 EB.addEventListener(EBG.EventName.EB_INITIALIZED, onInit); 
                 // This code checks whether the EB object is initialized, if the object is initialized, it
                     //launches the function "onInit", otherwise "EB_INITIALIZED" event. 
              }
              else {
                      onInit();
               }         
               function onInit() {
    
    TweenLite.set("#bradContainer", {opacity:1});
    addListeners();
    startAd();
              } 
     }

window.addEventListener('load', checkInit);

var tl = new TimelineLite({onUpdate:updateSlider});
tl.eventCallback("onComplete", animationComplete);


$("#play").click(function() {
  //play() only plays forward from current position. If timeline has finished, play() has nowhere to go.
  //if the timeline is not done then play() or else restart() (restart always restarts from the beginning).

  if(tl.progress() != 1){
    //carl just changed this again
		tl.play();
  } else {
    tl.restart();
  }
});
		
$("#pause").click(function() {
		tl.pause();
});
		
$("#restart").click(function() {
		tl.restart();
});		
	
$("#slider").slider({
  range: false,
  min: 0,
  max: 100,
  step:.1,
  slide: function ( event, ui ) {
    tl.pause();
    //adjust the timeline's progress() based on slider value
    tl.progress( ui.value/100 );
    }
});	
		
function updateSlider() {
  $("#slider").slider("value", tl.progress() *100);
} 	