// Global authentication validation script - Complete Page Replacement with Dakota Logo
(function() {
  'use strict';
  
  // Configuration
  const AUTH_CONFIG = {
    tokenKey: 'access_token',
    timestampKey: 'token_timestamp',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    loginPath: '/login'
  };
  
  // Check if we're on login page
  function checkIfLoginPage() {
    return window.location.pathname.includes('/login') || 
           window.location.href.includes('/login') ||
           document.title.includes('Login');
  }
  
  // Add logout button to navigation in a good position
  function addLogoutButton() {
    // Wait for navigation to be available
    const addButton = () => {
      const navbar = document.querySelector('nav') || 
                    document.querySelector('header') || 
                    document.querySelector('[role="navigation"]') ||
                    document.querySelector('.navbar') ||
                    document.querySelector('.nav');
      
      if (!navbar) {
        // Try again in 100ms
        setTimeout(addButton, 100);
        return;
      }
      
      // Check if logout button already exists
      if (document.getElementById('logout-btn')) {
        return;
      }
      
      // Create logout button
      const logoutBtn = document.createElement('button');
      logoutBtn.id = 'logout-btn';
      logoutBtn.innerHTML = 'Logout';
      logoutBtn.style.cssText = `
        background: #dc2626;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--rounded-full,9999px);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-left: 1rem;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      `;
      
      // Add hover effect
      logoutBtn.addEventListener('mouseenter', () => {
        logoutBtn.style.background = '#b91c1c';
        logoutBtn.style.transform = 'translateY(-1px)';
        logoutBtn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
      });
      
      logoutBtn.addEventListener('mouseleave', () => {
        logoutBtn.style.background = '#dc2626';
        logoutBtn.style.transform = 'translateY(0)';
        logoutBtn.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      });
      
      // Add click handler
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
      
      // Find the best position in the navbar
      const rightSide = navbar.querySelector('.navbar-right') ||
                       navbar.querySelector('.nav-right') ||
                       navbar.querySelector('[class*="right"]') ||
                       navbar.querySelector('.search')?.parentElement ||
                       navbar.querySelector('.theme-toggle')?.parentElement ||
                       navbar.querySelector('input[type="search"]')?.parentElement;
      
      if (rightSide && rightSide !== navbar) {
        // Add to right side container
        rightSide.appendChild(logoutBtn);
      } else {
        // Try to find a good spot in the navbar
        const searchBar = navbar.querySelector('input[type="search"]');
        const themeToggle = navbar.querySelector('.theme-toggle') || navbar.querySelector('[class*="theme"]');
        
        if (searchBar && searchBar.parentElement) {
          // Add after search bar
          searchBar.parentElement.appendChild(logoutBtn);
        } else if (themeToggle && themeToggle.parentElement) {
          // Add after theme toggle
          themeToggle.parentElement.appendChild(logoutBtn);
        } else {
          // Add to the end of navbar
          navbar.appendChild(logoutBtn);
        }
      }
    };
    
    addButton();
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.parentElement.style.cssText = `
          display: flex !important;
        `;
  }
  
  // Logout function
  function logout() {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.timestampKey);
    document.body.classList.remove('authenticated');
    window.location.href = AUTH_CONFIG.loginPath;
  }
  
  // Create clean login page with Dakota logo
  function createCleanLoginPage() {
    const loginHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dakota Documentation Login</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f2f2f2 0%, #edf8fd 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            visibility: visible !important;
          }
          
          .login-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 3rem;
            width: 100%;
            max-width: 400px;
            text-align: center;
          }
          
          .logo-container {
            margin-bottom: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .logo {
            max-width: 200px;
            height: auto;
            object-fit: contain;
          }
          
          .subtitle {
            color: #333;
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            font-weight: 500;
          }
          
          .form-group {
            margin-bottom: 1.5rem;
            text-align: left;
          }
          
          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 500;
          }
          
          .form-group input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
          }
          
          .form-group input:focus {
            outline: none;
            border-color: #0A9CE8;
          }
          
          .login-btn {
            width: 100%;
            background: #0A9CE8;
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-bottom: 1rem;
          }
          
          .login-btn:hover:not(:disabled) {
            background: #0884c7;
          }
          
          .login-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          .message {
            padding: 0.75rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 0.9rem;
          }
          
          .error {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
          }
          
          .success {
            background: #f0fdf4;
            color: #16a34a;
            border: 1px solid #bbf7d0;
          }
          
          .hidden {
            display: none;
          }
        </style>
      </head>
      <body>
        <div class="login-container">
          <div class="logo-container">
            <img src="/dakota_light.png" alt="Dakota" class="logo">
          </div>
          <div class="subtitle">API Documentation</div>
          
          <form id="loginForm">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" placeholder="Enter your username" required>
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>
            
            <button type="submit" id="loginButton" class="login-btn">Login</button>
            
            <div id="errorMessage" class="message error hidden"></div>
            <div id="successMessage" class="message success hidden"></div>
          </form>
        </div>
        
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('loginForm');
            const errorDiv = document.getElementById('errorMessage');
            const successDiv = document.getElementById('successMessage');
            const loginButton = document.getElementById('loginButton');
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            
            // Check if already authenticated
            const existingToken = localStorage.getItem('access_token');
            if (existingToken) {
              const tokenTimestamp = localStorage.getItem('token_timestamp');
              if (tokenTimestamp) {
                const tokenAge = Date.now() - parseInt(tokenTimestamp);
                const maxAge = 24 * 60 * 60 * 1000; // 24 hours
                
                if (tokenAge <= maxAge) {
                  showSuccess('Already authenticated. Redirecting...');
                  setTimeout(() => {
                    window.location.href = '/';
                  }, 1000);
                  return;
                } else {
                  localStorage.removeItem('access_token');
                  localStorage.removeItem('token_timestamp');
                }
              }
            }
            
            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              
              const username = usernameInput.value.trim();
              const password = passwordInput.value;
              
              if (!username || !password) {
                showError('Please enter both username and password.');
                return;
              }
              
              setLoadingState(true);
              hideMessages();
              
              try {
                const response = await fetch('https://marketplace-as-a-service.herokuapp.com/index.php/api/oauth2', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                    grant_type: "password"
                  })
                });
                
                const data = await response.json();
                console.log(data);
                
                if (!response.ok) {
                  throw new Error(data.message || data.error || \`Login failed: \${data}\`);
                }
                
                if (!data.access_token) {
                  throw new Error('No access token received from server');
                }
                
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('token_timestamp', Date.now().toString());
                
                showSuccess('Login successful! Redirecting...');
                
                setTimeout(() => {
                  window.location.href = '/';
                }, 1500);
                
              } catch (error) {
                console.error('Login error:', error);
                showError(error.message || 'Invalid login credentials. Please try again.');
              } finally {
                setLoadingState(false);
              }
            });
            
            function setLoadingState(loading) {
              loginButton.disabled = loading;
              usernameInput.disabled = loading;
              passwordInput.disabled = loading;
              
              if (loading) {
                loginButton.textContent = 'Logging in...';
              } else {
                loginButton.textContent = 'Login';
              }
            }
            
            function showError(message) {
              errorDiv.textContent = message;
              errorDiv.classList.remove('hidden');
              successDiv.classList.add('hidden');
            }
            
            function showSuccess(message) {
              successDiv.textContent = message;
              successDiv.classList.remove('hidden');
              errorDiv.classList.add('hidden');
            }
            
            function hideMessages() {
              errorDiv.classList.add('hidden');
              successDiv.classList.add('hidden');
            }
          });
        </script>
      </body>
      </html>
    `;
    
    // Replace entire document
    document.open();
    document.write(loginHTML);
    document.close();
  }
  
  // Check authentication and redirect
  function checkAuthentication() {
    const currentPath = window.location.pathname;
    
    // If on login page, show clean login
    if (checkIfLoginPage()) {
      createCleanLoginPage();
      return;
    }
    
    // Check if token exists
    const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
    if (!token) {
      console.log('No authentication token found');
      window.location.href = AUTH_CONFIG.loginPath;
      return;
    }
    
    // Check token age
    const tokenTimestamp = localStorage.getItem(AUTH_CONFIG.timestampKey);
    if (tokenTimestamp) {
      const tokenAge = Date.now() - parseInt(tokenTimestamp);
      if (tokenAge > AUTH_CONFIG.maxAge) {
        localStorage.removeItem(AUTH_CONFIG.tokenKey);
        localStorage.removeItem(AUTH_CONFIG.timestampKey);
        window.location.href = AUTH_CONFIG.loginPath;
        return;
      }
    }
    
    // Token is valid - show content and add logout button
    document.body.classList.add('authenticated');
    addLogoutButton();
    console.log('Authentication valid');
  }
  
  // Run immediately
  checkAuthentication();
  
  // Also run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuthentication);
  } else {
    checkAuthentication();
  }
  
  // Listen for navigation changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(checkAuthentication, 50);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(checkAuthentication, 50);
  };
  
  // Listen for storage changes
  window.addEventListener('storage', function(e) {
    if (e.key === AUTH_CONFIG.tokenKey && !e.newValue) {
      document.body.classList.remove('authenticated');
      window.location.href = AUTH_CONFIG.loginPath;
    }
  });
  
  // Expose for debugging
  window.authDebug = {
    check: checkAuthentication,
    logout: logout,
    clear: () => {
      localStorage.removeItem(AUTH_CONFIG.tokenKey);
      localStorage.removeItem(AUTH_CONFIG.timestampKey);
      document.body.classList.remove('authenticated');
      window.location.href = AUTH_CONFIG.loginPath;
    }
  };
})();
