// ===== VIDEO INTRO CONTROLLER =====

class VideoIntroController {
    constructor() {
        this.introOverlay = document.getElementById('intro-overlay');
        this.introVideo = document.getElementById('intro-video');
        this.skipButton = document.getElementById('skip-intro');
        this.mainContent = document.getElementById('main-content');
        
        this.isVideoLoaded = false;
        this.isVideoEnded = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startVideo();
    }
    
    setupEventListeners() {
        // Skip button click
        this.skipButton.addEventListener('click', () => {
            this.hideIntro();
        });
        
        // Video events
        this.introVideo.addEventListener('ended', () => {
            this.handleVideoEnded();
        });
        
        this.introVideo.addEventListener('error', (e) => {
            console.warn('Video load error:', e);
            this.handleVideoError();
        });
        
        // ESC key to skip
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.introOverlay.classList.contains('hidden')) {
                this.hideIntro();
            }
        });
        
        // Prevent right-click on video
        this.introVideo.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
    
    handleVideoError() {
        console.warn('Video failed to load, skipping intro');
        setTimeout(() => {
            this.hideIntro();
        }, 1000);
    }
    
    startVideo() {
        try {
            // Play video immediately
            const playPromise = this.introVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Video started playing');
                }).catch((error) => {
                    console.warn('Video autoplay failed:', error);
                    this.handleVideoError();
                });
            }
        } catch (error) {
            console.warn('Video play error:', error);
            this.handleVideoError();
        }
    }
    
    handleVideoEnded() {
        this.isVideoEnded = true;
        setTimeout(() => {
            this.hideIntro();
        }, 500);
    }
    
    hideIntro() {
        // Fade out intro overlay
        this.introOverlay.classList.add('hidden');
        
        // Show main content after transition
        setTimeout(() => {
            // Initialize main page features
            this.initMainPage();
        }, 500);
    }
    
    initMainPage() {
        // Scroll to top
        window.scrollTo(0, 0);
        
        console.log('Main page initialized - Welcome to Vislet!');
    }
}





// ===== ERROR HANDLING =====

window.addEventListener('error', (e) => {
    console.warn('JavaScript error:', e.error);
    
    // If intro fails, ensure main content shows
    if (document.getElementById('intro-overlay') && !document.getElementById('intro-overlay').classList.contains('hidden')) {
        setTimeout(() => {
            document.getElementById('intro-overlay').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
        }, 2000);
    }
});

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize video intro
        new VideoIntroController();
        
        console.log('Vislet Finance Management - Initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
        
        // Fallback: show main content immediately
        document.getElementById('intro-overlay').classList.add('hidden');
        
        console.log('Fallback: Main content shown');
    }
});


