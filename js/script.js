//объявление массива с классами разных имен карт
let arrCards = ['joker','joker','ace','ace','king','king','queen','queen', 'jack','jack'];

$(document).ready(function() {

      if (shuffleСards()) {
         openAllcards(); 
      }

      var gameStatus = 'waiting';
      // waiting - ожидани начала игры 
      // Флаг статуса игры:
      // playing - идет игра,
      // finished - игра завершена,
      // victory - победа

      $("#start-finish").click(function() {
         //Старт игры
         if (gameStatus != undefined && gameStatus != 'playing') {
            closeAllcars();
            shuffleСards();
            gameStatus = 'playing';
            openModal("#start");
            $("#start-finish").html("FINISH");
            return false;
         }

         //Завершение игры по требованию пользователя
         if (gameStatus == 'playing') {
            openAllcards();
            gameStatus = 'finished';
            openModal("#finish");
            $("#start-finish").html("START");
            return false;
         }
      });

      var arrOpenedCards = [];

        $("img").click(function openCard() {

            //выходим из функции если игра не запущена
            if (gameStatus != "playing") {
                return true;
            }

            //запрет клика на карту из успешно найденной пары карт
            if (cardName == "freezed") {
                return true;
            }

            //запрет открытия более 2-х карт одновременно
            if ($(".opened").length >= 2) {
               return true;
            }

            //выходим из функции если успешно найдены все пары карт и устанавливаем gameStatus = 'victory';
            if ($(".freezed").length >= 8) {
               gameStatus = 'victory';
               openAllcards();
               $("#start-finish").html("PLAY AGAIN");
               openModal("#win");
               return true;
            }

            var cardName = $(this).attr("class");

            $(this).attr("src", "img/"+cardName+".jpg").addClass("opened");
            arrOpenedCards.push(cardName);

            if (arrOpenedCards.length >= 2) {

                    if (arrOpenedCards[0] == arrOpenedCards[1]) {
                        $("img.opened").attr("class", "freezed");
                        arrOpenedCards = [];
                        return false;
                    } else {

                        setTimeout(function() {
                           if (gameStatus != 'finished') {
                              $("img.opened").attr("src", "img/back.jpg").removeClass("opened");
                           }
                        }, 2000);
                        arrOpenedCards = [];
                        return false;
                    }     
            }
    });
});
