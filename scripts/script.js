const inputLista = document.getElementById("nomesLista");
const btninputLista = document.getElementById("add");
const tableContent = document.querySelector("table tbody");
const totalParticipantes = document.querySelector("#table-title span");

let binSelecedItem = document.querySelectorAll(".bin-icn");
const clarAllbtn = document.querySelector("thead tr th svg");

const inputQtdSorteados = document.getElementById("qtdSorteados");

const btnShowAwards = document.getElementById("startSorteio");
const printBtn = document.getElementById('print')
let sorteadosQte = 0;

let params = {
  particleCount: 600, // Quantidade de confetes
  spread: 100, // O quanto eles se espalham
  startVelocity: 70, // Velocidade inicial
  origin: { x: 0, y: 0.5 }, // Posição inicial na tela
  angle: 30, // Ângulo em que os confetes serão lançados
};

showDataTable();

btnShowAwards.addEventListener("click", () => {
  showDataTable()
  sorteadosQte = parseInt(inputQtdSorteados.value);

  console.log(sorteadosQte);
  let pessoas = load();
  if (sorteadosQte <= pessoas.length) {
    sortRandom(sorteadosQte);
  } else {
    sorteadosQte <= 0 || sorteadosQte == NaN
      ? alert(`A Quantidade de sorteados, \n deve ser no minimo de 1!`)
      : alert(
          `A Quantidade de sorteados, \n deve ser menor ou igual a quantitdade total de participantes \nTotal de ${pessoas.length} participantes`
        );
  }
});

clarAllbtn.addEventListener("click", () => {
  console.log(confirm("deletar todas as linhas?"));
  localStorage.setItem("@sorteio:", JSON.stringify([]));
  showDataTable();
});

btninputLista.addEventListener("click", () => {
  let dataValor = load();
  for (let person of inputLista.value.split(";")) {
    if (person.trim() != "") {
      dataValor.push(person.trim().toUpperCase());
    } else {
      alert("Empty values is not allowed!");
    }
  }
  save(dataValor);
  showDataTable();
});

function load() {
  return JSON.parse(localStorage.getItem("@sorteio:")) || [];
}
function save(dataStorage) {
  let dataStg = [];

  dataStorage.forEach((item) => {
    if (!dataStg.includes(item)) {
      dataStg.push(item);
    }
  });

  // if (dataStorage != "") {
  localStorage.setItem("@sorteio:", JSON.stringify(dataStg));
  // }
  inputLista.value = "";
}

function showDataTable() {
  tableContent.innerText = "";
  let pessoas = load();
  totalParticipantes.innerText = pessoas.length;

  for (let pessoa of pessoas) {
    const trElement = document.createElement("tr");
    const indexElement = document.createElement("td");
    const nameElement = document.createElement("td");
    const binElement = document.createElement("td");

    binElement.innerHTML = `<img src="./assets/bin.svg" alt="imagem de lixeira" class="bin-icn">`;

    indexElement.innerText = pessoas.indexOf(pessoa);
    nameElement.innerText = pessoa;

    trElement.append(indexElement);
    trElement.append(nameElement);
    trElement.append(binElement);
    tableContent.append(trElement);

    binSelecedItem = document.querySelectorAll(".bin-icn");
    //  console.log(binSelecedItem)
  }

  for (iconBin of binSelecedItem) {
    iconBin.addEventListener("click", (event) => {
      const tdEle = event.target.parentNode.parentNode;
      let nameToPop = tdEle.children[0].textContent;
      console.log(tdEle.children[0].textContent);

      let data = load();
      delete data[nameToPop];
      save(data);

      showDataTable();
    });
  }
}

function sortRandom(sorteados) {
  let selecao = [];
  let pessoas = load();
  let modalList =[]

  // Math.random() * (max - min) + min;

  for (let idx = 0; selecao.length < sorteados; ++idx) {
    let numberPoped = Math.floor(Math.random() * (pessoas.length - 0) + 0);
    if (!selecao.includes(numberPoped)) {
      selecao.push(numberPoped);
    } else {
      --idx;
    }
  }
  const tableRows = document.querySelectorAll("tbody tr");
  for (let row of tableRows) {
    let value = parseInt(row.children[0].textContent); // assuming the first cell contains the value
    if (selecao.includes(value)) {
      texto = row.childNodes[1].textContent;

      row.childNodes[1].textContent = `🏆🏆🏆 ${texto} 🏆🏆🏆`;
      modalList.push(row.childNodes[1].textContent)
      row.childNodes[1].classList.add("celula");
    }
    
  }


  console.log(selecao.sort((a, b) => a - b));

  confetti(params);
  params.origin.x = 1;
  params.angle = 135;
  confetti(params);

 

}

printBtn.addEventListener('click',()=>{
  print()
})