function globalSearch(event) {
    event.preventDefault();

    const query = document.getElementById("search-input").value.trim().toLowerCase();
    console.log("Search Query:", query); 

    if (!query) {
        console.log("Empty search. No action taken.");
        return;
    }

    const searchMap = {
        "projects": "projects.html",
        "case study": "blog.html",
        "about": "about.html",
        "contact": "about.html",
        "blackjack": "projects.html",
        "gym app": "projects.html",
        "tarot card fortune teller": "projects.html",
        "huffman coding": "projects.html",
        "cipher": "projects.html",
    };

    for (const keyword in searchMap) {
        if (query.includes(keyword)) {
            console.log(`Redirecting to: ${searchMap[keyword]}`);
            window.location.href = searchMap[keyword];
            return;
        }
    }

    console.log(`No match found, redirecting to search-results.html?q=${encodeURIComponent(query)}`);
    window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
}
