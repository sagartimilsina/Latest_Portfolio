
$(document).ready(function () {
    // Load the JSON data
    $.getJSON("/assets/json/about.json")
        .done(function (data) {
            // Populate the fields with the data
            const { aboutMe } = data;

            $("#about-description").text(aboutMe.description);
            $("#profile-picture").attr("src", aboutMe.profilePicture);
            $("#about-title").text(aboutMe.title);
            $("#about-title-description").text(" I specialize in technologies such as PHP (Laravel), AJAX, JavaScript, HTML, and CSS. My experience includes managing complex systems, developing back-end functionalities, and ensuring responsive front-end designs. As a proficient Laravel developer, I streamline application development and utilize AJAX and JavaScript to enhance user interactions, creating engaging experiences. My commitment to continuous learning pushes me to embrace new challenges and expand my skill set.");
            $("#additional-info").text("");

            // Create personal and education info
            const personalInfo = `
                    <h6 class="mb-3"><i class="fa fa-chevron-right me-2 icon-size"></i>Birthday: <span class="text-muted">${aboutMe.birthday}</span></h6>
                    <h6 class="mb-3"><i class="fa fa-chevron-right me-2 icon-size"></i>Website: <span class="text-muted">${aboutMe.website}</span></h6>
                    <h6 class="mb-3"><i class="fa fa-chevron-right me-2 icon-size"></i>Phone: <span class="text-muted">${aboutMe.phone}</span></h6>
                    <h6 class="mb-3"><i class="fa fa-chevron-right me-2 icon-size"></i>Address: <span class="text-muted">${aboutMe.address}</span></h6>
                `;
            $("#personal-info").html(personalInfo);

            const educationInfo = `
                    <h6 class="mb-3"><i class="fa fa-chevron-right me-2 icon-size"></i>Degree: <span class="text-muted">${aboutMe.degree}</span></h6>
                    <h6 class="mb-3"><i class="fa fa-chevron-right me-2 icon-size"></i>Email: <span class="text-muted">${aboutMe.email}</span></h6>
                    <h6 class="mb-3"><i class="fa fa-chevron-right me-2 icon-size"></i>Freelance: <span class="text-muted">${aboutMe.freelance}</span></h6>
                `;
            $("#education-info").html(educationInfo);
        })
        .fail(function () {
            console.error("Failed to load data.");
            $("#about-description").text("Unable to load about me information at this time.");
        });
});

// $(document).ready(function () {
//     $.getJSON("/assets/json/skills.json") // Load JSON file dynamically from your server location
//         .done(function (data) {
//             const skillsData = data.skills;
//             // Populate title and description
//             $("#skills h2").text(skillsData.title);
//             $("#skills p").text(skillsData.description);

//             const $skillsContainer = $("#skills-container");

//             skillsData.categories.forEach((category) => {
//                 // Define column size based on category
//                 const colSize = category.title === "Technical Skills" ? "col-lg-12" : "col-lg-6 col-md-6 col-sm-12";
//                 const $card = $("<div>").addClass(`card shadow mb-4 p-4 ${colSize} justify-content-between`);

//                 // Category title
//                 const $cardTitle = $("<h3>").addClass("card-title text-center").text(category.title);
//                 $card.append($cardTitle);

//                 // Create a row with gap for columns
//                 const $row = $("<div>").addClass("row g-3 mt-3"); // Added 'g-3' for consistent column spacing

//                 if (category.title === "Technical Skills") {
//                     // Divide items into 4 columns for Technical Skills
//                     const chunkSize = Math.ceil(category.items.length / 4);
//                     for (let i = 0; i < 4; i++) {
//                         const $col = $("<div>").addClass("col-lg-3 col-md-4 col-sm-6 col-12");
//                         const $list = $("<ul>").addClass("list-unstyled");

//                         category.items.slice(i * chunkSize, (i + 1) * chunkSize).forEach(item => {
//                             const $listItem = $("<li>").html(`<i class="fa fa-check-circle fa-icon" aria-hidden="true"></i> ${item}`);
//                             $list.append($listItem);
//                         });

//                         $col.append($list);
//                         $row.append($col);
//                     }
//                 } else if (category.title === "Non Technical Skills" || category.title === "Languages") {
//                     $items = category.items.length;

//                     for (let i = 0; i < $items; i++) {
//                         const $col = $("<div>").addClass("col-lg-6 col-md-6 col-sm-12");
//                         const $list = $("<ul>").addClass("list-unstyled");

//                         category.items.slice(i * chunkSize, (i + 1) * chunkSize).forEach(item => {
//                             const $listItem = $("<li>").html(`<i class="fa fa-check-circle fa-icon" aria-hidden="true"></i> ${item}`);
//                             $list.append($listItem);
//                         });

//                         $col.append($list);
//                         $row.append($col);
//                     }
//                 }

//                 // Add row to card, and card to the main container
//                 $card.append($row);
//                 $skillsContainer.append($card);
//             });
//         })
//         .fail(function () {
//             console.error("Error loading skills data");
//         });
// });



