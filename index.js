let ver = true;
const filter = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
    "+",
    "-",
    "x",
    "/",
    "Delete",
];

const theme01 = {
    // BG
    mainBG: ["--bg-primary", "hsl(222, 26%, 31%)"],
    keypadBG: ["--bg-secondary", "hsl(223, 31%, 20%)"],
    screenBG: ["--bg-extra", "hsl(224, 36%, 15%)"],

    // KEY
    keyBG01: ["--btn-grayish", "hsl(225, 21%, 49%)"],
    keyBG01S: ["--btn-grayish-shadow", "hsl(224, 28%, 35%)"],

    keyBG02: ["--btn-red", "hsl(6, 63%, 50%)"],
    keyBG02S: ["--btn-red-shadow", "hsl(6, 70%, 34%)"],

    keyBG03: ["--btn-bg", "hsl(30, 25%, 89%)"],
    keyBG03S: ["--btn-shadow", "hsl(28, 16%, 65%)"],

    // TEXT
    textS: ["--txt-secondary", "hsl(221, 14%, 31%)"],
    textW: ["--txt-primary", "#fff"],
};
const theme02 = {
    // BG
    mainBG: ["--bg-primary", "hsl(0, 0%, 90%)"],
    keypadBG: ["--bg-secondary", "hsl(0, 5%, 81%)"],
    screenBG: ["--bg-extra", "hsl(0, 0%, 93%)"],

    // KEY
    keyBG01: ["--btn-grayish", "hsl(185, 42%, 37%)"],
    keyBG01S: ["--btn-grayish-shadow", "hsl(185, 58%, 25%)"],

    keyBG02: ["--btn-red", "hsl(25, 98%, 40%)"],
    keyBG02S: ["--btn-red-shadow", "hsl(25, 99%, 27%)"],

    keyBG03: ["--btn-bg", "hsl(45, 7%, 89%)"],
    keyBG03S: ["--btn-shadow", "hsl(35, 11%, 61%)"],

    // TEXT
    textS: ["--txt-primary", "hsl(60, 10%, 19%)"],
    textW: ["--txt-secondary", "#fff"],
};
const theme03 = {
    // BG
    mainBG: ["--bg-primary", "hsl(268, 75%, 9%)"],
    keypadBG: ["--bg-secondary", "#1d0934"],
    screenBG: ["--bg-extra", "#1d0934"],

    // KEY
    keyBG01: ["--btn-grayish", "hsl(281, 89%, 26%)"],
    keyBG01S: ["--btn-grayish-shadow", "hsl(285, 91%, 52%)"],

    keyBG02: ["--btn-red", "hsl(176, 100%, 44%)"],
    keyBG02S: ["--btn-red-shadow", "hsl(177, 92%, 70%)"],

    keyBG03: ["--btn-bg", "hsl(268, 47%, 21%)"],
    keyBG03S: ["--btn-shadow", "hsl(290, 70%, 36%)"],

    // TEXT
    textS: ["--txt-primary", "hsl(52, 100%, 62%)"],
    textW: ["--txt-secondary", "#fff"],
    textP: ["--txt-other", "hsl(198, 20%, 13%)"],
};

fColor("t1"); // cuz for some reason my guy got no sense of pattern

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
            let finalR = result(item.val());
            if (finalR[0] === item.val()) {
                item.val(finalR[0]); // .replace(".", ",") <- not gon' do that cuz don't feel like doing it
            } else {
                item.val(finalR[0].toFixed(2));
            }
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
            // console.log(a + " <- [index]");
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

$("#switch input").on("click", (event) => {
    changeTheme(event.target.id);
});
function changeTheme(id) {
    switch (id) {
        case "t1":
            theme(theme01);
            break;
        case "t2":
            theme(theme02);
            break;
        case "t3":
            theme(theme03);
            break;

        default:
            console.error(
                ErrorEvent +
                    " - Something went wrong with 'changeTheme'. Values used: " +
                    `${id}`
            );
            break;
    }
    fColor(id);
}

function theme(obj) {
    let item = $("html");

    // bg
    item.css(obj.mainBG[0], obj.mainBG[1]);
    item.css(obj.keypadBG[0], obj.keypadBG[1]);
    item.css(obj.screenBG[0], obj.screenBG[1]);

    // keys

    item.css(obj.keyBG01[0], obj.keyBG01[1]);
    item.css(obj.keyBG01S[0], obj.keyBG01S[1]);

    item.css(obj.keyBG02[0], obj.keyBG02[1]);
    item.css(obj.keyBG02S[0], obj.keyBG02S[1]);

    item.css(obj.keyBG03[0], obj.keyBG03[1]);
    item.css(obj.keyBG03S[0], obj.keyBG03S[1]);

    // txt
    item.css(obj.textS[0], obj.textS[1]);
    item.css(obj.textW[0], obj.textW[1]);
}

function fColor(id) {
    if (id === "t1") {
        $(".btn-diff").addClass("bdc");
    } else {
        $(".btn-diff").removeClass("bdc");
    }
}
