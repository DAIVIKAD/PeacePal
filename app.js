// PeacePal Wellness Platform JavaScript

// Application State
const appState = {
    currentTab: 'garden',
    user: {
        name: 'Alex',
        points: 340,
        level: 3,
        streak: 5,
        gardenProgress: 72
    },
    mood: {
        current: 4,
        history: [3, 4, 3, 5, 4, 5, 4], // Last 7 days
        selectedMood: null
    },
    journal: {
        currentText: '',
        sentiment: { positive: 70, neutral: 25, negative: 5 }
    },
    garden: {
        characters: ['fox', 'bee', 'butterfly', 'bird'],
        plants: ['red-flower', 'blue-flower', 'tree', 'sunflowers']
    }
};

// Character messages
const characterMessages = {
    fox: [
        "Great job tending to your wellness garden today! 🌱",
        "Your consistent care is helping everything bloom beautifully. ✨",
        "Remember, small daily actions lead to big transformations. 💪"
    ],
    bee: [
        "Buzzing with excitement about your progress! 🐝",
        "Keep pollinating your mind with positive thoughts. 🌸",
        "Every wellness activity helps our garden grow stronger. 🌻"
    ],
    butterfly: [
        "Transformation is beautiful, just like your wellness journey! 🦋",
        "Every day you're becoming a more vibrant version of yourself. ✨",
        "Your growth inspires everyone in this garden. 💖"
    ],
    bird: [
        "Soaring to new heights of wellness with you! 🐦",
        "Your dedication lifts everyone's spirits in this garden. 🌈",
        "Freedom comes from taking care of your mental health. 🕊️"
    ]
};

// AI suggestions based on sentiment
const aiSuggestions = {
    positive: [
        "Reflect on something you are grateful for today.",
        "What specific moment brought you the most joy?",
        "How can you share this positive energy with others?",
        "What would you like to remember about this feeling?"
    ],
    neutral: [
        "What's one small thing that could brighten your day?",
        "Describe the environment around you right now.",
        "What are you looking forward to most this week?",
        "How are you taking care of yourself today?"
    ],
    negative: [
        "What support do you need right now?",
        "Can you identify what triggered these feelings?",
        "What would your best friend tell you in this moment?",
        "What's one tiny step you could take to feel better?"
    ]
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 PeacePal Wellness Platform initialized');
    initializeApp();
});

function initializeApp() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        // Initialize charts
        initializeMoodChart();
        initializeSentimentChart();
        
        // Set up event listeners
        setupEventListeners();
        
        // Start animations
        startAnimations();
        
        // Load initial data
        updateUserInterface();
        updateJournalSuggestion();
        
        console.log('App initialization complete');
    }, 100);
}

function setupEventListeners() {
    // Journal textarea
    const journalTextarea = document.getElementById('journalTextarea');
    if (journalTextarea) {
        journalTextarea.addEventListener('input', handleJournalInput);
        console.log('Journal textarea listener added');
    }
    
    // Add click listeners for garden elements
    document.querySelectorAll('.garden-character').forEach(character => {
        character.addEventListener('click', function(e) {
            e.stopPropagation();
            const characterType = this.dataset.character || this.classList[1];
            console.log('Character clicked:', characterType);
            showCharacterMessage(characterType);
        });
    });
    
    document.querySelectorAll('.garden-element').forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            const plantType = this.classList[1];
            console.log('Plant clicked:', plantType);
            interactWithPlant(plantType);
        });
    });
    
    console.log('Event listeners setup complete');
}

// Navigation Functions
function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Update tab buttons
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        console.log('Active tab updated');
    } else {
        console.error('Tab button not found:', tabName);
    }
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(tabName);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Content section updated:', tabName);
    } else {
        console.error('Content section not found:', tabName);
    }
    
    appState.currentTab = tabName;
    
    // Tab-specific initialization
    switch(tabName) {
        case 'dashboard':
            setTimeout(() => {
                updateMoodChart();
                updateMoodDisplay();
            }, 100);
            break;
        case 'journal':
            setTimeout(() => {
                updateJournalSuggestion();
                if (window.sentimentChart) {
                    window.sentimentChart.resize();
                }
            }, 100);
            break;
        case 'discovery':
            setTimeout(() => {
                loadDiscoveryContent();
            }, 100);
            break;
    }
    
    // Show success notification
    showNotification(`Switched to ${tabName.charAt(0).toUpperCase() + tabName.slice(1)} section! ✨`);
}

