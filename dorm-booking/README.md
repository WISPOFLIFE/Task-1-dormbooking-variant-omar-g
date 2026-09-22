# Dorm Booking Application

## Overview
The Dorm Booking Application is a Spring Boot-based web application designed to facilitate the booking and management of dormitory accommodations. It provides functionalities for user registration, authentication, and booking management, allowing users to easily find and reserve dormitory rooms.

## Features
- User registration and login
- Booking management (create, update, delete bookings)
- Dormitory management (list, update dorm details)
- User profile management

## Technologies Used
- Java
- Spring Boot
- Spring Security
- JPA (Java Persistence API)
- Maven
- Thymeleaf (for templating)
- Docker (for containerization)

## Project Structure
```
dorm-booking
├── .mvn
│   └── wrapper
│       └── maven-wrapper.properties
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── dormbooking
│   │   │               ├── DormBookingApplication.java
│   │   │               ├── config
│   │   │               │   └── SecurityConfig.java
│   │   │               ├── controller
│   │   │               │   ├── AuthController.java
│   │   │               │   ├── BookingController.java
│   │   │               │   ├── DormController.java
│   │   │               │   └── UserController.java
│   │   │               ├── dto
│   │   │               │   ├── BookingRequest.java
│   │   │               │   ├── LoginRequest.java
│   │   │               │   └── UserRegistrationRequest.java
│   │   │               ├── model
│   │   │               │   ├── Booking.java
│   │   │               │   ├── Dorm.java
│   │   │               │   ├── Room.java
│   │   │               │   └── User.java
│   │   │               ├── repository
│   │   │               │   ├── BookingRepository.java
│   │   │               │   ├── DormRepository.java
│   │   │               │   ├── RoomRepository.java
│   │   │               │   └── UserRepository.java
│   │   │               ├── service
│   │   │               │   ├── AuthService.java
│   │   │               │   ├── BookingService.java
│   │   │               │   ├── DormService.java
│   │   │               │   └── UserService.java
│   │   │               └── util
│   │   │                   └── DateTimeUtil.java
│   │   └── resources
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── static
│   │       └── templates
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── dormbooking
│                       └── DormBookingApplicationTests.java
├── .gitignore
├── mvnw
├── mvnw.cmd
├── pom.xml
├── README.md
└── docker-compose.yml
```

## Getting Started
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd dorm-booking
   ```
3. Run the application using Maven:
   ```
   ./mvnw spring-boot:run
   ```
4. Access the application at `http://localhost:8080`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.