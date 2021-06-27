// Get the DOM Elements
const app2Currency = document.getElementById('app2_currency_one');
const app2Amount = document.getElementById('app2_amount');
const exchangeRates = document.getElementById('exchange-rates');
const paste = document.getElementById('paste');
const ratesTable = document.getElementById("exchange-rates");

// Function to format currency amount
function format2Currency(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');
}



// Send request to ExchangeRate-API for conversion rates for the base currency
async function getExchangeRates() {
    // Get the currency code for the base currency
    const app2CurrencyCode = app2Currency.value;
    console.log(app2CurrencyCode);
    // wait for the result from API
    const res = await fetch(`https://v6.exchangerate-api.com/v6/ff5446d657010e0e02233999/latest/${app2CurrencyCode}`);
    // Wait for response to convert into JSON
    const data = await res.json();

    // console.log(data);

    // Get the conversion rates data
    const rates = data.conversion_rates;
    const keys = Object.keys(rates);

    //clear previous data 
    ratesTable.innerHTML = `<h4>Currency <span>Amount</span></h4>`;
    // 
    keys.forEach((key) => {
        // Create a new div element for each currency exchange rate
        const Div = document.createElement('div');
        // Apply the user class to the new div
        Div.classList.add('data');
        // Add inner HTML to the Div
        Div.innerHTML = `${key} <span>${format2Currency((parseFloat(rates[key]))*app2Amount.value)}</span>`
        // Add the new div into the DOM
        ratesTable.appendChild(Div);
    });
}

        
             
                


//Event Listener

app2Currency.addEventListener("change", getExchangeRates);

app2Amount.addEventListener("input", getExchangeRates);