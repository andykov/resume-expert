<?php 
    if(isset($_POST['submit'])){

        $to = "abb.name@gmail.com"; // Здесь нужно написать e-mail, куда будут приходить письма   
        $from = "no-reply@sitename.ru"; // Здесь нужно написать e-mail, от кого будут приходить письма, например no-reply@sitename.ru
        
        /* Указываем переменные, в которые будет записываться информация с формы */
        // $first_name = $_POST['first_name'];
        $email = $_POST['email'];
        // $phone = $_POST['phone'];
        // $message = $_POST['message'];
        $subject = "Заявка RezumeExpert";

        $email = htmlspecialchars($email);
        $email = urldecode($email);
        $email = trim($email);

        // echo $email;
        // echo "<br>";
        // echo $email;
            
        /* Проверка правильного написания e-mail адреса */
        if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email))
        {
            show_error("<br /> Е-mail адрес не существует");
        }
        
        /* Переменная, которая будет отправлена на почту со значениями, вводимых в поля */
        $mail_to_myemail = "Здравствуйте! 
        Было отправлено сообщение с сайта! 
        Имя отправителя: -
        E-mail: $email
        Не отвечайте на это письмо.";  
            
        $headers = "From: $from \r\n";
        
        /* Отправка сообщения, с помощью функции mail() */
        if (mail($to, $subject, $mail_to_myemail, $headers . 'Content-type: text/plain; charset=utf-8'))
        {
            // echo "Сообщение отправлено. Спасибо Вам " . $first_name . ", мы скоро свяжемся с Вами.";
            echo "Сообщение отправлено. Мы скоро свяжемся с Вами.";
            // echo "<br /><br /><a href='https://epicblog.net'>Вернуться на сайт.</a>";
        } else {
            echo "при отправке сообщения возникли ошибки";
        }
    
    }
?>
<!--Переадресация на главную страницу сайта, через 3 секунды-->
<!-- <script language="JavaScript" type="text/javascript">
    function changeurl(){eval(self.location="https://epicblog.net");}
    window.setTimeout("changeurl();",3000);
</script> -->