var callback = function () {
  var headerTop = document.getElementsByClassName("header-top")[0];
  var menuTrigger = headerTop.getElementsByClassName("menu-trigger")[0];
  var mainMenu = document.getElementsByClassName("main-menu")[0];
  menuTrigger.addEventListener("click", function () {
    if (mainMenu.style.getPropertyValue("display") === "block") {
      mainMenu.style.setProperty("display", "none")
    } else {
      mainMenu.style.setProperty("display", "block")
    }
  })
}
if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback()
} else {
  document.addEventListener("DOMContentLoaded", callback)
}
