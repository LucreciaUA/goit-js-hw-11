import axios from "axios";

export async function getPhoto(search ,page, perPage) {
    
        let res = await axios.get(`https://pixabay.com/api/?key=40401726-c7a7b8e60d6c4450cbe7a420e&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}&q=${search}`)
            
                console.log(res.data)
               let data = res.data
    return data
}