<?php 
    $msg_box = ""; // в этой переменной будем хранить сообщения формы
    $errors = array(); // контейнер для ошибок

    $field_email = $_POST['form_email'];
    $field_email = htmlspecialchars($field_email);
    $field_email = urldecode($field_email);
    $field_email = trim($field_email);

    // проверяем корректность полей
    if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $field_email)) { $errors[] = "<br /> Е-mail адрес не существует"; }
    if ($field_email == "")   $errors[] = "Поле <span style='color: #666;'>Ваш e-mail</span> не заполнено";
    // if($_POST['form_name'] == "")    $errors[] = "Поле <span style='color: #666;'>Ваше имя</span> не заполнено";
    // if($_POST['form_message'] == "") $errors[] = "Поле <span style='color: #666;'>Текст сообщения</span> не заполнено";

    // если форма без ошибок
    if (empty($errors)) {     
        // собираем данные из формы
        // $message  = "Имя клиента: " . $_POST['form_name'] . "<br/>";
        $message .= '<img src="//anb.name/resume-expert/img/logo.svg" alt="ResumeExpert" /><br/><br/>';
        $message .= "E-mail клиента: " . $field_email . "<br/><br/>";
        // $message .= "Текст письма: " . $_POST['form_message'];
        
        // $message = '<html><body>';
        // $message .= '<img src="//anb.name/resume-expert/img/logo.svg" alt="ResumeExpert" />';
        // $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
        // $message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . strip_tags($_POST['req-name']) . "</td></tr>";
        // $message .= "<tr><td><strong>Email клиента:</strong> </td><td>" . strip_tags($_POST['req-email']) . "</td></tr>";
        // $message .= "<tr><td><strong>Type of Change:</strong> </td><td>" . strip_tags($_POST['typeOfChange']) . "</td></tr>";
        // $message .= "<tr><td><strong>Urgency:</strong> </td><td>" . strip_tags($_POST['urgency']) . "</td></tr>";
        // $message .= "<tr><td><strong>URL To Change (main):</strong> </td><td>" . $_POST['URL-main'] . "</td></tr>";
        // $addURLS = $_POST['addURLS'];
        // if (($addURLS) != '') {
        //     $message .= "<tr><td><strong>URL To Change (additional):</strong> </td><td>" . strip_tags($addURLS) . "</td></tr>";
        // }
        // $curText = htmlentities($_POST['curText']);           
        // if (($curText) != '') {
        //     $message .= "<tr><td><strong>CURRENT Content:</strong> </td><td>" . $curText . "</td></tr>";
        // }
        // $message .= "<tr><td><strong>NEW Content:</strong> </td><td>" . htmlentities($_POST['newText']) . "</td></tr>";
        // $message .= "</table>";
        // $message .= "</body></html>";
        

        send_mail($message); // отправим письмо

        // выведем сообщение об успехе
        $msg_box = "Документ будет отправлен в ближайшее время";

    } else{
        // если были ошибки, то выводим их
        $msg_box = "";
        foreach($errors as $one_error){
            $msg_box .= $one_error;
        }
    }

    // делаем ответ на клиентскую часть в формате JSON
    echo json_encode(array(
        'result' => $msg_box
    ));
        
        
    // функция отправки письма
    function send_mail($message){
        // почта, на которую придет письмо
        $mail_to = "abb.name@gmail.com"; 
        // тема письма
        $subject = "Заявка RezumeExpert";
            
        // заголовок письма
        $headers= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
        $headers .= "From: Название сайта <no-reply@expertresume.ru>\r\n"; // от кого письмо
            
        // отправляем письмо 
        mail($mail_to, $subject, $message, $headers);
    }
        
    // Переадресация на главную страницу сайта, через 3 секунды-->
    // <script language="JavaScript" type="text/javascript">
    //     function changeurl(){eval(self.location="https://epicblog.net");}
    //     window.setTimeout("changeurl();",3000);
    // </script>
?>
