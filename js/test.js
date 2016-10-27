function resize(){
    document.body.style.backgroundSize = window.innerWidth + "px " + (window.innerWidth*900/1440) + "px";
    document.getElementById("wrapper").style.backgroundSize = window.innerWidth + "px " + (window.innerWidth*900/1440) + "px";

    for(i = 0; i<3; i++)
    {
        for(j = 0; j<2; j++)
        {
            var id_to_edit = "bubble_color"+(2*i+j+1);
            document.getElementById(id_to_edit).style.zIndex = 10;
            document.getElementById(id_to_edit).style.width = window.innerWidth*0.10*2 + "px ";
            document.getElementById(id_to_edit).style.height = window.innerWidth*0.10*2 + "px ";
            document.getElementById(id_to_edit).style.left = (window.innerWidth-window.innerWidth*0.10*2)/2 + (i-1)*window.innerWidth*0.31 + "px ";
            document.getElementById(id_to_edit).style.top = (window.innerHeight-window.innerWidth*0.10*2)/2 + 2*(j-0.5)*window.innerWidth*0.14 + "px ";

            var id_to_edit = "bubble_text"+(2*i+j+1);
            document.getElementById(id_to_edit).style.zIndex = 15;
            document.getElementById(id_to_edit).style.fontSize = window.innerWidth*0.02 + "px ";
            document.getElementById(id_to_edit).style.left = (window.innerWidth-window.innerWidth*0.02)/2 + (i-1)*window.innerWidth*0.31 + "px ";
            document.getElementById(id_to_edit).style.top = (window.innerHeight-window.innerWidth*0.02)/2 + 2*(j-0.5)*window.innerWidth*0.14 + "px ";

            var id_to_edit = "bubble"+(2*i+j+1);
            document.getElementById(id_to_edit).style.zIndex = 20;
            document.getElementById(id_to_edit).style.width = window.innerWidth*0.10 + "px ";
            document.getElementById(id_to_edit).style.height = window.innerWidth*0.10 + "px ";
            document.getElementById(id_to_edit).style.left = (window.innerWidth-window.innerWidth*0.10)/2 + (i-1)*window.innerWidth*0.31 + "px ";
            document.getElementById(id_to_edit).style.top = (window.innerHeight-window.innerWidth*0.10)/2 + 2*(j-0.5)*window.innerWidth*0.14 + "px ";
            
        }
    }
}
