document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("crud-form");
    const projectList = document.getElementById("project-list");
    const editIndex = document.getElementById("edit-index");

    function loadProjects() {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        projectList.innerHTML = "";
        projects.forEach((project, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${project.title}</strong> 
                <button onclick="editProject(${index})">Edit</button>
                <button onclick="deleteProject(${index})">Delete</button>
            `;
            projectList.appendChild(li);
        });
    }

    function saveProject(event) {
        event.preventDefault();
        const projects = JSON.parse(localStorage.getItem("projects")) || [];

        const newProject = {
            title: document.getElementById("title").value,
            image: document.getElementById("image").value,
            description: document.getElementById("description").value,
            link: document.getElementById("link").value,
            tags: document.getElementById("tags").value
        };

        if (editIndex.value) {
            projects[editIndex.value] = newProject;
        } else {
            projects.push(newProject);
        }

        localStorage.setItem("projects", JSON.stringify(projects));
        form.reset();
        editIndex.value = "";
        loadProjects();
    }

    function editProject(index) {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const project = projects[index];

        document.getElementById("title").value = project.title;
        document.getElementById("image").value = project.image;
        document.getElementById("description").value = project.description;
        document.getElementById("link").value = project.link;
        document.getElementById("tags").value = project.tags;
        editIndex.value = index;
    }

    function deleteProject(index) {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
        loadProjects();
    }

    form.addEventListener("submit", saveProject);
    loadProjects();
});
