


document.addEventListener('DOMContentLoaded', () => {
    const typedElement = document.querySelector('.typed');
    const roles = ["Frontend Developer", "PHP and Laravel Developer", "Electrician"];
    let currentRoleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 1000; // Delay before starting to delete or type next word

    function type() {
        const currentRole = roles[currentRoleIndex];
        let displayedText = currentRole.slice(0, charIndex);

        // Show the currently typed portion
        typedElement.textContent = displayedText;

        if (!isDeleting) {
            // Typing: increment the character index
            if (charIndex < currentRole.length) {
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // Word completed, wait and then start deleting
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(type, delayBetweenRoles);
                }, delayBetweenRoles);
            }
        } else {
            // Deleting: decrement the character index
            if (charIndex > 0) {
                charIndex--;
                setTimeout(type, deletingSpeed);
            } else {
                // Word deleted, switch to the next role
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                setTimeout(type, typingSpeed);
            }
        }
    }
    // Start typing initially
    type();
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebar = document.getElementById('sidebar');
    const barsIcon = document.querySelector('.show-bars');
    const timesIcon = document.querySelector('.show-times');

    // Intersection Observer for active link highlighting
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${id}"]`);

            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        barsIcon.style.display = sidebar.classList.contains('active') ? 'none' : 'inline-block';
        timesIcon.style.display = sidebar.classList.contains('active') ? 'inline-block' : 'none';
    }

    // Attach toggle function to the icons
    barsIcon.addEventListener('click', toggleSidebar);
    timesIcon.addEventListener('click', toggleSidebar);

    // Close sidebar on menu item click for screens <= 1200px and set active class
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Remove active class from all links and set it for clicked link
            navLinks.forEach(link => link.classList.remove('active'));
            event.currentTarget.classList.add('active');

            // Close sidebar if screen width is <= 1200px
            if (window.innerWidth <= 1200) {
                sidebar.classList.remove('active');
                barsIcon.style.display = 'inline-block';
                timesIcon.style.display = 'none';
            }
        });
    });
});
// Show button when scrolling down





