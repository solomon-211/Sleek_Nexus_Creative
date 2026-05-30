// Course Enrollment Status Manager
(function() {
    function checkEnrollmentStatus() {
        const status = localStorage.getItem('all_courses_status') || 'closed';
        const enrolled = parseInt(localStorage.getItem('total_enrolled') || '0');
        const sessionStart = localStorage.getItem('session_start') || '';
        const deadline = localStorage.getItem('enrollment_deadline') || '';
        const enrollButtons = document.querySelectorAll('.enroll-btn');
        const statusContainer = document.getElementById('course-status-container');
        
        // Check capacity and auto-close
        if (enrolled >= 50 && status === 'open') {
            localStorage.setItem('all_courses_status', 'closed');
            logActivity('AUTO-CLOSED', 'Enrollment automatically closed - capacity reached (50/50)');
        }
        
        // Check deadline and auto-close
        if (status === 'open' && deadline) {
            const now = new Date().getTime();
            const end = new Date(deadline + 'T23:59:59').getTime();
            if (now > end) {
                localStorage.setItem('all_courses_status', 'closed');
                logActivity('AUTO-CLOSED', 'Enrollment automatically closed - deadline reached');
            }
        }
        
        const finalStatus = localStorage.getItem('all_courses_status') || 'closed';
        
        if (finalStatus === 'closed') {
            enrollButtons.forEach(btn => {
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
                btn.style.pointerEvents = 'none';
                btn.textContent = 'Enrollment Closed';
            });
            
            if (statusContainer) {
                statusContainer.innerHTML = `
                    <div style="background: #ffebee; border: 2px solid #d32f2f; border-radius: 10px; padding: 2rem; margin-top: 2rem; text-align: center;">
                        <i class="fas fa-lock" style="font-size: 3rem; color: #d32f2f; margin-bottom: 1rem;"></i>
                        <h3 style="color: #d32f2f; margin-bottom: 0.5rem;">Course Enrollment Currently Closed</h3>
                        <p style="color: #666; margin: 0;">Enrollment will open soon. Contact us at <a href="mailto:info@SNC.ss" style="color: #c41e3a;">info@SNC.ss</a> for updates.</p>
                    </div>
                `;
            }
        } else {
            enrollButtons.forEach(btn => {
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
                btn.style.pointerEvents = 'auto';
                btn.textContent = 'Enroll Now';
            });
            
            if (statusContainer) {
                const openDate = sessionStart ? new Date(sessionStart).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : '';
                const deadlineDate = deadline ? new Date(deadline).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : '';
                
                statusContainer.innerHTML = `
                    <div style="background: #e8f5e9; border: 2px solid #2e7d32; border-radius: 10px; padding: 2rem; margin-top: 2rem; text-align: center;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #2e7d32; margin-bottom: 1rem;"></i>
                        <h3 style="color: #2e7d32; margin-bottom: 0.5rem;">Enrollment Now Open!</h3>
                        <p style="color: #666; margin-bottom: 1.5rem;">Secure your spot in our professional tech training programs.</p>
                        <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                            <div style="text-align: center;">
                                <p style="margin: 0; color: #666; font-size: 0.9rem;">Maximum Capacity Per Course</p>
                                <p style="margin: 0; font-size: 1.5rem; font-weight: 700; color: #2e7d32;">50 Students</p>
                            </div>
                            ${openDate ? `
                            <div style="text-align: center;">
                                <p style="margin: 0; color: #666; font-size: 0.9rem;">Application Opens</p>
                                <p style="margin: 0; font-size: 1.5rem; font-weight: 600; color: #333;">${openDate}</p>
                            </div>
                            ` : ''}
                            ${deadlineDate ? `
                            <div style="text-align: center;">
                                <p style="margin: 0; color: #666; font-size: 0.9rem;">Application Deadline</p>
                                <p style="margin: 0; font-size: 1.5rem; font-weight: 600; color: #c41e3a;">${deadlineDate}</p>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }
        }
        
        // Remove capacity badges from course cards
        document.querySelectorAll('.course-card').forEach(card => {
            const badge = card.querySelector('.capacity-badge');
            if (badge) badge.remove();
        });
    }
    
    function logActivity(action, details) {
        const logs = JSON.parse(localStorage.getItem('activity_log') || '[]');
        logs.unshift({
            timestamp: new Date().toISOString(),
            action: action,
            details: details
        });
        if (logs.length > 50) logs.pop();
        localStorage.setItem('activity_log', JSON.stringify(logs));
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkEnrollmentStatus);
    } else {
        checkEnrollmentStatus();
    }
    
    // Check every minute for deadline
    setInterval(checkEnrollmentStatus, 60000);
})();
