var bitcoins = 0
var bitcoinRate = 0

var items = [
    {
        "name": "item_oldCalculator",
        "price": "0.0000001"
    },
    {
        "name": "item_oldCpu",
        "price": "0.00000125"
    },
    {
        "name": "item_oldComputerFromGrandpa",
        "price": "0.00003"
    },
    {
        "name": "item_rapsberrypy",
        "price": "0.00005"
    },
    {
        "name": "item_smartphone",
        "price": "0.0005"
    },
    {
        "name": "item_middleClassPC",
        "price": "0.0015"
    },
    {
        "name": "item_cheapServer",
        "price": "0.004"
    },
    {
        "name": "item_gamingPC",
        "price": "0.015"
    },
    {
        "name": "item_cheapMiner",
        "price": "0.05"
    },
    {
        "name": "item_highEndUltraPC",
        "price": "0.15"
    },
    {
        "name": "item_bigMiner",
        "price": "1.5"
    },
    {
        "name": "item_miningFarm",
        "price": "250"
    },
    {
        "name": "item_nasaPC",
        "price": "5000"
    },
    {
        "name": "item_quantumRig",
        "price": "245000"
    },
    {
        "name": "item_miningFarmSpace",
        "price": "2000000"
    },
    {
        "name": "item_miningFarmMoon",
        "price": "75500000"
    },
    {
        "name": "item_bitcoinTimeMachine",
        "price": "975000000"
    },
    {
        "name": "item_blackHolePoweredMiner",
        "price": "750000000000"
    }
]

var bSec = null;

if (localStorage.getItem("bitcoins") === null) {

    bitcoins = 0

    localStorage.setItem("bitcoins", "0");

    $(".bitcoinAmount").text(bitcoins.toFixed(8))

} else {

    bitcoins = parseFloat(localStorage.getItem("bitcoins"))

    $(".bitcoinAmount").text("loading...")
    $(".satoshiAmount").text("loading...")

    let satoshis = bitcoins * 100000000;

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

    element.children()[2].textContent = calculation + " Bitcoins"

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

Game.setBitcoinPerSecondRateAtBeginning = function () {

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

            var bits_per_sec = $element.attr("data-bits-per-sec")
            itemAmount = parseInt(itemAmount)

            var before = bitcoinRate

            bitcoinRate = bitcoinRate + (itemAmount * bits_per_sec)

            console.log("i = " + i + " | B/sec before: " + before.toFixed(8) +
                " - Calculation made: " + before.toFixed(8) + " + (" + itemAmount + " * " + bits_per_sec + ") = " + bitcoinRate.toFixed(8) +
                " | New B/sec at " + bitcoinRate.toFixed(8))
        }
    }

}

Game.setNewBitcoinRate = function (rate) {

    console.log("setNewBitcoinRate -> New rate: " + (bitcoinRate + rate).toFixed(8))

    if ((bitcoinRate + rate) >= 1000000) {
        $(".bSecRateNumber").text((bitcoinRate + rate).toFixed(0).optimizeNumber())
    } else if ((bitcoinRate + rate) >= 1000) {
        $(".bSecRateNumber").text((bitcoinRate + rate).toFixed(0))
    } else if ((bitcoinRate + rate) >= 1) {
        $(".bSecRateNumber").text((bitcoinRate + rate).toFixed(2))
    } else {
        $(".bSecRateNumber").text((bitcoinRate + rate).toFixed(8))
    }

    return bitcoinRate = bitcoinRate + rate;

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

                $element.children()[2].textContent = calculation + " Bitcoins"

                $element.attr("data-price", calculation.toString())

            }
        }
    }
}

Game.bSecFunction = function (rate) {

    bitcoins = bitcoins + rate

    if (bitcoins > 1000000) {

        let bitcoinUnitNumber = bitcoins.optimizeNumber()

        $(".bitcoinAmount").text(bitcoinUnitNumber)
    } else if (bitcoins >= 1000) {
        $(".bitcoinAmount").text(bitcoins.toFixed(0))
    } else if (bitcoins >= 1) {
        $(".bitcoinAmount").text(bitcoins.toFixed(2))
    } else {
        $(".bitcoinAmount").text(bitcoins.toFixed(8))
    }

    var satoshis = bitcoins * 100000000;

    if (satoshis < 1000000) {
        $(".satoshiAmount").text(Math.round(satoshis))
    } else {

        let satoshiUnitNumber = satoshis.optimizeNumber()
        $(".satoshiAmount").text(satoshiUnitNumber)
    }

    localStorage.setItem("bitcoins", "" + bitcoins + "")

    console.log("bSec -> B/sec at " + rate.toFixed(8))

}

