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

function result(item) {
    /* 
    A few concepts could be used as a basis, first i need to work with the order priority.
    To do so i need to start off from the left and run the array multiple times over and over 
    so that i might be able to achieve sth decent. and once the * and / are done i can proceed
    to da + and - operators. 

    A few concerns:

    #1 I still dont have my fucking glass, thus i can quite see what i'm typing
    #2 using array methods to find * and division don't work quite well so i need to map
    them out properly and then proceed to the first step
    #3 i am obligate to create a code that runs step by step. in this way i can assure
    that my could wouldn't break half way through it.
    #4 I need a better filter, otherwise i could break my calculator with a few operador + final(.)
    combos
    */
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

    console.log(x);
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
function changeTheme() {}
