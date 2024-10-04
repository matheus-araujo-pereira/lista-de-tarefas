const nomesMeses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
let dataAtual = new Date();

function renderizarCalendario() {
  const mes = dataAtual.getMonth();
  const ano = dataAtual.getFullYear();

  document.getElementById("mes-ano").innerText = `${nomesMeses[mes]} ${ano}`;

  const primeiroDia = new Date(ano, mes, 1).getDay(); // primeiro dia da semana (0=Domingo, 6=Sábado)
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  const diasContainer = document.getElementById("dias-do-calendario");
  diasContainer.innerHTML = "";

  // Adicionar dias vazios no início da semana
  for (let i = 0; i < primeiroDia; i++) {
    const emBranco = document.createElement("div");
    diasContainer.appendChild(emBranco);
  }

  // Adicionar dias do mês
  for (let i = 1; i <= diasNoMes; i++) {
    const dia = document.createElement("div");
    dia.innerText = i;

    // Destacar o dia atual
    if (
      i === new Date().getDate() &&
      mes === new Date().getMonth() &&
      ano === new Date().getFullYear()
    ) {
      dia.classList.add("dia-atual");
    }

    diasContainer.appendChild(dia);
  }
}

function mesAnterior() {
  dataAtual.setMonth(dataAtual.getMonth() - 1);
  renderizarCalendario();
}

function mesPosterior() {
  dataAtual.setMonth(dataAtual.getMonth() + 1);
  renderizarCalendario();
}

renderizarCalendario();
