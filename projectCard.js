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

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("projects-container");

    try {
        const response = await fetch("projects.json");
        const projects = await response.json();
        localStorage.setItem("projects", JSON.stringify(projects));
    } catch (error) {
        console.error("Failed to fetch projects. Loading from localStorage.");
    }

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
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
});
