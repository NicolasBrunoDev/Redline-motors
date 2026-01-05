🏎️ Redline - Motors Car Rental & Workshop

Redline es una plataforma premium diseñada para los entusiastas del automovilismo. Permite a los usuarios explorar una flota de vehículos de alta gama, realizar reservas de alquiler y agendar citas en un taller especializado (Mecánica y Personalización). Incluye un sistema de reseñas en tiempo real y gestión administrativa de la flota.

⚙️ Tecnologías
🖥️ Frontend

    React 18 + Vite: SPA de alto rendimiento.

    Tailwind CSS: Estilizado moderno y responsivo.

    Framer Motion: Animaciones fluidas en popups y transiciones.

    Axios: Comunicación con la API REST.

    AOS (Animate On Scroll): Efectos visuales al navegar.

☕ Backend

    Java 21: Lenguaje robusto para la lógica de negocio.

    Spring Boot 4.0.0: Framework principal.

    Spring Data JPA: Abstracción de la persistencia de datos.

    H2: Base de datos relacional.

    Mailtrap: Testing de notificaciones de reserva por correo.

🚀 Instalación local
🧩 Requisitos previos

    Node.js 18+

    Java 21+

    Maven 3.8+
    
    Puerto 8080 Disponible

    IDE como IntelliJ IDEA, Eclipse o VS Code con extensiones de Java

🚀 Instalación local
📦 Cloná el repositorio
Bash

git clone https://github.com/NicolasBrunoDev/Redline-motors
cd redline-app

📁 Backend (/backend)
Bash

cd backend

⚙️ Configuración de Base de Datos:

No requiere instalación de software adicional. El proyecto utiliza H2 Database, una base de datos relacional que corre en memoria.
(Es importante mencionar que esta configurado para funcionar en RAM asi que al cerrar el servidor se borraran todos los datos, esta es una pagina web de prueba)

🔑 Archivo de configuración:

Verifica que tu archivo src/main/resources/application.properties contenga lo siguiente (o crea un .env si usas el sistema de variables):
Fragmento de código

# Configuración H2
SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=
SPRING_H2_CONSOLE_ENABLED=true

# Configuración de MailTrap para Spring Boot
spring.mail.host=sandbox.smtp.mailtrap.io
spring.mail.port=2525
spring.mail.username=${MAILTRAP_USER}
spring.mail.password=${MAILTRAP_PASS}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true

🏃‍♂️ Correr el backend:
Bash

./mvnw spring-boot:run

    El Backend estará disponible en http://localhost:8080

    Consola H2: http://localhost:8080/h2-console

🖼️ Frontend (/frontend)
Bash

cd frontend
npm install

🌐 Variables de entorno:

Crea un archivo .env en la carpeta /frontend:
Fragmento de código

VITE_API_URL=http://localhost:8080/api

Tokens de MailTrap:

MAILTRAP_USER=tu_usuario
MAILTRAP_PASS=tu_password

🏃‍♂️ Correr el frontend:
Bash

npm run dev

    La aplicación estará disponible en http://localhost:5173

📬 Endpoints (API REST)
Método	Endpoint	Descripción	Auth
POST	/api/auth/register	Registro de nuevos clientes	❌
POST	/api/auth/login	Login y obtención de token JWT	❌
GET	/api/cars	Listado de flota y servicios de taller	❌
GET	/api/cars/{id}	Detalle técnico y reseñas	❌
POST	/api/bookings	Crear reserva (Auto o Taller)	✅
GET	/api/bookings/user/{id}	Historial de reservas del usuario	✅
POST	/api/cars/{id}/reviews	Publicar reseña y puntuación	✅

🧪 Testing
Backend (JUnit 5 + Mockito)
Bash

./mvnw test

Frontend (Vitest)
Bash

npm test

☁️ Deploy

    Frontend: Vercel / Netlify.

    Backend: Railway / Render.

    Base de Datos: Al ser H2, se recomienda migrar a PostgreSQL (en Neon.tech o Supabase) para persistencia en producción.

👤 Autores

    Nicolas Bruno - @KuroDEV

📄 Licencia

Este proyecto está bajo la Licencia MIT.
