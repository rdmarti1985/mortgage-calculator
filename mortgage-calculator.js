document.getElementById("mortgage-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const homePrice = parseFloat(document.getElementById("home-price").value);
  const downPayment = parseFloat(document.getElementById("down-payment").value);
  const downPaymentPercentage = parseFloat(document.getElementById("down-payment-percentage").value);
  const loanAmount = parseFloat(document.getElementById("loan-amount").value);
  const loanTerm = parseFloat(document.getElementById("loan-term").value);
  const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
  const propertyTax = parseFloat(document.getElementById("property-tax").value) / 100;
  const homeInsurance = parseFloat(document.getElementById("home-insurance").value);
  const pmi = parseFloat(document.getElementById("pmi").value) / 100;

  const principal = loanAmount;
  const annualInterestRate = interestRate;
  const numberOfPayments = loanTerm * 12;

  const monthlyInterestRate = annualInterestRate / 12;
  const monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const totalInterest = (monthlyPayment * numberOfPayments) - principal;
  const annualPropertyTax = propertyTax * homePrice;
  const monthlyPropertyTax = annualPropertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;
  const monthlyPMI = loanAmount * pmi / 12;
  const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyHomeInsurance + monthlyPMI;

  document.getElementById("results").innerHTML = `
    <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
    <p>Total Interest: $${totalInterest.toFixed(2)}</p>
    <p>Total Monthly Payment (including taxes, insurance, and PMI): $${totalMonthlyPayment.toFixed(2)}</p>
  `;

  const scheduleTable = document.createElement("table");
  let tableHeader = "<tr><th>Month</th><th>Interest</th><th>Principal</th><th>Remaining Balance</th></tr>";

  let remainingBalance = principal;
  let tableRows = "";

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    tableRows += `
      <tr>
        <td>${i}</td>
        <td>$${interestPayment.toFixed(2)}</td>
        <td>$${principalPayment.toFixed(2)}</td>
        <td>$${remainingBalance.toFixed(2)}</td>
      </tr>
    `;
  }

  scheduleTable.innerHTML = tableHeader + tableRows;
  document.getElementById("amortization-schedule").innerHTML = "<h3>Amortization Schedule</h3>";
  document.getElementById("amortization-schedule").appendChild(scheduleTable);
});