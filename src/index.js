import Notiflix from "notiflix";
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
let search = ''


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



//wrap.addEventListener('submit', getPhoto)

//createMurkup(res)

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
    loadMore.classList.add('is-hidden')

    if (search === '') {
        alert('what are you looking for?')

        return
    }
       
    getPhoto(search, page, perPage)
        .then(data => {
            console.log(data.totalHits, data.hits)
            if (data.totalHits === 0) {
                alert('nothing there')
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

            }

            //load more page
            if (data.totalHits > perPage) {
                loadMore.classList.remove('is-hidden')
                page++
            }
    })
     
        
    
        .catch(alert('no!'))
}
    
function addPages() {
    getPhoto(search, page, perPage)
        .then(data => {
            console.log(data.totalHits, data.hits)
            if (data.totalHits === 0) {
                alert('nothing there')
            }
            else {
                createMurkup(data.hits);
                lightbox = new SimpleLightbox('.gallery a', {
                    captions: true,
                    captionSelector: 'img',
                    captionsData: 'alt',
                    captionDelay: '250',
                    alertErrorMessage: '（╯‵□′）╯︵┴─┴',
                    overlay: true,
                    overlayOpacity: 0.4,
                    navText: ['←', '→'],
                }).refresh();

            }
        })
    .catch(alert('ups'))
}




