var margin_from_top = 40; // for header
var min_height = 40;
var width = 10;
var colorStatic = "#6f6e75";
var colorHover = "#94929c";
var colorMove = "#555958";
var border_rad = "10px";
var right_margin = "4px";
var MainNumber = 0.8; // 0.000000001 - 1
var pos2 = 0, pos4 = 0, height;
//in pixels of course


window.onload = function(){
    if(window.innerWidth > 415){
        const body = document.querySelector("body");
        //body.insertAdjacentHTML('afterend', '<style>html::-webkit-scrollbar{display: none;}</style>'); if you don't know how to hide default scrollbar
        body.insertAdjacentHTML('afterend', '<div id="scrollbar"></div>');
        var scrollbar = document.getElementById("scrollbar");
        scrollbar.style.position = "fixed";
        scrollbar.style.borderRadius = border_rad;
        scrollbar.style.right = right_margin;
        scrollbar.style.width = width + "px";
        scrollbar.style.minHeight = min_height + "px";
        scrollbar.style.backgroundColor = colorStatic;
        scrollbar.onmouseover = function(){scrollbar.style.backgroundColor = colorHover};
        scrollbar.onmouseleave = function(){scrollbar.style.backgroundColor = colorStatic};
        calcPosition();
        scrollbar.onmousedown = dragMouseDown;
        window.addEventListener('scroll', calcPosition);
    }
};

function calcPosition(){
    let heightDocument = document.body.scrollHeight;
    let heightWindow = window.innerHeight;
    if(heightWindow >= heightDocument){
        scrollbar.style.display = "none";
    }else{
        height = (1 - ((heightDocument - heightWindow)/heightDocument))*heightWindow*MainNumber;
        scrollbar.style.minHeight = height + "px";
        height += margin_from_top;
        scrollbar.style.bottom = (heightWindow - height - (heightWindow-height)*(((heightDocument - heightWindow) - (heightDocument - (pageYOffset + heightWindow)))/(heightDocument - heightWindow))) + "px";
        scrollbar.style.top = "unset";
    }

}

function dragMouseDown(e) {
    window.removeEventListener('scroll', calcPosition);
    scrollbar.onmouseup = function(){};
    e = e || window.event;
    e.preventDefault();
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    scrollbar.style.backgroundColor = colorMove;
    let heightDocument = document.body.scrollHeight;
    let heightWindow = window.innerHeight;
    e = e || window.event;
    e.preventDefault();
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    if(scrollbar.offsetTop - pos2 - margin_from_top >= 0 && scrollbar.offsetTop - pos2 <= window.innerHeight - height + margin_from_top){
        var hi = heightWindow - scrollbar.offsetTop;
        scrollbar.style.top = (scrollbar.offsetTop - pos2) + "px";
        scrollbar.style.bottom = "unset";
        window.scrollTo(pageXOffset,(heightDocument - heightWindow)*((scrollbar.offsetTop - margin_from_top) / (heightWindow - height)));
        // window.scrollTo(pageXOffset,(heightWindow - height - (heightDocument - heightWindow)*((scrollbar.offsetBottom) / (heightWindow - height))));
    }
}

function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    scrollbar.style.backgroundColor = colorStatic;
    window.addEventListener('scroll', calcPosition);
}
