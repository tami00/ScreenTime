const axios = require('axios');

async function getTimes(filmTitle,screeningDate) {

    let showTimings = []

    const url1 = `https://www.cineworld.ie/ie/data-api-service/v1/quickbook/10109/film-events/in-cinema/0001/at-date/${screeningDate}?attr=&lang=en_IE`

    //Get Id of the film
    let res_1 = await axios.get(url1);

    let films = res_1.data.body.films

    let req_film = null
    req_film = films.find(film => {
        if (film.name == filmTitle){
            return true;
        }
    });

    if (req_film){
        const req_film_id = req_film.id
        const url2 = `https://www.cineworld.ie/ie/data-api-service/v1/quickbook/10109/cinema-events/in-group/dublin/with-film/${req_film_id}/at-date/${screeningDate}?attr=&lang=en_IE`

        //Get Show Info at-date
        let res_2 = await axios.get(url2);

        let shows = res_2.data.body.events

        shows.forEach(show => {
            showTimings.push(
                show.eventDateTime
            )
        });


    }

    return showTimings
}

module.exports = getTimes;

// async function logTimes () {
//     console.log(await getTimes("Morbius","2022-04-27"))
//     // console.log(await getTimes("Doctor Strange In The Multiverse Of Madness","2022-05-05"))
// }

// logTimes()


// module.exports = logTimes;