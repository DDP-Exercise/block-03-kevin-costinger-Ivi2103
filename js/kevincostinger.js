"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Iva Grgic - 2026-04-14
 *******************************************************/
let sumExpenses = 0; // Diese Variable muss ganz oben stehen!

// TODO: Prevent the default behavior of the submit button.
// TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.
function submitForm(e) {
    e.preventDefault();

    const dateEl = document.getElementById('date');
    const amountEl = document.getElementById('amount');
    const expenseEl = document.getElementById('expense');

    const amount = parseFloat(amountEl.value);


    if (isEmpty(dateEl.value)) return dateEl.focus();
    if (isNaN(amount) || amount < 0.01) return amountEl.focus();
    if (expenseEl.value.length < 3) return expenseEl.focus();

    const tbody = document.querySelector('#expenses tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${dateEl.value}</td>
        <td>${formatEuro(amount)}</td>
        <td>${expenseEl.value}</td>
        <td><button class="delete-btn" data-val="${amount}">Delete</button></td>
    `;

    tbody.appendChild(row);

    // sum of logged expenses wird erhöht
    sumExpenses += amount;
    document.getElementById('expenseSum').innerText = formatEuro(sumExpenses);
    e.target.reset();
}

// delete button
document.getElementById('expenses').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const amountToSubtract = parseFloat(e.target.getAttribute('data-val'));

        // sum of logged expenses wird verringert wenn delete
        sumExpenses -= amountToSubtract;
        document.getElementById('expenseSum').innerText = formatEuro(sumExpenses);

        // Zeile löschen
        e.target.closest('tr').remove();
    }
});

document.querySelector('form').addEventListener('submit', submitForm);

/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}