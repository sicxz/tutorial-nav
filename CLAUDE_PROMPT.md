# Tutorial Restructuring Prompt for Claude Code

## Overview
Restructure this Sidebar to Mobile Nav tutorial to follow the interactive, incremental learning approach used in the flexbox-tutorial (https://github.com/sicxz/flexbox-tutorial). The current tutorial dumps all code at once - we need students to BUILD incrementally, not copy/paste.

## Critical Requirements

### 1. File Separation
**Current:** Everything in one index.html (CSS in `<style>`, JS in `<script>`)
**Target:** Three separate files:
- `index.html` - Structure and content only
- `tutorial-styles.css` - All styling
- `tutorial.js` - All interactivity

### 2. Interactive Features (Like flexbox-tutorial)

#### Accordion Sections
- Each part (A-I) should be in a **collapsible accordion**
- Progressive disclosure - students expand one section at a time
- Smooth expand/collapse animations
- Only one section open at a time (optional: allow multiple)

#### Response Text Boxes
- Add **textarea response boxes** after reflection questions
- Students type their answers/notes as they learn
- Store responses in localStorage (persist across page reloads)
- Add auto-save functionality (save on input change)

#### Checkpoints with Validation
- After key steps, add interactive checkpoints
- Example: "✓ Checkpoint: Is your sidebar visible on the left?"
- Clickable checkbox that marks completion
- Track progress (e.g., "3/9 sections completed")
- Store checkpoint state in localStorage

#### Show/Hide Solution Toggles
- Code blocks should start hidden or minimized
- Add "Show Solution" / "Hide Solution" buttons
- Reveal code incrementally, not all at once
- Each code snippet gets its own toggle

### 3. Incremental Learning (NOT Copy/Paste)

#### Current Problem:
The tutorial shows complete code blocks like this:
```css
/* 40 lines of CSS all at once */
.sidebar { ... }
.sidebar-header { ... }
.sidebar-nav { ... }
```

#### Target Approach:
Break into small, digestible chunks:

**Step 1:** "First, hide the checkbox"
```css
.sidebar-toggle {
  display: none;
}
```
✓ Checkpoint: Can you still see the checkbox? (You shouldn't!)

**Step 2:** "Now set up the container"
```css
.layout-container {
  display: flex;
  min-height: 100vh;
}
```
✓ Checkpoint: Does your layout use flexbox now?

**Step 3:** "Style the sidebar..."
[Continue incrementally]

### 4. Structure Requirements

#### HTML Structure (index.html):
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sidebar to Mobile Nav Tutorial</title>
  <link rel="stylesheet" href="tutorial-styles.css">
</head>
<body>
  <header>
    <h1>Sidebar to Mobile Nav Tutorial</h1>
    <p>Learn how to build a responsive layout...</p>

    <div class="goal-box">
      <h2>What you'll learn:</h2>
      <ul>
        <li>Desktop-first vs mobile-first approaches</li>
        <!-- etc -->
      </ul>
    </div>
  </header>

  <!-- Progress indicator -->
  <div class="progress-container">
    <div class="progress-bar">
      <div class="progress-fill" style="width: 0%"></div>
    </div>
    <p class="progress-text">Progress: 0/9 sections • 0%</p>
  </div>

  <div class="tutorial-container">
    <!-- Left: Tutorial content with accordions -->
    <main class="tutorial-sections">

      <!-- Part A Accordion -->
      <section class="accordion-section" data-section="part-a">
        <button class="accordion-header">
          <span class="part-number">A</span>
          <h2>Understanding the Layout Pattern</h2>
          <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-content">
          <p><strong>Goal:</strong> Understand the desktop sidebar pattern...</p>

          <!-- Regular content -->
          <h3>📋 The Pattern:</h3>
          <p>A sidebar navigation is perfect for desktop screens...</p>

          <!-- Demo container (keep existing) -->
          <div class="demo-container">
            <!-- ... -->
          </div>

          <!-- Info boxes (keep existing) -->
          <div class="info-box">
            <h4>🤔 Why transform the sidebar?</h4>
            <ul>
              <li>Space efficiency...</li>
            </ul>
          </div>

          <!-- Reflection with response box -->
          <div class="reflection-box">
            <h4>🧠 Reflection:</h4>
            <p>Think about websites you use daily. Which ones use sidebar navigation on desktop? How do they handle mobile?</p>
            <textarea class="response-area"
                      data-section="part-a"
                      data-question="1"
                      placeholder="Type your thoughts here..."
                      rows="4"></textarea>
            <p class="save-indicator">Auto-saved ✓</p>
          </div>

          <!-- Checkpoint -->
          <div class="checkpoint">
            <label>
              <input type="checkbox" data-checkpoint="a-complete">
              <span>I understand why sidebars transform on mobile</span>
            </label>
          </div>
        </div>
      </section>

      <!-- Part B - with incremental code steps -->
      <section class="accordion-section" data-section="part-b">
        <button class="accordion-header">
          <span class="part-number">B</span>
          <h2>Build the HTML Structure</h2>
          <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-content">
          <p><strong>Goal:</strong> Create semantic HTML...</p>

          <h3>📋 Your HTML should include:</h3>
          <ul>
            <li>A container...</li>
            <li>An aside element...</li>
          </ul>

          <!-- Code solution with toggle -->
          <h3>📝 HTML Template:</h3>
          <p>Here's the structure you'll need. Try to build it yourself first, then check the solution:</p>

          <button class="show-solution" data-solution="b-html-template">
            Show Solution
          </button>

          <div class="solution-box hidden" data-solution-id="b-html-template">
            <pre><code>&lt;div class="layout-container"&gt;
  &lt;input type="checkbox" id="sidebar-toggle"&gt;
  &lt;aside class="sidebar"&gt;
    &lt;!-- ... --&gt;
  &lt;/aside&gt;
  &lt;main class="main-content"&gt;
    &lt;!-- ... --&gt;
  &lt;/main&gt;
&lt;/div&gt;</code></pre>
          </div>

          <!-- Checkpoint -->
          <div class="checkpoint">
            <label>
              <input type="checkbox" data-checkpoint="b-html">
              <span>✓ I've created the HTML structure</span>
            </label>
          </div>

          <!-- Info box -->
          <div class="info-box">
            <h4>💡 Key structural decisions:</h4>
            <ul>
              <li><strong>Checkbox hack:</strong> The hidden checkbox...</li>
            </ul>
          </div>

          <!-- Reflection -->
          <div class="reflection-box">
            <h4>🧠 Reflection:</h4>
            <p>Why do we need TWO headers (one in sidebar, one in main)?</p>
            <textarea class="response-area"
                      data-section="part-b"
                      data-question="1"
                      placeholder="Type your answer here..."
                      rows="3"></textarea>
          </div>

          <!-- Final checkpoint for part -->
          <div class="checkpoint">
            <label>
              <input type="checkbox" data-checkpoint="b-complete">
              <span>Part B Complete</span>
            </label>
          </div>
        </div>
      </section>

      <!-- Part C - INCREMENTAL CSS STEPS -->
      <section class="accordion-section" data-section="part-c">
        <button class="accordion-header">
          <span class="part-number">C</span>
          <h2>Style the Desktop Sidebar Layout</h2>
          <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-content">
          <p><strong>Goal:</strong> Create a two-column layout with a fixed sidebar.</p>

          <div class="info-box research">
            <h4>📚 Research these properties first:</h4>
            <ul>
              <li><code>display: flex</code></li>
              <li><code>position: fixed</code></li>
              <li><code>width</code> and <code>height: 100vh</code></li>
            </ul>
          </div>

          <!-- STEP 1 -->
          <h3>🎨 Step 1: Hide the checkbox</h3>
          <p>The checkbox controls the menu but shouldn't be visible. Add this CSS:</p>

          <button class="show-solution" data-solution="c-step-1">Show Solution</button>
          <div class="solution-box hidden" data-solution-id="c-step-1">
            <pre><code>/* Hide the checkbox */
.sidebar-toggle {
  display: none;
}</code></pre>
          </div>

          <div class="checkpoint">
            <label>
              <input type="checkbox" data-checkpoint="c-step-1">
              <span>✓ Checkbox is hidden</span>
            </label>
          </div>

          <!-- STEP 2 -->
          <h3>🎨 Step 2: Set up the flex container</h3>
          <p>Make the layout container use flexbox and fill the viewport:</p>

          <button class="show-solution" data-solution="c-step-2">Show Solution</button>
          <div class="solution-box hidden" data-solution-id="c-step-2">
            <pre><code>/* Container setup */
.layout-container {
  display: flex;
  min-height: 100vh;
}</code></pre>
          </div>

          <div class="checkpoint">
            <label>
              <input type="checkbox" data-checkpoint="c-step-2">
              <span>✓ Container uses flexbox</span>
            </label>
          </div>

          <!-- STEP 3 -->
          <h3>🎨 Step 3: Style the fixed sidebar</h3>
          <p>Position the sidebar on the left and make it full-height:</p>

          <button class="show-solution" data-solution="c-step-3">Show Solution</button>
          <div class="solution-box hidden" data-solution-id="c-step-3">
            <pre><code>/* Sidebar - fixed on the left */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: #2c3e50;
  color: white;
  overflow-y: auto;
  z-index: 1000;
}</code></pre>
          </div>

          <div class="checkpoint">
            <label>
              <input type="checkbox" data-checkpoint="c-step-3">
              <span>✓ Sidebar is visible and fixed on left</span>
            </label>
          </div>

          <!-- Continue with more steps... -->

          <div class="info-box">
            <h4>💡 What's happening here?</h4>
            <ul>
              <li><code>position: fixed</code> — Sidebar stays in place while content scrolls</li>
              <li><code>height: 100vh</code> — Sidebar is always full viewport height</li>
            </ul>
          </div>

          <div class="reflection-box">
            <h4>🧠 Reflection:</h4>
            <p>What's the difference between <code>position: fixed</code> and <code>position: sticky</code>?</p>
            <textarea class="response-area"
                      data-section="part-c"
                      data-question="1"
                      placeholder="Type your answer..."
                      rows="3"></textarea>
          </div>

          <div class="checkpoint">
            <label>
              <input type="checkbox" data-checkpoint="c-complete">
              <span>Part C Complete</span>
            </label>
          </div>
        </div>
      </section>

      <!-- Parts D-I follow the same pattern -->

    </main>

    <!-- Right: CodePen workspace (sticky) -->
    <aside class="codepen-area">
      <div class="codepen-header">
        <h3>Your Workspace</h3>
        <p>Code along as you follow the tutorial →</p>
      </div>
      <iframe
        id="codepen-embed"
        src="https://codepen.io/tmasingale/embed/jEWQvbN?default-tab=html%2Cresult&theme-id=dark"
        frameborder="0"
        loading="lazy"
        allowtransparency="true"
        allowfullscreen="true"
        title="CodePen Workspace">
      </iframe>
    </aside>
  </div>

  <!-- Export responses button -->
  <div class="export-section">
    <button id="export-responses">📋 Copy All My Responses</button>
  </div>

  <footer>
    <p>Sidebar to Mobile Nav Tutorial</p>
    <p>Remember: The best way to learn is by building!</p>
  </footer>

  <script src="tutorial.js"></script>
</body>
</html>
```

#### JavaScript Features (tutorial.js):

```javascript
// 1. ACCORDION FUNCTIONALITY
// - Toggle accordion sections open/closed
// - Smooth animations
// - Update icon (▼ becomes ▲)

// 2. LOCALSTORAGE FOR RESPONSES
// - Auto-save textarea content
// - Restore on page load
// - Save indicator feedback

// 3. PROGRESS TRACKING
// - Count completed checkpoints
// - Update progress bar
// - Store in localStorage

// 4. CHECKPOINT PERSISTENCE
// - Save checkbox states
// - Restore on page load

// 5. SHOW/HIDE SOLUTION TOGGLES
// - Toggle solution visibility
// - Change button text

// 6. EXPORT RESPONSES FEATURE
// - Gather all textarea responses
// - Format with section labels
// - Copy to clipboard
```

### 5. Specific Content Changes

#### For Each Part (A-I):
1. **Wrap in accordion structure**
2. **Break large code blocks into 3-7 small steps**
3. **Add checkpoint after each step**
4. **Add "Show Solution" button for each code snippet**
5. **Add response textarea for each reflection question**
6. **Add final "Part X Complete" checkpoint**

#### Example Transformation:

**OLD (Part C - too much at once):**
```html
<h3>🎨 Your Task:</h3>
<pre><code>/* 40 lines of CSS all dumped at once */
.sidebar-toggle { ... }
.layout-container { ... }
.sidebar { ... }
.sidebar-header { ... }
/* etc */
</code></pre>
```

**NEW (Part C - incremental steps):**
```html
<h3>🎨 Step 1: Hide the checkbox</h3>
<p>Explanation of why...</p>
<button class="show-solution" data-solution="c-step-1">Show Solution</button>
<div class="solution-box hidden" data-solution-id="c-step-1">
  <pre><code>.sidebar-toggle {
  display: none;
}</code></pre>
</div>
<div class="checkpoint">
  <input type="checkbox" data-checkpoint="c-1">
  <span>✓ I've added this CSS</span>
</div>

<h3>🎨 Step 2: Set up flex container</h3>
<p>Explanation...</p>
[Repeat pattern]
```

### 6. Progress Tracking UI

Add at top of page:
```html
<div class="progress-container">
  <div class="progress-bar">
    <div class="progress-fill"></div>
  </div>
  <p class="progress-text">Progress: 0/9 sections • 0%</p>
</div>
```

JavaScript calculates:
- Total checkpoints with `data-checkpoint="*-complete"`
- Checked ones
- Updates progress bar width and text

### 7. Export Responses Feature

Button at bottom:
```html
<button id="export-responses">📋 Copy All My Responses</button>
```

JavaScript:
- Finds all `.response-area` textareas
- Gets section/question from data attributes
- Formats as:
  ```
  SIDEBAR TO MOBILE NAV - MY RESPONSES

  Part A - Reflection 1:
  [Student's answer]

  Part B - Reflection 1:
  [Student's answer]
  ```
- Copies to clipboard
- Shows "Copied!" feedback

### 8. Styling Requirements (tutorial-styles.css)

#### CSS Custom Properties:
```css
:root {
  --primary-color: #667eea;
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-color: #38a169;
  --warning-color: #d69e2e;
  --info-color: #3182ce;
  --text-color: #2c3e50;
  --bg-light: #f7fafc;
  --border-color: #e2e8f0;
  --shadow: 0 4px 20px rgba(0,0,0,0.08);
}
```

#### Key Style Classes:
```css
/* Accordion */
.accordion-section { }
.accordion-header { }
.accordion-content { }
.accordion-icon { }

/* Progress */
.progress-container { }
.progress-bar { }
.progress-fill { }

/* Reflection */
.reflection-box { }
.response-area { }
.save-indicator { }

/* Checkpoints */
.checkpoint { }

/* Solutions */
.solution-box { }
.show-solution { }
.hidden { }

/* Info boxes (keep existing) */
.info-box { }
.info-box.research { }
.info-box.warning { }
.info-box.success { }
```

### 9. Keep From Current Tutorial
- ✓ The two-column layout (tutorial | CodePen)
- ✓ Part A-I content and explanations
- ✓ Color scheme and gradients
- ✓ Info boxes (success, warning, research)
- ✓ Demo containers
- ✓ Responsive behavior
- ✓ Header with goals
- ✓ Footer

### 10. Remove From Current Tutorial
- ✗ All inline `<style>` tags → Move to tutorial-styles.css
- ✗ All inline `<script>` tags → Move to tutorial.js
- ✗ Large monolithic code blocks → Break into steps
- ✗ The current "complete code" dumps → Make incremental

### 11. Content Breakdown by Part

#### Part A: Understanding the Layout Pattern
- Keep all explanation content
- Add response textarea for reflection
- Add checkpoint: "I understand the pattern"

#### Part B: Build the HTML Structure
- Show full HTML template with toggle
- Add checkpoint after showing solution
- Add reflection textarea

#### Part C: Style the Desktop Sidebar Layout
- **CRITICAL:** Break into 5-7 steps:
  1. Hide checkbox
  2. Setup flex container
  3. Style sidebar (position, size, background)
  4. Style sidebar header
  5. Hide close button on desktop
  6. Offset main content
  7. Hide mobile header
- Each step gets: explanation → show solution button → code → checkpoint

#### Part D: Create the Mobile Top Bar
- Break into 2-3 steps:
  1. Style mobile header
  2. Style hamburger icon
- Add checkpoints

#### Part E: Add Media Query for Mobile Layout
- Break into 4-5 steps:
  1. Show mobile header
  2. Remove sidebar offset
  3. Transform sidebar off-canvas
  4. Show close button
  5. Checkbox checked state
  6. Add overlay
- Each with checkpoint

#### Part F: Animate the Hamburger Icon
- Single step (it's short)
- Show solution toggle
- Checkpoint

#### Part G: Close Menu When Link is Clicked
- 2 steps:
  1. Close on click JavaScript
  2. Highlight active section JavaScript
- Each with toggle and checkpoint

#### Part H: Polish the Content Area
- Break into 2-3 steps
- Checkpoints for each

#### Part I: Accessibility & Final Touches
- Break into steps:
  1. ARIA labels
  2. Focus styles
  3. Prevent body scroll
  4. Reduced motion
- Each with toggle and checkpoint

## Success Criteria

When complete, a student's experience should be:
1. ✓ Click Part A accordion → it expands
2. ✓ Read explanation, type reflection in textarea
3. ✓ Check "Part A Complete" checkpoint
4. ✓ See progress update: "1/9 sections • 11%"
5. ✓ Click Part B accordion → it expands
6. ✓ Read about HTML structure
7. ✓ Click "Show Solution" → code appears
8. ✓ Build it in CodePen
9. ✓ Check checkpoint
10. ✓ Progress updates: "2/9 sections • 22%"
11. ✓ Continue through all parts
12. ✓ All responses auto-saved
13. ✓ Can refresh page → everything persists
14. ✓ Click "Copy All Responses" → clipboard has all their answers

## Key Philosophy
**"Slow drip" learning:** Students BUILD, not copy/paste. Each step is small (5-10 lines max), achievable, and verified with a checkpoint before moving on.

## Technical Implementation Notes

### localStorage Schema:
```javascript
{
  "responses": {
    "part-a-1": "Student's answer...",
    "part-b-1": "Another answer...",
  },
  "checkpoints": {
    "a-complete": true,
    "b-html": true,
    "c-step-1": true,
    // etc
  },
  "accordions": {
    "part-a": true,  // open
    "part-b": false, // closed
  }
}
```

### Accordion Behavior:
- Click header → toggle content
- Smooth slide animation (max-height or transform)
- Icon rotates (▼ → ▲)
- State saved to localStorage
- Optional: close others when opening one

### Solution Toggle Behavior:
- Initial state: hidden
- Button text: "Show Solution" / "Hide Solution"
- Click → toggle visibility
- Smooth reveal animation

## References
- ✓ Good example: https://github.com/sicxz/flexbox-tutorial
- ✗ Current (needs fixing): https://github.com/sicxz/tutorial-nav
- Reference for accordion: flexbox-tutorial's implementation
- Reference for localStorage: flexbox-tutorial's persistence

## Deliverables
1. ✓ `index.html` - Clean structure, no inline CSS/JS, all content in accordions
2. ✓ `tutorial-styles.css` - All styles with custom properties, responsive
3. ✓ `tutorial.js` - All interactive features with localStorage
4. ✓ All 9 parts (A-I) converted to accordion sections
5. ✓ All code blocks broken into small steps with toggles
6. ✓ Response textareas for all reflection questions
7. ✓ Checkpoints after each step
8. ✓ Progress tracking UI
9. ✓ Export responses feature
10. ✓ localStorage persistence for everything

## Final Notes

- **Code snippets should be 5-10 lines maximum**
- **Each part should have 3-7 sub-steps for code sections**
- **Every reflection gets a textarea**
- **Every step gets a checkpoint**
- **Everything persists via localStorage**
- **Students should never see 40+ line code dumps**
- **Focus on BUILDING, not copy/pasting**
