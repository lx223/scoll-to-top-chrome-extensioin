(function(window){
  console.log("content script...");
  var pos = (document.documentElement || document.body.parentNode || document.body).scrollTop;
  window.scrollTo(pos, 0);
})(window);
