
$(document).ready(function () {
    // Load the JSON data
    $.getJSON("about.json")
        .done(function (data) {
            // Populate the fields with the data
            const { aboutMe } = data;

            $("#about-description").text(aboutMe.description);
            $("#profile-picture").attr("src", aboutMe.profilePicture);
            $("#about-title").text(aboutMe.title);
            $("#about-title-description").text("Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quos officiis necessitatibus doloremque, voluptas voluptatem praesentium. Lorem ipsum dolor sit amet consectetu.");
            $("#additional-info").text("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, necessitatibus autem at voluptate vel ipsum blanditiis laboriosam provident qui aut?");

            // Create personal and education info
            const personalInfo = `
                    <h6 class="mb-2"><i class="fa fa-chevron-right me-2 icon-size"></i>Birthday: <span class="text-muted">${aboutMe.birthday}</span></h6>
                    <h6 class="mb-2"><i class="fa fa-chevron-right me-2 icon-size"></i>Website: <span class="text-muted">${aboutMe.website}</span></h6>
                    <h6 class="mb-2"><i class="fa fa-chevron-right me-2 icon-size"></i>Phone: <span class="text-muted">${aboutMe.phone}</span></h6>
                    <h6 class="mb-2"><i class="fa fa-chevron-right me-2 icon-size"></i>Address: <span class="text-muted">${aboutMe.address}</span></h6>
                `;
            $("#personal-info").html(personalInfo);

            const educationInfo = `
                    <h6 class="mb-2"><i class="fa fa-chevron-right me-2 icon-size"></i>Degree: <span class="text-muted">${aboutMe.degree}</span></h6>
                    <h6 class="mb-2"><i class="fa fa-chevron-right me-2 icon-size"></i>Email: <span class="text-muted">${aboutMe.email}</span></h6>
                    <h6 class="mb-2"><i class="fa fa-chevron-right me-2 icon-size"></i>Freelance: <span class="text-muted">${aboutMe.freelance}</span></h6>
                `;
            $("#education-info").html(educationInfo);
        })
        .fail(function () {
            console.error("Failed to load data.");
            $("#about-description").text("Unable to load about me information at this time.");
        });
});
$(document).ready(function () {
    // Load the skills data
    $.getJSON("skills.json")
        .done(function (data) {
            const skills = data.skills;
            skills.forEach((skill, index) => {
                const progressBar = `
                    <label for="progress${index + 1}">${skill.task}</label>
                    <div class="progress mb-3">
                        <div class="progress-bar" role="progressbar" style="width: ${skill.progress}%;"
                            aria-valuenow="${skill.progress}" aria-valuemin="0" aria-valuemax="100">
                            ${skill.progress}%
                        </div>
                    </div>
                `;

                // Append to the left or right column based on index
                if (index < 5) {
                    $("#skills-container-left").append(progressBar);
                } else {
                    $("#skills-container-right").append(progressBar);
                }
            });
        })
        .fail(function () {
            console.error("Failed to load skills data.");
            $("#skills-container-left, #skills-container-right").text("Unable to load skills information at this time.");
        });
});

$(document).ready(function () {
    // Load the resume data
    $.getJSON("resume.json")
        .done(function (data) {
            const resumes = data.resume;
            resumes.forEach(resume => {
                // Start building the HTML for each resume item
                let resumeHTML = `
                    <div class="col-lg-6 col-md-12 mb-3">
                        <div class="mb-3">
                            <h3 class="text-dark">${resume.title || "No Title Available"}</h3>
                            <div class="border-left">
                                <p class="text-dark mt-3">${resume.description || "No Description Available."}</p>
                `;

                // Only include subtitle if it exists
                if (resume.subtitle) {
                    resumeHTML += `
                            <h4 class="text-dark">${resume.subtitle}</h4>
                    `;
                }

                // Only include date if it exists
                if (resume.date) {
                    resumeHTML += `
                            <h6>${resume.date}</h6>
                    `;
                }

                // Only include location if it exists
                if (resume.location) {
                    resumeHTML += `
                            <h6 class="text-muted">${resume.location}</h6>
                    `;
                }

                // Include bullet points if they exist
                if (resume.bulletPoints && resume.bulletPoints.length > 0) {
                    resumeHTML += '<ul>';
                    resume.bulletPoints.forEach(point => {
                        resumeHTML += `<li class="text-dark">${point}</li>`;
                    });
                    resumeHTML += '</ul>';
                } else {
                    resumeHTML += '<p>No Bullet Points Available.</p>'; // Default message if no bullet points
                }

                // Closing tags for the resume item
                resumeHTML += `
                            </div>
                        </div>
                    </div>
                `;

                // Append to the resume container
                $("#resume-container").append(resumeHTML);
            });
        })
        .fail(function () {
            console.error("Failed to load resume data.");
            $("#resume-container").text("Unable to load resume information at this time.");
        });
});
// Function to load JSON data
async function loadProjects() {
    try {
        const response = await fetch('projects.json'); // Fetch the JSON file
        const projects = await response.json(); // Parse the JSON data

        const portfolioItemsContainer = document.getElementById('portfolio-items');

        // Iterate through the projects and create HTML elements
        projects.forEach(project => {
            const projectElement = `
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 p-3">
                    <div class="portfolio-item">
                        <div class="card shadow">
                            <div class="image">
                                <img class="card-img-top img-fluid" src="${project.image}" alt="${project.title}" height="200px" width="auto" />
                                <div class="overlay">
                                    <a href="${project.link}" class="view-link text-white"><i class="fa fa-link" aria-hidden="true"></i></a>
                                </div>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">${project.title}</h4>
                                <p class="card-text">${project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            portfolioItemsContainer.innerHTML += projectElement; // Add the project element to the container
        });
    } catch (error) {
        console.error("Error loading the projects: ", error);
    }
}

// Call the loadProjects function to fetch and display the projects
loadProjects();
// Function to load JSON data for services
async function loadServices() {
    try {
        const response = await fetch('services.json'); // Fetch the JSON file
        const services = await response.json(); // Parse the JSON data

        const servicesItemsContainer = document.getElementById('services-items');

        // Iterate through the services and create HTML elements
        services.forEach(service => {
            const serviceElement = `
                <div class="col-lg-3 col-md-4 col-12 col-sm-6 mb-3 p-3">
                    <div class="services-item">
                        <div class="card shadow">
                            <h4 class="text-dark card-header">${service.title}</h4>
                            <p class="text-indent card-body text-justify">${service.description}</p>
                        </div>
                    </div>
                </div>
            `;
            servicesItemsContainer.innerHTML += serviceElement; // Add the service element to the container
        });
    } catch (error) {
        console.error("Error loading the services: ", error);
    }
}

// Call the loadServices function to fetch and display the services
loadServices();
