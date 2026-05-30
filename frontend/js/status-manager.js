// Application Status Manager - Dynamically loads status from admin panel

function loadApplicationStatus() {
    // Load Internship Status (careers.html)
    const internshipContainer = document.getElementById('internship-status-container');
    if (internshipContainer) {
        const status = localStorage.getItem('internship_status') || 'closed';
        const link = localStorage.getItem('internship_link') || '';
        
        if (status === 'open' && link) {
            internshipContainer.innerHTML = `
                <div class="application-status">
                    <span class="status-badge open"><i class="fas fa-check-circle"></i> Applications Now Open</span>
                    <h3>Apply for Our Internship Program</h3>
                    <p><strong>Deadline:</strong> Rolling admissions - Apply early!</p>
                    <p>Join our transformative internship program and gain hands-on experience in cutting-edge technology projects.</p>
                    <a href="${link}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Apply Now
                    </a>
                </div>
            `;
        } else {
            internshipContainer.innerHTML = `
                <div class="application-status">
                    <span class="status-badge closed"><i class="fas fa-times-circle"></i> Applications Closed</span>
                    <h3>Internship Applications Currently Closed</h3>
                    <p>We're not accepting new applications at this time. Subscribe to our newsletter below to be notified when applications reopen.</p>
                </div>
            `;
        }
    }

    // Load Course Status (courses.html)
    const courseContainer = document.getElementById('course-status-container');
    if (courseContainer) {
        const status = localStorage.getItem('all_courses_status') || localStorage.getItem('course_status') || 'closed';
        const link = localStorage.getItem('course_link') || 'enroll.html';
        const date = localStorage.getItem('session_start') || localStorage.getItem('course_date') || '';
        
        if (status === 'open' && link) {
            courseContainer.innerHTML = `
                <div class="application-status" style="margin: 2rem auto; max-width: 600px;">
                    <span class="status-badge open"><i class="fas fa-check-circle"></i> Enrollment Now Open</span>
                    <h3>Enroll in Our Next Cohort</h3>
                    ${date ? `<p><strong>Next Session Starts:</strong> ${date}</p>` : ''}
                    <p>Limited seats available. Secure your spot in our upcoming training program today!</p>
                    <a href="${link}" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Enroll Now
                    </a>
                </div>
            `;
        } else {
            courseContainer.innerHTML = `
                <div class="application-status" style="margin: 2rem auto; max-width: 600px;">
                    <span class="status-badge closed"><i class="fas fa-times-circle"></i> Enrollment Currently Closed</span>
                    <h3>Next Cohort Coming Soon</h3>
                    <p>Course enrollment is currently closed. Join our mailing list to be notified when registration opens for the next cohort.</p>
                    <div class="cta-buttons">
                        <a href="contact.html" class="btn btn-secondary">Request Course Info</a>
                    </div>
                </div>
            `;
        }
    }

    // Load Project Status (index.html)
    const projectContainer = document.getElementById('project-status-container');
    if (projectContainer) {
        const status = localStorage.getItem('project_status') || 'closed';
        const link = localStorage.getItem('project_link') || '';
        
        if (status === 'open' && link) {
            projectContainer.innerHTML = `
                <div class="application-status" style="margin: 2rem auto; max-width: 700px;">
                    <span class="status-badge open"><i class="fas fa-check-circle"></i> Now Accepting New Projects</span>
                    <h3>Start Your Project Today</h3>
                    <p>We're currently accepting new project requests. Share your requirements and let's build something amazing together!</p>
                    <a href="${link}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Submit Project Request
                    </a>
                </div>
            `;
        } else {
            projectContainer.innerHTML = `
                <div class="cta-buttons">
                    <a href="contact.html" class="btn btn-primary">Contact Us Today</a>
                    <a href="services.html" class="btn btn-secondary">Explore Services</a>
                </div>
            `;
        }
    }
}

// Load status when page loads
document.addEventListener('DOMContentLoaded', loadApplicationStatus);

// React immediately when status changes in another tab/window.
window.addEventListener('storage', (event) => {
    const watchedKeys = [
        'internship_status', 'internship_link',
        'all_courses_status', 'course_status', 'course_link', 'course_date', 'session_start',
        'project_status', 'project_link'
    ];

    if (!event.key || watchedKeys.includes(event.key)) {
        loadApplicationStatus();
    }
});

// Keep status reasonably fresh in same-tab long sessions.
setInterval(loadApplicationStatus, 30000);
