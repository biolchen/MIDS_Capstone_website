/*显示所有组件*/
function showModulesTypeArray() {
    //    console.log(JSON.stringify(modulesArrays))
    var modulesArray = new Array();
    for(var i = 0; i < modulesArrays.length; i++) {
        if(modulesArrays[i].grade == 1) {
            modulesArray.push(modulesArrays[i].name);
            $('#showModules').append('<ul class="side-menu-sub"><li style="list-style-type:none" id="' + modulesArrays[i].parentId + '">' + modulesArrays[i].name + '</li></ul>')
        }
    }
    //    console.log(JSON.stringify(modulesArray));
 
};
/*显示组件详情*/
function showModulesByTypeId(data) {
    var modulesByTypeArray = new Array();
    var jsonObj = {};
    for(var i = 0; i < modulesTypeArray.length; i++) {
        if(data == modulesTypeArray[i].parentId) {
            jsonObj = {
                'name': modulesTypeArray[i].name,
                'img': modulesTypeArray[i].img
            };
            modulesByTypeArray.push(jsonObj)
        }
    }
    //    console.log(JSON.stringify(modulesByTypeArray));
    return modulesByTypeArray;
};
 
/*鼠标悬浮显示*/
function hover() {
    $('.side-menu-sub li').hover(function() {
        console.log($(this).attr('id'))
        var parentId = $(this).attr('id');
        var top = $(this).offset().top;
        $('#showModulesDetails').html('')
        var arrays = showModulesByTypeId(parentId);
        console.log(arrays)
        for(var i = 0; i < arrays.length; i++) {
            $('#showModulesDetails').append('<div><img src="' + arrays[i].img + '"/></div><div>' + arrays[i].name + '</div>')
        }
        $('#showModulesDetails').show()
        $('#showModulesDetails').css('top', (top - 88) + 'px');
        //console.log($(this).offset().top)
    }, function() {
        $('#showModulesDetails').hover(function() {}, function() {
            $('#showModulesDetails').hide()
            //console.log(1)
 
        });
 
    });

}

$(document).ready(function() {
    showModulesTypeArray();
    hover();

});