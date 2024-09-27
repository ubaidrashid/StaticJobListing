let btnSkills = document.querySelectorAll('.btnSkills');  
let textArea = document.querySelector('.textArea');
let parentFilter = document.querySelector('.parentFilter');
let skillData = [];  
let mainChild = document.querySelector('.mainChild');
let clearButton = document.querySelector('.clear');  // Select the clear button

// Function to filter job listings based on selected skills
function filterJobListings() {
    let items = document.querySelectorAll('.items');  
    items.forEach((item) => {
        let itemSkills = item.querySelectorAll('.btnSkills');  
        let skillsMatch = false;

        // Check if any button's text matches the selected skills
        itemSkills.forEach((btn) => {
            if (skillData.includes(btn.innerText)) {
                skillsMatch = true;  
            }
        });

        // Show or hide items based on match
        item.style.display = (skillData.length === 0 || skillsMatch) ? 'flex' : 'none';  // Show all if skillData is empty
    });
}

// Event listener for each skill button
btnSkills.forEach((skill) => {
    skill.addEventListener('click', () => {
        textArea.classList.remove('none');
        const skillText = skill.innerText;

        // Add skill to array if it doesn't already exist
        if (!skillData.includes(skillText)) {
            skillData.push(skillText);
        }

        // Update displayed skills
        updateFilteredSkills();
        filterJobListings(); 
    });
});

// Function to update the displayed filtered skills
function updateFilteredSkills() {
    parentFilter.innerHTML = '';  // Clear previous skills
    skillData.forEach((skill) => {
        parentFilter.innerHTML += `
            <div class="filters">
                <div class="itemFilter">${skill}</div>
                <div class="closeImg"><img class='ghaib' src="assets/images/icon-remove.svg" alt=""></div>
            </div>`;
    });

    // If no skills, hide textArea
    if (skillData.length === 0) {
        textArea.classList.add('none');
    }

    // Re-bind close buttons
    bindCloseButtons();
}

// Function to bind close buttons to remove skills
function bindCloseButtons() {
    const closeButtons = parentFilter.querySelectorAll('.ghaib');
    closeButtons.forEach((closeBtn) => {
        closeBtn.addEventListener('click', (e) => {
            // Closest filter element se skill ko identify karna
            const filterElement = e.target.closest('.filters');
            if (filterElement) {
                const skillToRemove = filterElement.querySelector('.itemFilter').innerText.trim(); // Trim whitespace
                console.log('Close button clicked');
                console.log(`Skill to remove: ${skillToRemove}`);

                // Skill ko skillData array se remove karna
                skillData = skillData.filter(skill => skill.toLowerCase() !== skillToRemove.toLowerCase()); // Filter out the clicked skill
                console.log('Updated skillData:', skillData);  // Check updated skillData

                // Update filtered skills and listings
                updateFilteredSkills();  
                filterJobListings();  
            } else {
                console.error('Filter element not found');
            }
        });
    });
}

// Event listener for the clear button
clearButton.addEventListener('click', () => {
    skillData = [];  // Clear the skillData array
    updateFilteredSkills();  // Update the displayed skills
    filterJobListings();  // Re-filter the job listings
});

// Bind the initial close buttons on page load
bindCloseButtons();
