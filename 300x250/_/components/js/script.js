function startAd(){  
           var ttl = new TimelineLite();
    ttl.from("#t1", .2, {opacity:0})
        .to("#t1", .6, {opacity:0}, 2.5)
        .from("#t2", .6, {opacity:0}, 2.5)
        .to("#t2", .6, {opacity:0}, 4.2)
        .from("#t3", .6, {opacity:0, y:250}, 3.9)
        .to("#t3", .6, {opacity:0}, 6.2)
        .from("#t4", .6, {opacity:0}, 7.4)
        .to("#t4", .6, {opacity:0, y:-50,ease: Power3.easeOut}, 9.3)
        .from("#t5", .6, {opacity:0}, 9.3);
    
    var ptl = new TimelineLite();
    ptl.from("#p1", .6, {opacity:0, y:-190,ease: Power3.easeOut})
        .from("#p2", .6, {opacity:0, y:-190,ease: Power3.easeOut}, 3.4)
        .to("#p2", .4, {opacity:0, x:-5, y:-6,ease: Power3.easeOut}, 4.4)
        .from("#p2a", .4, {opacity:0, x:5, y:6,ease: Power3.easeOut}, 4.4)
        .to("#p1", .6, {x:-80,ease: Power3.easeOut}, 4.8)
        .to("#p2a", .6, {x:-80,ease: Power3.easeOut}, 4.8);
    
    var ftl = new TimelineLite();
    ftl.from("#bradFlare", .6, {opacity:0})
    .to("#bradFlare", .6, {x: -76,ease: Power3.easeOut}, .4)
    .from("#bradSparkle", .6, {opacity:0, rotation:180}, .6)
    .to("#bradSparkle", .8, {opacity:.5}, 1.4);
    
    var ctl = new TimelineLite();
    ctl.from("#bradCtaButton", .6, { opacity:0,ease: Power3.easeOut});
    
    tl.add(ttl, 0);
    tl.add(ptl, 2.5);
    tl.add(ftl, 6.9);
    tl.add(ctl, 9.3);
    
    tl.totalDuration(13);
    
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
                   TweenLite.set("#bradFlare", {opacity:.7});
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