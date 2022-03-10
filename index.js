$("button").on("click", function () {
    if ($(this).hasClass("btn-sp")) {
        spClass($(this).text().replace(/\s/g, ""), $("#result"));
    } else {
        let temp = $("#result").val();
        $("#result").val(temp + $(this).html());
    }
});

$(document).on("keydown", (event) => {
    // if ($(this).hasClass("btn-sp")) {
    //     spClass($(this).text().replace(/\s/g, ""), $("#result"));
    // } else {
    //     let temp = $("#result").val();
    //     $("#result").val(temp + $(this).html());
    // }
    console.log(event.key);
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
            let finalR = result(item.val());
            item.val(finalR);
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

function result(item) {
    let x, y;

    x = item.split(" ");
    do {
        //debugger;

        // Idk if it's working properly yet, gotta test a lil bit more. I was using 6+3/6x3 as a basis but I can go wild with numbers to make sure it's working!
        if (x.includes("x") || x.includes("/")) {
            let a, b;

            if (x.indexOf("x") != -1 && x.indexOf("/") != -1) {
                if (x.indexOf("x") < x.indexOf("/")) {
                    a = x.indexOf("x");
                } else {
                    a = x.indexOf("/");
                }
            } else if (x.indexOf("x") != -1) {
                a = x.indexOf("x");
            } else if (x.indexOf("/") != -1) {
                a = x.indexOf("/");
            }
            console.log(a + " <- [index]");
            b = calculator(parseFloat(x[a - 1]), parseFloat(x[a + 1]), x[a]);
            x.splice(a - 1, 3);
            x.splice(a - 1, 0, b);
        } else if (x.includes("+") || x.includes("-")) {
            let a, b;

            if (x.indexOf("+") != -1 && x.indexOf("-") != -1) {
                if (x.indexOf("+") < x.indexOf("-")) {
                    a = x.indexOf("+");
                } else {
                    a = x.indexOf("-");
                }
            } else if (x.indexOf("+") != -1) {
                a = x.indexOf("+");
            } else if (x.indexOf("-") != -1) {
                a = x.indexOf("-");
            }

            b = calculator(parseFloat(x[a - 1]), parseFloat(x[a + 1]), x[a]);
            x.splice(a - 1, 3);
            x.splice(a - 1, 0, b);
        } else y = true;
    } while (y != true);

    return x;
}

function calculator(firstValue, secondValue, operator) {
    switch (operator) {
        case "+":
            return firstValue + secondValue;
        case "-":
            return firstValue - secondValue;
        case "x":
            return firstValue * secondValue;
        case "/":
            return firstValue / secondValue;

        default:
            console.error(
                ErrorEvent +
                    " - Something went wrong with 'Calculator'. Values used: " +
                    `${firstValue}, ${secondValue}, ${operator}`
            );
            break;
    }
}
function changeTheme(id, obj) {
    switch (id) {
        case "t1":
            $("html").css(obj.c1.name, obj.c1.value);
            break;

        default:
            console.error(
                ErrorEvent +
                    " - Something went wrong with 'changeTheme'. Values used: " +
                    `${id}, ${obj}`
            );
            break;
    }
}