$(document).ready(function () {
    $.getJSON("/assets/json/skills.json") // Load JSON file dynamically
        .done(function (data) {
            const skillsData = data.skills;

            // Populate title and description
            $("#skills h2").text(skillsData.title);
            $("#skills p").text(skillsData.description);

            const $skillsContainer = $("#skills-container");

            skillsData.categories.forEach((category) => {
                // Define column size based on category
                const $row = $("<div>").addClass("row");
                const colSize = category.title === "Technical Skills" ? "  col-lg-12" : "col-lg-6 col-md-6 col-sm-12 ";

                const $card = $("<div>").addClass(`card shadow mb-4 p-4 ${colSize} justify-content-between`);

                // Category title
                const $cardTitle = $("<h3>").addClass("card-title text-center mb-3").text(category.title);
                $card.append($cardTitle);

                // Divide items into columns based on category
                let chunkSize = 0;

                let colClass = " col-lg-6 col-md-6 col-sm-12"; // Default for non-technical and languages

                if (category.title === "Technical Skills") {
                    chunkSize = Math.ceil(category.items.length / 4);
                    colClass = " col-lg-3 col-md-4 col-sm-6 col-12 ";
                } else if (category.title === "Non Technical Skills" || category.title === "Languages") {

                    chunkSize = Math.ceil(category.items.length / 2);

                }

                // Populate each column
                for (let i = 0; i < Math.ceil(category.items.length / chunkSize); i++) {

                    const $col = $("<div>").addClass(colClass);
                    const $list = $("<ul>").addClass("list-unstyled");

                    category.items.slice(i * chunkSize, (i + 1) * chunkSize).forEach(item => {
                        const $listItem = $("<li>").html(`<i class="fa fa-check-circle fa-icon" aria-hidden="true"></i> ${item}`);
                        $list.append($listItem);
                    });

                    $col.append($list);
                    $row.append($col);


                }

                // Add row to card, and card to the main container
                $card.append($row);

                $skillsContainer.append($card);
            });
        })
        .fail(function () {
            console.error("Error loading skills data");
        });
});







$(document).ready(function () {
    // Load the resume data
    $.getJSON("/assets/json/resume.json")
        .done(function (data) {
            const resumes = data.resume;
            resumes.forEach(resume => {
                // Start building the HTML for each resume item
                let resumeHTML = `
                    <div class="col-lg-6 col-md-12 mb-3 resume-item" data-aos="fade-up" data-aos-delay="200">
                        <div class="mb-3">
                            <h3 class="text-dark">${resume.title || ""}</h3>
                            <div class="border-left">
                                <p class="text-dark mt-3">${resume.description || ""}</p>
                `;

                // Check for bullet points in the summary section
                if (resume.bulletPoints && resume.bulletPoints.length > 0) {
                    resumeHTML += `<ul>`;
                    resume.bulletPoints.forEach(point => {
                        resumeHTML += `<li class="text-dark">${point}</li>`;
                    });
                    resumeHTML += `</ul>`;
                }

                // Check for degrees in the Education section
                if (resume.degrees && resume.degrees.length > 0) {
                    resume.degrees.forEach(degree => {
                        resumeHTML += `
                            <div class="mb-3">
                                <h4 class="text-dark">${degree.subtitle || ""}</h4>
                                <h6>${degree.date || ""}</h6>
                                <h6 class="text-muted">${degree.location || ""}</h6>
                                <p class="text-dark">${degree.description || ""}</p>
                                <ul>
                        `;

                        // Include degree bullet points
                        if (degree.bulletPoints && degree.bulletPoints.length > 0) {
                            degree.bulletPoints.forEach(point => {
                                resumeHTML += `<li class="text-dark">${point}</li>`;
                            });
                        } else {
                            resumeHTML += '<li></li>'; // Default message if no bullet points
                        }

                        resumeHTML += `</ul></div>`;
                    });
                }

                // Check if the resume has jobs
                if (resume.jobs && resume.jobs.length > 0) {
                    resumeHTML += `<div class="col-lg-12 mb-3 ">`;
                    resume.jobs.forEach(job => {
                        resumeHTML += `
                            <div class="mb-3">
                                <h4 class="text-dark">${job.jobTitle || ""}</h4>
                                <h6>${job.company || ""} - ${job.date || ""}</h6>
                                <h6 class="text-muted">${job.location || ""}</h6>
                                <ul>
                        `;

                        // Include job bullet points
                        if (job.bulletPoints && job.bulletPoints.length > 0) {
                            job.bulletPoints.forEach(point => {
                                resumeHTML += `<li class="text-dark">${point}</li>`;
                            });
                        } else {
                            resumeHTML += '<li></li>'; // Default message if no bullet points
                        }

                        resumeHTML += `</ul></div>`;
                    });
                    resumeHTML += `</div>`;
                }

                // Closing tags for the resume item
                resumeHTML += `</div></div></div>`;

                // Append to the resume container
                $("#resume-container").append(resumeHTML);
            });

            // Function to adjust heights of resume items
            adjustResumeItemHeights();

        })
        .fail(function () {
            console.error("Failed to load resume data.");
            $("#resume-container").text("Unable to load resume information at this time.");
        });

    // function adjustResumeItemHeights() {
    //     const items = $('.resume-item'); // Select all resume items

    //     // Calculate max height of items
    //     let maxHeight = 0;
    //     items.each(function () {
    //         const itemHeight = $(this).outerHeight();
    //         if (itemHeight > maxHeight) {
    //             maxHeight = itemHeight; // Find the tallest item
    //         }
    //     });

    //     // Set each item to the max height
    //     items.each(function () {
    //         $(this).css('height', maxHeight + 'px');
    //     });
    // }
});



async function loadProjects() {
    try {
        const response = await fetch('/assets/json/projects.json'); // Fetch the JSON file
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
        const response = await fetch('/assets/json/services.json'); // Fetch the JSON file
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
