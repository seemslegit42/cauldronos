/**
 * CauldronOS Loading Screen
 * Cyberpunk-themed loading screen for CauldronOS
 */
(function() {
  // Create loading container if it doesn't exist
  const _root = document.querySelector('#root');
  if (_root && _root.innerHTML === '') {
    _root.innerHTML = `
      <style>
        html,
        body,
        #root {
          height: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Roboto Mono', monospace;
        }

        #root {
          background-color: #121212;
          color: #e0e0e0;
        }

        [data-theme="light"] #root {
          background-color: #f5f5f5;
          color: #212121;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          position: relative;
          overflow: hidden;
        }

        .loading-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            linear-gradient(rgba(0, 176, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 176, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          z-index: 0;
        }

        [data-theme="light"] .loading-grid {
          background-image:
            linear-gradient(rgba(0, 176, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 176, 255, 0.1) 1px, transparent 1px);
        }

        .loading-logo {
          width: 128px;
          height: 128px;
          margin-bottom: 24px;
          z-index: 1;
        }

        .loading-title {
          font-size: 24px;
          font-weight: 600;
          color: #00b0ff;
          margin-bottom: 8px;
          text-align: center;
          z-index: 1;
          text-shadow: 0 0 10px rgba(0, 176, 255, 0.5);
        }

        .loading-subtitle {
          font-size: 16px;
          color: #9e9e9e;
          margin-bottom: 32px;
          text-align: center;
          z-index: 1;
        }

        .loading-progress {
          width: 200px;
          height: 4px;
          background-color: #1e1e1e;
          border-radius: 2px;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        [data-theme="light"] .loading-progress {
          background-color: #e0e0e0;
        }

        .loading-progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0;
          background-color: #00b0ff;
          animation: progress 3s ease-in-out infinite;
        }

        @keyframes progress {
          0% { width: 0; }
          50% { width: 100%; }
          100% { width: 0; }
        }

        .loading-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 176, 255, 0.2) 0%, rgba(18, 18, 18, 0) 70%);
          z-index: 0;
          animation: pulse 4s ease-in-out infinite;
        }

        [data-theme="light"] .loading-glow {
          background: radial-gradient(circle, rgba(0, 176, 255, 0.3) 0%, rgba(245, 245, 245, 0) 70%);
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(0.8); opacity: 0.3; }
        }
      </style>

      <div class="loading-container">
        <div class="loading-grid"></div>
        <div class="loading-glow"></div>
        <img class="loading-logo" src="/logo.svg" alt="CauldronOS Logo" />
        <div class="loading-title">CauldronOS</div>
        <div class="loading-subtitle">Initializing system components...</div>
        <div class="loading-progress">
          <div class="loading-progress-bar"></div>
        </div>
      </div>
    `;
  }
})();
