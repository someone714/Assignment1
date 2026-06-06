document.getElementById('contactForm').addEventListener('submit', function(event) {
    // 1. Prevent the form from submitting/refreshing the page immediately
    event.preventDefault();

    // 2. Initialize a flag to track if the form is valid
    let isValid = true;

    // 3. Clear all previous error messages
    const errorSpans = document.querySelectorAll('.error-msg');
    errorSpans.forEach(span => span.textContent = '');

    // --- Validate Name ---
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
        document.getElementById('nameError').textContent = 'Name is required.';
        isValid = false;
    }

    // --- Validate Email with Regex ---
    const emailInput = document.getElementById('email');
    // Standard regex pattern for normal email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (emailInput.value.trim() === '') {
        document.getElementById('emailError').textContent = 'Email is required.';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // --- Validate Gender (Radio Buttons) ---
    const maleRadio = document.getElementById('male');
    const femaleRadio = document.getElementById('female');
    if (!maleRadio.checked && !femaleRadio.checked) {
        document.getElementById('genderError').textContent = 'Please select your gender.';
        isValid = false;
    }

    // --- Validate Comment (Textarea) ---
    const commentInput = document.getElementById('commentArea');
    if (commentInput.value.trim() === '') {
        document.getElementById('commentError').textContent = 'Please leave a message.';
        isValid = false;
    }

    // --- Validate Sports (Checkboxes - At least one checked) ---
    const sportCheckboxes = document.querySelectorAll('input[name="Gaming"]');
    let oneSportChecked = false;
    
    sportCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            oneSportChecked = true;
        }
    });

    if (!oneSportChecked) {
        document.getElementById('sportError').textContent = 'Please select at least one option.';
        isValid = false;
    }

    // 4. If everything passes validation, go ahead and process the form
    if (isValid) {
        console.log('Form data is valid! Ready for submission backend.');
        // If you actually want to submit the form layout to a URL defined in action="":
        this.submit(); 
    }
});

// Optional: Clear errors cleanly when the reset button is pressed
document.getElementById('contactForm').addEventListener('reset', function() {
    const errorSpans = document.querySelectorAll('.error-msg');
    errorSpans.forEach(span => span.textContent = '');
});