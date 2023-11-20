<?php
function isRequiredField($value)
{
    return !empty($value);
}

function isRequiredCheck($value)
{
    return !empty($value);
}

define('SECRET_KEY', '6LdhhCQnAAAAAGQGetxZSH6-F0sa0vQlpzvSf_UF');

$token = $_POST['token'];
$action = $_POST['action'];

$cu = curl_init();
curl_setopt($cu, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
curl_setopt($cu, CURLOPT_POST, 1);
curl_setopt($cu, CURLOPT_POSTFIELDS, http_build_query(array('secret' => SECRET_KEY, 'response' => $token)));
curl_setopt($cu, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($cu);
curl_close($cu);

$datos = json_decode($response, true);

if ($datos['success'] == true && $datos['score'] >= 0.5) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subjectOptions = array(
        '1' => 'Sugerencia',
        '2' => 'Queja',
        '3' => 'Reclamo'
    );
    $selectedSubjectValue = $_POST['subject'];
    $subject = $subjectOptions[$selectedSubjectValue];
    $message = $_POST['msg'];
    $check = $_POST['check'];

    if (isRequiredField($name) && isRequiredField($email) && isRequiredField($phone) && isRequiredField($subject) && isRequiredField($message)) {

        if (isRequiredCheck($check)) {

            $receptor = "atencionalcliente@cvsc.com.co";
            $asunto = "Nuevo correo desde Colviseg del Caribe - " . $subject;

            $contenido = '<html><body style="padding: 10px"; border: 2px solid #fff>';
            $contenido .= '<img src="https://user-images.githubusercontent.com/132607696/253712838-d467fd61-bfa6-4cc9-9a80-a4e2ed979b0e.png" style="width: 30%; margin-bottom="10px;" alt="Colviseg Del Caribe" />';
            $contenido .= '<table rules="all" style="border-color: #666; width: 30%" cellpadding="10">';
            $contenido .= "<tr style='background: #eee;'><td><strong>Nombre:</strong> </td><td>" . strip_tags($_POST['name']) . "</td></tr>";
            $contenido .= "<tr><td><strong>Asunto:</strong> </td><td>" . $subject . "</td></tr>";
            $contenido .= "<tr><td><strong>Email:</strong> </td><td>" . strip_tags($_POST['email']) . "</td></tr>";
            $contenido .= "<tr><td><strong>Telefono:</strong> </td><td>" . strip_tags($_POST['phone']) . "</td></tr>";
            $contenido .= "<tr><td><strong>Mensaje:</strong> </td><td>" . $_POST['msg'] . "</td></tr>";
            $contenido .= "</table>";
            $contenido .= "</body></html>";

            $header = "From: colvisegdelcaribe@supportcolvi.com \r\n";
            $header .= "MIME-Version: 1.0\r\n";
            $header .= "Content-Type: text/html; charset=utf-8 \r\n";

            $mail = mail($receptor, $asunto, $contenido, $header);

            if ($mail) {
                echo "<script>alert('El correo ha sido enviado correctamente.'); window.location.href = '../contact.html';</script>";
            } else {
                echo "<script>alert('Hubo un error al enviar el correo.'); window.location.href = '../contact.html';</script>";
            }

        } else {
            echo "<script>alert('Asegurese de haber leido y aceptado nuestro tratamiento de datos personales'); window.location.href = '../contact.html';</script>";
        }
    } else {
        echo "<script>alert('Por favor, complete todos los campos requeridos.'); window.location.href = '../contact.html';</script>";
    }
} else {
    echo "<script>alert('Captcha Inválido.'); window.location.href = '../contact.html';</script>";
    print_r($datos);
}
?>