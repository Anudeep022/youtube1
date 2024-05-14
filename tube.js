let key = "AIzaSyCRiZR1jwDlRiEtNeBEciCivwyxQ8XPKjI";

let navbar=document.createElement("div");
document.body.appendChild(navbar);
navbar.setAttribute("id","navbar");

let image=document.createElement("img");
image.src="https://clipground.com/images/youtube-logo-hd-png-3.jpg";
image.setAttribute("id","youtube_logo");
navbar.appendChild(image);

let input=document.createElement("input");
input.setAttribute("id","input");
navbar.appendChild(input);

const btn = document.createElement("button");
btn.setAttribute("id","btn")
btn.innerHTML = "search";
navbar.appendChild(btn);
btn.addEventListener("click",api_call);

let container=document.createElement("div");
container.setAttribute("id","container");
navbar.after(container);

async function api_call()
{
    let user_data=document.getElementById("input").value;
    container.innerHTML="";
    let res= await fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCRiZR1jwDlRiEtNeBEciCivwyxQ8XPKjI&type=video&part=snippet&maxResults=15&q="+user_data)
    let data= await res.json();
    console.log(data)
    let items=data.items;

    items.forEach(async(item)=> {

        let displayVideos=document.createElement("div")
        displayVideos.setAttribute("class","videos")
        

        let video=item.id.videoId;
        let channelId=item.snippet.channelId;
        let channelTitle=item.snippet.channelTitle;
        let description=item.snippet.description;
        let broadcast=item.snippet.liveBroadcastContent;
        let publishTime=item.snippet.publishTime;
        let publishAt=item.snippet.publishAt;
        let thumbnails=item.snippet.thumbnails.high.url;
        let title=item.snippet.title;
        
        let videoUrl = "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCRiZR1jwDlRiEtNeBEciCivwyxQ8XPKjI&part=snippet,statistics&id=" + video;
        let videoResponse = await fetch(videoUrl);
        let videoDetails = await videoResponse.json();
        console.log(videoDetails);
        let viewCount = videoDetails.items[0].statistics.viewCount;
        
        displayVideos.innerHTML =`
        <a href="https://www.youtube.com/watch?v=${video}" target="_blank">
        <img class="videosize" src="${thumbnails}" alt="${title}">
        <p>${title}<br></p>
        </a>
        <div>
        Channel Title :${channelTitle}<br>
        Published At :${publishTime}<br>
        Views :${viewCount}<br>
        </div>
        `
        container.appendChild(displayVideos);
    })

}
api_call()

let footer = document.createElement("div");
document.body.appendChild(footer);
footer.setAttribute("id", "footer")

let pagination = document.createElement("div");
footer.appendChild(pagination);
pagination.setAttribute("id", "pagination");

let prev = document.createElement("button");
pagination.appendChild(prev);
prev.setAttribute("id", "prev");
prev.innerText = "prev";
prev.addEventListener("click", prev_value)

let next = document.createElement("button");
pagination.appendChild(next);
next.setAttribute("id", "next");
next.innerText = "next"
next.addEventListener("click", next_value)

var current_page_value = 1;
let current_page = document.createElement("div");
prev.after(current_page); 
current_page.innerText = current_page_value;

function next_value() {
    current_page_value++;
    current_page.innerText = current_page_value;
    api_call();
}

function prev_value() {
    if (current_page_value <= 1) { current_page_value = 1; } else { current_page_value--; }
    current_page.innerText = current_page_value;
    api_call();
}




