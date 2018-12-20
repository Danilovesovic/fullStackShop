let src = localStorage.src.split('/').pop().split('.').shift();
let template = $('[type="template"]').html();
let secondTemplate = $('[type="secondTemplate"]').html();
let rg = new RegExp("{{productTitle}}",'gi');
console.log(template)
$.ajax(
{
	url : "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
	dataType : "json"
}
)
.done(startDetailed)

function startDetailed(res) {
	

	let product = res.filter(function (e) {
		return e.imgSrc == src;
	})

	renderRandom(res,product[0].colection)
	render(product[0])
	
}

function render(product) {
	let text = "";
		
		text += template.replace('{{imgSrc}}',product.imgSrc)
						.replace(rg,product.productTitle)
						.replace('{{model}}',product.model)
						.replace('{{price}}',product.price);
		$('.products-section').prepend(text)
}

function renderRandom(res,col) {
	let mainCollection;
	if(col == "female"){
		mainCollection = res.filter(function (el) {
			return el.colection == "female"
		})
	}else{
		mainCollection = res.filter(function (el) {
			return el.colection == "male"
		})
	}
	let randProducts = [];
	for (var i = 0; i < 4; i++) {
		let rand = Math.floor(Math.random()*mainCollection.length);
		randProducts.push(mainCollection[rand]);
		mainCollection.splice(rand,1);
	}
	let text ="";
	for (var i = 0; i < randProducts.length; i++) {
		text += secondTemplate.replace('{{imgSrc}}',randProducts[i].imgSrc)
						.replace(rg,randProducts[i].productTitle)
						.replace('{{model}}',randProducts[i].model)
						.replace('{{price}}',randProducts[i].price);
	}
	$('.products-section').html(text)
}