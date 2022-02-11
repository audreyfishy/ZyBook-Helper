let prev = "";
const observer = new MutationObserver(function () {
    if(prev != location.href){
        main();
        prev = location.href;
    }
})
observer.observe(document, { childList: true, subtree: true })

function main() {
    window.setTimeout(inner, 3000);
    function inner(){
        //二倍速
        var x2 = document.querySelectorAll('[aria-label="2x speed"]');
        for(let e of x2){
            e.checked = true;
            e.value = "true";
        }

        // Start
        var start = document.getElementsByClassName("animation-controls");
        for(let e of start) e.querySelector("button").click();

        // Continue
        var config = {
            attributes: true,//「属性」の変化
        };
        for(let e of start){
            let button = e.querySelector('[aria-live="polite"]');
            //MutationObserver（インスタンス）の作成
            var mo = new MutationObserver(function() {
                if(button.getAttribute('aria-label') == "Play") button.click();
                if(button.getAttribute('aria-label') == "Play again"){
                    console.log("done");
                    mo.disconnect();
                }
            });
            //監視の開始
            mo.observe(button, config);
        }
    };  
};