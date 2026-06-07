const container = document.getElementById("container");

//criação elementos
function createLight(color) {
  const light = document.createElement("div");
  light.className = color;
  return light;
}

function createSemaforo() {
  const fragment = document.createDocumentFragment();

  fragment.append(
    createLight("green"),
    createLight("yellow"),
    createLight("red"),
  );

  return fragment;
}

function createSemaforoPedestre() {
  const fragment = document.createDocumentFragment();

  const label = document.createElement("div");
  label.textContent = "Pedestre";

  fragment.append(label, createLight("green"), createLight("red"));

  return fragment;
}

function createWrapper(classes, content) {
  const wrapper = document.createElement("div");
  wrapper.className = classes;
  wrapper.append(content);
  return wrapper;
}

container.append(
  createWrapper(
    "semaforo-wrapper semaforo-vertical vertical-cima",
    createSemaforo(),
  ),
  createWrapper(
    "semaforo-wrapper semaforo-vertical vertical-baixo",
    createSemaforo(),
  ),
  createWrapper(
    "semaforo-wrapper semaforo-horizontal horizontal-direita",
    createSemaforo(),
  ),
  createWrapper(
    "semaforo-wrapper semaforo-horizontal horizontal-esquerda",
    createSemaforo(),
  ),
  createWrapper("semaforo-wrapper semaforo-pedestre", createSemaforoPedestre()),
);

//lógica

// const ciclo = 60000; // 1 minuto
const ciclo = 6000; // 6 segundos - pra testar

// const tempoAmarelo = 5000
const tempoAmarelo = 1000; // pra testar

let estadoAtual = "horizontal";
let apertouBotao = false;

document.getElementById("pedestre-btn").addEventListener("click", () => {
  apertouBotao = true;
});

const horizontais = document.querySelectorAll(".semaforo-horizontal");
const verticais = document.querySelectorAll(".semaforo-vertical");
const pedestre = document.querySelector(".semaforo-pedestre");

function limpaLuzes() {
  document.querySelectorAll(".green, .yellow, .red").forEach((light) => {
    light.classList.remove("green-active", "yellow-active", "red-active");
  });
}

function abreHorizontal() {
  limpaLuzes();
  horizontais.forEach((semaforo) => {
    semaforo.querySelector(".red").classList.add("red-active");
  });

  verticais.forEach((semaforo) => {
    semaforo.querySelector(".yellow").classList.add("yellow-active");
  });
  pedestre.querySelector(".red").classList.add("red-active");

  setTimeout(() => {
    limpaLuzes();

    horizontais.forEach((semaforo) => {
      semaforo.querySelector(".green").classList.add("green-active");
    });

    verticais.forEach((semaforo) => {
      semaforo.querySelector(".red").classList.add("red-active");
    });

    pedestre.querySelector(".red").classList.add("red-active");
  }, [tempoAmarelo]);
}

function abreVertical() {
  limpaLuzes();
  horizontais.forEach((semaforo) => {
    semaforo.querySelector(".yellow").classList.add("yellow-active");
  });

  verticais.forEach((semaforo) => {
    semaforo.querySelector(".red").classList.add("red-active");
  });
  pedestre.querySelector(".red").classList.add("red-active");

  setTimeout(() => {
    limpaLuzes();

    horizontais.forEach((semaforo) => {
      semaforo.querySelector(".red").classList.add("red-active");
    });

    verticais.forEach((semaforo) => {
      semaforo.querySelector(".green").classList.add("green-active");
    });

    pedestre.querySelector(".red").classList.add("red-active");
  }, [tempoAmarelo]);
}

function abrePedestre() {
  limpaLuzes();
  horizontais.forEach((semaforo) => {
    semaforo.querySelector(".yellow").classList.add("yellow-active");
  });

  verticais.forEach((semaforo) => {
    semaforo.querySelector(".yellow").classList.add("yellow-active");
  });

  pedestre.querySelector(".green").classList.add("red-active");

  setTimeout(() => {
    limpaLuzes();

    horizontais.forEach((semaforo) => {
      semaforo.querySelector(".red").classList.add("red-active");
    });

    verticais.forEach((semaforo) => {
      semaforo.querySelector(".red").classList.add("red-active");
    });

    pedestre.querySelector(".green").classList.add("green-active");
  }, [tempoAmarelo]);
}

function proximoCiclo() {
  switch (estadoAtual) {
    case "horizontal":
      abreHorizontal();

      setTimeout(() => {
        estadoAtual = apertouBotao ? "pedestre" : "vertical";

        proximoCiclo();
      }, ciclo);

      break;

    case "vertical":
      abreVertical();

      setTimeout(() => {
        estadoAtual = apertouBotao ? "pedestre" : "horizontal";

        proximoCiclo();
      }, ciclo);

      break;

    case "pedestre":
      apertouBotao = false;

      abrePedestre();

      setTimeout(() => {
        estadoAtual = "horizontal";
        proximoCiclo();
      }, ciclo);

      break;
  }
}

//inicia
proximoCiclo();
