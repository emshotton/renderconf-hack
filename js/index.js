 function evalInContext(js, context) {
    //# Return the results of the in-line anonymous function we .call with the passed context
    return function() { return eval(js); }.call(context);
}

 window.onload = function(){
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    console.log(document.getElementsByClassName("ace_scroller")[0].style);

    console.log(document.getElementById("editor").style.backgroundColor = "rgba(255, 255, 255, 0.0)");
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;





window.MONOCHROME = VideoContext.DEFINITIONS.MONOCHROME;
window.THRESHOLD = VideoContext.DEFINITIONS.COLORTHRESHOLD;
window.CROSSFADE = VideoContext.DEFINITIONS.CROSSFADE;
window.DREAMFADE = VideoContext.DEFINITIONS.DREAMFADE;
window.STARWIPE = VideoContext.DEFINITIONS.STAR_WIPE;
window.STATIC = VideoContext.DEFINITIONS.STATIC_EFFECT;



    window.video = function(filename, startOffset){
        let v = vc.video(filename, startOffset);
        v.c = v.connect;
        v.c(vc.destination);
        v.connect = (target)=>{
            v.disconnect();
            v.c(target);
        };
        return v;
    }


    window.effect = function(effectName){
        let e = vc.effect(effectName);
        e.c = e.connect;
        e.c(vc.destination);

        e.connect = (target)=>{
            e.disconnect();
            e.c(target);
        }   
        return e;
    }   


    window.image = function(filename){
        let i = vc.image(filename);
        i.c = i.connect;
        i.c(vc.destination);
        i.connect = (target) => {
            i.disconnect();
            i.c(target);
        };
        return i;
    }

    window.combine = function(){
        let com = vc.compositor(VideoContext.DEFINITIONS.COMBINE);
        com.c = com.connect;
        com.c(vc.destination);
        com.connect = (target) => {
            com.disconnect();
            com.c(target);
        }
        return com;
    }

    window.transition = function(name){
        if (name === undefined) name = CROSSFADE
        let tra = vc.transition(name);
        tra.c = tra.connect;
        tra.c(vc.destination);
        tra.connect = (traget) => {
            tra.disconnect();
            tra.c(target);
        }
        return tra;
    }

    let code =undefined
    //code = localStorage.getItem("code");
    if(code) {
        editor.setValue(code, -1);
    }

    function run(){
        // localStorage.setItem("code", editor.getValue());
        window.vc = new VideoContext(canvas);



        vc.registerCallback("ended", ()=>{
            vc.currentTime = 0;
            vc.play();
        });


        evalInContext(editor.getValue(), this);
        vc.play();
        event.preventDefault();
    }

    $(document).bind('keydown', function(e) {
      if(e.ctrlKey && (e.which == 83)) {
        e.preventDefault();
        run();
        return false;
      }
    });

    $(window).keypress(function(event) {
        if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
        run();
        return false;
    });

    run();

 }
 