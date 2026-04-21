// dev-badge.js — neon footer badge (auto-inserted)
(function () {
  if (typeof document === 'undefined') return;
  if (document.getElementById('dev-badge-footer')) return;
  const css = `
  :root{--neon:#00f6ff;--accent:#ff3ecf}
  #dev-badge-footer{position:fixed;left:16px;right:16px;bottom:18px;z-index:2147483647;display:flex;justify-content:center;pointer-events:none}
  #dev-badge-footer .badge{pointer-events:auto;display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;background:linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01));backdrop-filter:blur(6px);box-shadow:0 8px 30px rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.04);color:#eafcff;font-family:Inter,system-ui,Segoe UI,Roboto,Arial;font-weight:600;user-select:none}
  .badge .icon{width:40px;height:40px;border-radius:8px;display:grid;place-items:center;background:rgba(0,0,0,0.06);box-shadow:0 6px 18px rgba(0,0,0,0.45),0 0 12px rgba(0,246,255,0.08);border:1px solid rgba(255,255,255,0.03);position:relative;overflow:hidden}
  .badge .text{display:flex;flex-direction:column;line-height:1}
  .badge .role{font-size:11px;color:#bfefff}
  .badge .name{font-size:14px;color:#fff;text-shadow:0 0 8px rgba(0,246,255,0.12)}
  .badge .glow{height:4px;border-radius:6px;margin-top:6px;background:linear-gradient(90deg,var(--neon),var(--accent));box-shadow:0 0 18px rgba(0,246,255,0.35),0 0 36px rgba(255,62,207,0.18);width:100%;transform-origin:left;animation:slideGlow 3s linear infinite}
  @keyframes neonPulse{0%{filter:blur(6px);opacity:.85}50%{filter:blur(12px);opacity:1}100%{filter:blur(6px);opacity:.85}}
  @keyframes slideGlow{0%{transform:translateX(-100%);opacity:0}10%{opacity:1}50%{transform:translateX(0);opacity:1}90%{opacity:1}100%{transform:translateX(100%);opacity:0}}
  .badge::before{content:'';position:absolute;inset:auto;left:12px;right:12px;bottom:12px;height:64px;border-radius:12px;filter:blur(10px);mix-blend-mode:screen;animation:neonPulse 2.8s ease-in-out infinite;opacity:.9;background:linear-gradient(90deg,var(--neon),var(--accent));z-index:-1}
  @media (max-width:520px){#dev-badge-footer{left:12px;right:12px;bottom:12px}.badge{padding:8px 10px}.badge .icon{width:36px;height:36px}.badge .name{font-size:13px}}
  `;
  const style = document.createElement('style');
  style.id = 'dev-badge-footer-style';
  style.textContent = css;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'dev-badge-footer';
  container.setAttribute('aria-hidden', 'false');
  container.innerHTML = `
    <div class="badge" role="note" aria-label="Developer signature Marwan Negm">
      <div class="icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="url(#g)" stroke-width="1.6" fill="rgba(0,0,0,0.06)"/>
          <path d="M7 15v-6l5 3 5-3v6" stroke="url(#g)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg style="position:absolute;width:0;height:0" aria-hidden="true">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stop-color="#00f6ff"/>
              <stop offset="1" stop-color="#ff3ecf"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="text">
        <span class="role">Developer</span>
        <span class="name">Marwan Negm - PeekaboOo-KidsWorld-PlayHouse</span>
        <span class="glow" aria-hidden="true"></span>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const badge = container.querySelector('.badge');
  badge.style.opacity = '0';
  badge.style.transform = 'translateY(12px) scale(.98)';
  setTimeout(() => {
    badge.style.transition = 'opacity 420ms ease, transform 420ms cubic-bezier(.2,.9,.3,1)';
    badge.style.opacity = '1';
    badge.style.transform = 'translateY(0) scale(1)';
  }, 80);

  badge.addEventListener('dblclick', () => {
    const el = document.getElementById('dev-badge-footer');
    if (el) el.remove();
    const s = document.getElementById('dev-badge-footer-style');
    if (s) s.remove();
  });
})();
