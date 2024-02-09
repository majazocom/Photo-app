const getLikedPhotos = () => {
    let likedPhotos = JSON.parse(localStorage.getItem('likedPhotos'));
    return likedPhotos;
};

const renderLikedPhotosToUI = () => {
    let likedPhotos = getLikedPhotos();
    let likedPhotosContainer = document.querySelector(".photos-container");
    likedPhotosContainer.innerHTML = "";
    likedPhotos.forEach((liked) => {
        const LikedPhotoContainer = document.createElement("section");
        LikedPhotoContainer.style.backgroundImage = `url(${liked.urls.thumb})`;
        LikedPhotoContainer.setAttribute("class", "photo-container");
        let close = document.createElement("img");
        close.setAttribute("src", "../assets/imgs/close.png");
        close.addEventListener('click', () => {
            removeFromLiked(liked);
        });
        LikedPhotoContainer.appendChild(close);
        likedPhotosContainer.appendChild(LikedPhotoContainer);

    });
}

renderLikedPhotosToUI();

const removeFromLiked = (likedToRemove) => {
    let likedPhotos = getLikedPhotos();
    console.log(likedToRemove);
    // find index of item in array
    let indexOfLiked = likedPhotos.findIndex((liked) => liked.id == likedToRemove.id);
    likedPhotos.splice(indexOfLiked, 1);
    localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
    renderLikedPhotosToUI();
}
