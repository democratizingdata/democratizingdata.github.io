// Site-wide JavaScript functionality
// Let Bootstrap 5 handle dropdowns automatically

document.addEventListener('DOMContentLoaded', function() {
    console.log('Site JavaScript loaded');
    
    // Enhanced keyboard navigation for dropdowns (Bootstrap handles the rest)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    console.log('Found dropdown toggles:', dropdownToggles.length);
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Let Bootstrap handle the toggle
                this.click();
            }
        });
    });
    
    // Log when dropdowns are shown/hidden for debugging
    document.addEventListener('shown.bs.dropdown', function(e) {
        console.log('Dropdown shown:', e.target.id);
    });
    
    document.addEventListener('hidden.bs.dropdown', function(e) {
        console.log('Dropdown hidden:', e.target.id);
    });
}); 