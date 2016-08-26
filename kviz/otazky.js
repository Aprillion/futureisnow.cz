// Odsroluj na element ve strance
var scrollToElement = function(element){  
  $('html, body').animate({
   scrollTop: $(element).offset().top
  }, 1000)
  return false
}


// Po nacteni stranky udelej
$(function(){
  var sablona = $('#sablona')
  var uspesnostElement = $('#uspesnost')
  var pocetOdpovediElement = $('#pocetOdpovedi')
  var spravneOdpovediElement = $('#spravneOdpovedi')  
  var oblast = $('.otazky')
  var pocetOtazek = otazky.length
  var uspesnost = 0
  
  // Použij šablonu otázky a vytvoř je z dat
  otazky.forEach(function(otazka, index){    
    var otazkaElement = sablona.clone() // zkopíruj šablonu otázky
    otazkaElement.removeClass('sablona')
    otazkaElement.attr('id', 'otazka' + (index + 1))    
    otazkaElement.data('odpoved', otazka.odpoved) // vyplň správnou odpověď
    otazkaElement.find('.otazka-nadpis').text(otazka.nadpis)
    otazkaElement.find('.otazka-text').text(otazka.otazka)
    otazkaElement.find('.otazka-popis').text(otazka.popis)
    otazkaElement.find('.otazka-img-otazka').attr('src', otazka.imgOtazka)
    if (otazka.imgOdpoved) {
      otazkaElement.find('.otazka-img-odpoved').attr('src', otazka.imgOdpoved)
    }
    
    
    if(index < pocetOtazek - 1) {
      otazkaElement.find('.otazka-dalsi').click(function(){
        scrollToElement('#otazka' + (index + 2))
      })    
    } else {
      otazkaElement.find('.otazka-dalsi').click(function(){
        scrollToElement('#skore')
      })
      otazkaElement.find('span').text('Přejít na shrnutí')    
    }
    
    oblast.append(otazkaElement) // přidej otázku do stárnky    
  })
  
  // Po kliknutí na tlačítko v otázce
  $(document).on('click', '.otazka-tlacitka button', function(e){
    e.preventDefault()
    var otazka = $(this).closest('.otazka')
    var spravnaOdpoved = otazka.data('odpoved')
    var odpoved = $(this).text().trim()
        
    // vyhodnoť, jestli je otázka odpovězena správně nebo chybně
    if (spravnaOdpoved == odpoved) {
      otazka.addClass('uspech')
      uspesnost++
    } else {
      otazka.addClass('neuspech')
    }
    
    uspesnostElement.text(Math.round(uspesnost / pocetOtazek * 100) + '%')
    pocetOdpovediElement.text(pocetOtazek)
    spravneOdpovediElement.text(uspesnost)
  })
  

})