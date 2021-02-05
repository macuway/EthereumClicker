var ethereums = 0
var ethereumRate = 0

var items = [
    {
        "name": "item_cavemanBrain",
        "price": "0.0000001"
    },
    {
        "name": "item_tapeDrives",
        "price": "0.00000125"
    },
    {
        "name": "item_hardDrive",
        "price": "0.00003"
    },
    {
        "name": "item_intelCPU",
        "price": "0.00005"
    },
    {
        "name": "item_PC",
        "price": "0.0005"
    },
    {
        "name": "item_Win95PC",
        "price": "0.0015"
    },
    {
        "name": "item_opti",
        "price": "0.004"
    },
    {
        "name": "item_mbp",
        "price": "0.015"
    },
    {
        "name": "item_mpro",
        "price": "0.05"
    },
    {
        "name": "item_aph",
        "price": "0.15"
    },
    {
        "name": "item_ryzen",
        "price": "1.5"
    },
    {
        "name": "item_server",
        "price": "250"
    },
    {
        "name": "item_LTT",
        "price": "5000"
    },
    {
        "name": "item_RTX",
        "price": "245000"
    },
    {
        "name": "item_jetcool",
        "price": "2000000"
    },
    {
        "name": "item_dryice",
        "price": "75500000"
    },
    {
        "name": "item_qpc",
        "price": "975000000"
    },
    {
        "name": "item_ethereumgod",
        "price": "750000000000"
    }
]

var bSec = null;

if (localStorage.getItem("ethereums") === null) {

    ethereums = 0

    localStorage.setItem("ethereums", "0");

    $(".ethereumAmount").text(ethereums.toFixed(8))

} else {

    ethereums = parseFloat(localStorage.getItem("ethereums"))

    $(".ethereumAmount").text("loading...")
}

var Game = {}

Game.GameConst = {
    "priceMultiplier": 1.15,
    "VERSION": "1.4.0"
}

Game.units = [
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
    "Undecillion",
    "Duodecillion",
    "Tredecillion",
    "Quattuordecillion",
    "Quindecillion",
    "Sexdecillion",
    "Septdecillion",
    "Octodecillion",
    "Novemdecillion",
    "Vigintillion",
    "Unvigintillion",
    "Duovigintillion",
    "Trevigintillion",
    "Quattuorvigintillion",
    "Quinvigintillion",
    "Sexvigintillion",
    "Septvigintillion",
    "Octovigintillion",
    "Novemvigintillion",
    "Trigintillion"
]

