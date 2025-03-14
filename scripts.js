// Cotação de moedas do dia
const USD = 4.87
const EUR = 5.32
const GBP = 6.08


// Obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números
amount.addEventListener("input", () => { // para pegar o valor do input
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "") // para ignorar as letras
})

// Capturando o evento de submit do formulário (a moeda que está sendo selecionada)
form.onsubmit = (event) => {
  event.preventDefault()

  //console.log(currency.value)

  switch (currency.value){
    case "USD":
      convertCurrency(amount.value, USD, "US$") //Referência de valor USD
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")  
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

// Função para converter a moeda
function convertCurrency(amount, price, symbol){
  try {
    // Exibindo a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Calcula o total
    let total = amount * price

    // Verifica se o resultado não é um número
    if(isNaN(total)){
      return alert("Por favor, insira um número para converter")
    }

    // Formatar o valor total
    total = formatCurrencyBRL(total).replace("R$", "")

    // Exibe o total
    result.textContent = `${total} Reais`

    // Aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result")

  } catch (error){
    // Remove a classe do footer removendo ele da tela
    footer.classList.remove("show-result")
    
    console.log(error)
    alert("Não foi possível converter. Tente novamente mais tarde.")
  }
}

// Formata a moeda em real brasileiro
function formatCurrencyBRL(value){
  // converte para numero para utilizar o toLocaleString
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}