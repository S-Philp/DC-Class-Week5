let request = new XMLHttpRequest()
let moviesUL = document.getElementById("moviesUL")
let moreMoviesUL = document.getElementById("moreMoviesUL")

function getMovieDetails(button) {
    console.log(button)
    let movieID = button.getAttribute("imdbID")
    console.log(movieID)

    let request = new XMLHttpRequest()

    request.addEventListener('load', function() {

        let result = JSON.parse(this.responseText)

        let movieOutput = `<li>
        <p><img src = ${result.Poster}></img></p>
        <b>Year: ${result.Year}</b>
        <b>Rated: ${result.Rated}</b>
        <b>Released: ${result.Released}</b>
        <b>Director: ${result.Director}</b>
        </li>
        `

        moreMoviesUL.innerHTML = movieOutput
        })
request.open('GET',`http://www.omdbapi.com/?i=${movieID}&apikey=1e88231f`)

request.send() 
}

 

request.addEventListener('load', function() {

    let result = JSON.parse(this.responseText)
    
     let movieItems = result.Search.map((movie) => {
        return `<li>
        <p><img src = ${movie.Poster}></img><br>
        <label><button imdbID="${movie.imdbID}" onclick="getMovieDetails(this)" >Show Details</button><br>
        <a href="https://www.imdb.com/title/${movie.imdbID}"><b>${movie.Title}</b></a></label>
        </li>
        <hr>`
    })
 
    moviesUL.insertAdjacentHTML('beforeend', movieItems.join(''))


})

request.open('GET','http://www.omdbapi.com/?s=batman&apikey=1e88231f')

request.send()