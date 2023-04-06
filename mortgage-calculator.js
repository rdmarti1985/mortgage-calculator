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
