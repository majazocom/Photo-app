let likedPhotos = [];
let page = 1;
let photos = [];

async function getPhotos() {
    // check if theres already been an API call within the last hour
    let photos = JSON.parse(localStorage.getItem('photos'));
    let latestAPICall = JSON.parse(localStorage.getItem('latestAPICall'));
    let currentTime = new Date(Date.now());
    if (photos && latestAPICall) {
        let secondsBetweenAPICalls = (currentTime.getTime - latestAPICall.getTime) / 1000;
        if (secondsBetweenAPICalls > 3600) {
            let response = await fetch(
                `https://api.unsplash.com/photos?page=${page}&per_page=12&client_id=BDCSStPov0Bl_S4aD7OaRBjG55IQcrT4qjxDSXQHmuU`
            );
            photos = await response.json();
            localStorage.setItem('photos', JSON.stringify(await data));
            localStorage.setItem('latestAPICall', JSON.stringify(new Date(Date.now())));
        }
    }

    return await photos;
}

async function renderPhotos() {
    photos = await getPhotos();
    photos.forEach((photo) => {
        const photoContainer = document.createElement("section");
        photoContainer.style.backgroundImage = `url(${photo.urls.regular})`;
        photoContainer.setAttribute("class", "photo-container");
        let heart = document.createElement("img");
        heart.setAttribute("src", "../assets/imgs/heart icon.svg");
        heart.addEventListener('click', () => {
            addToLikedPhotos(photo);
        });
        photoContainer.appendChild(heart);
        photoContainer.addEventListener('click', () => {
            console.log(photo);
            addPhotoToLocalStorage(photo);
            location.href = "photo.html";
        });
        document.querySelector(".photos-container").appendChild(photoContainer);
    });
};
renderPhotos();

const addPhotoToLocalStorage = (photo) => {
    localStorage.setItem('clickedPhoto', JSON.stringify(photo));
}

const addToLikedPhotos = (photo) => {
    // get current likedPhotos from ls
    likedPhotos = JSON.parse(localStorage.getItem('likedPhotos'));
    // check if it actually exists
    if (likedPhotos) {
        // if it exists we want to find if the image we are about to add already exists
        // we shouldn't add an image twice
        let indexOfPhoto = likedPhotos.findIndex((likedPhoto) => likedPhoto.id == photo.id);
        console.log(indexOfPhoto);
        if (indexOfPhoto < 0) {
            // if it doesn't exist in the array; push it in
            likedPhotos.push(photo);
            localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
        } else {
            console.log('already added');
        }
    } else {
        likedPhotos = [photo];
        localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
        console.log(likedPhotos);
    }
};

document.querySelector('.show-more').addEventListener('click', () => {
    page++;
    renderPhotos();
})