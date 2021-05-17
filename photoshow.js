let container = document.documentElement||document.body;
let img,div,src,btnleft,btnright;
var imgid=0;
let x,y,w,h,tx,ty,tw,th,ww,wh;
let closeMove=function(){
    if(div==undefined){
        return false;
    }
    div.style.opacity=0;
    img.style.height=h+"px";
    img.style.width=w+"px";
    img.style.left=x+"px";
    img.style.top=(y - container.scrollTop)+"px";
    // Delayed removal of dom
    setTimeout(function(){
        div.remove();
        img.remove();
        btnright.remove();
        btnleft.remove();
    },100);

};

let closeFade=function(){
    if(div==undefined){
        return false;
    }
    div.style.opacity=0;
    img.style.opacity=0;
    // Delayed removal of dom
    setTimeout(function(){
        div.remove();
        img.remove();
        btnright.remove();
        btnleft.remove();
    },100);
};

let style=function() {
btnleft.style.cssText=`
    position:fixed;
    border-radius: 50%;;
    left:${x - 20}px;
    top:${y - container.scrollTop + h/2}px;
    width:50px;
    height:50px;
    border: 0px;
    background-color: rgba(200,200,200,0.8);
    font-size: 20px;
    z-index: 999999999;
    transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
`;
btnright.style.cssText=`
    position:fixed;
    border-radius: 50%;
    left:${x + w + 20}px;
    top:${y - container.scrollTop + h/2}px;
    width:50px;
    border: 0px;
    height:50px;
    font-size: 20px;
    background-color: rgba(200,200,200,0.8);
    z-index: 999999999;
    transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
`;
btnleft.innerText="<";
btnright.innerText=">";

img.style.cssText=`
    position:fixed;
    border-radius: 12px;
    left:${x}px;
    top:${y - container.scrollTop}px;
    width:${w}px;
    height:${h}px;
    z-index: 999999999;
    transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
    opacity:0;
`;
}
// listen to the scroll close layer
document.addEventListener("scroll",function(){
    closeFade();
});
document.querySelectorAll("img").forEach(v=>{

	if (v.parentNode.localName!='a') {
		v.id=imgid;
		imgid++;
		    v.addEventListener("click",function(e){ // Registration issue
			// Record the position and size of the small picture
	        x=e.target.offsetLeft;
	        y=e.target.offsetTop;
	        w=e.target.offsetWidth;
	        h=e.target.offsetHeight;
	        src=e.target.src;
	        id=e.target.id;
	        // Create a mask layer
	        div=document.createElement("div");
	        div.style.cssText=`
	            position:fixed;
	            left:0;
	            top:0;
	            bottom:0;
	            right:0;
	            background-color: rgba(25,25,25,0.8);
	            z-index:99999999;
	            transition:all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
	        `;
	        document.body.appendChild(div);
	        setTimeout(function(){
	            div.style.opacity=1;
	        },0);
	        // (loading can be added here)

			// Create a copy
	        img=new Image();
	        btnright=document.createElement("button");
	        btnleft=document.createElement("button");
	        img.src=src;
	        style();


	        btnleft.onclick=function(){
	        	if(id===0){
	        		alert("It's the first one！");
	        		return;
	        	}
	        	var left=document.getElementById(id-1);
	        	img.src=left.src;
	        	x=left.offsetLeft;
	        	y=left.offsetTop;
	      		w=left.offsetWidth;
	        	h=left.offsetHeight;
	        	style();
	        	id--;
	        }
	        btnright.onclick=function(){
	        	id++;
	        	if(id>=imgid){
	        		alert("It's the last one！");
	        		return;
	        	}
	        	var right=document.getElementById(id);
	        	img.src=right.src;
	        	x=right.offsetLeft;
	        	y=right.offsetTop;
	      		w=right.offsetWidth;
	        	h=right.offsetHeight;
	        	style();
	        	
	        }
	        img.onload=function(){
	            document.body.appendChild(img);
	            document.body.appendChild(btnright);
	            document.body.appendChild(btnleft);

	            // Browser width and height
	            wh=window.innerHeight;
	            ww=window.innerWidth;

	            // Target width and height and coordinates
	            if(w/h<ww/wh){
	            	th=wh-80;
		            tw=w/h*th >> 0;
		            tx=(ww - tw) / 2;
		            ty=40;	            	
	            }
	            else{
	            	tw=ww*0.8;
	            	th=h/w*tw >> 0;
	            	tx=ww*0.1;
	            	ty=(wh-th)/2;
	            }

	            // Delay writing otherwise there will be no animation
	            setTimeout(function(){
	                img.style.opacity=1;
	                img.style.height=th+"px";
	                img.style.width=tw+"px";
	                img.style.left=tx+"px";
	                img.style.top=ty+"px";
	                btnleft.style.left=(tx-90)+"px";
	                btnleft.style.top=(ty+th/2)+"px";
	                btnright.style.left=(tx+tw+40)+"px";
	                btnright.style.top=(ty+th/2)+"px";
	                // Click to hide
	                div.onclick=img.onclick=closeMove;
	            },10);
	        };
	    });//end event
	}
});//end forEach