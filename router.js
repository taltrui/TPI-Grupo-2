import $ from "jquery";

const pageMaps = {
  home: "src/Home/index.html",
  game1: "src/Games/Game1/index.html",
  game2: "src/Games/Game2/index.html",
  game3: "src/Games/Game3/index.html",
  game4: "src/Games/Game4/index.html",
  game5: "src/Games/Game5/index.html",
  group: "src/Group/index.html",
  games: "src/Games/index.html",
  progress: 'src/Progress/index.html',
};

$(function () {
  function loadContent(path) {
    const page = path.substring(1) ? path.substring(1) : "home";
    $("#content").load(
      pageMaps[page] ?? "src/Home/index.html",
      function (response, status, xhr) {
        if (status === "error") {
          $("#content").html("<h2>Page not found</h2>");
        }
      }
    );
  }

  loadContent(window.location.pathname);
});
