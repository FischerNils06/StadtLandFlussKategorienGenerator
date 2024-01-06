document.addEventListener('DOMContentLoaded', () => {
    const category_btn = document.getElementById('category-btn');
    const categories = document.getElementById('categories');
    const number_input = document.getElementById('number');
    const minprobabilities_input = document.getElementById('lowest');
    let number;
    let minprobabilities;
    number_input.addEventListener('input', () => {
       checkvars(number_input)   
    });
    minprobabilities_input.addEventListener('input', () => {
        checkvars(minprobabilities_input)
    });

   

    category_btn.addEventListener('click', () => {
        number = declarevars(number, number_input);
        minprobabilities = declarevars(minprobabilities, minprobabilities_input);

        let categorys = chooseCategorys(catergory_list, number);
        categories.innerHTML = '';
        categorys.forEach(category => {
            let category_div = document.createElement('div');
            category_div.classList.add('category');
            category_div.innerText = category.name;
            categories.appendChild(category_div);
        });

    });


    function chooseCategorys (category_list, number) {
        let categorys = [];
        let excluded = [];
        for (let i = 0; i < number; i++) {
            let random = Math.floor(Math.random() * category_list.length);
            
            if (categorys.includes(category_list[random])) {
                console.log("already in list")
                i--;
            } else {
                cat = category_list[random];
                probability = cat.probabilities/20;
                randomnumber = Math.random()*100;

                cat2 = cat;
                console.log(cat.name, probability, randomnumber)
                let parentList = [];
                let iNumber = false;
                let nineNumber = Math.random()*100;
                if (i == 9 && nineNumber > 20){
                    iNumber = true;
                }
                let eightnumber = Math.random()*100;
                
                if (i == 8 && eightnumber > 66){
                    iNumber = true;
                    console.log(eightnumber, "eight")
                }

                if (probability > randomnumber && !excluded.includes(cat.id) && (probability >= minprobabilities || iNumber)) {
                    while (cat2.parent != null) {
                        console.log(cat2.id)
                            cat2 = category_list.find(element => element.id == cat2.parent);
                            console.log(cat2.id)
                            if (!excluded.includes(cat2.id)) {
                                excluded.push(cat2.id);
                            }
                            
                            console.log(excluded)
                       }
                       console.log(cat)
                       cat3 = cat;

                       for (let i = 1; i < category_list.length; i++) {
                        let element = category_list[i];
                        let elp = element.parent;
                        console.log(elp)
                        if (elp == cat3.id) {
                             if (!excluded.includes(element.id)) {
                                  excluded.push(element.id);
                                  console.log(excluded, "ex")
                             }
                             if (!parentList.includes(element.id)) {
                                 parentList.push(element.id);
                                 console.log(parentList, "pl")
                             }
                            }
                        }
                         while (parentList.length > 0) {
                            console.log(parentList, "while")
                            let newParentList = [];
                             for (let i = 1; i < category_list.length; i++) {
                                console.log("for")
                                let element = category_list[i];
                                console.log(element.parent)
                                 if (parentList.includes(element.parent)) {
                                     if (!excluded.includes(element.id)) {
                                        excluded.push(element.id);
                                        console.log(excluded, "ex2")
                                     }
                                    if (!newParentList.includes(element.id)) {
                                        newParentList.push(element.id);
                                        console.log(newParentList, "pl2")
                                    } 
                                 }
                            }
                            parentList = newParentList;
                            console.log(parentList, "pl3")
                                
                        }
                        categorys.push(cat);
                } else {
                    i--;
                }
                
            }

        }
        console.log(categorys)
        return categorys;
    
    }

    function checkvars(input) {
        let minValue = parseFloat(input.min);
        let maxValue = parseFloat(input.max);
        let currentValue = parseFloat(input.value);

        if (currentValue > maxValue) {
            input.value = maxValue;
        }

        if (currentValue < minValue) {
            input.value = minValue;
        }

        input.value = input.value.replace(/[^0-9]/g, '');
    }

    function declarevars (variable, input) {
        let value = parseFloat(input.value);
        let min = parseFloat(input.min);
        let max = parseFloat(input.max);
        console.log(value, min, max, variable)
        if (value == null || value == undefined || value == "") {
            variable = min;
            console.log("min", variable)
        }
        if (value > max) {
            variable = max;
            console.log("max", variable)
        }
        if (value < min) {
            variable = min;
            console.log("min", variable)
        }
        if (value >= min && value <= max) {
            variable = value;
            console.log("value", variable)
        }


        return variable;
    }

    const catergory_list = 
        [
            {'name': 'Kategorie', 'id': '0', 'probabilities': '0', 'parent': null},
            {'name': 'Geografischer Ort', 'id': '1', 'probabilities': '1000', 'parent': '0'},
            {'name': 'Ortschaft', 'id': '11', 'probabilities': '900' , 'parent': '1'},
            {'name': 'Stadt', 'id': '111', 'probabilities': '400' , 'parent': '11'},
            {'name': 'Dorf', 'id': '112', 'probabilities': '200' , 'parent': '11'},
            {'name': 'Land', 'id': '12', 'probabilities': '50' , 'parent': '1'},
            {'name': 'Kontinent', 'id': '121', 'probabilities': '50' , 'parent': '12'},
            {'name': 'Heutiges Land', 'id': '122', 'probabilities': '900' , 'parent': '12'},
            {'name': 'Historischer Staat', 'id': '123', 'probabilities': '550' , 'parent': '12'},
            {'name': 'Landkreis', 'id': '122', 'probabilities': '50' , 'parent': '12'},
            {'name': 'Gewässer', 'id': '13', 'probabilities': '550' , 'parent': '1'},
            {'name': 'Fluss', 'id': '131', 'probabilities': '200' , 'parent': '13'},
            {'name': 'See', 'id': '132', 'probabilities': '200' , 'parent': '13'},
            {'name': 'Berg/Gebirge', 'id': '14', 'probabilities': '200' , 'parent': '1'},
            {'name': 'Berg', 'id': '141', 'probabilities': '100' , 'parent': '14'},
            {'name': 'Gebirge', 'id': '142', 'probabilities': '100' , 'parent': '14'},
            {'name': 'Insel', 'id': '15', 'probabilities': '350' , 'parent': '1'},
            {'name': 'Bundesland/Region/Staat usw.', 'id': '16', 'probabilities': '550' , 'parent': '1'},
            {'name': 'Im Weltall', 'id': '17', 'probabilities': '550' , 'parent': '1'},
            {'name': 'Menschengemachtes Objekt im Weltall', 'id': '171', 'probabilities': '100' , 'parent': '17'},
            {'name': 'Stern', 'id': '172', 'probabilities': '80' , 'parent': '17'},
            {'name': 'Sternbild', 'id': '1721', 'probabilities': '80' , 'parent': '172'},
            {'name': 'Planet', 'id': '173', 'probabilities': '120' , 'parent': '17'},
            {'name': 'fiktiver Ort', 'id': '18', 'probabilities': '200' , 'parent': '1'},
            {'name': 'Fiktive Stadt/Dorf/Land', 'id': '181', 'probabilities': '600' , 'parent': '18'},


            {'name': 'Person', 'id': '2', 'probabilities': '0' , 'parent': '0'},
            {'name': 'Promi', 'id': '21', 'probabilities': '1000' , 'parent': '2'},
            {'name': 'Politiker', 'id': '211', 'probabilities': '200' , 'parent': '21'},
            {'name': 'Schauspieler', 'id': '212', 'probabilities': '100' , 'parent': '21'},
            {'name': 'Musiker', 'id': '213', 'probabilities': '300' , 'parent': '21'},
            {'name': 'Rapper', 'id': '2131', 'probabilities': '200' , 'parent': '213'},
            {'name': 'DJ', 'id': '2132', 'probabilities': '190' , 'parent': '213'},
            {'name': 'Sportler', 'id': '214', 'probabilities': '300' , 'parent': '21'},
            {'name': 'Jetziger Sportler', 'id': '2141', 'probabilities': '220' , 'parent': '214'},
            {'name': 'Ehemaliger Sportler', 'id': '2142', 'probabilities': '50' , 'parent': '214'},
            {'name': 'Trainer', 'id': '2143', 'probabilities': '50' , 'parent': '214'},
            {'name': 'Wissenschaftler', 'id': '215', 'probabilities': '70' , 'parent': '21'},
            {'name': 'Künstler', 'id': '216', 'probabilities': '130' , 'parent': '21'},
            {'name': 'Historische Person', 'id': '217', 'probabilities': '590' , 'parent': '21'},
            {'name': 'Social-Media-Person', 'id': '218', 'probabilities': '500' , 'parent': '21'},
            {'name': 'Name', 'id': '22', 'probabilities': '1250' , 'parent': '2'},
            {'name': 'Vorname', 'id': '221', 'probabilities': '810' , 'parent': '22'},
            {'name': 'Jungenname', 'id': '2211', 'probabilities': '800' , 'parent': '221'},
            {'name': 'Mädchennamen', 'id': '2212', 'probabilities': '800' , 'parent': '221'},
            {'name': 'Unisexname', 'id': '2213', 'probabilities': '590' , 'parent': '221'},
            {'name': 'Nachname', 'id': '222', 'probabilities': '780' , 'parent': '22'},
            {'name': 'Künstlername', 'id': '223', 'probabilities': '520' , 'parent': '22'},
            {'name': 'Spitzname', 'id': '224', 'probabilities': '400' , 'parent': '22'},
            {'name': 'fiktive Person', 'id': '23', 'probabilities': '900' , 'parent': '2'},
            {'name': 'Buch/Comicfigur', 'id': '231', 'probabilities': '440' , 'parent': '23'},
            {'name': 'Comicfigur', 'id': '2311', 'probabilities': '200' , 'parent': '231'},
            {'name': 'Buchfigur', 'id': '2312', 'probabilities': '430' , 'parent': '231'},
            {'name': 'Film/Serienfigur', 'id': '232', 'probabilities': '700' , 'parent': '23'},
            {'name': 'Serienfigur', 'id': '2321', 'probabilities': '400' , 'parent': '232'},
            {'name': 'Filmfigur', 'id': '2322', 'probabilities': '600' , 'parent': '232'},
            {'name': 'Computerspiel-Figur', 'id': '233', 'probabilities': '440' , 'parent': '23'},
            {'name': 'Beruf', 'id': '24', 'probabilities': '630' , 'parent': '2'},
            {'name': 'Berufsfeld', 'id': '241', 'probabilities': '90' , 'parent': '24'},
            {'name': 'Verwandschaftbezeichnungen', 'id': '25', 'probabilities': '50' , 'parent': '2'},


            {'name': 'Lebewesen', 'id': '3', 'probabilities': '430' , 'parent': '0'},
            {'name': 'Tier', 'id': '31', 'probabilities': '990' , 'parent': '3'},
            {'name': 'Säugetier', 'id': '311', 'probabilities': '830' , 'parent': '31'},
            {'name': 'Vogel', 'id': '312', 'probabilities': '300' , 'parent': '31'},
            {'name': 'Fisch', 'id': '313', 'probabilities': '300' , 'parent': '31'},
            {'name': 'Reptil', 'id': '314', 'probabilities': '300' , 'parent': '31'},
            {'name': 'Amphibie', 'id': '315', 'probabilities': '200' , 'parent': '31'},
            {'name': 'Insekt', 'id': '316', 'probabilities': '280' , 'parent': '31'},
            {'name': 'Wirbelloses Tier', 'id': '317', 'probabilities': '180' , 'parent': '31'},
            {'name': 'Fabelwesen', 'id': '318', 'probabilities': '600' , 'parent': '31'},
            {'name': 'Ausgestorbenes Tier', 'id': '319', 'probabilities': '600' , 'parent': '31'},
            {'name': 'Pflanze', 'id': '32', 'probabilities': '710' , 'parent': '3'},
            {'name': 'Baum', 'id': '321', 'probabilities': '440' , 'parent': '32'},
            {'name': 'Blume', 'id': '322', 'probabilities': '215' , 'parent': '32'},
            {'name': 'Pilz', 'id': '33', 'probabilities': '440' , 'parent': '3'},


            {'name': 'Gegenstand', 'id': '4', 'probabilities': '110' , 'parent': '0'},
            {'name': 'Im Haushalt', 'id': '41', 'probabilities': '590' , 'parent': '4'},
            {'name': 'Möbel', 'id': '411', 'probabilities': '330' , 'parent': '41'},
            {'name': 'Küchenutensil', 'id': '412', 'probabilities': '310' , 'parent': '41'},
            {'name': 'Spielzeug', 'id': '413', 'probabilities': '410' , 'parent': '41'},
            {'name': 'Werkzeug', 'id': '414', 'probabilities': '310' , 'parent': '41'},
            {'name': 'Kleidung', 'id': '415', 'probabilities': '510' , 'parent': '41'},
            {'name': 'Im Büro', 'id': '416', 'probabilities': '360' , 'parent': '41'},
            {'name': 'Im Garten', 'id': '417', 'probabilities': '360' , 'parent': '41'},
            {'name': 'Im Bad', 'id': '418', 'probabilities': '350' , 'parent': '41'},
            {'name': 'Fahrzeug', 'id': '42', 'probabilities': '480' , 'parent': '4'},
            {'name': 'Gebäude', 'id': '43', 'probabilities': '210' , 'parent': '4'},
            {'name': 'Körperteil', 'id': '44', 'probabilities': '500' , 'parent': '4'},
            {'name': 'Elektronisches', 'id': '45', 'probabilities': '500' , 'parent': '4'},
            {'name': 'Lebensmittel', 'id': '46', 'probabilities': '1100' , 'parent': '4'},
            {'name': 'Essen', 'id': '461', 'probabilities': '800' , 'parent': '46'},
            {'name': 'Süßigkeit', 'id': '4611', 'probabilities': '500' , 'parent': '461'},
            {'name': 'Essbare Pflanze', 'id': '4612', 'probabilities': '490' , 'parent': '461'},
            {'name': 'Obst', 'id': '46121', 'probabilities': '500' , 'parent': '4612'},
            {'name': 'Gemüse', 'id': '46122', 'probabilities': '500' , 'parent': '4612'},
            {'name': 'Fleisch', 'id': '4613', 'probabilities': '390' , 'parent': '461'},
            {'name': 'Getreide', 'id': '4614', 'probabilities': '330' , 'parent': '461'},
            {'name': 'Gewürz', 'id': '4615', 'probabilities': '330' , 'parent': '461'},
            {'name': 'Getränk', 'id': '462', 'probabilities': '770' , 'parent': '46'},
            {'name': 'Alkoholisches Getränk', 'id': '4621', 'probabilities': '400' , 'parent': '462'},
            {'name': 'Bier', 'id': '46211', 'probabilities': '130' , 'parent': '4621'},
            {'name': 'Cocktail', 'id': '46212', 'probabilities': '110' , 'parent': '4621'},
            {'name': 'Nichtalkoholisches Getränk', 'id': '4622', 'probabilities': '650' , 'parent': '462'},
            {'name': 'Koffeinhaltiges Getränk', 'id': '46221', 'probabilities': '450' , 'parent': '4622'},
            {'name': 'Kaffee', 'id': '462211', 'probabilities': '110' , 'parent': '46221'},
            {'name': 'Tee', 'id': '462212', 'probabilities': '230' , 'parent': '46221'},
            {'name': 'Energy Drink', 'id': '46222', 'probabilities': '180' , 'parent': '4622'},
            {'name': 'Milchprodukt', 'id': '463', 'probabilities': '570' , 'parent': '46'},
            {'name': 'Käse', 'id': '4631', 'probabilities': '300' , 'parent': '463'},
            {'name': 'Joghurt', 'id': '4632', 'probabilities': '330' , 'parent': '463'},
            {'name': 'Eis', 'id': '4633', 'probabilities': '360' , 'parent': '463'},
            {'name': 'Medikament/Droge', 'id': '464', 'probabilities': '410' , 'parent': '46'},
            {'name': 'Medikament', 'id': '4641', 'probabilities': '290' , 'parent': '464'},
            {'name': 'Droge', 'id': '4642', 'probabilities': '310' , 'parent': '464'},
            {'name': 'legale Droge', 'id': '46421', 'probabilities': '80' , 'parent': '4642'},
            {'name': 'illegale Droge', 'id': '46422', 'probabilities': '80' , 'parent': '4642'},
            {'name': 'Material', 'id': '47', 'probabilities': '490' , 'parent': '4'},
            {'name': 'Holz', 'id': '471', 'probabilities': '380' , 'parent': '47'},
            {'name': 'Metall', 'id': '472', 'probabilities': '380' , 'parent': '47'},
            {'name': 'Kunststoff', 'id': '473', 'probabilities': '100' , 'parent': '47'},
            {'name': 'Chemisches Element', 'id': '474', 'probabilities': '380' , 'parent': '47'},
            {'name': 'Stein', 'id': '475', 'probabilities': '450' , 'parent': '47'},
            {'name': 'Sportart', 'id': '48', 'probabilities': '500' , 'parent': '4'},
            {'name': 'Ballsport', 'id': '481', 'probabilities': '330' , 'parent': '48'},
            {'name': 'Wassersport', 'id': '482', 'probabilities': '310' , 'parent': '48'},
            {'name': 'Kampfsport', 'id': '483', 'probabilities': '250' , 'parent': '48'},
            {'name': 'Winter-/Schneesport', 'id': '484', 'probabilities': '320' , 'parent': '48'},
            {'name': 'Motorsport', 'id': '485', 'probabilities': '290' , 'parent': '48'},
            {'name': 'Denksport', 'id': '486', 'probabilities': '290' , 'parent': '48'},
            

            {'name': 'Medien', 'id': '5', 'probabilities': '70' , 'parent': '0'},
            {'name': 'Film/Buch/Serie', 'id': '51', 'probabilities': '1090' , 'parent': '5'},
            {'name': 'Film', 'id': '511', 'probabilities': '500' , 'parent': '51'},
            {'name': 'Buch', 'id': '512', 'probabilities': '600' , 'parent': '51'},
            {'name': 'Roman', 'id': '5121', 'probabilities': '340' , 'parent': '512'},
            {'name': 'Kinderbuch', 'id': '5122', 'probabilities': '340' , 'parent': '512'},
            {'name': 'Comic', 'id': '5123', 'probabilities': '330' , 'parent': '512'},
            {'name': 'Sachbuch', 'id': '5124', 'probabilities': '340' , 'parent': '512'},
            {'name': 'Serie', 'id': '513', 'probabilities': '410' , 'parent': '51'},
            {'name': 'Etwas aus Film/Buch/Serie', 'id': '514', 'probabilities': '0' , 'parent': '51'},
            {'name': 'Etwas aus Harry Potter', 'id': '5141', 'probabilities': '210' , 'parent': '514'},
            {'name': 'Etwas aus Herr der Ringe/Hobbit', 'id': '5142', 'probabilities': '210' , 'parent': '514'},
            {'name': 'Etwas aus Star Wars', 'id': '5143', 'probabilities': '220' , 'parent': '514'},
            {'name': 'Etwas aus James Bond', 'id': '5144', 'probabilities': '150' , 'parent': '514'},
            {'name': 'Etwas aus Marvel', 'id': '5145', 'probabilities': '220' , 'parent': '514'},
            {'name': 'Etwas aus DC', 'id': '5146', 'probabilities': '200' , 'parent': '514'},
            {'name': 'Etwas aus Disney/Pixar (ohne Marvel/Starwars)', 'id': '5147', 'probabilities': '230' , 'parent': '514'},
            {'name': 'Etwas aus Fast and Furious', 'id': '5148', 'probabilities': '190' , 'parent': '514'},
            {'name': 'Fernsehsendung', 'id': '515', 'probabilities': '300' , 'parent': '51'},
            {'name': 'Weitere Film/Buch/Serie', 'id': '516', 'probabilities': '0' , 'parent': '51'},
            {'name': 'Horror Film/Buch/Serie', 'id': '5161', 'probabilities': '390' , 'parent': '516'},
            {'name': 'Drama Film/Buch/Serie', 'id': '5162', 'probabilities': '390' , 'parent': '516'},
            {'name': 'Liebes Film/Buch/Serie', 'id': '5163', 'probabilities': '390' , 'parent': '516'},
            {'name': 'Kinder Film/Buch/Serie', 'id': '5164', 'probabilities': '470' , 'parent': '516'},
            {'name': 'Historischer Film/Buch/Serie', 'id': '5165', 'probabilities': '400' , 'parent': '516'},
            {'name': 'Krimi Film/Buch/Serie', 'id': '5167', 'probabilities': '400' , 'parent': '516'},
            {'name': 'Action Film/Buch/Serie', 'id': '5168', 'probabilities': '500' , 'parent': '516'},    
            {'name': 'Fantasy/ Science Fiction Film/Buch/Serie', 'id': '5169', 'probabilities': '500' , 'parent': '516'},
            {'name': 'Musik', 'id': '52', 'probabilities': '0' , 'parent': '5'},
            {'name': 'Song', 'id': '521', 'probabilities': '950' , 'parent': '52'},
            {'name': 'Rap', 'id': '5211', 'probabilities': '400' , 'parent': '521'},
            {'name': 'Pop', 'id': '5212', 'probabilities': '430' , 'parent': '521'},
            {'name': 'Rock', 'id': '5213', 'probabilities': '330' , 'parent': '521'},
            {'name': 'Klassik', 'id': '5214', 'probabilities': '330' , 'parent': '521'},
            {'name': 'Kinderlied', 'id': '5215', 'probabilities': '440' , 'parent': '521'},
            {'name': 'Englisches Lied', 'id': '5216', 'probabilities': '440' , 'parent': '521'},
            {'name': 'Deutsches Lied', 'id': '5217', 'probabilities': '440' , 'parent': '521'},
            {'name': 'Schweizerdeutsches Lied', 'id': '52171', 'probabilities': '440' , 'parent': '5217'},
            {'name': 'Hochdeutsches Lied', 'id': '52172', 'probabilities': '430' , 'parent': '5217'},
            {'name': 'Lied (weder D noch EN)', 'id': '5218', 'probabilities': '440' , 'parent': '521'},
            {'name': 'Musikstil', 'id': '522', 'probabilities': '300' , 'parent': '52'},
            {'name': 'Kunstwerk ', 'id': '53', 'probabilities': '290' , 'parent': '5'},
            {'name': 'Spiel', 'id': '54', 'probabilities': '680' , 'parent': '5'},
            {'name': 'Computerspiel', 'id': '541', 'probabilities': '450' , 'parent': '54'},
            {'name': 'Gesellschaftsspiel', 'id': '542', 'probabilities': '490' , 'parent': '54'},
            {'name': 'Kartenspiel', 'id': '5421', 'probabilities': '390' , 'parent': '542'},
            {'name': 'Brettspiel', 'id': '5422', 'probabilities': '390' , 'parent': '542'},
            {'name': 'Würfelspiel', 'id': '5423', 'probabilities': '370' , 'parent': '542'},
            {'name': 'Sportspiel', 'id': '5424', 'probabilities': '380' , 'parent': '542'},
            {'name': 'Kinderspiel', 'id': '5425', 'probabilities': '390' , 'parent': '542'},
            {'name': 'Fernsender', 'id': '55', 'probabilities': '220' , 'parent': '5'},
            {'name': 'Social-Media-Kanal', 'id': '56', 'probabilities': '490' , 'parent': '5'},


            {'name': 'Wort', 'id': '6', 'probabilities': '10' , 'parent': '0'},
            {'name': 'Adjektiv', 'id': '61', 'probabilities': '190' , 'parent': '6'},
            {'name': 'Verb', 'id': '62', 'probabilities': '190' , 'parent': '6'},
            {'name': 'Nomen', 'id': '63', 'probabilities': '190' , 'parent': '6'},
            {'name': 'Abkürzung', 'id': '64', 'probabilities': '110' , 'parent': '6'},
            {'name': 'Sprache', 'id': '65', 'probabilities': '330' , 'parent': '6'},
            {'name': 'Dialekt/Akzent', 'id': '651', 'probabilities': '140' , 'parent': '65'},
            {'name': 'Pronomen', 'id': '66', 'probabilities': '170' , 'parent': '6'},
            {'name': 'Partikel', 'id': '67', 'probabilities': '170' , 'parent': '6'},
            {'name': 'Wort in anderer Sprache', 'id': '68', 'probabilities': '190' , 'parent': '6'},
            {'name': 'Wort in Englisch', 'id': '681', 'probabilities': '190' , 'parent': '68'},
            {'name': 'Wort in Französisch', 'id': '682', 'probabilities': '240' , 'parent': '68'},
            {'name': 'Wort in Italienisch', 'id': '683', 'probabilities': '230' , 'parent': '68'},
            {'name': 'Wort in Spanisch/Portugiesisch', 'id': '684', 'probabilities': '230' , 'parent': '68'},
            {'name': 'Wort in Osteuropäischer Sprache', 'id': '685', 'probabilities': '140' , 'parent': '68'},
            {'name': 'Wort in Asiatischer Sprache', 'id': '686', 'probabilities': '150' , 'parent': '68'},
            {'name': 'Wort in Nordeuropäischer Sprache', 'id': '687', 'probabilities': '140' , 'parent': '68'},
            {'name': 'Schimpfwort', 'id': '69', 'probabilities': '300' , 'parent': '6'},


            {'name': 'Sonstiges', 'id': '7', 'probabilities': '0' , 'parent': '0'},
            {'name': 'Zahl', 'id': '71', 'probabilities': '220' , 'parent': '7'},
            {'name': 'Farbe', 'id': '72', 'probabilities': '260' , 'parent': '7'},
            {'name': 'Unternehmen/Marke/Organisation', 'id': '73', 'probabilities': '930' , 'parent': '7'},
            {'name': 'Firma', 'id': '731', 'probabilities': '460' , 'parent': '73'},
            {'name': 'Marke', 'id': '732', 'probabilities': '800' , 'parent': '73'},
            {'name': 'Kleidermarke', 'id': '7321', 'probabilities': '330' , 'parent': '732'},
            {'name': 'Schuhmarke', 'id': '73211', 'probabilities': '330' , 'parent': '7321'},
            {'name': 'Kosmetikmarke', 'id': '7322', 'probabilities': '180' , 'parent': '732'},
            {'name': 'Elektronikmarke', 'id': '7323', 'probabilities': '290' , 'parent': '732'},
            {'name': 'Automarke', 'id': '7324', 'probabilities': '470' , 'parent': '732'},
            {'name': 'Essens/Getränkemarke', 'id': '7325', 'probabilities': '470' , 'parent': '732'},
            {'name': 'Organisation', 'id': '733', 'probabilities': '160' , 'parent': '73'},
            {'name': 'Verein', 'id': '7331', 'probabilities': '390' , 'parent': '733'},
            {'name': 'Partei', 'id': '7332', 'probabilities': '190' , 'parent': '733'},
            {'name': 'Religiöse Organisation', 'id': '7333', 'probabilities': '70' , 'parent': '733'},
            {'name': 'Form', 'id': '74', 'probabilities': '260' , 'parent': '7'},
            {'name': 'StadtLandFlussKategorie', 'id': '75', 'probabilities': '550' , 'parent': '7'},
            {'name': 'Sinne', 'id': '76', 'probabilities': '0' , 'parent': '7'},
            {'name': 'Geräusch', 'id': '761', 'probabilities': '200' , 'parent': '76'},
            {'name': 'Geräusch von Tier', 'id': '7611', 'probabilities': '200' , 'parent': '761'},
            {'name': 'Nerviges Geräusch', 'id': '7612', 'probabilities': '230' , 'parent': '761'},
            {'name': 'Lautes Geräusch', 'id': '7613', 'probabilities': '230' , 'parent': '761'},
            {'name': 'Geruch', 'id': '762', 'probabilities': '90' , 'parent': '76'},
            {'name': 'Riecht Gut', 'id': '7621', 'probabilities': '230' , 'parent': '762'},
            {'name': 'Riecht Schlecht', 'id': '7622', 'probabilities': '250' , 'parent': '762'},
            {'name': 'Gefühl', 'id': '763', 'probabilities': '250' , 'parent': '76'},
            {'name': 'Krankheit', 'id': '764', 'probabilities': '210' , 'parent': '76'},
            {'name': 'Partykategorien', 'id': '77', 'probabilities': '0' , 'parent': '7'},
            {'name': 'Ausreden', 'id': '771', 'probabilities': '50' , 'parent': '77'},
            {'name': 'Ausrede fürs zu spät kommen', 'id': '7711', 'probabilities': '230' , 'parent': '771'},
            {'name': 'Ausrede fürs nicht kommen', 'id': '7712', 'probabilities': '180' , 'parent': '771'},
            {'name': 'Ausrede für HA nicht gemacht haben', 'id': '7713', 'probabilities': '290' , 'parent': '771'},
            {'name': 'Ausrede fürs nicht lernen', 'id': '7714', 'probabilities': '230' , 'parent': '771'},
            {'name': 'Ausrede fürs nicht arbeiten', 'id': '7715', 'probabilities': '250' , 'parent': '771'},
            {'name': 'Ausrede fürs nicht aufräumen/putzen', 'id': '7716', 'probabilities': '240' , 'parent': '771'},
            {'name': 'Ausrede für Neujahrsvorsätze nicht einhalten', 'id': '7717', 'probabilities': '260' , 'parent': '771'},
            {'name': 'Ausrede fürs nicht abnehmen', 'id': '7718', 'probabilities': '220' , 'parent': '771'},
            {'name': 'Ausrede fürs nicht aufhören mit Suchtmittel', 'id': '7719', 'probabilities': '260' , 'parent': '771'},
            {'name': 'Kündigungsgrund', 'id': '772', 'probabilities': '320' , 'parent': '77'},
            {'name': 'Trennungsgrund', 'id': '773', 'probabilities': '330' , 'parent': '77'},
            {'name': 'Strafen', 'id': '774', 'probabilities': '390' , 'parent': '77'},
            {'name': 'Strafen in der Schule', 'id': '7741', 'probabilities': '330' , 'parent': '774'},
            {'name': 'Blöde Strafen', 'id': '7742', 'probabilities': '330' , 'parent': '774'},
            {'name': 'Ideen', 'id': '775', 'probabilities': '50' , 'parent': '77'},
            {'name': 'Geschenkideen', 'id': '7751', 'probabilities': '190' , 'parent': '775'},
            {'name': 'Geschenk für Mann', 'id': '77511', 'probabilities': '250' , 'parent': '7751'},
            {'name': 'Geschenk für Frau', 'id': '77512', 'probabilities': '250' , 'parent': '7751'},
            {'name': 'Geschenk für Kind', 'id': '77513', 'probabilities': '250' , 'parent': '7751'},
            {'name': 'Geschenk für Gruppe', 'id': '77514', 'probabilities': '240' , 'parent': '7751'},
            {'name': 'Ideen fürs Wochenende', 'id': '7752', 'probabilities': '290' , 'parent': '775'},
            {'name': 'Ideen fürs Date', 'id': '7753', 'probabilities': '240' , 'parent': '775'},
            {'name': 'Ideen für Ausflug', 'id': '7754', 'probabilities': '250' , 'parent': '775'},
            {'name': 'Ideen für Erfindungen', 'id': '7755', 'probabilities': '320' , 'parent': '775'},
            {'name': 'Ideen fürs Reich werden', 'id': '7756', 'probabilities': '260' , 'parent': '775'},
            {'name': 'Das Wünsche ich dir/euch', 'id': '776', 'probabilities': '280' , 'parent': '77'},
            {'name': 'Das wünsche ich dir/euch nicht', 'id': '7761', 'probabilities': '280' , 'parent': '776'},
            {'name': 'Neujahrsvorsätze', 'id': '777', 'probabilities': '280' , 'parent': '77'},
            {'name': 'Typisch', 'id': '778', 'probabilities': '0' , 'parent': '77'},
            {'name': 'Typisch Mann', 'id': '7781', 'probabilities': '290' , 'parent': '778'},
            {'name': 'Typisch Frau', 'id': '7782', 'probabilities': '290' , 'parent': '778'},
            {'name': 'Typisch Kind', 'id': '7783', 'probabilities': '270' , 'parent': '778'},
            {'name': 'Typisch nach Land', 'id': '7784', 'probabilities': '0' , 'parent': '778'},
            {'name': 'Typisch Europa', 'id': '77841', 'probabilities': '90' , 'parent': '7784'},
            {'name': 'Typisch Deutschsprachiger Raum', 'id': '778411', 'probabilities': '80' , 'parent': '77841'},
            {'name': 'Typisch Deutschland', 'id': '7784111', 'probabilities': '230' , 'parent': '778411'},
            {'name': 'Typisch Österreich', 'id': '7784112', 'probabilities': '110' , 'parent': '778411'},
            {'name': 'Typisch Schweiz', 'id': '7784113', 'probabilities': '290' , 'parent': '778411'},
            {'name': 'Typisch Italien', 'id': '778412', 'probabilities': '280' , 'parent': '77841'},
            {'name': 'Typisch Frankreich', 'id': '778413', 'probabilities': '270' , 'parent': '77841'},
            {'name': 'Typisch Spanien/Portugal', 'id': '778414', 'probabilities': '210' , 'parent': '77841'},
            {'name': 'Typisch Osteuropa', 'id': '778415', 'probabilities': '100' , 'parent': '77841'},
            {'name': 'Typisch Russland', 'id': '7784151', 'probabilities': '270' , 'parent': '778415'},
            {'name': 'Typisch Polen/Tschechien', 'id': '7784152', 'probabilities': '110' , 'parent': '778415'},
            {'name': 'Typisch Balkan', 'id': '7784153', 'probabilities': '110' , 'parent': '778415'},
            {'name': 'Typisch Skandinavien', 'id': '778416', 'probabilities': '220' , 'parent': '77841'},
            {'name': 'Typisch Benelux', 'id': '778417', 'probabilities': '150' , 'parent': '77841'},
            {'name': 'Typisch Grossbritannien/Irland', 'id': '778418', 'probabilities': '230' , 'parent': '77841'},
            {'name': 'Typisch England', 'id': '7784181', 'probabilities': '230' , 'parent': '778418'},
            {'name': 'Typisch (Nord)Irland', 'id': '7784182', 'probabilities': '100' , 'parent': '778418'},
            {'name': 'Typisch Schottland/Wales', 'id': '7784183', 'probabilities': '100' , 'parent': '778418'},
            {'name': 'Typisch Asien', 'id': '77842', 'probabilities': '150' , 'parent': '7784'},
            {'name': 'Typisch Japan', 'id': '778421', 'probabilities': '250' , 'parent': '77842'},
            {'name': 'Typisch China', 'id': '778422', 'probabilities': '250' , 'parent': '77842'},
            {'name': 'Typisch Indien', 'id': '778423', 'probabilities': '230' , 'parent': '77842'},
            {'name': 'Typisch Korea', 'id': '778424', 'probabilities': '100' , 'parent': '77842'},
            {'name': 'Typisch Südkorea', 'id': '7784241', 'probabilities': '250' , 'parent': '778424'},
            {'name': 'Typisch Nordkorea', 'id': '7784242', 'probabilities': '230' , 'parent': '778424'},
            {'name': 'Typisch Südostasien', 'id': '778425', 'probabilities': '140' , 'parent': '77842'},
            {'name': 'Typisch Arabischer Raum', 'id': '778426', 'probabilities': '210' , 'parent': '7784'},
            {'name': 'Typisch Türkei', 'id': '7784261', 'probabilities': '200' , 'parent': '778426'},
            {'name': 'Typisch Afrika', 'id': '77843', 'probabilities': '190' , 'parent': '7784'},
            {'name': 'Typisch Nordafrika', 'id': '778431', 'probabilities': '180' , 'parent': '77843'},
            {'name': 'Typisch Sub-Sahara-Afrika', 'id': '778432', 'probabilities': '180' , 'parent': '77843'},
            {'name': 'Typisch Amerika', 'id': '77844', 'probabilities': '90' , 'parent': '7784'},
            {'name': 'Typisch USA', 'id': '778441', 'probabilities': '280' , 'parent': '77844'},
            {'name': 'Typisch Kanada', 'id': '778442', 'probabilities': '260' , 'parent': '77844'},
            {'name': 'Typisch Mittelamerika', 'id': '778443', 'probabilities': '250' , 'parent': '77844'},
            {'name': 'Typisch Südamerika', 'id': '778444', 'probabilities': '250' , 'parent': '77844'},
            {'name': 'Typisch Ozeanien', 'id': '77845', 'probabilities': '130' , 'parent': '7784'},
            {'name': 'Typisch Australien', 'id': '778451', 'probabilities': '200' , 'parent': '77845'},
            {'name': 'Typisch Neuseeland', 'id': '778452', 'probabilities': '170' , 'parent': '77845'},
        ]
});