Game.stopBsec = function () {
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
    Game.stopBsec()
    localStorage.setItem("bitcoins", "0")
    localStorage.clear()
    location.reload()
}

Game.setBitcoinPerSecondRateAtBeginning()

bSec = setInterval(function () {
    Game.bSecFunction(bitcoinRate);
}, 1000)

$(document).ready(function () {

    $(".version").text("Version " + Game.GameConst.VERSION)

    if (bitcoinRate >= 1000) {
        $(".bSecRateNumber").text(bitcoinRate.toFixed(0))
    } else if (bitcoinRate >= 1) {
        $(".bSecRateNumber").text(bitcoinRate.toFixed(2))
    } else {
        $(".bSecRateNumber").text(bitcoinRate.toFixed(8))
    }

    $(".bitcoin").click(function () {

        bitcoins = bitcoins + 0.00000001

        if (bitcoins > 1000000) {

            let bitcoinUnitNumber = bitcoins.optimizeNumber()
            $(".bitcoinAmount").text(bitcoinUnitNumber)

        } else if (bitcoins >= 1000) {
            $(".bitcoinAmount").text(bitcoins.toFixed(0))
        } else if (bitcoins >= 1) {
            $(".bitcoinAmount").text(bitcoins.toFixed(2))
        } else {
            $(".bitcoinAmount").text(bitcoins.toFixed(8))
        }

        if ((bitcoins * 100000000) < 1000000) {
            $(".satoshiAmount").text(Math.round((bitcoins * 100000000)))
        } else {

            let satoshiUnitNumber = (bitcoins * 100000000).optimizeNumber()
            $(".satoshiAmount").text(satoshiUnitNumber)
        }

        localStorage.setItem("bitcoins", "" + bitcoins + "")

    });

    $(".purchaseItem").click(function () {

        var id = $(this).attr("id")

        var price = parseFloat($(this).attr("data-price"))

        var bitcoinsPerSecond = parseFloat($(this).attr("data-bits-per-sec"))

        var amountDisplay = $(this).children()[0]
        var amountDisplayAmount = parseInt(localStorage.getItem(id))

        var priceDisplay = $(this).children()[2]

        if (parseFloat(bitcoins.toFixed(8)) >= price) {

            bitcoins = parseFloat(bitcoins.toFixed(8)) - price

            localStorage.setItem("bitcoins", "" + bitcoins + "")

            amountDisplayAmount = amountDisplayAmount + 1
            amountDisplay.textContent = amountDisplayAmount.toString()

            if (bitcoins > 1e6) {

                let bitcoinUnitNumber = bitcoins.optimizeNumber()
                $(".bitcoinAmount").text(bitcoinUnitNumber)

            } else if (bitcoins >= 1000) {
                $(".bitcoinAmount").text(bitcoins.toFixed(0))
            } else if (bitcoins >= 1) {
                $(".bitcoinAmount").text(bitcoins.toFixed(2))
            } else {
                $(".bitcoinAmount").text(bitcoins.toFixed(8))
            }

            if ((bitcoins * 100000000) < 1e6) {
                $(".satoshiAmount").text(Math.round((bitcoins * 100000000)))
            } else {

                let satoshiUnitNumber = (bitcoins * 100000000).optimizeNumber()
                $(".satoshiAmount").text(satoshiUnitNumber)

            }

            Game.itemAction(id)

            Game.stopBsec()

            Game.setNewPrice()

            var newRate = Game.setNewBitcoinRate(bitcoinsPerSecond)

            bSec = setInterval(function () {
                Game.bSecFunction(newRate);
            }, 1000)

        }

    })

    $(".resetButton").click(function () {
        Game.resetGame()
    })

});
