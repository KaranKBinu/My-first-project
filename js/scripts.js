//Function to validate the booking form
function validateBookingForm() {
    var isValid = true;

    // Validation logic for each form field
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    var doctor = document.getElementById("doctor").value;

    var fullNameError = document.getElementById("fullNameError");
    var emailError = document.getElementById("emailError");
    var phoneError = document.getElementById("phoneError");
    var appointmentDateError = document.getElementById("appointmentDateError");
    var doctorError = document.getElementById("doctorError");
    var appointmentDate = new Date(document.getElementById("appointmentDate").value);
    var currentDate = new Date();


    fullNameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";
    appointmentDateError.innerHTML = "";
    doctorError.innerHTML = "";

    if (fullName === "") {
        fullNameError.innerHTML = "Full Name is required.";
        isValid = false;
    }
    if (email === "") {
        emailError.innerHTML = "Email is required.";
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailError.innerHTML = "Invalid email format.";
        isValid = false;
    }

    if (phone === "") {
        phoneError.innerHTML = "Phone number is required.";
        isValid = false;
    } else if (!isValidPhone(phone)) {
        phoneError.innerHTML = "Invalid phone number format.";
        isValid = false;
    }

    if (!appointmentDate || isNaN(appointmentDate)) {
        appointmentDateError.innerHTML = "Appointment Date is required.";
        isValid = false;
    } else if (appointmentDate < currentDate && !isSameDate(appointmentDate, currentDate)) {
        appointmentDateError.innerHTML = "Appointment date is invalid (Date must be after current date or it should be today)";
        isValid = false;
    }

    if (doctor === "") {
        doctorError.innerHTML = "Doctor selection is required.";
        isValid = false;
    }

    return isValid;
}

// Helper functions for email and phone validation
function isValidEmail(email) {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(emailRegex);
}

function isValidPhone(phone) {
    var phoneRegex = /^[0-9]{10}$/;
    return phone.match(phoneRegex);
}
function isSameDate(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

//--------------------------------------------------------------------------------------
//Funcion to validate contact form
function validateContactForm() {
    var isValid = true;

    // Validation logic for each form field
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var fullNameError = document.getElementById("fullNameError");
    var emailError = document.getElementById("emailError");
    var messageError = document.getElementById("messageError");

    fullNameError.innerHTML = "";
    emailError.innerHTML = "";
    messageError.innerHTML = "";

    if (fullName === "") {
        fullNameError.innerHTML = "Full Name is required.";
        isValid = false;
    }

    if (email === "") {
        emailError.innerHTML = "Email is required.";
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailError.innerHTML = "Invalid email format.";
        isValid = false;
    }
    if (message === "") {
        messageError.innerHTML = "Message is required.";
        isValid = false;
    }
    if (isValid) {
        // Display success modal
        $('#successModal').modal('show');

        // Attach event listener to modal close button
        $('#successModal').on('hidden.bs.modal', function () {
            // Refresh the page immediately if the user clicks "Close"
            window.location.reload();
        });

        var countdown = 15; // Set the initial countdown in seconds
        var countdownElement = document.getElementById('countdown');

        // Update the countdown message every second
        var countdownInterval = setInterval(function () {
            countdownElement.textContent = countdown + ' seconds';
            countdown--;

            if (countdown < 0) {
                clearInterval(countdownInterval);
                // Check if the modal is still visible (not manually closed by the user)
                if ($('#successModal').is(':visible')) {
                    // Refresh the page after the delay
                    window.location.reload();
                }
            }
        }, 1000); // Update every second (1000 milliseconds)

        return false; // Prevent the form from submitting
    }

    return isValid;
}


//-----------------------------------------------------------------------------------------
// Defines a function to load the header content
function loadHeaderAndFooter() {
    // Get the header and footer container elements
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');

    // Create a new XMLHttpRequest for the header
    const headerXhr = new XMLHttpRequest();

    // Configure the request for header
    headerXhr.open('GET', 'header.html', true);

    // Define the onload event handler for header
    headerXhr.onload = function () {
        if (headerXhr.status === 200) {
            headerContainer.innerHTML = headerXhr.responseText;
        }
    };

    // Send the request for header
    headerXhr.send();

    // Create a new XMLHttpRequest for the footer
    const footerXhr = new XMLHttpRequest();

    // Configure the request for footer
    footerXhr.open('GET', 'footer.html', true);

    // Define the onload event handler for footer
    footerXhr.onload = function () {
        if (footerXhr.status === 200) {
            footerContainer.innerHTML = footerXhr.responseText;
        }
    };

    // Send the request for footer
    footerXhr.send();
}

// Call the loadHeaderAndFooter function to load the header and footer content
loadHeaderAndFooter();


//--------------------------------------------------------------------------------------------
//Function for set the active page name on navbar as active to use incoomon header
var continueCalling = true; // Variable to control whether to continue calling the function

function setActiveLink() {
    // Getting the current URL
    var currentURL = window.location.href;

    var state = false;

    // Accessing the href attributes of the anchor links
    var linkElements = document.querySelectorAll("a");
    if (linkElements.length > 0) {
        linkElements.forEach(function (linkElement) {
            var hrefValue = linkElement.href;
            if (hrefValue === currentURL) {
                linkElement.classList.add("active");
                state = true;
            }
        });
    }
    if (!state && continueCalling) {
        // Call setActiveLink again after a delay
        setTimeout(setActiveLink, 1000); // Call after 1 second 
    } else {
        continueCalling = false; // Stop calling the function
    }
}

document.addEventListener("DOMContentLoaded", setActiveLink);
