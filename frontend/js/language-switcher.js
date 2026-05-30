// Language Switcher
let currentLang = localStorage.getItem('language') || 'en';
let translations = {};

// Load translations
fetch('../js/translations.json')
  .then(response => response.json())
  .then(data => {
    translations = data;
    applyLanguage(currentLang);
  });

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  applyLanguage(lang);
  
  // Update HTML dir attribute for RTL
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    let value = t;
    
    for (const k of keys) {
      value = value[k];
      if (!value) break;
    }
    
    if (value) {
      element.textContent = value;
    }
  });
  
  // Update language toggle button
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.textContent = lang === 'en' ? 'العربية' : 'English';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
});
