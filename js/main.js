	let mainRow = $('#mainRow');
	let template = $('[type="template"]').html();
	let rg = new RegExp("{{productTitle}}",'gi');

$.ajax(
{
	url : "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
	dataType : "json"
}
)
.done(startApp)

function startApp(data) {

	render(data);

	$('[data-col]').on('click',function () {
		event.preventDefault();
		let dataCol = $(this).data('col');
		let collection = data.filter(function (e) {
			return e.colection == dataCol || e[dataCol]
		})
		render(collection);
	})

	$('[href="detailed.html"]').on('click',function (e) {
		e.preventDefault();
		let src = $(this).find('img').attr('src');
		localStorage.src = src;
		location.assign("detailed.html")
	})
}


function render(collection) {
		let text = "";
		for (var i = 0; i < collection.length; i++) {
		text += template.replace('{{imgSrc}}',collection[i].imgSrc)
						.replace(rg,collection[i].productTitle)
						.replace('{{model}}',collection[i].model)
						.replace('{{price}}',collection[i].price)
	}
	mainRow.html(text);
}





















$(".back-to-top").click(function () {
  $("html, body").animate({scrollTop: 0}, 1000);
});
