<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/styles/sass/main.css" type="text/css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        href="https://fonts.googleapis.com/css2?family=Bad+Script&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400;1,700;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,800;1,100;1,200;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet">
    <title>Sophie Creaner | Contact Form Submission</title>
</head>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email_to = "sophie.creaner@gmail.com";
    $email_subject = "New contact form submission";

    function problem($error)
    {
        echo '<h2>Something\'s not right!</h2>';
        echo '<p>' . $error . '</p><br><br>';
        echo '<a href="./index.html#contact">Take me back</a>';
        die();
    }

    // validation expected data exists
    if (
        !isset($_POST['Name']) ||
        !isset($_POST['Email']) ||
        !isset($_POST['Message'])
    ) {
        problem('It looks like you haven\'t filled in the whole form.');
    }

    $temp_name = htmlspecialchars(trim($_POST['Name']));
    $temp_email = trim($_POST['Email']);
    // $temp_subject = htmlspecialchars($_POST['Subject']);
    $temp_message = htmlspecialchars($_POST['Message']);

    $name;
    $email;
    // $subject;
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
        $error_message .= 'The name you entered does not appear to be valid.<br>';
    }

    // $subject = $temp_subject;
    // $email_subject .= ': {$subject}';

    if (strlen($temp_message) > 1) {
        $message = $temp_message;
    } else {
        $error_message .= 'The message you entered do not appear to be valid.<br>';
    }

    if (strlen($error_message) > 0) {
        problem($error_message);
    }

    $email_message = "New form submission:\n\n";

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
    // @mail($email_to, $email_subject, $email_message, $headers);
?>

    <h1>Thanks for your message, I’ll get back to you as soon as I can!</h1>
    <a href="./index.html">Go to home</a>

<?php
}
?>