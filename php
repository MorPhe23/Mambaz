<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $to = 'jaramai_m@outlook.com'; // Update with your desired recipient email address
  $subject = 'Booking Information';

  // Retrieve form data
  $bookingDate = $_POST['booking'];
  $name = $_POST['name'];
  $mobile = $_POST['mobile'];
  $userEmail = $_POST['email']; // Extract user's email address from the form

  // Compose the email message
  $message = "Booking Details:\n\n";
  $message .= "Booking Date: $bookingDate\n";
  $message .= "Name: $name\n";
  $message .= "Mobile Number: $mobile\n";

  // Send the email
  $headers = "From: $userEmail"; // Set the "From" address to the user's email

  if (mail($to, $subject, $message, $headers)) {
    echo "Booking submitted successfully!";
  } else {
    echo "Oops! Something went wrong. Please try again later.";
  }
}
?>


