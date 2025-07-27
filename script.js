// Initialize Lucide icons
lucide.createIcons();

// Chart.js configuration
const ctx = document.getElementById('performanceChart').getContext('2d');

const gradient = ctx.createLinearGradient(0, 0, 0, 300);
gradient.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Distance (km)',
            data: [8.5, 12.3, 0, 15.2, 10.8, 0, 0],
            borderColor: '#00ff88',
            backgroundColor: gradient,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00ff88',
            pointBorderColor: '#000',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: '#666'
                }
            },
            y: {
                grid: {
                    color: '#333',
                    drawBorder: false
                },
                ticks: {
                    color: '#666'
                }
            }
        }
    }
});

// Smooth scroll and hover effects
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Sync button animation
const syncBtn = document.querySelector('.sync-btn');
syncBtn.addEventListener('click', () => {
    syncBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        syncBtn.style.transform = 'scale(1)';
    }, 100);
    
    // Add rotating animation to icon
    const icon = syncBtn.querySelector('i');
    icon.style.animation = 'spin 1s linear infinite';
    
    setTimeout(() => {
        icon.style.animation = 'none';
    }, 2000);
});

// Enhanced dummy data
const dummyData = {
    user: {
        name: 'Athlete',
        email: 'athlete@example.com',
        avatar: 'https://via.placeholder.com/64x64',
        stravaConnected: false
    },
    activities: [
        { id: 1, name: "Morning Run", type: "Run", date: "2024-01-15", distance: 8.5, time: "42:15", pace: "4:58/km", elevation: 120 },
        { id: 2, name: "Hill Training", type: "Cycle", date: "2024-01-14", distance: 25.3, time: "1:32:45", pace: "3:40/km", elevation: 450 },
        { id: 3, name: "Evening Recovery", type: "Run", date: "2024-01-13", distance: 5.2, time: "26:18", pace: "5:03/km", elevation: 80 },
        { id: 4, name: "Long Run Sunday", type: "Run", date: "2024-01-12", distance: 15.8, time: "1:18:45", pace: "4:59/km", elevation: 280 },
        { id: 5, name: "Easy Ride", type: "Cycle", date: "2024-01-11", distance: 32.1, time: "1:45:30", pace: "3:18/km", elevation: 220 }
    ],
    goals: [
        { id: 1, title: "Run 100km this month", type: "distance", actual: 68, goal: 100, unit: "km", daysLeft: 12 },
        { id: 2, title: "Climb 2,500m elevation", type: "elevation", actual: 1247, goal: 2500, unit: "m", daysLeft: 12 },
        { id: 3, title: "Run for 10 hours", type: "time", actual: 7.2, goal: 10, unit: "hours", daysLeft: 12 },
        { id: 4, title: "Complete 15 activities", type: "count", actual: 12, goal: 15, unit: "activities", daysLeft: 12 }
    ],
    achievements: [
        { id: 1, name: "Speed Demon", description: "Run a 5K under 20 minutes", unlocked: true, date: "2024-01-10", icon: "zap" },
        { id: 2, name: "Elevation Master", description: "Climb 1,000m in a single activity", unlocked: true, date: "2024-01-08", icon: "mountain" },
        { id: 3, name: "Consistency King", description: "Complete 7 activities in a week", unlocked: false, icon: "award" },
        { id: 4, name: "Distance Warrior", description: "Run 50km in a single week", unlocked: false, icon: "trophy" }
    ]
};

// Settings functionality
function saveProfileSettings() {
    const name = document.getElementById('display-name').value;
    const email = document.getElementById('email').value;
    
    dummyData.user.name = name;
    dummyData.user.email = email;
    
    // Update welcome message
    document.querySelector('.welcome-title').textContent = `Welcome back, ${name}`;
    
    showNotification('Profile settings saved successfully!');
}

function toggleStravaConnection() {
    const stravaBtn = document.getElementById('strava-btn');
    const stravaBtnText = document.getElementById('strava-btn-text');
    const stravaStatus = document.getElementById('strava-status');
    const stravaDetails = document.getElementById('strava-details');
    const stravaStatusIcon = document.getElementById('strava-status-icon');
    
    if (dummyData.user.stravaConnected) {
        // Disconnect
        dummyData.user.stravaConnected = false;
        stravaBtnText.textContent = 'Connect to Strava';
        stravaStatus.textContent = 'Not Connected';
        stravaDetails.textContent = 'Connect your Strava account to sync activities';
        stravaStatusIcon.setAttribute('data-lucide', 'link');
        
        document.getElementById('strava-connection').classList.remove('strava-connected');
    } else {
        // Connect
        dummyData.user.stravaConnected = true;
        stravaBtnText.textContent = 'Disconnect Strava';
        stravaStatus.textContent = 'Connected';
        stravaDetails.textContent = 'Account linked successfully';
        stravaStatusIcon.setAttribute('data-lucide', 'check');
        
        document.getElementById('strava-connection').classList.add('strava-connected');
    }
    
    lucide.createIcons();
}

