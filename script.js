
const API_URL = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-10-22&primary_release_date.lte=2021-10-22&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const search = document.getElementById("search")
const form = document.getElementById("form")

const main = document.querySelector("#main")

const btns = document.querySelectorAll(".btn")

const firstBtn = document.querySelector(".btn-page-one")

const secondBtn = document.querySelector(".btn-page-two")

const thirdBtn = document.querySelector(".btn-page-three")

const fourBtn = document.querySelector(".btn-page-four")

//By default
getMovie(API_URL + `${1}`)

async function getMovie(url){
    const object = {
        headers:{
            "Accept": "application/json"
        }
    }
    const res = await fetch(url,object)
    const data = await res.json()
    showMovie(data.results)
    console.log(data.results)
}

btns.forEach((btn,idx) => {
    console.log(btn,idx)
    
    btn.addEventListener("click",() => clickBtn(idx))
})

function clickBtn(idx){
    btns.forEach(btn => {
        btn.classList.remove("active")
        
    })
    if(idx === 0){
        getMovie(API_URL + `${idx + 1}`)
        firstBtn.classList.toggle("active")

    }
    else if(idx === 1){
        getMovie(API_URL + `${idx + 2}`)
        secondBtn.classList.toggle("active")

    }
    else if(idx === 2){
        getMovie(API_URL + `${idx + 3}`)
        thirdBtn.classList.toggle("active")

    }
    else if(idx === 3){
        getMovie(API_URL + `${idx + 4}`)
        fourBtn.classList.toggle("active")

    }
}

function showMovie(movies){
    main.innerHTML = ''
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie

        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" class="img">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class=${getRatingsClass(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
            ${overview}
        </div>`
        main.appendChild(movieEl)

    })

}
function getRatingsClass(vote){
    if(vote > 7){
        return "green"
    }
    else if(vote<5){
        return "red"
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const searchValue = search.value
    console.log(searchValue)
    if(searchValue && searchValue!=""){
        getMovie(SEARCH_API + searchValue)
    }
    else{
        location.reload()
    }
    console.log("HI")
})