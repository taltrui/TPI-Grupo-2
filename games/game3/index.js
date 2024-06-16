$(document).ready(function () {
  mezclarYReiniciar();

  let primeraTarjeta = null;
  let segundaTarjeta = null;

  const reset = $("#reiniciar");
  reset.on("click", mezclarYReiniciar);

  $(".tarjeta").click(function () {
    if (!$(this).hasClass("oculta") || segundaTarjeta) {
      return;
    }

    let valor = $(this).data("valor");
    $(this).removeClass("oculta").addClass(valor);

    if (primeraTarjeta === null) {
      primeraTarjeta = $(this);
    } else {
      segundaTarjeta = $(this);

      if (primeraTarjeta.data("valor") === segundaTarjeta.data("valor")) {
        primeraTarjeta = null;
        segundaTarjeta = null;
        verificarVictoria();
      } else {
        setTimeout(function () {
          primeraTarjeta
            .addClass("oculta")
            .removeClass(primeraTarjeta.data("valor"));
          segundaTarjeta
            .addClass("oculta")
            .removeClass(segundaTarjeta.data("valor"));
          primeraTarjeta = null;
          segundaTarjeta = null;
        }, 1000);
      }
    }
  });
});

function verificarVictoria() {
  if ($(".tarjeta.oculta").length === 0) {
    $("#titulo").text("🏆 ¡Ganaste! 🏆");
    $("#subtitulo").text("Encontraste todos los pares");
    $("#reiniciar").text("Volver a jugar");
  }
}

function mezclarYReiniciar() {
  let valores = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "H",
    "H",
    "I",
    "I",
  ];
  valores = valores.sort(() => Math.random() - 0.5);

  $(".tarjeta").each(function (index) {
    $(this)
      .removeClass()
      .addClass("tarjeta oculta")
      .data("valor", valores[index]);
  });

  $("#titulo").text("Encontrá los pares");
  $("#subtitulo").text(
    "En este juego, tenés que lograr encontrar todos los pares de las 9 figuras ocultas. ¡Dale click a las tarjetas para descubrir lo que esconden!"
  );
  $("#reiniciar").text("Mezclar cartas");
}
