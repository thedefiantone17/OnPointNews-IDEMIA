const apiKey = `4c87cf5b20aa465193a81b7c79c3ff42`;
const url = `https://newsapi.org/v2/everything?q=`;

let cardContainer = document.querySelector(".cardContainer");
let cardTemplate = document.getElementById("newsCardTemplate");
let categoryList = document.getElementById("categoryList");
let searchBtn = document.getElementById('SearchButton');
let searchInpt = document.getElementById('searchInput');


window.addEventListener("load", () => {
  fetchNews("India");
});

async function fetchNews(params) {
  const response = await fetch(`${url}${params}&apiKey=${apiKey}`);
  const data = await response.json();
  // console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    let cardClone = cardTemplate.content.cloneNode(true);
    fillCardData(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillCardData(cardClone, article) {
  let newsImg = cardClone.querySelector("#newsImg");
  let newsTitle = cardClone.querySelector("#newsHeadline");
  let newsSrc = cardClone.querySelector("#newsSrc");
  let newsDesc = cardClone.querySelector("#newsDesc");
  let linkBtn = cardClone.querySelector("#newsLink");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  linkBtn.href = article.url;

  let date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSrc.innerHTML = `${article.source.name} | ${date}`;
}

// event Delegation

categoryList.addEventListener("click", function (e) {
  let clickEvent = e.target;
  //   console.dir(clickEvent);
  if (clickEvent && clickEvent.nodeName === "LI") {
    console.log("Category clicked:", e.target.textContent);
    console.log("typeof:", typeof e.target.textContent);
    //   cardContainer.innerHTML = "";
    fetchNews(e.target.textContent);
  }
});

searchBtn.addEventListener('click',() =>{
    let query = searchInpt.value;
    if (!query) return;
    
    fetchNews(query);
});

searchInpt.addEventListener('keydown', function (params) {
    if (params.key == "Enter") {
        let query = searchInpt.value;
        if (!query) return;
        
        fetchNews(query);
    }
});