// Garden Functions
function showCharacterMessage(characterType) {
    console.log('Showing message for character:', characterType);
    
    const messages = characterMessages[characterType];
    if (!messages) {
        console.error('No messages found for character:', characterType);
        return;
    }
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage, 'success');
    
    // Add interaction animation
    const character = document.querySelector(`[data-character="${characterType}"], .${characterType}`);
    if (character) {
        character.style.transform = 'scale(1.3)';
        character.style.filter = 'brightness(1.3)';
        
        setTimeout(() => {
            character.style.transform = '';
            character.style.filter = '';
        }, 300);
        
        addSparkleEffect(character);
    }
    
    // Award points
    awardPoints(5, 'Character interaction');
}

function interactWithPlant(plantType) {
    console.log('Interacting with plant:', plantType);
    
    const plantMessages = {
        'flower-red': 'The red flower blooms with your positive energy! 🌺',
        'flower-blue': 'The blue flower appreciates your gentle care! 🌸',
        'main-tree': 'The wisdom tree shares its strength with you! 🌳',
        'sunflowers': 'The sunflowers turn toward your bright spirit! 🌻'
    };
    
    const message = plantMessages[plantType] || 'You interact with a beautiful plant! 🌱';
    showNotification(message, 'success');
    
    // Add sparkle effect
    const plant = document.querySelector(`.${plantType}`);
    if (plant) {
        plant.style.transform = 'scale(1.2)';
        plant.style.filter = 'brightness(1.2)';
        
        setTimeout(() => {
            plant.style.transform = '';
            plant.style.filter = '';
        }, 300);
        
        addSparkleEffect(plant);
    }
    
    // Award points
    awardPoints(3, 'Plant interaction');
}

function addSparkleEffect(element) {
    const sparkles = ['✨', '🌟', '💫'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: 16px;
            pointer-events: none;
            animation: sparkle-float 2s ease-out forwards;
            z-index: 100;
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 2000);
    }
}

