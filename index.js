$("button").on("click", function () {
    if ($(this).hasClass("btn-sp")) {
        spClass($(this).text().replace(/\s/g, ""), $("#result"));
    } else {
        let temp = $("#result").val();
        $("#result").val(temp + $(this).html());
    }
});

function spClass(key, item) {
    switch (key) {
        case "RESET":
            item.val("");
            break;
        case "DEL":
            item.val(item.val().slice(0, item.val().length - 1));
            break;

        default:
            console.error(ErrorEvent + " sth wrong bro");
            break;
    }
}
