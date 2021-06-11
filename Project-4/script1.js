// Get DOM Elements
const app2CurrencyOne = document.getElementById('app2_currency_one');
const app2Amount = document.getElementById('app2_amount');
const app2Rate = document.getElementById('app2-rate');

// Fetch Exchange Rates & Update the DOM
function calculate() {
    // Get the Currency Code for input currency
    const app2CurrencyCode = app2CurrencyOne.value;
    // console.log(app2CurrencyCode);
    // Send Request to ExchangeRate-API for conversion rates for currency one
    fetch(`https://v6.exchangerate-api.com/v6/410368c0d4ae2659ea293d58/latest/${app2CurrencyCode}`)
        .then(res => res.json())
        .then(data => {
            console.log('data ', data?.conversion_rates);
            // Get the Conversion Rate from input currency to all currency list
            let dataFetched = data.conversion_rates;
            const app2ConverRate = data.conversion_rates;
            console.log(app2ConverRate);
            const keys = Object.keys(app2ConverRate);

            addElement(app2ConverRate);
            // //clear previous data  // 
            table.innerHTML = `<h4>Currency <span>Amount</span></h4>`;
        })
    function addElement(app2_currency_one) {

        for (keys in app2_currency_one) {
            console.log(keys + ":" + app2_currency_one[keys])
            const element = document.createElement('table');
            element.classList.add('element'); //For CSS style
            const newContent = document.createTextNode(`${keys}: ${format2Currency((parseFloat(rate[keys])) * app2CurrencyOne.value)}`);

            element.appendChild(newContent);
            const currentDiv = document.getElementById("div1");
            document.body.insertBefore(element, currentDiv);

        }
    }
}




// / Event Listeners
// Recalculate exchange rate when currency 1 changes
app2CurrencyOne.addEventListener('change', calculate);
// Recalculate exchange amount when currency 1 amount changes
app2Amount.addEventListener('input', calculate);

// Function to format currency amount
function format2Currency(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');
}

calculate();