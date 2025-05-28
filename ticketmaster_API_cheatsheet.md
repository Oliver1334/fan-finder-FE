type of event is here, we want "Music"
* results.data._embedded.events[i].classifications[0].segment`

- - - -

broad genre name is here, if available! (sometimes undefined)
* results.data._embedded.events[i].classifications[0].genre.name

- - - -

subgenre name is here, if available! (sometimes undefined)
* results.data._embedded.events[i].classifications[0].subGenre

- - - - 

for lat and long

* event._embedded.venues[0].location.latitude
* event._embedded.venues[0].location.longitude