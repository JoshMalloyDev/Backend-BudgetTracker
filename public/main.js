let deleteButtons = document.querySelectorAll('.deleteOne')

deleteButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const budgetName = this.parentNode.parentNode.childNodes[1].innerText
    fetch('/deleteBudget', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'budgetName': budgetName,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

let getCurrentBalanceButtons = document.querySelectorAll('.check')

getCurrentBalanceButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const budgetTitle = this.parentNode.parentNode.childNodes[1].innerText
    const budgetTotalAmount = this.parentNode.parentNode.childNodes[3].innerText
    const moneySpent = this.parentNode.parentNode.childNodes[5].innerText
    let remainingBalance = Math.floor(Number(budgetTotalAmount - moneySpent))

    fetch('checkItem', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'budgetName': budgetTitle,
        'totalBudget': budgetTotalAmount,
        'moneySpent': moneySpent,
        'remainingBalance': remainingBalance
      })
    }).then(response => {
      if (response.ok) return response.json()
    })
      .then(data => {
        window.location.reload()
        console.log('data', data.value)
      })
  });
});