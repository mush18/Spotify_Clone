console.log("Welcome to Spotify");


//Initalizing the Variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('masterSongName');

let songs=[
    {songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & E H!DE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
]

songItems.forEach((element,i)=>
{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})


// audioElement.play();

//Handle Play Pause Click
masterPlay.addEventListener('click',()=>
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;

    }

    else
    {
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');

    //update SeekBar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    // console.log(progress)
    myProgressBar.value=progress;
});


myProgressBar.addEventListener('change',()=>
{
    // audioElement.currentTime=myProgressBar.value; -->but this will show the value in Percentage Form
    //we want the "Duration" so we need to create the formula.

    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})


songItemPlay=Array.from(document.getElementsByClassName('songItemPlay'));


const makeAllplays=()=>{
    songItemPlay.forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}


songItemPlay.forEach((element)=>{

    element.addEventListener('click',(e)=>
    {
        console.log(e.target);
        makeAllplays()
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        
        //To get the ID of indivdual songs
        songIndex=parseInt(e.target.id);


        //To change the song....
        audioElement.src=`songs/${songIndex}.mp3`;
        masterSongName.innerText=songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        
    })
})

NextButton=document.getElementById('next');

NextButton.addEventListener('click',()=>{
    if(songIndex>=6)
    {
        songIndex=1;
    }

    else 
    {
        songIndex +=1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
})

previousButton=document.getElementById('previous');

previousButton.addEventListener('click',()=>{
    if(songIndex<=1)
    {
        songIndex=6;
    }

    else 
    {
        songIndex -=1;
    }

    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
})