function continueJourney() {
    showNotification('Your wellness journey continues! Keep growing! 🌱✨', 'success');
    awardPoints(10, 'Journey continuation');
    
    // Animate progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const currentWidth = parseInt(progressFill.style.width) || 72;
        const newWidth = Math.min(100, currentWidth + 2);
        progressFill.style.width = `${newWidth}%`;
        
        // Update progress text
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${newWidth}/100`;
        }
        
        appState.user.gardenProgress = newWidth;
    }
}

// Dashboard Functions
function initializeMoodChart() {
    const ctx = document.getElementById('moodChart');
    if (!ctx) {
        console.log('Mood chart canvas not found');
        return;
    }
    
    try {
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                datasets: [{
                    data: appState.mood.history,
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10B981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false,
                        min: 1,
                        max: 5
                    }
                },
                elements: {
                    point: {
                        hoverBackgroundColor: '#10B981'
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
        
        // Store chart reference
        window.moodChart = chart;
        console.log('Mood chart initialized');
    } catch (error) {
        console.error('Error initializing mood chart:', error);
    }
}

function updateMoodChart() {
    if (window.moodChart) {
        window.moodChart.data.datasets[0].data = appState.mood.history;
        window.moodChart.update('active');
        console.log('Mood chart updated');
    }
}

function openMoodLogger() {
    console.log('Opening mood logger');
    const modal = document.getElementById('moodModal');
    if (modal) {
        modal.classList.remove('hidden');
        showNotification('Select your current mood! 😊', 'info');
    } else {
        console.error('Mood modal not found');
    }
}

function closeMoodModal() {
    console.log('Closing mood modal');
    const modal = document.getElementById('moodModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    
    // Reset selected mood
    document.querySelectorAll('.mood-option').forEach(option => {
        option.classList.remove('selected');
    });
    appState.mood.selectedMood = null;
}

function selectMood(moodValue) {
    console.log('Selecting mood:', moodValue);
    
    // Update UI
    document.querySelectorAll('.mood-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`[data-mood="${moodValue}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    appState.mood.selectedMood = moodValue;
    showNotification('Mood selected! Click "Log Mood" to save.', 'info');
}

function logMood() {
    console.log('Logging mood:', appState.mood.selectedMood);
    
    if (!appState.mood.selectedMood) {
        showNotification('Please select a mood first! 😊', 'warning');
        return;
    }
    
    // Update mood history
    appState.mood.history.push(appState.mood.selectedMood);
    if (appState.mood.history.length > 7) {
        appState.mood.history.shift();
    }
    
    // Update current mood
    appState.mood.current = appState.mood.selectedMood;
    
    // Update chart
    updateMoodChart();
    
    // Update mood display
    updateMoodDisplay();
    
    // Close modal
    closeMoodModal();
    
    // Show success message
    showNotification('Mood logged successfully! 📊', 'success');
    awardPoints(15, 'Mood tracking');
}

function updateMoodDisplay() {
    const moodEmoji = document.querySelector('.mood-emoji');
    const moodLabel = document.querySelector('.mood-label');
    
    const moodMap = {
        1: { emoji: '😢', label: 'Sad' },
        2: { emoji: '😐', label: 'Okay' },
        3: { emoji: '🙂', label: 'Fine' },
        4: { emoji: '😊', label: 'Good' },
        5: { emoji: '😄', label: 'Great' }
    };
    
    const currentMood = moodMap[appState.mood.current] || moodMap[4];
    
    if (moodEmoji) moodEmoji.textContent = currentMood.emoji;
    if (moodLabel) moodLabel.textContent = currentMood.label;
    
    console.log('Mood display updated:', currentMood);
}

function setActiveNav(button) {
    console.log('Setting active nav button');
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Add interaction feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    showNotification('Navigation updated! 📱', 'info');
}

// Journal Functions
function initializeSentimentChart() {
    const ctx = document.getElementById('sentimentChart');
    if (!ctx) {
        console.log('Sentiment chart canvas not found');
        return;
    }
    
    try {
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        appState.journal.sentiment.positive,
                        appState.journal.sentiment.neutral,
                        appState.journal.sentiment.negative
                    ],
                    backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
                    borderWidth: 0,
                    cutout: '60%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        });
        
        window.sentimentChart = chart;
        console.log('Sentiment chart initialized');
    } catch (error) {
        console.error('Error initializing sentiment chart:', error);
    }
}

function handleJournalInput() {
    const textarea = document.getElementById('journalTextarea');
    if (!textarea) return;
    
    const text = textarea.value;
    appState.journal.currentText = text;
    
    console.log('Journal text updated, length:', text.length);
    
    // Analyze sentiment
    const sentiment = analyzeSentiment(text);
    updateSentimentChart(sentiment);
    updateSentimentEmoji(sentiment);
    updateJournalSuggestion(sentiment);
    
    // Show typing feedback
    if (text.length > 0 && text.length % 50 === 0) {
        showNotification('Keep writing! Your thoughts are being analyzed. ✍️', 'info');
    }
}

