const renderUI = () => {
    const photo = JSON.parse(localStorage.getItem('clickedPhoto'));
    document.querySelector('.site-heading').innerText = photo.user.name;
    document.querySelector('.photo-container').style.backgroundImage = `url('${photo.urls.regular}')`;
}

renderUI();