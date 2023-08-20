console.log("Welcome to Spotify!");

//initialize vars
let songindex=0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let progressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songNames: "Warriyo" , filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songNames: "Cielo" , filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songNames: "Invincible" , filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songNames: "Different Heaven" , filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songNames: "Heroes Tonight" , filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songNames: "Warriyo" , filePath:"songs/1.mp3", coverPath:"covers/6.jpg"},
];

songItems.forEach((element ,i)=> {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songNames")[0].innerText = songs[i].songNames;
});

//handle play pause

masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity =0;
    }
})

//listen to events

audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    //console.log(progress);
    progressbar.value = progress;
})

progressbar.addEventListener('change', ()=>{
    audioElement.currentTime = progressbar.value * audioElement.duration /100;
})

const makeAllPlays =() => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        masterSongName.innerText = songs[songindex+1].songNames;
        console.log(e.target);
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songindex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity =1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=6){
        songindex =0;
    }else{
        songindex+=1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex+1].songNames;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity =1;
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex =0;
    }else{
        songindex-=1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex+1].songNames;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity =1;
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})