Game.setPriceAtGameBeginning = function (element, price, itemAmount) {

    var multiplier = Game.GameConst.priceMultiplier

    var calculation = (parseFloat(price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8)

    element.children()[2].textContent = calculation

    element.attr("data-price", calculation.toString())

}

Game.itemAction = function (id) {

    var item = id
    var itemAmount = 0;

    if (localStorage.getItem(item) === null) {
        localStorage.setItem(item, "1");
    } else {
        itemAmount = parseInt(localStorage.getItem(item))

        localStorage.setItem(item, "" + (itemAmount + 1) + "");

    }

}

Game.setEthereumPerSecondRateAtBeginning = function () {

    for (var i = 0; i < items.length; i++) {
        if (localStorage.getItem(items[i].name) === null) {
            localStorage.setItem(items[i].name, "0")
        } else {

            var $element = $("#" + items[i].name)

            var itemAmount = localStorage.getItem(items[i].name)

            $element.children()[0].textContent = itemAmount

            if (itemAmount > 0) {
                Game.setPriceAtGameBeginning($element, parseFloat(items[i].price), parseInt(itemAmount))
            }

            var eths_per_sec = $element.attr("data-eths-per-sec")
            itemAmount = parseInt(itemAmount)

            var before = ethereumRate

            ethereumRate = ethereumRate + (itemAmount * eths_per_sec)

            console.log("i = " + i + " | B/sec before: " + before.toFixed(8) +
                " - Calculation made: " + before.toFixed(8) + " + (" + itemAmount + " * " + eths_per_sec + ") = " + ethereumRate.toFixed(8) +
                " | New B/sec at " + ethereumRate.toFixed(8))
        }
    }

}

Game.setNewEthereumRate = function (rate) {

    console.log("setNewEthereumRate -> New rate: " + (ethereumRate + rate).toFixed(8))

    if ((ethereumRate + rate) >= 1000000) {
        $(".ESecRateNumber").text((ethereumRate + rate).toFixed(0).optimizeNumber())
    } else if ((ethereumRate + rate) >= 1000) {
        $(".ESecRateNumber").text((ethereumRate + rate).toFixed(0))
    } else if ((ethereumRate + rate) >= 1) {
        $(".ESecRateNumber").text((ethereumRate + rate).toFixed(2))
    } else {
        $(".ESecRateNumber").text((ethereumRate + rate).toFixed(8))
    }

    return ethereumRate = ethereumRate + rate;

}

Game.setNewPrice = function () {

    for (var i = 0; i < items.length; i++) {
        if (localStorage.getItem(items[i].name) === null) {
            localStorage.setItem(items[i].name, "0")
        } else {
            var $element = $("#" + items[i].name)
            var itemAmount = localStorage.getItem(items[i].name)

            $element.children()[0].textContent = itemAmount

            if (itemAmount > 0) {

                var multiplier = Game.GameConst.priceMultiplier
                var calculation = (parseFloat(items[i].price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8)

                $element.children()[2].textContent = calculation

                $element.attr("data-price", calculation.toString())

            }
        }
    }
}

Game.bSecFunction = function (rate) {

    ethereums = ethereums + rate

    if (ethereums > 1000000) {

        let ethereumUnitNumber = ethereums.optimizeNumber()

        $(".ethereumAmount").text(ethereumUnitNumber)
    } else if (ethereums >= 1000) {
        $(".ethereumAmount").text(ethereums.toFixed(0))
    } else if (ethereums >= 1) {
        $(".ethereumAmount").text(ethereums.toFixed(2))
    } else {
        $(".ethereumAmount").text(ethereums.toFixed(8))
    }


    localStorage.setItem("ethereums", "" + ethereums + "")

    console.log("bSec -> B/sec at " + rate.toFixed(8))

}

Game.stopeSec = function () {
    clearInterval(bSec)
}

Game.optimizeNumber = function () {
    if (this >= 1e6) {
        let number = parseFloat(this)
        let unit = Math.floor(parseFloat(number.toExponential(0).toString().replace("+", "").slice(2)) / 3) * 3

        var num = (this / ('1e' + (unit))).toFixed(2)

        var unitname = Game.units[Math.floor(unit / 3) - 1]

        return num + " " + unitname
    }

    return this.toLocaleString()
}

Number.prototype.optimizeNumber = Game.optimizeNumber
String.prototype.optimizeNumber = Game.optimizeNumber

Game.resetGame = function () {
    Game.stopeSec()
    localStorage.setItem("ethereums", "0")
    localStorage.clear()
    location.reload()
}

Game.setEthereumPerSecondRateAtBeginning()

bSec = setInterval(function () {
    Game.bSecFunction(ethereumRate);
}, 1000)

$(document).ready(function () {

    $(".version").text("Version " + Game.GameConst.VERSION)

    if (ethereumRate >= 1000) {
        $(".ESecRateNumber").text(ethereumRate.toFixed(0))
    } else if (ethereumRate >= 1) {
        $(".ESecRateNumber").text(ethereumRate.toFixed(2))
    } else {
        $(".ESecRateNumber").text(ethereumRate.toFixed(8))
    }

    $(".ethereum").click(function () {

        ethereums = ethereums + 0.00000001

        if (ethereums > 1000000) {

            let ethereumUnitNumber = ethereums.optimizeNumber()
            $(".ethereumAmount").text(ethereumUnitNumber)

        } else if (ethereums >= 1000) {
            $(".ethereumAmount").text(ethereums.toFixed(0))
        } else if (ethereums >= 1) {
            $(".ethereumAmount").text(ethereums.toFixed(2))
        } else {
            $(".ethereumAmount").text(ethereums.toFixed(8))
        }

        localStorage.setItem("ethereums", "" + ethereums + "")

    });

    $(".purchaseItem").click(function () {

        var id = $(this).attr("id")

        var price = parseFloat($(this).attr("data-price"))

        var ethereumsPerSecond = parseFloat($(this).attr("data-eths-per-sec"))

        var amountDisplay = $(this).children()[0]
        var amountDisplayAmount = parseInt(localStorage.getItem(id))

        var priceDisplay = $(this).children()[2]

        if (parseFloat(ethereums.toFixed(8)) >= price) {

            ethereums = parseFloat(ethereums.toFixed(8)) - price

            localStorage.setItem("ethereums", "" + ethereums + "")

            amountDisplayAmount = amountDisplayAmount + 1
            amountDisplay.textContent = amountDisplayAmount.toString()

            if (ethereums > 1e6) {

                let ethereumUnitNumber = ethereums.optimizeNumber()
                $(".ethereumAmount").text(ethereumUnitNumber)

            } else if (ethereums >= 1000) {
                $(".ethereumAmount").text(ethereums.toFixed(0))
            } else if (ethereums >= 1) {
                $(".ethereumAmount").text(ethereums.toFixed(2))
            } else {
                $(".ethereumAmount").text(ethereums.toFixed(8))
            }

            Game.itemAction(id)

            Game.stopeSec()

            Game.setNewPrice()

            var newRate = Game.setNewEthereumRate(ethereumsPerSecond)

            bSec = setInterval(function () {
                Game.bSecFunction(newRate);
            }, 1000)

        }

    })

    $(".resetButton").click(function () {
        Game.resetGame()
    })

});
