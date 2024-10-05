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
let tarefasPorDia = {};

function renderizarCalendario() {
  const mes = dataAtual.getMonth();
  const ano = dataAtual.getFullYear();
  document.getElementById("mes-ano").innerText = `${nomesMeses[mes]} ${ano}`;

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const diasContainer = document.getElementById("dias-do-calendario");
  diasContainer.innerHTML = "";

  for (let i = 0; i < primeiroDia; i++) {
    const emBranco = document.createElement("div");
    diasContainer.appendChild(emBranco);
  }

  for (let i = 1; i <= diasNoMes; i++) {
    const dia = document.createElement("div");
    dia.innerText = i;
    dia.onclick = () => selecionarDia(i);

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

function selecionarDia(dia) {
  const mes = dataAtual.getMonth();
  const ano = dataAtual.getFullYear();

  document.getElementById("dia-selecionado").innerText = `${dia}/${
    mes + 1
  }/${ano}`;

  document.querySelector(".calendario").style.transform = "translateX(-150px)";
  document.querySelector(".lista-tarefas").classList.add("active");

  atualizarListaTarefas(dia);
}

function atualizarListaTarefas(dia) {
  const lista = document.getElementById("tarefas");
  lista.innerHTML = "";

  const key = `${dia}-${dataAtual.getMonth()}-${dataAtual.getFullYear()}`;
  const tarefas = tarefasPorDia[key] || [];

  tarefas.forEach((tarefa, index) => {
    const item = document.createElement("li");
    item.innerText = tarefa;
    lista.appendChild(item);
  });
}

function adicionarTarefa() {
  const diaSelecionado = document
    .getElementById("dia-selecionado")
    .innerText.split("/")[0];
  const novaTarefa = document.getElementById("nova-tarefa").value;

  if (novaTarefa.trim() === "") return;

  const key = `${diaSelecionado}-${dataAtual.getMonth()}-${dataAtual.getFullYear()}`;
  if (!tarefasPorDia[key]) tarefasPorDia[key] = [];

  tarefasPorDia[key].push(novaTarefa);
  document.getElementById("nova-tarefa").value = "";

  atualizarListaTarefas(diaSelecionado);
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
