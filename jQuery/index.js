// Common methods

$('h1').css('color', 'red');

$('button').click(function() { $('h1').css('color', 'purple'); });
$('h1').text('Bye!');

$('button').html("Don't Click Me!");

$('img').attr("src");

$("a").attr("href", "https://www.google.com");

$(document).keypress(function(event) {
    $('h1').text(event.key);a
});

$('h1').on('mouseover', function () { $('h1').animate({opacity: '0.5'}); });