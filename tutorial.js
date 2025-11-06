// ===== TUTORIAL INTERACTIVE FEATURES =====
// Implements: localStorage persistence, progress tracking, solution toggles, and export

(function() {
  'use strict';

  // ===== 1. RESPONSE TEXTAREA PERSISTENCE =====
  function initResponseAreas() {
    const responseAreas = document.querySelectorAll('.response-area');

    responseAreas.forEach(textarea => {
      // Restore saved response
      const responseKey = getResponseKey(textarea);
      const savedResponse = getFromStorage('responses', {})[responseKey];
      if (savedResponse) {
        textarea.value = savedResponse;
      }

      // Auto-save on input with debounce
      let saveTimeout;
      textarea.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          saveResponse(this);
          showSaveIndicator(this);
        }, 500);
      });
    });
  }

  function getResponseKey(textarea) {
    const section = textarea.dataset.section;
    const question = textarea.dataset.question;
    return `${section}-${question}`;
  }

  function saveResponse(textarea) {
    const responses = getFromStorage('responses') || {};
    const key = getResponseKey(textarea);
    responses[key] = textarea.value;
    saveToStorage('responses', responses);
  }

  function showSaveIndicator(textarea) {
    const indicator = textarea.parentElement.querySelector('.save-indicator');
    if (indicator) {
      indicator.classList.add('visible');
      setTimeout(() => {
        indicator.classList.remove('visible');
      }, 2000);
    }
  }

  // ===== 2. CHECKPOINT PERSISTENCE =====
  function initCheckpoints() {
    const checkboxes = document.querySelectorAll('.checkpoint input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
      // Restore saved state
      const checkpointId = checkbox.dataset.checkpoint;
      const savedCheckpoints = getFromStorage('checkpoints') || {};
      if (savedCheckpoints[checkpointId]) {
        checkbox.checked = true;
        checkbox.closest('.checkpoint').classList.add('completed');
      }

      // Save on change
      checkbox.addEventListener('change', function() {
        const checkpoints = getFromStorage('checkpoints') || {};
        checkpoints[checkpointId] = this.checked;
        saveToStorage('checkpoints', checkpoints);

        // Update visual state
        const checkpointBox = this.closest('.checkpoint');
        if (this.checked) {
          checkpointBox.classList.add('completed');
        } else {
          checkpointBox.classList.remove('completed');
        }

        // Update progress
        updateProgress();
      });
    });

    // Initial progress update
    updateProgress();
  }

  // ===== 3. PROGRESS TRACKING =====
  function updateProgress() {
    // Count completion checkpoints (those ending with "-complete")
    const completionCheckboxes = document.querySelectorAll('.checkpoint input[data-checkpoint$="-complete"]');
    const totalSections = completionCheckboxes.length;
    const completedSections = Array.from(completionCheckboxes).filter(cb => cb.checked).length;

    const percentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;

    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = percentage + '%';
    }

    // Update progress text
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
      progressText.textContent = `Progress: ${completedSections}/${totalSections} sections • ${percentage}%`;
    }
  }

  // ===== 4. SOLUTION TOGGLES =====
  function initSolutionToggles() {
    const toggleButtons = document.querySelectorAll('.show-solution');

    toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        const solutionId = this.dataset.solution;
        const solutionBox = document.querySelector(`.solution-box[data-solution-id="${solutionId}"]`);

        if (solutionBox) {
          const isHidden = solutionBox.classList.contains('hidden');

          if (isHidden) {
            solutionBox.classList.remove('hidden');
            this.textContent = 'Hide Solution';
          } else {
            solutionBox.classList.add('hidden');
            this.textContent = 'Show Solution';
          }
        }
      });
    });
  }

  // ===== 5. EXPORT RESPONSES =====
  function initExportButton() {
    const exportButton = document.getElementById('export-responses');

    if (exportButton) {
      exportButton.addEventListener('click', function() {
        const responses = getFromStorage('responses') || {};

        if (Object.keys(responses).length === 0) {
          alert('You haven\'t written any responses yet!');
          return;
        }

        // Build formatted text
        let exportText = 'SIDEBAR TO MOBILE NAV TUTORIAL - MY RESPONSES\n';
        exportText += '='.repeat(50) + '\n\n';

        // Group by section
        const sections = {};
        Object.keys(responses).forEach(key => {
          const [section, question] = key.split('-').slice(0, 2);
          const sectionKey = `${section}`;
          if (!sections[sectionKey]) {
            sections[sectionKey] = [];
          }
          sections[sectionKey].push({ question, text: responses[key] });
        });

        // Format sections
        Object.keys(sections).sort().forEach(sectionKey => {
          const sectionName = sectionKey.toUpperCase();
          exportText += `Part ${sectionName.replace('PART-', '')}:\n`;
          exportText += '-'.repeat(30) + '\n';

          sections[sectionKey].forEach((item, index) => {
            exportText += `Reflection ${index + 1}:\n`;
            exportText += `${item.text}\n\n`;
          });

          exportText += '\n';
        });

        exportText += '='.repeat(50) + '\n';
        exportText += `Exported: ${new Date().toLocaleString()}\n`;

        // Copy to clipboard
        copyToClipboard(exportText);

        // Show feedback
        const originalText = this.textContent;
        this.textContent = '✓ Copied to Clipboard!';
        this.style.background = 'var(--success-color)';

        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = '';
        }, 3000);
      });
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  // ===== LOCALSTORAGE HELPERS =====
  function saveToStorage(key, value) {
    try {
      localStorage.setItem(`tutorial-nav-${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  function getFromStorage(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(`tutorial-nav-${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Failed to read from localStorage:', e);
      return defaultValue;
    }
  }

  // ===== 6. SMOOTH SCROLL FOR ANCHOR LINKS =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
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
  }

  // ===== 7. COPY CODE BUTTONS =====
  function initCopyCodeButtons() {
    const copyButtons = document.querySelectorAll('.copy-code-btn');

    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const wrapper = this.closest('.code-block-wrapper');
        const codeBlock = wrapper.querySelector('code');
        const codeText = codeBlock.textContent;

        // Copy to clipboard
        copyToClipboard(codeText);

        // Visual feedback
        const originalHTML = this.innerHTML;
        this.innerHTML = '<span class="icon">✓</span><span>Copied!</span>';
        this.classList.add('copied');

        setTimeout(() => {
          this.innerHTML = originalHTML;
          this.classList.remove('copied');
        }, 2000);
      });
    });
  }

  // ===== 8. CODEPEN FOCUS MODE TOGGLE =====
  function initFocusToggle() {
    const toggleBtn = document.getElementById('toggle-focus');
    const codepenArea = document.querySelector('.codepen-area');
    const tutorialSections = document.querySelector('.tutorial-sections');
    const iconSpan = toggleBtn.querySelector('.icon');
    const textSpan = toggleBtn.querySelector('.text');

    if (!toggleBtn || !codepenArea || !tutorialSections) return;

    // Restore focus mode state from localStorage
    const isFocusMode = getFromStorage('focusMode') === true;
    if (isFocusMode) {
      codepenArea.classList.add('focus-mode');
      tutorialSections.classList.add('hidden');
      iconSpan.textContent = '📖';
      textSpan.textContent = 'Show Tutorial';
    }

    // Toggle focus mode on button click
    toggleBtn.addEventListener('click', function() {
      const isCurrentlyFocused = codepenArea.classList.contains('focus-mode');

      if (isCurrentlyFocused) {
        // Exit focus mode - show tutorial
        codepenArea.classList.remove('focus-mode');
        tutorialSections.classList.remove('hidden');
        iconSpan.textContent = '👁️';
        textSpan.textContent = 'Focus Mode';
        saveToStorage('focusMode', false);
      } else {
        // Enter focus mode - hide tutorial
        codepenArea.classList.add('focus-mode');
        tutorialSections.classList.add('hidden');
        iconSpan.textContent = '📖';
        textSpan.textContent = 'Show Tutorial';
        saveToStorage('focusMode', true);
      }
    });
  }

  // ===== INITIALIZE ALL FEATURES =====
  function init() {
    initResponseAreas();
    initCheckpoints();
    initSolutionToggles();
    initExportButton();
    initSmoothScroll();
    initCopyCodeButtons();
    initFocusToggle();

    console.log('✓ Tutorial interactive features initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
