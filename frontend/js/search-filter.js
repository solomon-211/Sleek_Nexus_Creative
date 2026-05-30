/**
 * Advanced Search & Filter System
 * Real-time search with filtering and sorting capabilities
 */

class SearchFilterManager {
  constructor(config = {}) {
    this.config = {
      searchSelector: '[data-searchable]',
      filterSelector: '[data-filter]',
      sortSelector: '[data-sort]',
      noResultsText: 'No results found',
      ...config
    };

    this.items = [];
    this.filtered = [];
    this.searchTerm = '';
    this.filters = {};
    this.sortBy = null;
    this.init();
  }

  init() {
    this.loadItems();
    this.setupSearch();
    this.setupFilters();
    this.setupSort();
  }

  /**
   * Load searchable items from DOM
   */
  loadItems() {
    document.querySelectorAll(this.config.searchSelector).forEach(el => {
      this.items.push({
        element: el,
        id: el.id || Math.random().toString(36).substr(2, 9),
        text: el.textContent.toLowerCase(),
        data: this.extractItemData(el)
      });
    });

    this.filtered = [...this.items];
  }

  /**
   * Extract data attributes from item
   */
  extractItemData(element) {
    const data = {};
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        data[attr.name.replace('data-', '')] = attr.value.toLowerCase();
      }
    });
    return data;
  }

  /**
   * Setup search functionality
   */
  setupSearch() {
    document.addEventListener('input', (e) => {
      if (e.target.matches('[data-search], .search-input, input[type="search"]')) {
        this.searchTerm = e.target.value.toLowerCase();
        this.applyFilters();
      }
    });
  }

  /**
   * Setup filters
   */
  setupFilters() {
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-filter]')) {
        const filterName = e.target.dataset.filter;
        const filterValue = e.target.value;

        if (e.target.type === 'checkbox') {
          if (!this.filters[filterName]) {
            this.filters[filterName] = [];
          }

          if (e.target.checked) {
            this.filters[filterName].push(filterValue);
          } else {
            this.filters[filterName] = this.filters[filterName].filter(v => v !== filterValue);
          }
        } else {
          this.filters[filterName] = filterValue;
        }

        this.applyFilters();
      }
    });
  }

  /**
   * Setup sorting
   */
  setupSort() {
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-sort]')) {
        this.sortBy = e.target.value;
        this.applySort();
      }
    });
  }

  /**
   * Apply all filters and search
   */
  applyFilters() {
    this.filtered = this.items.filter(item => {
      // Search filter
      if (this.searchTerm && !item.text.includes(this.searchTerm)) {
        return false;
      }

      // Category filters
      for (const [key, value] of Object.entries(this.filters)) {
        if (Array.isArray(value) && value.length > 0) {
          const itemValue = item.data[key];
          if (!value.includes(itemValue)) {
            return false;
          }
        } else if (typeof value === 'string' && value) {
          const itemValue = item.data[key];
          if (itemValue !== value) {
            return false;
          }
        }
      }

      return true;
    });

    this.applySort();
    this.render();
  }

  /**
   * Apply sorting
   */
  applySort() {
    if (!this.sortBy) return;

    this.filtered.sort((a, b) => {
      const aValue = a.data[this.sortBy] || '';
      const bValue = b.data[this.sortBy] || '';

      // Numeric sort
      if (!isNaN(aValue) && !isNaN(bValue)) {
        return parseInt(aValue) - parseInt(bValue);
      }

      // String sort
      return aValue.localeCompare(bValue);
    });
  }

  /**
   * Render filtered results
   */
  render() {
    const container = document.querySelector('[data-search-container]');
    if (!container) return;

    if (this.filtered.length === 0) {
      container.innerHTML = `<div class="no-results">${this.config.noResultsText}</div>`;
      return;
    }

    // Hide/show items
    this.items.forEach(item => {
      item.element.style.display = this.filtered.includes(item) ? '' : 'none';
    });

    // Animate
    this.filtered.forEach((item, index) => {
      item.element.style.animation = `fadeIn 0.3s ease-in ${index * 50}ms both`;
    });
  }

  /**
   * Get search results
   */
  getResults() {
    return this.filtered;
  }

  /**
   * Clear all filters
   */
  clearFilters() {
    this.filters = {};
    this.searchTerm = '';
    this.sortBy = null;

    // Reset UI
    document.querySelectorAll('[data-filter], [data-search], [data-sort]').forEach(el => {
      if (el.type === 'checkbox') {
        el.checked = false;
      } else {
        el.value = '';
      }
    });

    this.applyFilters();
  }

  /**
   * Get filter options
   */
  getFilterOptions(filterName) {
    const options = new Set();
    this.items.forEach(item => {
      if (item.data[filterName]) {
        options.add(item.data[filterName]);
      }
    });
    return Array.from(options);
  }
}

// Initialize
const searchFilterManager = new SearchFilterManager();
window.searchFilterManager = searchFilterManager;

// Add CSS animations
(function () {
  const s = document.createElement('style');
  s.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .no-results { text-align: center; padding: 40px 20px; color: #666; font-size: 16px; }
  [data-search-container] { transition: opacity 0.3s ease; }
  [data-searchable]:not([style*="display: none"]) { transition: opacity 0.3s ease; }
  [data-searchable][style*="display: none"] { display: none !important; }
`;
  document.head.appendChild(s);
})();
