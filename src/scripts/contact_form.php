<?php
if (isset($_POST['Email'])) {

    $email_to = "sophie.creaner@gmail.com";
    $email_subject = "New contact form submission: ";

    function problem($error)
    {
        echo "Sorry, there were error(s) found with the form you submitted. ";
        echo "Please see below.<br><br>";
        echo $error . "<br><br>";
        echo "Please go back and fix these errors.<br><br>";
        die();
    }

    // validation expected data exists
    if (
        !isset($_POST['Name']) ||
        !isset($_POST['Email']) ||
        !isset($_POST['Message'])
    ) {
        problem('Sorry, there seems to be a problem with the form you submitted.');
    }

    $temp_name = trim($_POST['Name']);
    $temp_email = trim($_POST['Email']);
    $temp_subject = htmlspecialchars($_POST['Subject']);
    $temp_message = htmlspecialchars($_POST['Message']);

    $name;
    $email;
    $subject;
    $message;

    $error_message = "";
    $email_exp = "/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/";
    $string_exp = "/^[A-Za-z .'-]+$/";

    if (preg_match($email_exp, $temp_email)) {
        $email = $temp_email;
    } else {
        $error_message .= 'The email address you entered does not appear to be valid.<br>';
    }

    if (preg_match($string_exp, $temp_name)) {
        $name = $temp_name;
    } else {
        $error_message .= 'The Name you entered does not appear to be valid.<br>';
    }

    $subject = $temp_subject;
    $email_subject .= $subject;

    if (strlen($temp_message) > 1) {
        $message = $temp_message;
    } else {
        $error_message .= 'The Message you entered do not appear to be valid.<br>';
    }

    if (strlen($error_message) > 0) {
        problem($error_message);
    }

    $email_message = "Form details below.\n\n";

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Name: " . clean_string($name) . "\n";
    $email_message .= "Email: " . clean_string($email) . "\n";
    $email_message .= "Message: " . clean_string($message) . "\n";

    // create email headers
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);
?>

    <!-- include your success message below -->

    Thanks for your message, I’ll get back to you as soon as I can!

<?php
}
?>