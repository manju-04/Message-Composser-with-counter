
document.addEventListener('DOMContentLoaded', function () {
    const messageTextarea = document.getElementById('message');
    const counterElement = document.getElementById('counter');
    const messageAlert = document.getElementById('messageAlert');
    const submitButton = document.getElementById('submitButton');

    const maxChars = 200;
    let isLimitExceeded = false;

    // Update the counter text
    function updateCounter() {
        const currentChars = messageTextarea.value.length;
        const remainingChars = maxChars - currentChars;

        counterElement.textContent = `${currentChars}/${maxChars} characters`;

        if (remainingChars < 10) {
            counterElement.classList.add('warning');
        } else {
            counterElement.classList.remove('warning');
        }

        if (currentChars >= maxChars) {
            counterElement.classList.add('limit-reached');
            isLimitExceeded = true;

            // Show error message
            messageAlert.textContent = 'Character limit exceeded! Further typing is disabled.';
            messageAlert.className = 'message error';
            messageAlert.style.display = 'block';
        } else {
            counterElement.classList.remove('limit-reached');
            isLimitExceeded = false;
            messageAlert.style.display = 'none';
        }
    }

    // Handle input event
    messageTextarea.addEventListener('input', function () {
        updateCounter();

        // If limit is exceeded, truncate the text
        if (messageTextarea.value.length > maxChars) {
            messageTextarea.value = messageTextarea.value.substring(0, maxChars);
        }
    });

    // Handle keypress to prevent further input when limit is reached
    messageTextarea.addEventListener('keypress', function (e) {
        if (isLimitExceeded) {
            e.preventDefault();
        }
    });

    // Handle form submission
    submitButton.addEventListener('click', function () {
        if (messageTextarea.value.trim() === '') {
            messageAlert.textContent = 'Please enter a message before submitting.';
            messageAlert.className = 'message error';
            messageAlert.style.display = 'block';
        } else {
            messageAlert.textContent = 'Message submitted successfully!';
            messageAlert.className = 'message success';
            messageAlert.style.display = 'block';

            // Clear the textarea after a short delay
            setTimeout(function () {
                messageTextarea.value = '';
                updateCounter();
            }, 2000);
        }
    });

    // Initialize the counter
    updateCounter();
});
