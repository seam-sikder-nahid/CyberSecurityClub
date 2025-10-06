/* ========================================
   BLOG PORTAL JAVASCRIPT
   Cybersecurity Club - Uttara University
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // SEARCH FUNCTIONALITY
  // ========================================
  const searchInput = document.getElementById('blogSearchInput');
  const searchClear = document.getElementById('searchClear');
  const blogCards = document.querySelectorAll('.blog-card');
  const noResults = document.getElementById('noResults');

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      
      // Show/hide clear button
      if (searchTerm.length > 0) {
        searchClear.classList.remove('hidden');
      } else {
        searchClear.classList.add('hidden');
      }
      
      // Filter blogs
      filterBlogs(searchTerm);
    });
  }

  // Clear search button
  if (searchClear) {
    searchClear.addEventListener('click', function() {
      searchInput.value = '';
      searchClear.classList.add('hidden');
      filterBlogs('');
      searchInput.focus();
    });
  }

  // Filter blogs function
  function filterBlogs(searchTerm) {
    let visibleCount = 0;
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    
    blogCards.forEach(card => {
      const title = card.querySelector('.blog-card-title').textContent.toLowerCase();
      const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
      const author = card.querySelector('.blog-author').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.blog-tag')).map(tag => tag.textContent.toLowerCase());
      const category = card.dataset.category;
      
      const matchesSearch = !searchTerm || 
        title.includes(searchTerm) || 
        excerpt.includes(searchTerm) || 
        author.includes(searchTerm) ||
        tags.some(tag => tag.includes(searchTerm));
      
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      
      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s ease-out';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  }

  // ========================================
  // CATEGORY FILTER
  // ========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get category
      const category = this.dataset.category;
      
      // Filter blogs
      filterBlogsByCategory(category);
    });
  });

  function filterBlogsByCategory(category) {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;
    
    blogCards.forEach(card => {
      const cardCategory = card.dataset.category;
      const title = card.querySelector('.blog-card-title').textContent.toLowerCase();
      const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
      const author = card.querySelector('.blog-author').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.blog-tag')).map(tag => tag.textContent.toLowerCase());
      
      const matchesSearch = !searchTerm || 
        title.includes(searchTerm) || 
        excerpt.includes(searchTerm) || 
        author.includes(searchTerm) ||
        tags.some(tag => tag.includes(searchTerm));
      
      const matchesCategory = category === 'all' || cardCategory === category;
      
      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s ease-out';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  }

  // ========================================
  // SCROLL TO TOP BUTTON
  // ========================================
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================
  // LOAD MORE FUNCTIONALITY
  // ========================================
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const loadingIndicator = document.getElementById('loadingIndicator');
  let currentPage = 1;
  const blogsPerPage = 6;

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // Show loading indicator
      loadMoreBtn.style.display = 'none';
      loadingIndicator.classList.add('show');
      
      // Simulate loading (replace with actual API call)
      setTimeout(() => {
        // Hide loading indicator
        loadingIndicator.classList.remove('show');
        loadMoreBtn.style.display = 'inline-flex';
        
        // Show notification
        showNotification('No more articles to load', 'info');
        
        // Optionally hide the button if no more content
        // loadMoreBtn.style.display = 'none';
      }, 1500);
    });
  }

  // ========================================
  // NEWSLETTER FORM
  // ========================================
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Show loading state
      const submitBtn = this.querySelector('button');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear input
        emailInput.value = '';
        
        // Show success notification
        showNotification('Successfully subscribed to newsletter!', 'success');
      }, 1500);
    });
  }

  // ========================================
  // NOTIFICATION SYSTEM
  // ========================================
  function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'notification-container';
      document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    
    notification.innerHTML = `
      <i class="fas ${icon} notification-icon"></i>
      <span class="notification-text">${message}</span>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
      <div class="notification-progress"></div>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      removeNotification(notification);
    });
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      removeNotification(notification);
    }, 3000);
  }

  function removeNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    setTimeout(() => {
      notification.remove();
    }, 400);
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================================
  // LAZY LOADING IMAGES
  // ========================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // READING PROGRESS BAR
  // ========================================
  function updateReadingProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let progressBar = document.getElementById('readingProgress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'readingProgress';
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 4px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
      `;
      document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
  }

  window.addEventListener('scroll', updateReadingProgress);

  // ========================================
  // KEYBOARD SHORTCUTS
  // ========================================
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
      }
    }
    
    // ESC to clear search
    if (e.key === 'Escape' && searchInput === document.activeElement) {
      searchInput.value = '';
      searchClear.classList.add('hidden');
      filterBlogs('');
      searchInput.blur();
    }
  });

  // ========================================
  // ANALYTICS TRACKING (Placeholder)
  // ========================================
  function trackEvent(category, action, label) {
    // Replace with actual analytics implementation
    console.log('Track Event:', { category, action, label });
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', action, {
    //     'event_category': category,
    //     'event_label': label
    //   });
    // }
  }

  // Track blog card clicks
  document.querySelectorAll('.blog-card a').forEach(link => {
    link.addEventListener('click', function() {
      const title = this.closest('.blog-card').querySelector('.blog-card-title').textContent;
      trackEvent('Blog', 'Click', title);
    });
  });

  // Track filter usage
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      trackEvent('Filter', 'Click', this.dataset.category);
    });
  });

  // Track search usage
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (this.value.length > 2) {
          trackEvent('Search', 'Query', this.value);
        }
      }, 1000);
    });
  }

  // ========================================
  // SHARE FUNCTIONALITY
  // ========================================
  function shareArticle(url, title) {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        showNotification('Link copied to clipboard!', 'success');
      });
    }
  }

  // Add share buttons to blog cards (if needed)
  // This would require adding share button elements to the HTML

  // ========================================
  // PERFORMANCE OPTIMIZATION
  // ========================================
  
  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimize scroll events
  const optimizedScroll = debounce(() => {
    updateReadingProgress();
  }, 10);

  window.addEventListener('scroll', optimizedScroll);

  // ========================================
  // ACCESSIBILITY ENHANCEMENTS
  // ========================================
  
  // Add skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #667eea;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
  `;
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Announce filter changes to screen readers
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    announcement.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.dataset.category;
      const visibleCount = Array.from(blogCards).filter(card => 
        card.style.display !== 'none'
      ).length;
      announceToScreenReader(`Filtered to ${category}. Showing ${visibleCount} articles.`);
    });
  });

  // ========================================
  // INITIALIZATION COMPLETE
  // ========================================
  console.log('Blog Portal initialized successfully! 🚀');
});

// ========================================
// NOTIFICATION STYLES (Add to CSS or inline)
// ========================================
const notificationStyles = `
  .notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    pointer-events: none;
  }

  .notification {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    margin-bottom: 12px;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 500;
    pointer-events: auto;
    cursor: pointer;
  }

  .notification.success {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  }

  .notification.error {
    background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
  }

  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }

  .notification.hide {
    transform: translateX(400px);
    opacity: 0;
  }

  .notification-icon {
    font-size: 18px;
  }

  .notification-text {
    flex: 1;
  }

  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  .notification-close:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .notification-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0 0 12px 12px;
    transform-origin: left;
    animation: progressBar 3s linear forwards;
  }

  @keyframes progressBar {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
  }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
