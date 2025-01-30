document.getElementById('generate-btn').addEventListener('click', generatePassword);
document.getElementById('copy-btn').addEventListener('click', copyPassword);
document.getElementById('length').addEventListener('input', updateLengthValue);

function generatePassword() {
  const length = document.getElementById('length').value;
  const includeLowercase = document.getElementById('lowercase').checked;
  const includeUppercase = document.getElementById('uppercase').checked;
  const includeNumbers = document.getElementById('numbers').checked;
  const includeSpecial = document.getElementById('special').checked;

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  let allowedChars = '';
  let password = '';

  allowedChars += includeLowercase ? lowercaseChars : '';
  allowedChars += includeUppercase ? uppercaseChars : '';
  allowedChars += includeNumbers ? numberChars : '';
  allowedChars += includeSpecial ? specialChars : '';

  if (allowedChars.length === 0) {
    alert('Please select at least one character type.');
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  document.getElementById('password').value = password;
  updatePasswordStrength(password);
}

function copyPassword() {
  const passwordField = document.getElementById('password');
  passwordField.select();
  document.execCommand('copy');

  // Show "Copied!" notification
  const copiedNotification = document.getElementById('copied-notification');
  copiedNotification.classList.add('show');
  setTimeout(() => {
    copiedNotification.classList.remove('show');
  }, 2000); // Hide after 2 seconds
}

function updateLengthValue() {
  const lengthValue = document.getElementById('length').value;
  document.getElementById('length-value').textContent = lengthValue;
}

function updatePasswordStrength(password) {
  const strengthText = document.getElementById('strength-text');
  const progressBar = document.getElementById('progress');

  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (password.match(/[a-z]/)) strength += 1;
  if (password.match(/[A-Z]/)) strength += 1;
  if (password.match(/[0-9]/)) strength += 1;
  if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

  let strengthLevel = '';
  let progressWidth = 0;
  let progressColor = '';

  switch (strength) {
    case 1:
      strengthLevel = 'Weak';
      progressWidth = '25%';
      progressColor = '#ff4d4d';
      break;
    case 2:
      strengthLevel = 'Fair';
      progressWidth = '50%';
      progressColor = '#ffa64d';
      break;
    case 3:
      strengthLevel = 'Good';
      progressWidth = '75%';
      progressColor = '#ffd24d';
      break;
    case 4:
    case 5:
      strengthLevel = 'Strong';
      progressWidth = '100%';
      progressColor = '#4dff4d';
      break;
    default:
      strengthLevel = 'Weak';
      progressWidth = '25%';
      progressColor = '#ff4d4d';
  }

  strengthText.textContent = strengthLevel;
  progressBar.style.width = progressWidth;
  progressBar.style.backgroundColor = progressColor;
}