package com.redline.redline_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingConfirmation(String to, String userName, String carName, String startDate, String endDate) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Confirmación de tu Reserva en Redline - " + carName);

            // Diseño HTML para el correo
            String htmlContent = String.format(
                    "<div style='font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 20px; border-radius: 10px;'>" +
                            "  <h1 style='color: #b91c1c;'>¡MOTORES ENCENDIDOS, %s!</h1>" +
                            "  <p>Tu reserva para el <strong>%s</strong> ha sido confirmada con éxito.</p>" +
                            "  <hr style='border: 0; border-top: 1px solid #333;' />" +
                            "  <p><strong>Desde:</strong> %s</p>" +
                            "  <p><strong>Hasta:</strong> %s</p>" +
                            "  <p style='font-size: 12px; color: #666;'>Si tienes dudas, contáctanos por WhatsApp o responde a este correo.</p>" +
                            "  <footer style='margin-top: 20px; border-top: 1px solid #b91c1c; pt: 10px;'>" +
                            "    <p>Redline Luxury Rentals - Adrenalina pura.</p>" +
                            "  </footer>" +
                            "</div>",
                    userName.toUpperCase(), carName, startDate, endDate
            );

            helper.setText(htmlContent, true); // true indica que es HTML (No cambiar)
            mailSender.send(message);

        } catch (Exception e) {
            System.err.println("Error enviando correo: " + e.getMessage());
        }
    }
}