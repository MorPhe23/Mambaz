<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $to = 'jaramai_m@outlook.com'; // Update with your desired recipient email address
  $subject = 'Booking Confirmation';

  // Retrieve form data
  $bookingDate = $_POST['booking'];
  $name = $_POST['name'];
  $mobile = $_POST['mobile'];

  // Compose the email message
  $message = "Booking Details:\n\n";
  $message .= "Booking Date: $bookingDate\n";
  $message .= "Name: $name\n";
  $message .= "Mobile Number: $mobile\n";

  // Send the email
  $headers = "From: Your Name <your-email@example.com>"; // Update with your email address or name

  if (mail($to, $subject, $message, $headers)) {
    echo "Booking confirmed. An email has been sent to $to.";
  } else {
    echo "Oops! Something went wrong. Please try again later.";
  }
}
?>
