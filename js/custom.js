$(document).ready(function() {
  const names = $(".bottom-name, .top-name, .c-name, .e-name");
  const navBar = $("nav");

  $('nav a').on('click', function (e) {
    e.preventDefault();

  
    var targetSectionId = $(this).attr('href');

    var targetPosition = $(targetSectionId).offset().top;

    $('html, body').animate({ scrollTop: targetPosition }, 1000);
  });

  function velocityPromise(element, animation, options) {
    return new Promise((resolve) => {
      element.velocity(animation, Object.assign(options, { complete: resolve }));
    });
  }
  function animateNames() {
    velocityPromise($("#curtain"), "transition.fadeOut", { duration: 2000 })
      .then(function() {
        const animations = [
          velocityPromise($(".bottom-name"), "transition.slideUpIn", {duration:3000}),
          velocityPromise($(".top-name"), "transition.slideDownIn", {duration:3000}),
          // velocityPromise($("#projects h1"), "transition.fadeIn", {duration:3000}),
        ];
        return Promise.all(animations);
      })
      .then(function() {
        const animations = [
          velocityPromise($(".bottom-name"), "transition.slideDownOut", {}),
          velocityPromise($(".top-name"), "transition.slideUpOut", {}),
        ];
        return Promise.all(animations);
      })
      .then(function() {
        const animations = [
          velocityPromise($(".c-name"), "transition.slideDownIn", {duration:3000}),
          velocityPromise($(".e-name"), "transition.slideUpIn", {duration:3000}),
        ];
        return Promise.all(animations);
      })
.then(function() {
  const animations = [
    velocityPromise($(".c-name"), "transition.slideUpOut", {}),
    velocityPromise($(".e-name"), "transition.slideDownOut", {}),
  ];
  return Promise.all(animations);
})
.then(function() {
  names.css({ display: 'none' });
  $("#curtain").css({ display: 'none' }); // add this line
  navBar.velocity("transition.fadeIn");
});

  }

  animateNames();
});
