(function () {
  emailjs.init({
    publicKey: "EsJKzt8erlcMAUoPE",
  });
})();

// Handle form submission
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    // Clear previous error messages
    clearErrorMessages();

    // Get form elements
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var subject = document.getElementById("subject");
    var message = document.getElementById("message");

    // Validate the form
    if (validateForm(name, email, message)) {
      var templateParams = {
        from_name: name.value,
        to_name: "WuttYeeTun",
        email: email.value,
        subject: subject.value,
        message: message.value,
      };

      // Send the email
      emailjs.send("service_o68cfu9", "template_k77g976", templateParams).then(
        function (response) {
          //   alert("Email sent successfully!", response.status, response.text);
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-success").append(
            "<strong>Your message has been sent. Thank you for the opportunity.<br>I will reach out to you very soon.</strong>"
          );
          $("#success > .alert-success").append("</div>");
          $("#contactForm").trigger("reset");
        },
        function (error) {
          //   alert("Failed to send email. Please try again later.", error);
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-danger").append(
            $("<strong>").text(
              "Sorry " +
                name +
                ", it seems that our mail server is not responding. Please try again later!"
            )
          );
          $("#success > .alert-danger").append("</div>");
          $("#contactForm").trigger("reset");
        }
      );

      // Clear the form
      // document.getElementById("contactForm").reset();
    }
  });

// Custom form validation function
function validateForm(name, email, message) {
  let isValid = true;

  // Check if name is valid
  if (name.value.trim() === "" || name.value.length < 2) {
    showError(
      "nameError",
      "Please enter a valid name with at least 2 characters."
    );
    isValid = false;
  }

  // Check if email is valid
  if (email.value.trim() === "" || !validateEmail(email.value)) {
    showError("emailError", "Please enter a valid email address.");
    isValid = false;
  }

  // Check if subject is valid
  if (subject.value.trim() === "" || subject.value.length < 2) {
    showError(
      "subjectError",
      "Please enter a valid subject with at least 2 characters."
    );
    isValid = false;
  }

  // Check if message is valid
  if (message.value.trim() === "" || message.value.length < 10) {
    showError(
      "messageError",
      "Please enter a message with at least 10 characters."
    );
    isValid = false;
  }

  return isValid;
}

// Email validation function
function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Show error message
function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

// Clear all error messages
function clearErrorMessages() {
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("subjectError").textContent = "";
  document.getElementById("messageError").textContent = "";
}
