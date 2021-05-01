function createIframe(div) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1&rel=0');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.className('youtube');
    div.parentNode.replaceChild(iframe, div);
}

function initYouTubeVideos() {
    let playerElements = document.getElementsByClassName('youtube-thumbnail-div');
    for (let i = 0; i < playerElements.length; i++) {
        let videoId = playerElements[i].dataset.id;
        let div = document.createElement('div');
        div.setAttribute('data-id', videoId);
        let thumbNode = document.createElement('img');
        thumbNode.src = '//i.ytimg.com/vi/ID/sddefault.jpg'.replace('ID', videoId);
        div.appendChild(thumbNode);
        // let playButton = document.createElement('div');
        // playButton.setAttribute('class', 'play');
        // div.appendChild(playButton);
        div.onclick = function () {
            createIframe(this);
        };
        playerElements[i].appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', initYouTubeVideos);