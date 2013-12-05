//JavaScript

if(console) console.log("TWeb TP2 Pronto.");

if(!window.jQuery) throw "jQuery não Encontrado!";

$('#main-nav li').click(function(){
	// quando digo seleccionar/deseleccionar
	// quero dizer adicionar/remover a classe 'selected'
	
	// this é o <li> do menu 
	$(this)
		// selecciona o seu parente
		.addClass('selected')
		// deseleciona o seu irmão selecionado 
		.siblings().removeClass('selected');
	
	// deseleciona a secção activa
	$('#content section.selected').removeClass('selected');
	
	// seleciona a secção pedida
	var id = $(this).find('a').attr('href');
	$(id).addClass('selected');
});

