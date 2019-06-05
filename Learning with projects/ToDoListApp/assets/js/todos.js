//Check off ToDo"s by clicking
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed")
});

//Click Logo to delete ToDo
$("ul").on("click", "span", function(){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
    if (event.which === 13){
        var toDoText = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fas fa-trash-alt'></i></span> " + toDoText + "</li>");
    }
});
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle(100)
});