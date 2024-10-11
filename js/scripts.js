// Image Preview Functionality
document.getElementById('profilePic').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = document.getElementById('profilePreview');
        preview.src = reader.result;
        preview.classList.remove('hidden');
    }
    if(event.target.files[0]){
        reader.readAsDataURL(event.target.files[0]);
    }
});

document.getElementById("userDescription").addEventListener("input", function() {
    const description = this.value;
    if (description.length > 500) {
      alert("Description should be less than 500 characters.");
    }
  });
  

// Show or Hide Specialization Field Based on Qualification
function showSpecialization() {
    const qualification = document.getElementById('qualification').value;
    const specializationField = document.getElementById('specialization-field');
    if (qualification === 'be_cse') {
        specializationField.classList.remove('hidden');
    } else {
        specializationField.classList.add('hidden');
    }
}

// Real-time Validation Functions
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const dobInput = document.getElementById('dob');
const nameInput = document.getElementById('name');

emailInput.addEventListener('input', function() {
    const email = emailInput.value;
    const emailError = document.getElementById('emailError');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
        emailError.textContent = '';
    } else {
        emailInput.classList.remove('valid');
        emailInput.classList.add('invalid');
        emailError.textContent = 'Please enter a valid email.';
    }
});

phoneInput.addEventListener('input', function() {
    const phone = phoneInput.value;
    const phoneError = document.getElementById('phoneError');
    const regex = /^[6-9]\d{9}$/;
    if (regex.test(phone)) {
        phoneInput.classList.remove('invalid');
        phoneInput.classList.add('valid');
        phoneError.textContent = '';
    } else {
        phoneInput.classList.remove('valid');
        phoneInput.classList.add('invalid');
        phoneError.textContent = 'Please enter a valid 10-digit Indian phone number.';
    }
});

dobInput.addEventListener('change', function() {
    const dob = new Date(dobInput.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    const dobError = document.getElementById('dobError');
    if(age >= 18) {
        dobInput.classList.remove('invalid');
        dobInput.classList.add('valid');
        dobError.textContent = `Age: ${age}`;
        dobError.style.color = 'green';
    } else {
        dobInput.classList.remove('valid');
        dobInput.classList.add('invalid');
        dobError.textContent = 'You must be at least 18 years old.';
        dobError.style.color = 'red';
    }
});

nameInput.addEventListener('input', function() {
    const name = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    if (name === "") {
        nameInput.classList.remove('valid');
        nameInput.classList.add('invalid');
        nameError.textContent = 'Name is required.';
    } else {
        nameInput.classList.remove('invalid');
        nameInput.classList.add('valid');
        nameError.textContent = '';
    }
});

// Form Validation Function
function validateForm() {
    let isValid = true;

    // Name Validation
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('nameError');
    if (name === "") {
        isValid = false;
        nameError.textContent = 'Name is required.';
        document.getElementById('name').classList.add('invalid');
    } else {
        nameError.textContent = '';
        document.getElementById('name').classList.remove('invalid');
        document.getElementById('name').classList.add('valid');
    }

    // Email Validation
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('emailError');
    if (!emailRegex.test(email)) {
        isValid = false;
        emailError.textContent = 'Please enter a valid email.';
        emailInput.classList.add('invalid');
    }

    // Phone Validation
    const phone = phoneInput.value;
    const phoneRegex = /^[6-9]\d{9}$/;
    const phoneError = document.getElementById('phoneError');
    if (!phoneRegex.test(phone)) {
        isValid = false;
        phoneError.textContent = 'Please enter a valid 10-digit Indian phone number.';
        phoneInput.classList.add('invalid');
    }

    // Gender Validation
    const gender = document.getElementById('gender').value;
    const genderError = document.getElementById('genderError');
    if (gender === "") {
        isValid = false;
        genderError.textContent = 'Please select your gender.';
        document.getElementById('gender').classList.add('invalid');
    } else {
        genderError.textContent = '';
        document.getElementById('gender').classList.remove('invalid');
        document.getElementById('gender').classList.add('valid');
    }

    // DOB Validation
    const dob = dobInput.value;
    const dobError = document.getElementById('dobError');
    if (dob === "") {
        isValid = false;
        dobError.textContent = 'Please enter your date of birth.';
        dobInput.classList.add('invalid');
    }

    // College Validation
    const college = document.getElementById('college').value;
    const collegeError = document.getElementById('collegeError');
    if (college === "") {
        isValid = false;
        collegeError.textContent = 'Please select your college.';
        document.getElementById('college').classList.add('invalid');
    } else {
        collegeError.textContent = '';
        document.getElementById('college').classList.remove('invalid');
        document.getElementById('college').classList.add('valid');
    }

    // Qualification Validation
    const qualification = document.getElementById('qualification').value;
    const qualificationError = document.getElementById('qualificationError');
    if (qualification === "") {
        isValid = false;
        qualificationError.textContent = 'Please select your qualification.';
        document.getElementById('qualification').classList.add('invalid');
    } else {
        qualificationError.textContent = '';
        document.getElementById('qualification').classList.remove('invalid');
        document.getElementById('qualification').classList.add('valid');
    }

    // Specialization Validation if BE CSE
    if (qualification === 'be_cse') {
        const specialization = document.getElementById('specialization').value;
        const specializationError = document.getElementById('specializationError');
        if (specialization === "") {
            isValid = false;
            specializationError.textContent = 'Please select your specialization.';
            document.getElementById('specialization').classList.add('invalid');
        } else {
            specializationError.textContent = '';
            document.getElementById('specialization').classList.remove('invalid');
            document.getElementById('specialization').classList.add('valid');
        }
    }

    return isValid;
}

// Save Profile Function
function saveProfile() {
    if (validateForm()) {
        // Populate Profile Display Section
        document.getElementById('displayName').textContent = document.getElementById('name').value;
        document.getElementById('displayEmail').textContent = document.getElementById('email').value;
        document.getElementById('displayPhone').textContent = document.getElementById('phone').value;
        document.getElementById('displayGender').textContent = document.getElementById('gender').value;
        document.getElementById('displayDOB').textContent = document.getElementById('dob').value;
        document.getElementById('displayCollege').textContent = document.getElementById('college').options[document.getElementById('college').selectedIndex].text;
        const qualificationValue = document.getElementById('qualification').value;
        document.getElementById('displayQualification').textContent = qualificationValue === 'be_cse' ? 'BE CSE' : document.getElementById('qualification').options[document.getElementById('qualification').selectedIndex].text;

        if (qualificationValue === 'be_cse') {
            document.getElementById('displaySpecialization').textContent = document.getElementById('specialization').options[document.getElementById('specialization').selectedIndex].text;
            document.getElementById('displaySpecializationContainer').style.display = 'block';
        } else {
            document.getElementById('displaySpecializationContainer').style.display = 'none';
        }

        // Display Profile Picture
        const profilePicSrc = document.getElementById('profilePreview').src;
        document.getElementById('displayProfilePic').src = profilePicSrc;

        // Show the Profile Display Section
        document.getElementById('profileDisplay').classList.remove('hidden');

        // Optionally, scroll to the profile display
        document.getElementById('profileDisplay').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert('Please fix the errors in the form before saving.');
    }
}
