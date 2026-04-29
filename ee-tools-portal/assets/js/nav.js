/**
 * EE Tools Portal - Navigation Component
 * 自动生成统一的顶部导航栏
 */

class EEToolsNav {
  constructor(options = {}) {
    // 使用绝对路径确保导航正确
    this.tools = options.tools || [
      { id: 'index', name: '首页', icon: 'home', path: '/' },
      { id: 'insertion-loss', name: '插入损耗', icon: 'activity', path: '/tools/insertion-loss.html' },
      { id: 'impedance', name: '特征阻抗', icon: 'zap', path: '/tools/impedance.html' },
      { id: 'dcr', name: 'DCR计算', icon: 'battery-charging', path: '/tools/dcr.html' },
      { id: 'tdr', name: 'TDR计算', icon: 'radio', path: '/tools/tdr.html' }
    ];
    this.currentPage = options.currentPage || 'index';
    this.container = options.container || '#nav-container';
  }

  /**
   * 生成导航HTML
   */
  render() {
    const nav = document.createElement('nav');
    nav.className = 'ee-nav';
    nav.innerHTML = `
      <div class="nav-inner">
        <div class="nav-brand">
          <a href="/" class="brand-link">
            <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span class="brand-text">EE Tools</span>
          </a>
        </div>
        
        <button class="nav-toggle" id="navToggle" aria-label="切换菜单">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        
        <div class="nav-links" id="navLinks">
          ${this.tools.map(tool => this.renderNavItem(tool)).join('')}
        </div>
      </div>
      
      <style>
        .ee-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 12, 16, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color, #1e293b);
        }
        
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        
        .nav-brand .brand-link {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary, #f1f5f9);
          text-decoration: none;
        }
        
        .brand-icon {
          width: 32px;
          height: 32px;
          color: var(--accent-primary, #3b82f6);
        }
        
        .brand-text {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--accent-primary, #3b82f6), #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          color: var(--text-secondary, #94a3b8);
          text-decoration: none;
          border-radius: 8px;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .nav-link:hover {
          color: var(--text-primary, #f1f5f9);
          background: rgba(59, 130, 246, 0.1);
        }
        
        .nav-link.active {
          color: var(--accent-primary, #3b82f6);
          background: rgba(59, 130, 246, 0.15);
        }
        
        .nav-link svg {
          width: 18px;
          height: 18px;
        }
        
        .nav-toggle {
          display: none;
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
        }
        
        .nav-toggle svg {
          width: 24px;
          height: 24px;
          color: var(--text-primary, #f1f5f9);
        }
        
        @media (max-width: 768px) {
          .nav-toggle {
            display: block;
          }
          
          .nav-links {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            bottom: 0;
            flex-direction: column;
            align-items: stretch;
            gap: 4px;
            padding: 16px;
            background: var(--bg-primary, #0a0c10);
            transform: translateX(100%);
            transition: transform 0.3s ease;
          }
          
          .nav-links.open {
            transform: translateX(0);
          }
          
          .nav-link {
            padding: 12px 16px;
            font-size: 1rem;
          }
        }
      </style>
    `;
    
    // 插入到容器
    const containerEl = document.querySelector(this.container);
    if (containerEl) {
      containerEl.appendChild(nav);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }
    
    // 绑定事件
    this.bindEvents();
    
    // 添加页面偏移
    this.addBodyPadding();
  }

  /**
   * 渲染单个导航项
   */
  renderNavItem(tool) {
    const isActive = this.currentPage === tool.id;
    const icon = this.getIcon(tool.icon);
    const href = this.getNavToolPath(tool);
    
    return `
      <a href="${href}" class="nav-link ${isActive ? 'active' : ''}" data-tool="${tool.id}">
        ${icon}
        <span>${tool.name}</span>
      </a>
    `;
  }

  /**
   * 获取图标SVG
   */
  getIcon(name) {
    const icons = {
      home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      'battery-charging': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"/><line x1="23" y1="13" x2="23" y2="11"/><polyline points="11 6 7 12 13 12 9 18"/></svg>',
      radio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>'
    };
    return icons[name] || icons.home;
  }

  /**
   * 获取路径（处理目录层级）
   */
  getPath(filename) {
    // 如果在tools子目录，需要返回 ../
    const isInTools = window.location.pathname.includes('/tools/');
    // 从tools目录返回根目录需要 ../
    if (isInTools) {
      return `../${filename}`;
    }
    return filename;
  }

  /**
   * 获取导航项路径（使用绝对路径）
   */
  getNavToolPath(tool) {
    // 使用绝对路径，无需额外处理
    return tool.path;
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        links.classList.toggle('open');
      });
      
      // 点击链接后关闭菜单
      links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          links.classList.remove('open');
        });
      });
    }
  }

  /**
   * 为body添加顶部padding
   */
  addBodyPadding() {
    document.body.style.paddingTop = '64px';
  }
}

/**
 * 初始化导航（自动执行）
 */
document.addEventListener('DOMContentLoaded', () => {
  // 检测当前页面
  const path = window.location.pathname;
  let currentPage = 'index';
  
  if (path.includes('insertion-loss')) currentPage = 'insertion-loss';
  else if (path.includes('impedance')) currentPage = 'impedance';
  else if (path.includes('dcr')) currentPage = 'dcr';
  else if (path.includes('tdr')) currentPage = 'tdr';
  
  window.eeNav = new EEToolsNav({ currentPage });
  window.eeNav.render();
});
