let likedPhotos = [];
let page = 1;
let photos = [];

async function getPhotos() {
    let response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&client_id=BDCSStPov0Bl_S4aD7OaRBjG55IQcrT4qjxDSXQHmuU`
    );
    let data = await response.json();
    return await data;
}

async function renderPhotos() {
    photos = await getPhotos();
    photos.forEach((photo) => {
        const photoContainer = document.createElement("section");
        photoContainer.style.backgroundImage = `url(${photo.urls.small_s3})`;
        photoContainer.setAttribute("class", "photo-container");
        let heart = document.createElement("img");
        heart.setAttribute("src", "../assets/imgs/heart icon.svg");
        heart.addEventListener('click', () => {
            addToLikedPhotos(photo);
        });
        photoContainer.appendChild(heart);
        document.querySelector(".photos-container").appendChild(photoContainer);

    });
};
renderPhotos();

function addToLikedPhotos(photo) {
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