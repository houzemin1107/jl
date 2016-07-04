function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle("#main");
var list = getEle("#list");
var oLis = document.querySelectorAll("#list>li");
var sound = getEle("#sound");
var song = getEle("#song");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
song.play();
sound.addEventListener("touchstart", function (e) {
    if (this.className) {
        song.pause();
        this.className="";
    } else {
        song.play();
        this.className="sing";
    }
}, false);

[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener("touchstart", start, false);
    arguments[0].addEventListener("touchmove", move, false);
    arguments[0].addEventListener("touchend", end, false);
});
function start(e){
    this.startY = e.changedTouches[0].pageY;
}
function move(e){
    this.flag = true;
    e.preventDefault();
    var moveTouch = e.changedTouches[0].pageY;
    this.movePos = moveTouch-this.startY;
    var index = this.index;
    if(Math.abs(this.movePos)>30){
        [].forEach.call(oLis,function(){
            arguments[0].className = "";
            if(arguments[1]!=index){
                arguments[0].style.display = "none";
            }
            arguments[0].firstElementChild.id="";
        });
        if(this.movePos>0){
            var pos = -winH+this.movePos;
            this.prevsIndex = (index ==0?oLis.length-1:index-1);
        }else if(this.movePos<0){
            var  pos = winH+this.movePos;
            this.prevsIndex = (index == oLis.length-1?0:index+1);

        }
        oLis[this.prevsIndex].className = "index";
        oLis[this.prevsIndex].style.display = "block";
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    }

}

function end(e){
    if(this.flag&&Math.abs(this.movePos)>30){
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName == "LI"){
                this.style.webkitTransition = "";
            }
            this.firstElementChild.id="d"+(this.index+1);
        },false)
    }
}
function isSwipe(strX, endX, strY, endY) {
    return Math.abs(endX - strX) > 30 || Math.abs(endY - strY) > 30;
}

function swipeDirection(strX, endX, strY, endY) {
    var changeX = endX - strX;
    var changeY = endY - strY;
    return Math.abs(changeX) > Math.abs(changeY) ? (changeX > 0 ? "Right" : "Left") : (changeY > 0 ? "Down" : "Up");
}