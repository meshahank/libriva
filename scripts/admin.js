const passwordPopup = document.getElementById('password-popup');
const passwordInput = document.getElementById('passwordInput');
const passBtn = document.getElementById('passBtn');

// Function to close the popup when the correct password is entered
function closePasswordPopup() {
  if(passwordInput.value === 'fleto'){
    passwordPopup.style.display = 'none';
    passwordInput.value = '';  // Clear the input after closing the popup
  } else {
    alert('Invalid password');
  }
}

// Event listener for the "click" event on the button
passBtn.addEventListener('click', closePasswordPopup);

// Event listener for the "keydown" event on the password input to detect "Enter" key
passwordInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    closePasswordPopup();
  }
});
