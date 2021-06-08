function openAllcards() {
    $('img').each(function(){
       var cardName = $(this).attr('class').split(' ')[0];
       if (cardName != 'freezed') {
          $(this).attr("src", "img/"+cardName+".jpg");
       }
   });  
 }
 
 function closeAllcars() {
    $("img").attr("src", "img/back.jpg");
 }
 
 function makeRandomArr(a, b) {
    return Math.random() - 0.5;
 }
 
 function findCardPositions(arrCards, cardName) {
    let index1 = arrCards.findIndex(rank => rank === cardName);
    let index2 = arrCards.findIndex(
       (rank, index) => rank === cardName && index > index1
    );
 
    return [index1, index2];
 }
 
 function shuffleСards() {
    arrCards.sort(makeRandomArr);
    assignPairCards('joker');
    assignPairCards('ace');
    assignPairCards('king');
    assignPairCards('queen');
    assignPairCards('jack');
    return true;
 }
 
 function assignPairCards(cardName) {
    var positions = findCardPositions(arrCards, cardName);
    assignCardClass(positions[0], cardName);
    assignCardClass(positions[1], cardName);
 }
 
 function assignCardClass(position, cardName) {
        $("img:eq("+position+")").attr('class', cardName);
 }

 function openModal(modalId) {
   location.href = modalId;

   setTimeout(function() {
      location.href = "#close";
   }, 1000);
}