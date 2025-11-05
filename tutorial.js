// ===== TUTORIAL INTERACTIVITY & PROGRESS TRACKING =====

// ===== PROGRESS TRACKING =====
// Save and load progress from localStorage

function saveProgress() {
  const checkboxes = document.querySelectorAll('.section-checkbox');
  const progress = {};

  checkboxes.forEach(checkbox => {
    const step = checkbox.dataset.step;
    progress[step] = checkbox.checked;
  });

  localStorage.setItem('tutorialProgress', JSON.stringify(progress));
  updateProgressBar();
}

function loadProgress() {
  const saved = localStorage.getItem('tutorialProgress');
  if (!saved) return;

  const progress = JSON.parse(saved);

  Object.keys(progress).forEach(step => {
    const checkbox = document.querySelector(`.section-checkbox[data-step="${step}"]`);
    if (checkbox) {
      checkbox.checked = progress[step];
    }
  });

  updateProgressBar();
}

function updateProgressBar() {
  const checkboxes = document.querySelectorAll('.section-checkbox');
  const checked = document.querySelectorAll('.section-checkbox:checked').length;
  const total = checkboxes.length;
  const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;

  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');

  if (progressBar) {
    progressBar.style.width = percentage + '%';
  }

  if (progressText) {
    progressText.textContent = `${checked} of ${total} sections complete (${percentage}%)`;
  }
}

// ===== REFLECTION BOXES =====
// Save and load reflection notes

function saveReflection(step) {
  const textarea = document.querySelector(`.reflection-input[data-step="${step}"]`);
  if (!textarea) return;

  const reflections = JSON.parse(localStorage.getItem('tutorialReflections') || '{}');
  reflections[step] = textarea.value;
  localStorage.setItem('tutorialReflections', JSON.stringify(reflections));

  // Visual feedback
  const button = document.querySelector(`.btn-save-reflection[data-step="${step}"]`);
  if (button) {
    const originalText = button.textContent;
    button.textContent = '✓ Saved!';
    button.style.background = '#38a169';
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 2000);
  }
}

function loadReflections() {
  const reflections = JSON.parse(localStorage.getItem('tutorialReflections') || '{}');

  Object.keys(reflections).forEach(step => {
    const textarea = document.querySelector(`.reflection-input[data-step="${step}"]`);
    if (textarea) {
      textarea.value = reflections[step];
    }
  });
}

// ===== SOLUTION/HINT TOGGLE =====
// Show/hide solution boxes

function toggleSolution(solutionId, button) {
  const solutionBox = document.getElementById(solutionId);
  if (!solutionBox) return;

  const isHidden = solutionBox.classList.contains('hidden');

  if (isHidden) {
    solutionBox.classList.remove('hidden');
    button.textContent = button.textContent.replace('Show', 'Hide');
  } else {
    solutionBox.classList.add('hidden');
    button.textContent = button.textContent.replace('Hide', 'Show');
  }
}

// ===== CHECKLIST ITEMS =====
// Save individual checklist item states

function saveChecklistProgress() {
  const checklistItems = document.querySelectorAll('.checklist input[type="checkbox"]');
  const checklistState = {};

  checklistItems.forEach((item, index) => {
    const checkpointId = item.closest('.checkpoint')?.id || `checkpoint-${index}`;
    if (!checklistState[checkpointId]) {
      checklistState[checkpointId] = [];
    }
    checklistState[checkpointId].push(item.checked);
  });

  localStorage.setItem('checklistProgress', JSON.stringify(checklistState));
}

function loadChecklistProgress() {
  const saved = localStorage.getItem('checklistProgress');
  if (!saved) return;

  const checklistState = JSON.parse(saved);

  Object.keys(checklistState).forEach(checkpointId => {
    const checkpoint = document.getElementById(checkpointId);
    if (!checkpoint) return;

    const items = checkpoint.querySelectorAll('input[type="checkbox"]');
    checklistState[checkpointId].forEach((checked, index) => {
      if (items[index]) {
        items[index].checked = checked;
      }
    });
  });
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====

function setupSmoothScrolling() {
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

// ===== RESET PROGRESS =====

function resetProgress() {
  if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
    localStorage.removeItem('tutorialProgress');
    localStorage.removeItem('tutorialReflections');
    localStorage.removeItem('checklistProgress');
    location.reload();
  }
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
  // Load saved progress
  loadProgress();
  loadReflections();
  loadChecklistProgress();

  // Setup progress tracking
  document.querySelectorAll('.section-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', saveProgress);
  });

  // Setup reflection save buttons
  document.querySelectorAll('.btn-save-reflection').forEach(button => {
    button.addEventListener('click', () => {
      const step = button.dataset.step;
      saveReflection(step);
    });
  });

  // Setup solution toggle buttons
  document.querySelectorAll('.btn-toggle-solution').forEach(button => {
    button.addEventListener('click', () => {
      const solutionId = button.dataset.solution;
      toggleSolution(solutionId, button);
    });
  });

  // Setup checklist items
  document.querySelectorAll('.checklist input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', saveChecklistProgress);
  });

  // Setup smooth scrolling
  setupSmoothScrolling();

  // Setup reset button if it exists
  const resetButton = document.getElementById('reset-progress');
  if (resetButton) {
    resetButton.addEventListener('click', resetProgress);
  }

  console.log('Tutorial interactivity initialized!');
});