function uploadAvatar() {
    const input = document.getElementById('avatar-input');
    input.click();
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('avatar-preview').src = e.target.result;
                dummyData.user.avatar = e.target.result;
                showNotification('Avatar updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    };
}

function exportData() {
    const dataStr = JSON.stringify(dummyData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-coach-data.json';
    link.click();
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        showNotification('Account deleted successfully');
        // In real app, redirect to landing page
    }
}

function changeThemePreference() {
    const theme = document.getElementById('theme-select').value;
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

function syncStravaData() {
    const syncBtn = document.querySelector('.sync-btn');
    const syncText = document.getElementById('sync-text');
    const icon = syncBtn.querySelector('i');
    
    // Start sync animation
    syncBtn.disabled = true;
    icon.style.animation = 'spin 1s linear infinite';
    syncText.textContent = 'Syncing...';
    
    // Simulate API call
    setTimeout(() => {
        // Update with new dummy data
        dummyData.activities.unshift({
            id: Date.now(),
            name: "Morning Run",
            type: "Run",
            date: new Date().toISOString().split('T')[0],
            distance: Math.random() * 10 + 5,
            time: `${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            pace: `${(4 + Math.random()).toFixed(2)}/km`,
            elevation: Math.floor(Math.random() * 200)
        });
        
        // Update UI
        updateDashboardData();
        
        // Reset button
        syncBtn.disabled = false;
        icon.style.animation = 'none';
        syncText.textContent = 'Sync Strava';
        
        showNotification('Strava data synced successfully!');
    }, 2000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: var(--bg-primary);
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update dashboard with actual data
function updateDashboardData() {
    // Update weekly stats
    const totalDistance = dummyData.activities
        .filter(a => new Date(a.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .reduce((sum, a) => sum + a.distance, 0);
    
    document.querySelector('.stat-value').textContent = totalDistance.toFixed(1);
    
    // Update goals progress
    const firstGoal = dummyData.goals[0];
    const progressBar = document.querySelector('.actual-bar');
    if (progressBar) {
        const progress = (firstGoal.actual / firstGoal.goal) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Enhanced goals page functionality
function renderDetailedGoals() {
    const goals = dummyData.goals.map(goal => ({
        title: goal.title,
        type: goal.type,
        actual: goal.actual,
        goal: goal.goal,
        daysLeft: goal.daysLeft,
        unit: goal.unit,
        pace: goal.pace
    }));

    const container = document.querySelector('.goals-detailed-grid');
    container.innerHTML = goals.map(goal => `
        <div class="goal-detailed-card">
            <div class="goal-header">
                <div class="goal-icon">
                    <i data-lucide="target"></i>
                </div>
                <div>
                    <h4>${goal.title}</h4>
                    <p>${goal.type} Goal • ${goal.daysLeft} days left</p>
                </div>
            </div>
            
            <div class="goal-progress-comparison">
                <div class="progress-section">
                    <h4>Progress</h4>
                    <div class="goal-bar">
                        <div class="actual-bar" style="width: ${(goal.actual / goal.goal) * 100}%">
                            <span>${goal.actual}/${goal.goal}${goal.unit}</span>
                        </div>
                    </div>
                    <small>${Math.round((goal.actual / goal.goal) * 100)}% complete</small>
                </div>
                
                <div class="progress-section">
                    <h4>Need to maintain pace of ${goal.pace}${goal.unit}/day</h4>
                </div>
            </div>
        </div>
    `).join('');
}

// Activities table with goal comparisons
function renderActivitiesTable() {
    const activities = dummyData.activities.map(activity => ({
        name: activity.name,
        type: activity.type,
        date: activity.date,
        distance: activity.distance,
        time: activity.time,
        pace: activity.pace,
        vsGoal: activity.elevation > 0 ? `+${activity.elevation}m` : 'N/A'
    }));

    const tbody = document.getElementById('activities-tbody');
    tbody.innerHTML = activities.map(activity => `
        <tr>
            <td>${activity.name}</td>
            <td>${activity.type}</td>
            <td>${activity.date}</td>
            <td>${activity.distance}km</td>
            <td>${activity.time}</td>
            <td>${activity.pace}</td>
            <td class="vs-goal ${parseFloat(activity.vsGoal) >= 0 ? 'positive' : 'negative'}">${activity.vsGoal}</td>
        </tr>
    `).join('');
}

// Activities trend chart
const activitiesCtx = document.createElement('canvas');
activitiesCtx.id = 'activitiesTrendChart';
activitiesCtx.style.height = '300px';

const activitiesChart = new Chart(activitiesCtx, {
    type: 'bar',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Actual Distance',
                data: [45, 52, 47, 68],
                backgroundColor: 'rgba(0, 255, 136, 0.6)',
                borderColor: '#00ff88',
                borderWidth: 2
            },
            {
                label: 'Goal Distance',
                data: [50, 50, 50, 50],
                backgroundColor: 'rgba(255, 0, 102, 0.3)',
                borderColor: '#ff0066',
                borderWidth: 2,
                type: 'line'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: '#ffffff' }
            }
        },
        scales: {
            x: { 
                grid: { color: '#333' },
                ticks: { color: '#666' }
            },
            y: { 
                grid: { color: '#333' },
                ticks: { color: '#666' }
            }
        }
    }
});

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on and initialize accordingly
    const currentPage = window.location.hash || '#dashboard';
    const pageName = currentPage.replace('#', '') || 'dashboard';
    
    if (document.querySelector(`[data-page="${pageName}"]`)) {
        document.querySelector(`[data-page="${pageName}"]`).click();
    }
    
    // Initialize page-specific features
    if (pageName === 'goals') {
        renderDetailedGoals();
    } else if (pageName === 'activities') {
        renderActivitiesTable();
        document.querySelector('.activities-chart').prepend(activitiesCtx);
    }
    
    updateChartColors();
});

// Handle filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Update goal progress bars to show actual vs goal
document.querySelectorAll('.stat-card').forEach(card => {
    if (!card.querySelector('.goal-vs-actual')) return;
    
    const goalBar = card.querySelector('.goal-bar');
    const actualBar = card.querySelector('.actual-bar');
    const progress = parseInt(actualBar.style.width);
    
    if (progress >= 100) {
        actualBar.style.background = 'linear-gradient(90deg, #00ff88, #00ff88)';
    } else if (progress >= 75) {
        actualBar.style.background = 'linear-gradient(90deg, #00ff88, #ffaa00)';
    } else {
        actualBar.style.background = 'linear-gradient(90deg, #ffaa00, #ff0044)';
    }
});

// Re-initialize Lucide icons when switching pages
function reinitializeIcons() {
    lucide.createIcons();
}

// Call after page switches
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', reinitializeIcons);
});

// Theme toggle functionality
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    
    // Update theme icon
    const themeIcon = document.getElementById('theme-icon');
    if (newTheme === 'light') {
        themeIcon.setAttribute('data-lucide', 'moon');
    } else {
        themeIcon.setAttribute('data-lucide', 'sun');
    }
    
    lucide.createIcons();
}

// Update chart colors based on theme
function updateChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Update performance chart
    if (window.chart) {
        window.chart.data.datasets[0].borderColor = isDark ? '#00ff88' : '#00cc6a';
        window.chart.data.datasets[0].backgroundColor = isDark ? 
            'rgba(0, 255, 136, 0.3)' : 'rgba(0, 204, 106, 0.3)';
        window.chart.update();
    }
    
    // Update activities chart
    if (window.activitiesChart) {
        window.activitiesChart.data.datasets[0].backgroundColor = isDark ? 
            'rgba(0, 255, 136, 0.6)' : 'rgba(0, 204, 106, 0.6)';
        window.activitiesChart.data.datasets[0].borderColor = isDark ? 
            '#00ff88' : '#00cc6a';
        window.activitiesChart.update();
    }
}

// Listen for theme changes
const observer = new MutationObserver(() => {
    updateChartColors();
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});

// Add animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .stat-card {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Enhanced page navigation with data initialization
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page');
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        link.parentElement.classList.add('active');
        
        // Switch pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(`${pageName}-page`).classList.add('active');
        
        // Initialize page-specific data
        if (pageName === 'goals') {
            renderDetailedGoals();
        } else if (pageName === 'activities') {
            renderActivitiesTable();
        } else if (pageName === 'settings') {
            initializeSettings();
        }
        
        reinitializeIcons();
    });
});

function initializeSettings() {
    // Initialize form values
    document.getElementById('display-name').value = dummyData.user.name;
    document.getElementById('email').value = dummyData.user.email;
    document.getElementById('avatar-preview').src = dummyData.user.avatar;
    
    // Initialize Strava connection status
    toggleStravaConnection();
    toggleStravaConnection(); // Reset to actual state
}