"use strict"
var currentTradeSet;
var received;
var sent;
var requests;
var tradeInbox;
function rebind()
{
    $(".acceptButton").click(function(event)
            {
                var that = this;
                var url = $(that).attr("href");
                $(document.body).append((new ConfirmationBox("Do you want to add the stock " + this.id + " to this floor?", 
                                [{text: "Yes", func: function() { window.location = url; }},
                                {text: "No", func: function(){ window.location = url + "del/"; }},
                                {text: "Cancel", func: function() { this.destroy(); }}])).$holder);
                event.preventDefault();
            }); 
}

function getPriceCallback(el, xhr)
{
    return function(){
        var DONE = 4;
        console.log(xhr);
        if(xhr.readyState === DONE)
        {
            var klass;
            var sign;
            var jsonObj = JSON.parse(xhr.response);
            if(jsonObj.change > 0)
            {
                klass = "green";
                sign = "+";
            }
            else if(jsonObj.change < 0)
            {
                klass = "red";
                sign = "";
            }
            else
            {
                klass = "blue";
                sign = "";
            }
            $(el).addClass(klass).removeClass("loadingPrice").html(sign + jsonObj.change.toString());
        }
    };
}
function loadPrices(){
    var loadingPrices = $(".loadingPrice");
    var STOCK_PRICE_URL = "{% url "stockPrice" symbol="ZZZ" %}";
    var xhrs = [];
    for(var i = 0; i < loadingPrices.length; i++)
    {
        var price = loadingPrices[i];
        var symbol = price.id;
        xhrs.push(new XMLHttpRequest());
        xhrs[i].onreadystatechange = getPriceCallback(price, xhrs[i]);
        xhrs[i].open("GET", STOCK_PRICE_URL.replace("ZZZ", symbol));
        xhrs[i].send();
    }
}

$(document).ready(function() {
    received = $("#received");
    sent = $("#sent");
    requests = $("#requests");
    tradeInbox = $(".tradeInbox");
    currentTradeSet = trades[pk];
    setTradeBox(tradeInbox, currentTradeSet.received);
    onTabClick = function(that) {
        received.addClass("selected");
        sent.removeClass("selected");
        requests.removeClass("selected");
        currentTradeSet = trades[that.id];
        setTradeBox(tradeInbox, currentTradeSet.received);
        if(currentTradeSet.requests == undefined)
        {
            requests.css("visibility", "hidden");
        }
        else
        {
            requests.css("visibility", "visible");
        }
        rebind();
        loadPrices();
    };
    loadPrices();
    $(".tradeTab").click(function() {
        if(this.className.indexOf("selected") == -1)
        {
            $(".tradeTab").removeClass("selected");
            $(this).addClass("selected");
            setTradeBox(tradeInbox, currentTradeSet[this.id]);
            rebind();
        }
    });
    $(".deleteButton").click(function(event)
            {
                if(confirm("Are you sure you want to leave " + this.id + "?"))
                {}
                else
                {
                    event.preventDefault();
                }
            });
});
