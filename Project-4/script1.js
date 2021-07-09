// Get the DOM Elements
const app2Currency = document.getElementById('app2_currency_one');
const app2Amount = document.getElementById('app2_amount');
const exchangeRates = document.getElementById('exchange-rates');
const ratesTable = document.getElementById("exchange-rates");

// Function to format currency amount
function format2Currency(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');
}



// Send request to ExchangeRate-API for conversion rates for the base currency
async function getExchangeRates() {
    // Get the currency code for the base currency
    const app2CurrencyCode = app2Currency.value;
    // console.log(app2CurrencyCode);
    // wait for the result from API
    const res = await fetch(`https://v6.exchangerate-api.com/v6/ff5446d657010e0e02233999/latest/${app2CurrencyCode}`);
    // Wait for response to convert into JSON
    const data = await res.json();

    console.log(data);

    // Get the conversion rates data
    const rates = data.conversion_rates;
    const keys = Object.keys(rates);
    

    //clear previous data 
    ratesTable.innerHTML = `<h4><span>Currency</span> <span>Amount</span></h4>`;
    // const optKeys = Object.keys(opt.htmlString);
    // let contents = opt.innerHTML;
    // opt.innerHTML = optKeys;
    // 
    keys.forEach((key) => {
        // Create a new div element for each currency exchange rate
        const Div = document.createElement('div');
        const opt = document.querySelector('.currency-name');
        
        // console.log(contents);
        // Apply the user class to the new div
        Div.classList.add('data');
        // Add inner HTML to the Div
        Div.innerHTML = `${total} ${key} <span>${format2Currency((parseFloat(rates[key])) * app2Amount.value)}</span>`
        // Add the new div into the DOM
        ratesTable.appendChild(Div);
    });
}

// tyring out sth

var initElement = document.getElementsByTagName("html")[0];
var json = mapDOM(initElement, true);
console.log(json);
const opt = document.querySelector('.currency-name');
const optKeys = opt.htmlString;
optKeys.match('.currency-name');
    let contents = opt.innerHTML;
    opt.innerHTML = optKeys;
initElement = contents;
json = mapDOM(initElement, true);
console.log(json);

function mapDOM(element, json) {
    var treeObject = {};
    
    // If string convert to document Node
    if (typeof element === "string") {
        if (window.DOMParser)
        {
              parser = new DOMParser();
              docNode = parser.parseFromString(element,"text/xml");
        }
        else // Microsoft strikes again
        {
              docNode = new ActiveXObject("Microsoft.XMLDOM");
              docNode.async = false;
              docNode.loadXML(element); 
        } 
        element = docNode.firstChild;
    }
    
    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        object["type"] = element.nodeName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
                object["content"] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {
                        object["content"].push(nodeList[i].nodeValue);
                    } else {
                        object["content"].push({});
                        treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                    }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["attributes"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                }
            }
        }
    }
    treeHTML(element, treeObject);
    
    return (json) ? JSON.stringify(treeObject) : treeObject;
}

// iterate through elements
var list = app2Currency,
    option = list.getElementsByTagName("div"),
    total = initElement;

for (var i = 0, len = option.length; i < len; i++) {
    total += +option[i].value;
}

console.log(total);




//Event Listener

app2Currency.addEventListener("change", getExchangeRates);

app2Amount.addEventListener("input", getExchangeRates);
console.log(getExchangeRates());