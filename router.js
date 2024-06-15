const pageMaps = {
  home: "home/index.html",
  game1: "games/game1/index.html",
  game2: "games/game2/index.html",
  game3: "games/game3/index.html",
  game4: "games/game4/index.html",
  game5: "games/game5/index.html",
  group: "group/index.html",
  games: "games/index.html",
  progress: 'progress/index.html',
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
