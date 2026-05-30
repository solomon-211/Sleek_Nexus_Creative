// WhatsApp Integration
const whatsappNumber = '211925277700'; // South Sudan number

// Back to Top Button
const backToTop = document.createElement('div');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Loading Spinner
window.addEventListener('load', () => {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.classList.add('hidden');
    }
});

// Fallback - hide spinner after 2 seconds no matter what
setTimeout(() => {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) spinner.classList.add('hidden');
}, 2000);

// Google Analytics (Replace with your tracking ID)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA4 ID
