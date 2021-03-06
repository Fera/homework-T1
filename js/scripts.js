(function($, window, document, undefined) {

   $(document).ready(function() {

        // T01Z02 - tydzien 1, zadanie 2

        var allDivGrid = $("div.grid.grid-12"); // wszystkie elementy mające zarówno klasę grid i grid-12
 
        var externalLinks = $(".nav a[href^='http']"); // wszystkie linki kierujące na zewnątrz zawierające się w elemencie o klasie nav

        var notChecked = $("input:checkbox, input:radio").not(":checked"); // wszystkie elementy input type checkbox i radiobutton, które nie są zaznaczone

        var firsPWithoutChild = $("div#text p:empty:first"); // wszystkie pierwsze paragrafy nie mające dzieci (nie będące rodzicami) zawierające się w divie z identyfikatorem text

        // var firstPWithoutChild = $("div#text p:first").not(:parent); - to inny sposob osiągnięcia tego samego efektu co wyżej

        var paginationItemNotSpan = $(".pagination-item").not("span"); // wszystkie elementy z podaną klasą nie będące spanami

        //allDivGrid.hl();       


        //T01Z03 - tydzien 1, zadanie 3
        
        // menu rozwijane
        
        $(".menu-btn").on("click", function(){ 

            $(".nav").stop().toggle("slow", "linear");

        }); 

        //T01Z04 - tydzien 1, zadanie 4
        
        var form = $("#name-form");
            field = $(form).find("input#name"); // zmienna zwracająca input name 
            button = $("button.add-btn");

        $(button).on("click", function(){ 

            // wyłączenie natywnej funkcji buttona - zastąpiłam je przez type="button" w index.html
                                               
            
            if( $.trim(field.val()) === "" ) { // metoda .trim usuwa białe znaki z przodu i z tyłu, sprawdzenie czy pole input id="name" jest puste
                
            // jeśli jest - nic się nie dzieje
            }

            else {
                
                // jeśli nie jest - zostaje wstawiona jego zawartość do ul jako kolejny punkt na liście
                
                //zmienna zwracająca element listy z zawartością treści wpisanej w pole input
                var listElement = $("<li></li>", {

                    text: $(field).val()

                });                           
                
                // $("ul.name-list").append(listElement); // utworzenie listy
                
                listElement.fadeIn(500).appendTo(".name-list");
                
            }

            $(field).val(''); //czyści input po kliknięciu 
            
        });  

        //T1Z05 - tydzien 1, zadanie 5
        
        var button = $(".button"); // zmienna odnosząca do elementu o podanej klasie
            output = $("#output"); // zmienna odnosząca do elementu o podanym id
            btnclear = $(".clear"); // zmienn odnosząca do elementu o podanej klasie

        $(output).hide();

        button.on("click", function() { // po kliknięciu

            var that = $(this);

            $.ajax({ // korzystamy z metody ajax
                url: "https://jsonplaceholder.typicode.com/users", //wysyłamy zapytanie pod podany url
                method: "GET", // metodą GET
                dataType: "JSON", // wymuszamy zwrot danych jako text 
               
                success: function(response){ // w razie sukcesu ma zadziałać taka funkcja

                    console.log(response);     

                    // $.each(response, function(i,value){ // weź wszystkie odpowiedzi wg indexu i wartości

                    //     var name = '<span class="name">' + value.name + '</span>';
                    //     var username = '<span class="username">' + value.username + '</span>';
                    //     var phone = '<span class="phone">' + value.phone + '</span>';
                    //     var email = '<span class="email">' + value.email + '</span>';

                    //     $("<li></li>",{ // stwórz obiekt li
                    //         "id":value.id, // nadaj mu id o wartości id z danych
                    //         // "text": value.name + ', ' + value.username + ', ' + value.phone + ', ' + value.email // wstaw do niego wymienione wartości danych
                    //     }).append(name, username, phone, email).appendTo(output); // to wszystko wstaw do środka elementu output

                    // });  
                    
                    // to samo co wyżej ale metodą .map
                    

                    $.map(response, function(val, i){
                        var name = '<span class="name">' + val.name + '</span>',
                            username = '<span class="username">' + val.username + '</span>',
                            phone = '<span class="phone">' + val.phone + '</span>',
                            email = '<span class="email">' + val.email + '</span>',
                            
                            data = name + username + phone + email;

                        if ($(name, username, phone, email) === ''){

                            return 'nie podano';
                        }

                        $("<li>").append(data).appendTo(output);
                    });            
                    
                   
                    

                    $(output).fadeIn(500, 'linear');  // pokaż output
                    that.attr('disabled', true).text("DANE POBRANO"); // wyłącz przycisk pobierania danych i zmień mu text              

                },

                error: function(errorThrown) { // w razie błędu ma się to zadziać
                    $(output).fadeIn(500, 'linear').html("<li class='error'>Przepraszamy, wystąpił błąd</li>"); // pojawi się pozycja na liście z informacją o błędzie
                    that.text("SPRÓBUJ JESZCZE RAZ"); // zmien tekst buttona
                }
            });         
        });

        // czyszczenie listy po kliknięciu na button clear i włączenie przycisku pobierania danych

        $(btnclear).on("click", function(){
            $(output).empty().fadeOut(500, 'linear');
            $(button).attr('disabled', false).text("POBIERZ DANE");
        });

    });
})(jQuery, window, document);
