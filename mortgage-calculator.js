  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mortgage Calculator</title>
</head>
<body>
  <div id="mortgage-calculator">
    <h1>Mortgage Calculator</h1>
    <form id="mortgage-form">
      <label for="home-price">Home Price</label>
      <input type="number" id="home-price" step="0.01" required>

      <label for="down-payment">Down Payment</label>
      <input type="number" id="down-payment" step="0.01" required>

      <label for="down-payment-percentage">Down Payment Percentage</label>
      <input type="number" id="down-payment-percentage" step="0.01" required>

      <label for="loan-amount">Loan Amount</label>
      <input type="number" id="loan-amount" step="0.01" required>

      <label for="loan-term">Loan Term (years)</label>
      <input type="number" id="loan-term" required>

      <label for="interest-rate">Interest Rate (%)</label>
      <input type="number" id="interest-rate" step="0.01" required>

      <label for="property-tax">Property Tax (%)</label>
      <input type="number" id="property-tax" step="0.01" required>

      <label for="home-insurance">Home Insurance (yearly)</label>
      <input type="number" id="home-insurance" step="0.01" required>

      <label for="pmi">Private Mortgage Insurance (PMI) Rate (%)</label>
      <input type="number" id="pmi" step="0.01" required>

      <button type="submit">Calculate</button>
    </form>
    <div class="results" id="results"></div>
    <div id="amortization-schedule"></div>
  </div>

  <script>
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
      const pmi = parseFloat(document.getElementById("pmi").value
if (!homePrice || !downPayment || !downPaymentPercentage || !loanAmount || !loanTerm || !interestRate || !propertyTax || !homeInsurance || !pmi) {
    document.getElementById("results").innerHTML = "Please fill in all fields.";
    return;
  }

  const monthlyInterestRate = interestRate / 12;
  const totalPayments = loanTerm * 12;
  const principal = loanAmount;
  const monthlyPropertyTax = (homePrice * propertyTax) / 12;
  const monthlyHomeInsurance = homeInsurance / 12;

  const p = principal;
  const i = monthlyInterestRate;
  const n = totalPayments;

  const monthlyPayment = calculateMonthlyPayment(p, i, n);
  const totalCost = monthlyPayment * totalPayments;
  const totalInterest = totalCost - principal;
  const monthlyPaymentWithTaxes = monthlyPayment + monthlyPropertyTax + monthlyHomeInsurance;

  document.getElementById("results").innerHTML =
    `Monthly Payment: $${monthlyPayment.toFixed(2)}<br>` +
    `Monthly Payment (with taxes and insurance): $${monthlyPaymentWithTaxes.toFixed(2)}<br>` +
    `Total Cost: $${totalCost.toFixed(2)}<br>` +
    `Total Interest: $${totalInterest.toFixed(2)}`;

  const amortizationSchedule = calculateAmortizationSchedule(p, i, n);
  const tableRows = amortizationSchedule.map((row) => {
    return `<tr><td>${row.paymentNumber}</td><td>$${row.payment.toFixed(2)}</td><td>$${row.interest.toFixed(2)}</td><td>$${row.principal.toFixed(2)}</td><td>$${row.balance.toFixed(2)}</td></tr>`;
  });
  const tableHeader = "<tr><th>Payment Number</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Balance</th></tr>";
  document.getElementById("amortization-schedule").innerHTML =
    "<h2>Amortization Schedule</h2>" +
    "<table>" +
    tableHeader +
    tableRows.join("") +
    "</table>";
});

function calculateMonthlyPayment(principal, monthlyInterestRate, totalPayments) {
  const x = Math.pow(1 + monthlyInterestRate, totalPayments);
  return (principal * x * monthlyInterestRate) / (x - 1);
}

function calculateAmortizationSchedule(principal, monthlyInterestRate, totalPayments) {
  const payment = calculateMonthlyPayment(principal, monthlyInterestRate, totalPayments);
  let balance = principal;
  const amortizationSchedule = [];

  for (let i = 0; i < totalPayments; i++) {
    const interest = balance * monthlyInterestRate;
    const paidPrincipal = payment - interest;
    balance -= paidPrincipal;

    amortizationSchedule.push({
      paymentNumber: i + 1,
      payment,
      interest,
      principal: paidPrincipal,
      balance,
    });
  }

  return amortizationSchedule;
}
