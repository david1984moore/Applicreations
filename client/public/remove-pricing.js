// Script to remove pricing section when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Wait for page to fully load
  setTimeout(function() {
    // Find any elements with id="pricing"
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      console.log('Found pricing section, removing it');
      pricingSection.remove();
    }
    
    // Also look for any section containing "Pricing Packages" text
    const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    allHeadings.forEach(heading => {
      if (heading.textContent && heading.textContent.includes('Pricing Packages')) {
        console.log('Found pricing heading, removing parent section');
        // Find the closest section parent and remove it
        const section = heading.closest('section');
        if (section) {
          section.remove();
        } else {
          // If no section parent, go up 3 levels to try to remove the whole component
          let parent = heading.parentElement;
          for (let i = 0; i < 3; i++) {
            if (parent && parent.parentElement) {
              parent = parent.parentElement;
            }
          }
          if (parent) {
            parent.remove();
          }
        }
      }
    });
  }, 500); // Small delay to ensure everything is loaded
});