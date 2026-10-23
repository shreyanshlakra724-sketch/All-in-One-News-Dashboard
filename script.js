const date = new Date();
document.querySelector('.Date').innerText = date.toLocaleDateString();



const API_KEY = CONFIG.A_API_KEY;
const FINANCE_KEY = CONFIG.FINN_HUB;

function displayNews(articles) {
    const container = document.querySelector('.Secondary-Holder');
    const header = container.querySelector('h3');
    container.innerHTML = "";
    if (header) {
        container.appendChild(header);
    }

    if (!articles || articles.length === 0) {
        const noNews = document.createElement('p');
        noNews.innerText = "No Articles";
        container.appendChild(noNews);
        return;
    }

    articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('news-card');

        articleCard.innerHTML = `
            <h4><a href="${article.url}" target="_blank" style="color: #FF0000;">${article.title}</a></h4>
            <p>${article.description || "No description available."}</p>
        `;

        container.appendChild(articleCard);
    });
}

async function newsFetch() {
    const endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status}`);
        }

        const data = await response.json();
        displayNews(data.articles);

    } catch (error) {
        console.log("Error fetching news:", error);
    } 
}

function displayFinance(articles) {
    const container = document.querySelector('.Finance');
    container.innerHTML = '<h3>Finance Headlines</h3>';

    if (!articles || articles.length === 0) {
        container.innerHTML += '<p>NO News</p>';
        return;
    }

    articles.slice(0, 5).forEach(article => {
        const articleCard = document.createElement('div'); // Fixed: removed the dot
        articleCard.classList.add('news-card'); // Fixed: removed the dot

        articleCard.innerHTML = `
            <h4><a href="${article.url}" target="_blank" style="color: #FF3333;">${article.headline}</a></h4>
            <p>${article.summary || "No summary available."}</p>
            <small style="color: #888;">Source: ${article.source}</small>
        `;

        container.appendChild(articleCard);
    });
}

async function FinanceFetcher() {
    const endpoint = `https://finnhub.io/api/v1/news?category=general&token=${FINANCE_KEY}`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status}`);
        }

        const data = await response.json();
        displayFinance(data);

    } catch (error) {
        console.log("Error fetching finance news:", error);
    }
}

newsFetch();
FinanceFetcher();