function analyzeSentiment(text) {
    if (!text || text.length < 10) {
        return { positive: 50, neutral: 40, negative: 10, dominant: 'neutral' };
    }
    
    // Simple sentiment analysis based on keywords
    const positiveWords = ['happy', 'joy', 'love', 'great', 'wonderful', 'amazing', 'beautiful', 'peaceful', 'grateful', 'blessed', 'excited', 'good', 'excellent', 'fantastic', 'awesome', 'positive', 'sunshine', 'smile', 'laugh', 'nature', 'fresh', 'refreshing'];
    const negativeWords = ['sad', 'angry', 'hate', 'terrible', 'awful', 'horrible', 'depressed', 'anxious', 'worried', 'stress', 'pain', 'hurt', 'bad', 'worst', 'cry', 'fear', 'lonely', 'tired'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;
    
    words.forEach(word => {
        if (positiveWords.includes(word)) positiveScore++;
        if (negativeWords.includes(word)) negativeScore++;
    });
    
    const totalEmotionalWords = positiveScore + negativeScore;
    
    if (totalEmotionalWords === 0) {
        return { positive: 40, neutral: 50, negative: 10, dominant: 'neutral' };
    }
    
    const positivePercent = Math.max(20, (positiveScore / totalEmotionalWords) * 80);
    const negativePercent = Math.max(5, (negativeScore / totalEmotionalWords) * 30);
    const neutralPercent = 100 - positivePercent - negativePercent;
    
    let dominant = 'neutral';
    if (positivePercent > 50) dominant = 'positive';
    else if (negativePercent > 25) dominant = 'negative';
    
    return {
        positive: Math.round(positivePercent),
        neutral: Math.round(neutralPercent),
        negative: Math.round(negativePercent),
        dominant
    };
}

function updateSentimentChart(sentiment) {
    if (window.sentimentChart) {
        window.sentimentChart.data.datasets[0].data = [
            sentiment.positive,
            sentiment.neutral,
            sentiment.negative
        ];
        window.sentimentChart.update('active');
        console.log('Sentiment chart updated:', sentiment);
    }
    
    appState.journal.sentiment = sentiment;
}

function updateSentimentEmoji(sentiment) {
    const emoji = document.querySelector('.chart-center-emoji');
    if (!emoji) return;
    
    const emojiMap = {
        positive: '😊',
        neutral: '😐',
        negative: '😔'
    };
    
    emoji.textContent = emojiMap[sentiment.dominant] || '😐';
}

function updateJournalSuggestion(sentiment = null) {
    const suggestionText = document.querySelector('.suggestion-text');
    if (!suggestionText) return;
    
    const sentimentType = sentiment ? sentiment.dominant : 'neutral';
    const suggestions = aiSuggestions[sentimentType];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    suggestionText.textContent = randomSuggestion;
    console.log('Journal suggestion updated:', randomSuggestion);
}

function formatText(format) {
    const textarea = document.getElementById('journalTextarea');
    if (!textarea) return;
    
    // Simple formatting feedback
    const button = event.target;
    button.style.background = 'var(--color-primary)';
    button.style.color = 'white';
    
    setTimeout(() => {
        button.style.background = '';
        button.style.color = '';
    }, 200);
    
    showNotification(`${format.charAt(0).toUpperCase() + format.slice(1)} formatting applied!`, 'info');
    awardPoints(2, 'Text formatting');
}

// Discovery Functions
function loadDiscoveryContent() {
    console.log('Loading discovery content');
    
    // Animate content cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    showNotification('Discover wellness content! 🔍', 'info');
}

// Utility Functions
function awardPoints(points, reason) {
    appState.user.points += points;
    updateUserInterface();
    
    if (reason) {
        showNotification(`+${points} points for ${reason}! ⭐`, 'success');
    }
    
    console.log('Points awarded:', points, 'for', reason);
}

function updateUserInterface() {
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) {
        pointsElement.textContent = appState.user.points;
    }
}

function showNotification(message, type = 'success') {
    console.log('Showing notification:', message, type);
    
    const container = document.getElementById('notificationContainer');
    if (!container) {
        console.error('Notification container not found');
        return;
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add different colors for different types
    if (type === 'warning') {
        notification.style.background = '#F59E0B';
    } else if (type === 'info') {
        notification.style.background = '#3B82F6';
    } else if (type === 'success') {
        notification.style.background = '#10B981';
    }
    
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function startAnimations() {
    // Add floating animation keyframes to the page
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle-float {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-30px) scale(1.2) rotate(360deg);
            }
        }
        
        @keyframes gentle-glow {
            0%, 100% {
                box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
            }
            50% {
                box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Start periodic garden effects
    setInterval(() => {
        if (appState.currentTab === 'garden') {
            addRandomSparkles();
        }
    }, 8000);
    
    console.log('Animations started');
}

function addRandomSparkles() {
    const gardenElements = document.querySelectorAll('.garden-element, .garden-character');
    if (gardenElements.length === 0) return;
    
    const randomElement = gardenElements[Math.floor(Math.random() * gardenElements.length)];
    addSparkleEffect(randomElement);
}

// Global function assignments for HTML onclick handlers
window.switchTab = switchTab;
window.showCharacterMessage = showCharacterMessage;
window.interactWithPlant = interactWithPlant;
window.continueJourney = continueJourney;
window.openMoodLogger = openMoodLogger;
window.closeMoodModal = closeMoodModal;
window.selectMood = selectMood;
window.logMood = logMood;
window.setActiveNav = setActiveNav;
window.formatText = formatText;

console.log('✨ PeacePal Wellness Platform fully loaded and ready!');