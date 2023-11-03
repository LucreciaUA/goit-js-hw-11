window.onload

import { Notify } from "notiflix";
import simpleLightbox from "simplelightbox";
import axios from "axios";
import "simplelightbox/dist/simple-lightbox.min.css";
import './style.css'

const gallery = document.querySelector('.gallery');

const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more')
const perPage = 40;
const url = 'https://pixabay.com/api/';
const api = '40401726-c7a7b8e60d6c4450cbe7a420e';
let page;
let search = '';
let lightbox;
const notifyOptions = { position: 'center-center', timeout: 10000 };

loadMore.classList.add('is-hidden')

//render image card
function createMurkup(image) {
    
    const markup = image.map(image => {const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image  
        return `
    <a href='${largeImageURL}'>
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>
</a>
        `
    }).join('')
    gallery.insertAdjacentHTML("beforeend", markup);
}


async function getPhoto(search ,page, perPage) {
    
        let res = await axios.get(`https://pixabay.com/api/?key=40401726-c7a7b8e60d6c4450cbe7a420e&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}&q=${search}`)
            
                console.log(res.data)
               let data = res.data
             return data             
     
}

//getPhoto(page, perPage)
form.addEventListener('submit', onSearch)
loadMore.addEventListener('click', addPages)

    
function onSearch(evt) {
       
    evt.preventDefault(); // Prevent form submission

    search = evt.currentTarget.searchQuery.value.trim();//get search value without spaces
    
    console.log(search)
    
    gallery.innerHTML = '';//clear gallery
    
    page = 1;
    

    if (search === '') {
        Notify.info('What are you looking for?')
        alert('!')
        return
    }
       
    getPhoto(search, page, perPage)
        
        .then(data => {
            console.log(data.totalHits, data.hits)
            if (data.totalHits === 0) {
                nothing()
        }
            else {
                
                createMurkup(data.hits);
                lightbox = new simpleLightbox('.gallery a', { 
                captions: true,
                captionSelector: 'img',
                captionsData: 'alt',
                captionDelay: '250',
                alertErrorMessage: '（╯‵□′）╯︵┴─┴',
                 overlay: true,
                overlayOpacity: 0.4,
                navText: ['←','→'],
                    }).refresh();
                    scroll()
            }

            //load more page
            
            if (data.totalHits > perPage) {
                loadMore.classList.remove('is-hidden')
                
            }
    })
     
        
    
        .catch(error => {
            console.error(error);
            // Handle the error here, such as displaying a user-friendly error message.
            Notify.failure("An error occurred while fetching images.");
            loadMore.classList.add('is-hidden')
        })
}
    
function addPages() {
    
    getPhoto(search, page, perPage)
        .then(data => {
            console.log(data.totalHits, data.hits)
            console.log(Math.ceil(data.totalHits / perPage))
            page++
            console.log(page)
            if (Math.ceil(data.totalHits/perPage) === page) {
                Notify.info(`We're sorry, but you've reached the end of search results.`)
                loadMore.classList.add('is-hidden')
            }
            
                createMurkup(data.hits);
                lightbox =new simpleLightbox('.gallery a', {
                    captions: true,
                    captionSelector: 'img',
                    captionsData: 'alt',
                    captionDelay: '250',
                    alertErrorMessage: '（╯‵□′）╯︵┴─┴',
                    overlay: true,
                    overlayOpacity: 0.4,
                    navText: ['←', '→'],
                }).refresh();
                scroll()
            
        })
     .catch(error => {
            console.error(error);
            // Handle the error here, such as displaying a user-friendly error message.
         Notify.failure("An error occurred while fetching images.");
         loadMore.classList.add('is-hidden')
        })
}


function nothing() {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    loadMore.classList.add('is-hidden')
}



function scroll() {
    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

//const checkbox = document.getElementById("checkbox")
//checkbox.addEventListener("change", () => {
 //   document.querySelector('body').classList.toggle("dark-mode");
//    form.classList.toggle('dark-mode')
//    document.querySelector('button').classList.toggle('dark-mode')
//    document.querySelector('.photo-card').classList.toggle('dark-mode')
//})
