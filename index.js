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
            if (
                item.val().slice(item.val().length - 1, item.val().length) ===
                " "
            ) {
                item.val(item.val().slice(0, item.val().length - 3));
            } else {
                item.val(item.val().slice(0, item.val().length - 1));
            }
            break;
        case "=":
            result(item.val());
            break;

        default:
            let sTemp, temp;

            temp = item.val().slice(item.val().length - 1, item.val().length);
            /* cuz it returns string */
            if (
                temp == "+" ||
                temp == "-" ||
                temp == "/" ||
                temp == "x" ||
                temp == "." ||
                temp == " "
            ) {
                sTemp = true;
            } else {
                sTemp = false;
            }

            // Every time I use a operator it adds an space
            if (sTemp) return;

            if (key == ".") {
                item.val(item.val() + key);
            } else {
                item.val(item.val() + " " + key + " ");
            }
            break;
    }
}

function result(item) {}
