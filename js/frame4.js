$(document).ready(function () {
    slide(".frame4");
});
 
function slide(cls) {
    $(cls).find("ul").wrap("<div></div>");
    $(cls+" div").attr("class","iframe");
    var li = $(cls).find("li").size();
    var li_width = $(cls).find("li").width();
    $(cls + " div").children("ul").width(li_width * li);
    var s = "<ul class='button'>";
    for (var i = 0; i < li; i++) {
        s += "<li>" + (i + 1) + "</li>";
    }
    s += "</ul>";
    $(s).appendTo($(cls));
    var _i = 0;
    $(cls).find(".button li").each(function (i) {
        
        $(this).click(function () {
            _i = i;
            $(this).attr("class", "on").siblings().removeAttr("class");
            $(cls + " div").animate({ scrollLeft: i * li_width }, "slow");
        });
    }).eq(0).click();
    function tt() {
        _i++;
        _i = _i % li;
        $(cls).find(".button li").eq(_i).click();
    }
    var t = setInterval(tt, 3000);
    $(cls).hover(function () {
        clearInterval(t);
    }, function () {
        t = setInterval(tt, 3000);
    })
}