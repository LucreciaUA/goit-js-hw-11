
import "simplelightbox/dist/simple-lightbox.min.css";
import { onSearch } from "./js/render";
import { addPages } from "./js/render";

import './style.css'




const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more')

loadMore.classList.add('is-hidden')

form.addEventListener('submit', onSearch)
loadMore.addEventListener('click', addPages)

    






//const checkbox = document.getElementById("checkbox")
//checkbox.addEventListener("change", () => {
 //   document.querySelector('body').classList.toggle("dark-mode");
//    form.classList.toggle('dark-mode')
//    document.querySelector('button').classList.toggle('dark-mode')
//    document.querySelector('.photo-card').classList.toggle('dark-mode')
//})
