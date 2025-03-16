document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("projects-container");

    // default
    const defaultProjects = [
        {
            "title": "Blackjack",
            "image": "media/images/projects/blackjack.png",
            "description": "Implementation of Monte Carlo policy evaluation, Temporal Difference policy evaluation, and Q-Learning for Blackjack.",
            "link": "https://github.com/trishatong/blackjack",
            "date": "2024",
            "tags": "Python, AI, Reinforcement Learning"
        },
        {
            "title": "Gym App",
            "image": "media/images/projects/gym-app.jpg",
            "description": "A mobile app that allows the user to track and view data related to exercise routines, fitness goals, and diet.",
            "link": "https://github.com/trishatong/FitnessTrackerApp",
            "date": "2023",
            "tags": "React Native, Mobile Development"
        }
    ];

    // check if localStorage already has data
    if (!localStorage.getItem("projects")) {
        console.log("No local data found, storing default projects...");
        localStorage.setItem("projects", JSON.stringify(defaultProjects));
    } else {
        console.log("LocalStorage already has data.");
    }

    // local event listener
    const loadLocalButton = document.getElementById("load-local");
    if (loadLocalButton) {
        loadLocalButton.addEventListener("click", loadLocalProjects);
        console.log("Event listener attached to Load Local button.");
    } else {
        console.error("Load Local button not found.");
    }

    // remote event listener
    const loadRemoteButton = document.getElementById("load-remote");
    if (loadRemoteButton) {
        loadRemoteButton.addEventListener("click", loadRemoteProjects);
        console.log("Event listener attached to Load Remote button.");
    } else {
        console.error("Load Remote button not found.");
    }

    // load projects from localStorage on page load
    loadLocalProjects();
});

function loadLocalProjects() {
    console.log("Loading projects from localStorage...");

    const container = document.getElementById("projects-container");
    container.innerHTML = ""; // clear existing content

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    console.log("Fetched projects:", storedProjects);

    if (storedProjects.length === 0) {
        container.innerHTML = "<p>No projects found in local storage.</p>";
        return;
    }

    storedProjects.forEach(project => {
        const card = document.createElement("project-card");
        card.setAttribute("title", project.title);
        card.setAttribute("image", project.image);
        card.setAttribute("description", project.description);
        card.setAttribute("link", project.link);
        card.setAttribute("date", project.date);
        card.setAttribute("tags", project.tags);
        container.appendChild(card);
    });

    console.log("Loaded projects from localStorage.");
}

async function loadRemoteProjects() {
    console.log("Fetching projects from remote server...");

    const container = document.getElementById("projects-container");
    container.innerHTML = ""; // clear existing content

    try {
        const response = await fetch("https://api.jsonbin.io/v3/b/67d0bc228561e97a50ea3277");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const projects = data.record.projects || [];
        console.log("Fetched remote projects:", projects);

        if (projects.length === 0) {
            container.innerHTML = "<p>No projects found in remote storage.</p>";
            return;
        }

        projects.forEach(project => {
            const card = document.createElement("project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("image", project.image);
            card.setAttribute("description", project.description);
            card.setAttribute("link", project.link);
            card.setAttribute("date", project.date);
            card.setAttribute("tags", project.tags);
            container.appendChild(card);
        });

        console.log("Loaded projects from remote.");
    } catch (error) {
        console.error("Failed to fetch remote projects:", error);
        container.innerHTML = "<p>Error loading remote projects. Please try again later.</p>";
    }
}

class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    static get observedAttributes() {
        return ["title", "image", "description", "link", "date", "tags"];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                --card-bg: var(--form-color, black);
                --text-color: var(--light-font, white);
                --border-radius: 10px;
                
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                background: var(--card-bg);
                color: var(--text-color);
                padding: 18px;
                border-radius: var(--border-radius);
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                width: 100%;
                height: 100%;
                transition: transform 0.3s ease-in-out;
            }

            :host(:hover) {
                transform: scale(1.05);
            }

            h2, p, a {
                text-align: center;
                margin-bottom: 0.5rem;
            }

            h2 {
                font-size: 1.5rem;
                margin: 0.5rem 0;
            }

            p.date {
                font-size: 1rem;
                font-weight: bold;
                margin: 0;
            }

            picture img {
                display: flex;
                align-items: center;
                width: 100%;
                height: 30dvh;
                border-radius: var(--border-radius);
                overflow: hidden;
            }

            p {
                font-size: 1rem;
                margin: 0.5rem 0;
            }

            .meta {
                font-size: 0.9rem;
                color: var(--light-font, white);
                margin: 5px;
            }

            a {
                display: inline-block;
                background: var(--primary-color, #3498db);
                color: white;
                padding: 0.5rem 1rem;
                text-decoration: none;
                border-radius: var(--border-radius);
                text-align: center;
            }

            a:hover {
                background: var(--hover, #2980b9);
            }
        </style>
        <h2>${this.getAttribute("title") || "Project Title"}</h2>
        <p class="date">Date: ${this.getAttribute("date") || "Unknown"}</p>
        <picture>
            <img src="${this.getAttribute("image") || "default.jpg"}" 
            alt="${this.getAttribute("title") ? this.getAttribute("title") + ' preview' : 'Project image'}">
        </picture>
        <p>${this.getAttribute("description") || "Project description goes here."}</p>
        <p class="meta">Tags: ${this.getAttribute("tags") || "None"}</p>
        <a href="${this.getAttribute("link") || "#"}" target="_blank">Learn More</a>
        `;
    }
}

customElements.define("project-card", ProjectCard);