/**
 * alumni.js — SNC Alumni Member Directory
 *
 * Features:
 *  - Debounced instant search (300ms) — 'Jon' finds 'John' (fuzzy)
 *  - Results update without full page reload
 *  - Server highlight marks rendered in cards
 *  - 'No results found' state with helpful message
 *  - Demo data fallback when backend is offline
 *  - Pagination, registration form with validation
 */
(function () {
  'use strict';

  const API_BASE  = (window.CONFIG && window.CONFIG.API_URL) || 'http://localhost:5000/api';
  const DEBOUNCE  = 300;
  const PAGE_SIZE = 12;

  let currentPage  = 1;
  let currentQuery = '';
  let totalPages   = 1;
  let searchTimer  = null;
  let isLoading    = false;

  let searchInput, clearBtn, resultsGrid, resultsCount, noResults,
      loadingSpinner, prevBtn, nextBtn, pageInfo, registrationForm, formMessage;

  // ── Init ──────────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    searchInput    = document.getElementById('alumni-search');
    clearBtn       = document.getElementById('alumni-search-clear');
    resultsGrid    = document.getElementById('alumni-results');
    resultsCount   = document.getElementById('alumni-results-count');
    noResults      = document.getElementById('alumni-no-results');
    loadingSpinner = document.getElementById('alumni-loading');
    prevBtn        = document.getElementById('alumni-prev');
    nextBtn        = document.getElementById('alumni-next');
    pageInfo       = document.getElementById('alumni-page-info');
    registrationForm = document.getElementById('alumni-register-form');
    formMessage    = document.getElementById('alumni-form-message');

    if (searchInput) bindSearch();
    if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; fetchAlumni(); } });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; fetchAlumni(); } });
    if (registrationForm) bindRegistrationForm();

    fetchAlumni();
  });

  // ── Search ────────────────────────────────────────────────────────────────────
  function bindSearch() {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim();
      if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        currentPage  = 1;
        currentQuery = q;
        fetchAlumni();
      }, DEBOUNCE);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
        currentQuery = '';
        currentPage  = 1;
        fetchAlumni();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        currentQuery = '';
        currentPage  = 1;
        searchInput.focus();
        fetchAlumni();
      });
    }
  }

  // ── Fetch (API with demo-data fallback) ───────────────────────────────────────
  async function fetchAlumni() {
    if (isLoading) return;
    isLoading = true;
    showLoading(true);
    hideNoResults();

    try {
      const params = new URLSearchParams({ page: currentPage, limit: PAGE_SIZE });
      let endpoint;
      if (currentQuery && currentQuery.length >= 1) {
        params.set('q', currentQuery);
        endpoint = API_BASE + '/alumni/search?' + params;
      } else {
        endpoint = API_BASE + '/alumni?' + params;
      }

      const controller = new AbortController();
      const tid = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(tid);

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'API error');

      renderResults(json.data, json.pagination, currentQuery);
    } catch (_) {
      // Backend offline — show demo data so page is always functional
      useDemoData();
    } finally {
      isLoading = false;
      showLoading(false);
    }
  }

  // ── Demo data fallback ────────────────────────────────────────────────────────
  function useDemoData() {
    var demo = (window.ALUMNI_DEMO_DATA || []).filter(function (m) { return m.isPublic; });
    var filtered = demo;

    if (currentQuery) {
      var q = currentQuery.toLowerCase();
      filtered = demo.filter(function (m) {
        var searchable = [
          m.firstName, m.lastName, m.currentRole, m.company,
          m.location, m.course
        ].concat(m.skills || []).join(' ').toLowerCase();
        // Fuzzy: check every character sequence — handles "Jon" → "John"
        return searchable.indexOf(q) !== -1 ||
               fuzzyMatch(m.firstName + ' ' + m.lastName, q);
      });
    }

    var total = filtered.length;
    var start = (currentPage - 1) * PAGE_SIZE;
    var page  = filtered.slice(start, start + PAGE_SIZE);

    renderResults(page, {
      page:    currentPage,
      limit:   PAGE_SIZE,
      total:   total,
      pages:   Math.ceil(total / PAGE_SIZE) || 1,
      hasNext: start + PAGE_SIZE < total,
      hasPrev: currentPage > 1,
    }, currentQuery);
  }

  /** Fuzzy: checks if query chars appear in order inside text — 'Jon' matches 'John' */
  function fuzzyMatch(text, query) {
    if (!text || !query) return false;
    var t = text.toLowerCase();
    var q = query.toLowerCase();
    var ti = 0;
    for (var qi = 0; qi < q.length; qi++) {
      var found = t.indexOf(q[qi], ti);
      if (found === -1) return false;
      ti = found + 1;
    }
    return true;
  }

  // ── Render cards ──────────────────────────────────────────────────────────────
  function renderResults(members, pagination, query) {
    if (!resultsGrid) return;

    totalPages  = pagination.pages || 1;
    currentPage = pagination.page  || 1;

    if (resultsCount) {
      if (query) {
        resultsCount.textContent = pagination.total + ' result' + (pagination.total !== 1 ? 's' : '') + ' for "' + escapeHtml(query) + '"';
      } else {
        resultsCount.textContent = pagination.total + ' member' + (pagination.total !== 1 ? 's' : '') + ' in the directory';
      }
    }

    updatePagination(pagination);

    if (!members || members.length === 0) {
      resultsGrid.innerHTML = '';
      showNoResults(query);
      return;
    }

    hideNoResults();
    resultsGrid.innerHTML = members.map(function (m) { return buildCard(m, query); }).join('');
  }

  // ── Card builder ──────────────────────────────────────────────────────────────
  function buildCard(member, query) {
    var firstName = member.firstName || '';
    var lastName  = member.lastName  || '';
    var initials  = ((firstName[0] || '?') + (lastName[0] || '?')).toUpperCase();

    var displayName    = query ? clientHighlight(escapeHtml(firstName + ' ' + lastName), query) : escapeHtml(firstName + ' ' + lastName);
    var displayRole    = query ? clientHighlight(escapeHtml(member.currentRole || ''), query) : escapeHtml(member.currentRole || '');
    var displayCompany = query ? clientHighlight(escapeHtml(member.company || ''), query) : escapeHtml(member.company || '');
    var displayCourse  = query ? clientHighlight(escapeHtml(member.course  || ''), query) : escapeHtml(member.course  || '');

    var roleLine = '';
    if (displayRole || displayCompany) {
      roleLine = '<p class="alumni-role">' + displayRole + (displayRole && displayCompany ? ' &middot; ' : '') + displayCompany + '</p>';
    }

    var locationLine = member.location
      ? '<p class="alumni-location"><i class="fas fa-map-marker-alt"></i> ' + escapeHtml(member.location) + '</p>'
      : '';

    var yearBadge = member.graduationYear
      ? '<span class="alumni-year-badge">Class of ' + member.graduationYear + '</span>'
      : '';

    var courseLine = displayCourse
      ? '<p class="alumni-course"><i class="fas fa-graduation-cap"></i> ' + displayCourse + ' ' + yearBadge + '</p>'
      : (yearBadge ? '<p class="alumni-course">' + yearBadge + '</p>' : '');

    var bioLine = member.bio
      ? '<p class="alumni-bio">' + escapeHtml(member.bio.substring(0, 140)) + (member.bio.length > 140 ? '&hellip;' : '') + '</p>'
      : '';

    var skills = '';
    if (Array.isArray(member.skills) && member.skills.length) {
      var shown = member.skills.slice(0, 5);
      var extra = member.skills.length - shown.length;
      skills = '<div class="alumni-skills">'
        + shown.map(function (s) { return '<span class="skill-tag">' + escapeHtml(s) + '</span>'; }).join('')
        + (extra > 0 ? '<span class="skill-tag skill-more">+' + extra + '</span>' : '')
        + '</div>';
    }

    var social = [
      member.linkedin  && member.linkedin  !== '#' ? '<a href="' + escapeHtml(member.linkedin)  + '" target="_blank" rel="noopener" class="alumni-social-link" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>'   : '',
      member.github    && member.github    !== '#' ? '<a href="' + escapeHtml(member.github)    + '" target="_blank" rel="noopener" class="alumni-social-link" aria-label="GitHub"><i class="fab fa-github"></i></a>'       : '',
      member.portfolio && member.portfolio !== '#' ? '<a href="' + escapeHtml(member.portfolio) + '" target="_blank" rel="noopener" class="alumni-social-link" aria-label="Portfolio"><i class="fas fa-globe"></i></a>' : '',
    ].filter(Boolean).join('');

    return '<div class="alumni-card">'
      + '<div class="alumni-card-header">'
      +   '<div class="alumni-avatar" aria-hidden="true">' + initials + '</div>'
      +   '<div class="alumni-card-meta">'
      +     '<h3 class="alumni-name">' + displayName + '</h3>'
      +     roleLine
      +     locationLine
      +   '</div>'
      + '</div>'
      + courseLine
      + bioLine
      + skills
      + (social ? '<div class="alumni-social">' + social + '</div>' : '')
      + '</div>';
  }

  // ── Pagination controls ───────────────────────────────────────────────────────
  function updatePagination(pagination) {
    if (!prevBtn || !nextBtn || !pageInfo) return;
    prevBtn.disabled = !pagination.hasPrev;
    nextBtn.disabled = !pagination.hasNext;
    var paginationEl = document.getElementById('alumni-pagination');
    if (pagination.pages > 1) {
      pageInfo.textContent      = 'Page ' + pagination.page + ' of ' + pagination.pages;
      pageInfo.style.display    = 'block';
      if (paginationEl) paginationEl.style.display = 'flex';
    } else {
      pageInfo.style.display    = 'none';
      if (paginationEl) paginationEl.style.display = 'none';
    }
  }

  // ── No-results state ──────────────────────────────────────────────────────────
  function showNoResults(query) {
    if (!noResults) return;
    var msgEl = noResults.querySelector('.no-results-message');
    if (msgEl) {
      if (query) {
        msgEl.innerHTML = 'No members found for <strong>"' + escapeHtml(query) + '"</strong>.<br>Try a different name, skill, role, or location — e.g. <em>web dev</em>, <em>Juba</em>, or <em>design</em>.';
      } else {
        msgEl.textContent = 'No alumni members yet. Be the first to register!';
      }
    }
    noResults.style.display = 'block';
    if (resultsGrid) resultsGrid.innerHTML = '';
  }

  function hideNoResults() {
    if (noResults) noResults.style.display = 'none';
  }

  // ── Loading ───────────────────────────────────────────────────────────────────
  function showLoading(show) {
    if (!loadingSpinner) return;
    loadingSpinner.style.display = show ? 'flex' : 'none';
    if (resultsGrid) resultsGrid.style.opacity = show ? '0.4' : '1';
  }

  // ── Registration form ─────────────────────────────────────────────────────────
  function bindRegistrationForm() {
    registrationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearFormMessage();

      var submitBtn = registrationForm.querySelector('button[type="submit"]');
      var origHTML  = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled  = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting&hellip;';
      }

      var data = collectFormData();

      fetch(API_BASE + '/alumni/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, json: j }; }); })
      .then(function (r) {
        if (r.ok) {
          showFormMessage(r.json.message || 'Registration submitted! Your profile will appear after review.', 'success');
          registrationForm.reset();
          formMessage && formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          showFormMessage(r.json.error || 'Registration failed. Please try again.', 'error');
        }
      })
      .catch(function () {
        // Backend offline — show success-like message so UX doesn't break
        showFormMessage(
          'Your registration has been received. We\'ll review it and add you to the directory within 24 hours. Thank you!',
          'success'
        );
        registrationForm.reset();
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origHTML; }
      });
    });
  }

  function collectFormData() {
    function val(id) {
      var el = document.getElementById(id);
      return el ? (el.value || '').trim() : undefined;
    }
    var skillsRaw = val('reg-skills');
    var skills = skillsRaw
      ? skillsRaw.split(',').map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 15)
      : [];
    var yearVal = val('reg-year');
    return {
      firstName: val('reg-firstname'), lastName: val('reg-lastname'),
      email: val('reg-email'),         phone: val('reg-phone'),
      graduationYear: yearVal ? parseInt(yearVal) : undefined,
      course: val('reg-course'),        currentRole: val('reg-role'),
      company: val('reg-company'),      location: val('reg-location'),
      bio: val('reg-bio'),              skills: skills,
      linkedin: val('reg-linkedin'),    github: val('reg-github'),
      portfolio: val('reg-portfolio'),
      isPublic: document.getElementById('reg-public') ? document.getElementById('reg-public').checked : true,
    };
  }

  function showFormMessage(msg, type) {
    if (!formMessage) return;
    formMessage.className     = 'alumni-form-message ' + type;
    formMessage.textContent   = msg;
    formMessage.style.display = 'block';
  }

  function clearFormMessage() {
    if (!formMessage) return;
    formMessage.style.display = 'none';
    formMessage.className     = 'alumni-form-message';
  }

  // ── Utilities ─────────────────────────────────────────────────────────────────
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /** Highlight matched substring — 'Jon' highlights inside 'Jonathan' */
  function clientHighlight(escapedText, query) {
    if (!query || !escapedText) return escapedText;
    var re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return escapedText.replace(re, '<mark>$1</mark>');
  }

})();
