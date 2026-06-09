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
  label.textContent = "Semáforo \n Pedestre";

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

//array que guarda todos os ids dos timeouts pra limpar em caso de emergencia
const timeoutIds = [];

let estadoAtual = "horizontal";
let apertouBotao = false;

document.getElementById("pedestre-btn").addEventListener("click", () => {
  apertouBotao = true;
});

document.getElementById("emergencia-btn").addEventListener("click", () => {
  estadoAtual = "emergencia";
  proximoCiclo();
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

  timeoutIds.push(
    setTimeout(() => {
      limpaLuzes();

      horizontais.forEach((semaforo) => {
        semaforo.querySelector(".green").classList.add("green-active");
      });

      verticais.forEach((semaforo) => {
        semaforo.querySelector(".red").classList.add("red-active");
      });

      pedestre.querySelector(".red").classList.add("red-active");
    }, [tempoAmarelo]),
  );
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

  timeoutIds.push(
    setTimeout(() => {
      limpaLuzes();

      horizontais.forEach((semaforo) => {
        semaforo.querySelector(".red").classList.add("red-active");
      });

      verticais.forEach((semaforo) => {
        semaforo.querySelector(".green").classList.add("green-active");
      });

      pedestre.querySelector(".red").classList.add("red-active");
    }, [tempoAmarelo]),
  );
}

function abrePedestre() {
  limpaLuzes();
  horizontais.forEach((semaforo) => {
    semaforo.querySelector(".yellow").classList.add("yellow-active");
  });

  verticais.forEach((semaforo) => {
    semaforo.querySelector(".yellow").classList.add("yellow-active");
  });

  pedestre.querySelector(".red").classList.add("red-active");

  timeoutIds.push(
    setTimeout(() => {
      limpaLuzes();

      horizontais.forEach((semaforo) => {
        semaforo.querySelector(".red").classList.add("red-active");
      });

      verticais.forEach((semaforo) => {
        semaforo.querySelector(".red").classList.add("red-active");
      });

      pedestre.querySelector(".green").classList.add("green-active");
    }, [tempoAmarelo]),
  );
}

function emergencia() {
  limpaLuzes();
  horizontais.forEach((semaforo) => {
    semaforo.querySelector(".yellow").classList.add("yellow-active");
  });

  verticais.forEach((semaforo) => {
    semaforo.querySelector(".yellow").classList.add("yellow-active");
  });

  pedestre.querySelector(".red").classList.add("red-active");

  timeoutIds.push(
    setTimeout(() => {
      limpaLuzes();

      horizontais.forEach((semaforo) => {
        semaforo.querySelector(".red").classList.add("red-active");
      });

      verticais.forEach((semaforo) => {
        semaforo.querySelector(".red").classList.add("red-active");
      });

      pedestre.querySelector(".red").classList.add("red-active");
    }, [tempoAmarelo]),
  );
}

function proximoCiclo() {
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds.length = 0;

  switch (estadoAtual) {
    case "horizontal":
      abreHorizontal();

      timeoutIds.push(
        setTimeout(() => {
          estadoAtual = apertouBotao ? "pedestre" : "vertical";

          proximoCiclo();
        }, ciclo),
      );

      break;

    case "vertical":
      abreVertical();

      timeoutIds.push(
        setTimeout(() => {
          estadoAtual = apertouBotao ? "pedestre" : "horizontal";

          proximoCiclo();
        }, ciclo),
      );

      break;

    case "pedestre":
      apertouBotao = false;

      abrePedestre();

      timeoutIds.push(
        setTimeout(() => {
          estadoAtual = "horizontal";
          proximoCiclo();
        }, ciclo),
      );

      break;
    case "emergencia": {
      timeoutIds.forEach((id) => clearTimeout(id));
      timeoutIds.length = 0;

      emergencia();

      timeoutIds.push(
        setTimeout(() => {
          estadoAtual = "horizontal";
          proximoCiclo();
        }, ciclo),
      );
    }
  }
}

//inicia
proximoCiclo();
