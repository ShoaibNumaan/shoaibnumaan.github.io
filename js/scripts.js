/* Progressive enhancements. Content and contact links work without JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const themeToggle = document.querySelector('.theme-toggle');
  const syncThemeToggle = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
    themeToggle.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#0b1020' : '#f7f9ff';
  };
  syncThemeToggle();
  themeToggle.hidden = false;
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    syncThemeToggle();
    try { localStorage.setItem('numaan-theme', theme); } catch {}
  });
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('navigation');
  const closeMenu = (restoreFocus = false) => {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const filters = document.querySelector('.filters');
  const projects = [...document.querySelectorAll('[data-category]')];
  const additionalLabel = document.querySelector('.additional-label');
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    projects.forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      if (!project.hidden) count++;
    });
    additionalLabel.hidden = !projects.some(project => project.classList.contains('compact-project') && !project.hidden);
    document.getElementById('filter-status').textContent = `${count} projects shown.`;
  });
  document.querySelectorAll('.hiring-strengths a').forEach(link => {
    link.addEventListener('click', () => {
      filters.querySelector('[data-filter="all"]').click();
      const project = document.querySelector(link.getAttribute('href'));
      if (project) project.querySelector('details').open = true;
    });
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  const copyEmail = document.querySelector('.copy-email');
  const emailFeedback = document.querySelector('.email-feedback');
  if (navigator.clipboard && window.isSecureContext) {
    copyEmail.hidden = false;
    copyEmail.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('numaangj@gmail.com');
        emailFeedback.textContent = 'Email copied. Ready when you are.';
      } catch {
        emailFeedback.textContent = 'Couldn’t copy. Select the address or click it to open your email app.';
      }
    });
  }

  const capabilities = {
    rag: {
      label: 'KNOWLEDGE → CONTEXT → ANSWERS',
      title: 'Make enterprise knowledge accessible.',
      copy: 'Connect natural-language questions to business data with retrieval, knowledge graphs and conversational interfaces.',
      steps: ['Your data', 'Retrieve & reason', 'Useful answers'],
      icons: ['▤', '↗'], stack: ['Azure OpenAI', 'Neo4j', 'FastAPI'], filter: 'genai', accent: '#79e5dd'
    },
    agents: {
      label: 'INTENT → ORCHESTRATION → ACTION',
      title: 'Turn requirements into structured work.',
      copy: 'Design agentic workflows that translate software delivery requirements into structured work items for Azure DevOps, Jira and Asana.',
      steps: ['Requirements', 'Agent workflows', 'Work items'],
      icons: ['⌘', '✓'], stack: ['LangGraph', 'Azure OpenAI', 'Ragas'], filter: 'genai', accent: '#bca6ff'
    },
    observe: {
      label: 'TRACES → EVALUATION → INSIGHT',
      title: 'Understand AI beyond the response.',
      copy: 'Research meaningful signals from LLM traces, and evaluate model baselines, monitoring and drift detection for enterprise AI.',
      steps: ['System traces', 'Evaluate signals', 'Reliability insights'],
      icons: ['≋', '◎'], stack: ['OpenTelemetry', 'Arize', 'Databricks Genie'], filter: 'data', accent: '#91f2c7'
    }
  };
  const explorer = document.querySelector('.ai-explorer');
  const panel = document.getElementById('capability-panel');
  const tabs = document.querySelector('.capability-tabs');
  let currentCapability = 'rag';
  tabs.addEventListener('click', event => {
    const button = event.target.closest('[data-capability]');
    if (!button) return;
    currentCapability = button.dataset.capability;
    const capability = capabilities[currentCapability];
    tabs.querySelectorAll('button').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
    explorer.style.setProperty('--explorer-accent', capability.accent);
    document.getElementById('capability-label').textContent = capability.label;
    document.getElementById('capability-title').textContent = capability.title;
    document.getElementById('capability-copy').textContent = capability.copy;
    ['flow-one', 'flow-two', 'flow-three'].forEach((id, index) => {
      document.getElementById(id).textContent = capability.steps[index];
    });
    document.getElementById('flow-icon-one').textContent = capability.icons[0];
    document.getElementById('flow-icon-three').textContent = capability.icons[1];
    document.getElementById('capability-stack').replaceChildren(...capability.stack.map(name => {
      const tag = document.createElement('span');
      tag.textContent = name;
      return tag;
    }));
    panel.classList.remove('panel-enter');
    requestAnimationFrame(() => panel.classList.add('panel-enter'));
  });
  document.getElementById('capability-work').addEventListener('click', () => {
    filters.querySelector(`[data-filter="${capabilities[currentCapability].filter}"]`).click();
  });
  // Pointer lighting is decorative; every action also works by keyboard and touch.
  if (window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
    explorer.addEventListener('pointermove', event => {
      const bounds = explorer.getBoundingClientRect();
      explorer.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
      explorer.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
    });
    explorer.addEventListener('pointerleave', () => {
      explorer.style.removeProperty('--pointer-x');
      explorer.style.removeProperty('--pointer-y');
    });
  }
  const progress = document.querySelector('.reading-progress');
  let scrollScheduled = false;
  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
    scrollScheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navigation.querySelectorAll('a').forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
  }
})();
