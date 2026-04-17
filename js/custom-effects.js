(() => {
  const state = window.__customEffectsState || (window.__customEffectsState = {
    mouseInitialized: false,
    pjaxRegistered: false
  });

  const initMouseEffect = () => {
    if (state.mouseInitialized) return;
    if (!window.jQuery || typeof window.jQuery.shuicheMouse !== 'function') return;

    window.jQuery.shuicheMouse({
      type: 11,
      color: 'rgba(187,67,128,1)'
    });

    state.mouseInitialized = true;
  };

  const refreshCursor = () => {
    if (window.CURSOR && typeof window.CURSOR.refresh === 'function') {
      window.CURSOR.refresh();
    }
  };

  const handlePjaxComplete = () => {
    window.requestAnimationFrame(refreshCursor);
  };

  const registerPjaxHook = () => {
    if (state.pjaxRegistered) return;

    if (window.btf && typeof window.btf.addGlobalFn === 'function') {
      window.btf.addGlobalFn('pjaxComplete', handlePjaxComplete, 'customEffects');
    } else {
      document.addEventListener('pjax:complete', handlePjaxComplete);
    }

    state.pjaxRegistered = true;
  };

  const init = () => {
    initMouseEffect();
    refreshCursor();
    registerPjaxHook();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
