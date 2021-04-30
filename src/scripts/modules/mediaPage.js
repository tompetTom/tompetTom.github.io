import media from '../../media/media.js';

export const mediaPage = {
    youtubeThumbnail = [
        'https://i.ytimg.com/vi/',
        '/sddefault.jpg'
    ],
    facebookSrc = [
        'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com',
        '&show_text=false&appId'
    ],
    spotifySrc = 'https://open.spotify.com/embed/',
    youtubeSrc = 'https://www.youtube.com/embed/',

    getThumbnail(video) {
        let url = '';
        if (video.format === 'youtube') {
            url = youtubeThumbnail[0] + video.src + youtubeThumbnail[1];
        } else {
            url = 'https://images.unsplash.com/photo-1612548403247-aa2873e9422d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2667&q=80';
        }
        return url;
    },

    getVideoSrc(video) {
        let url = '';
        switch (video.format) {
            case 'youtube':
                url = youtubeSrc + video.src;
                break;
            case 'spotify':
                url = spotifySrc + video.src;
                break;
            case 'facebook':
                url = facebookSrc[0] + video.src + facebookSrc[1];
                break;
        }
        return url;
    },
    
    filterVideos(tagArr) {
        let videos = [];
        tagArr.forEach(selected => {
            media.forEach(video => {
                video.tags.forEach(tag => {
                    if (tag === selected) {
                        videos.push(video);
                    }
                })
            })
        });
        return videos;
    },
    
    orderVideos(videoArr, orderBy) {
        if (orderBy === 'title' || orderBy === 'name') {
            videoArr.sort((a, b) => {
                if (a[orderBy] < b[orderBy]) {
                    return -1;
                } else if (a[orderBy] > b[orderBy]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        if (orderBy === 'date' || orderBy === 'year') {
            videoArr.sort((a, b) => a - b);
        }
        return videoArr;
    }
}