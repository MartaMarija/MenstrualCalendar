# Menstrual Calendar

The application is designed as a tool that based on previously entered menstrual cycles displays when the next menstruation should occur. In addition to cycle tracking, users are able to add descriptions of gynecological exams and their gynecologist.

[Functionalities](https://github.com/MartaMarija/MenstrualCalendar/edit/main/README.md#functionalities)

[Application screenshots](https://github.com/MartaMarija/MenstrualCalendar/edit/main/README.md#application-screenshots)

[ER Diagram](https://github.com/MartaMarija/MenstrualCalendar/edit/main/README.md#er-diagram)

[Technologies](https://github.com/MartaMarija/MenstrualCalendar/edit/main/README.md#technologies)

[Instructions](https://github.com/MartaMarija/MenstrualCalendar/edit/main/README.md#instructions)

## Functionalities

| Functionality | Description |
| --- | --- |
| <a href="#login">Login</a> | The user logs in with their credentials (e-mail and password). The server returns access and refresh tokens that are later used when accessing resources. |
| <a href="#calendar">Calendar</a> | The user can see their previous menstrual cycles and the next menstrual cycle in the calendar. The next menstrual cycle is calculated based on the average durations from 'user' table. By pressing a date, three options can be displayed to the user: 'Add period', 'Remove period' and 'End period'.  |
| <a href="#add-a-period">Add a period</a> | A new period can be added if there are no cycles entered for the user or if the start of the last period was at least 13 days before the selected date and if the selected date is not later than today. |
| <a href="#remove-the-period">Remove the period</a> | The menstrual cycle can be removed if the user selected one of the menstrual days. Only the last period can be removed. |
| <a href="#remove-the-period">End a period</a> | The end date of the period can be changed if the new date is not before the start date of menstrual cycle or after 12 days have passed from the start date. |
| <a href="#add-a-gynecologist">Add a gynecologist</a> | A new gynecologist can be added. First name is required. |
| <a href="#view-gynecologists">View gynecologists</a> | The user can see all added gynecologist. By pressing a trash icon, a gynecologist can be deleted.  |
| <a href="#add-a-medical-exam">Add a medical exam</a> | A new medical exam can be added. The date is by default set to today's date but can be changed by pressing another date on the calendar. Description is required, but the gynecologist doesn't have to be added. |
| <a href="#view-medical-exams">View medical exams</a> | The user can see all added medical exams. By pressing a trash icon, a medical exam can be deleted. |

TODO list:
* Adding descriptions to days
* Edit profile
* Sign up
* Forgot password
* When refresh token isn't valid, log out user


## Application screenshots

<img src="https://user-images.githubusercontent.com/72874510/222927628-5e5e1103-04dc-4266-8671-710986a69a23.jpg" alt="Login" id="login" width="250px">

<img src="https://user-images.githubusercontent.com/72874510/222927640-78d556c1-5530-45ed-848f-3c5b6a72996b.jpg" alt="UserSettings" width="250px">


<img src="https://user-images.githubusercontent.com/72874510/222927643-261047f0-fde3-41f2-b6a7-21f37a4c839e.jpg" alt="Calendar" id="calendar" width="250px">
<img src="https://user-images.githubusercontent.com/72874510/222927647-17e76422-bb28-4a4e-8098-6049ef55efb8.jpg" alt="Option1" id="add-a-period" width="250px">
<img src="https://user-images.githubusercontent.com/72874510/222927649-dde218c9-5082-42a1-b9f0-2099663b2a60.jpg" alt="Option2" id="remove-the-period" width="250px">


<img src="https://user-images.githubusercontent.com/72874510/222927658-1eb45da5-c2a9-40ea-824b-18b8ad6ca68c.jpg" alt="Health" width="250px">

<img src="https://user-images.githubusercontent.com/72874510/222927663-4db1a463-3674-476c-b191-89e6d4d781ae.jpg" alt="AddAGynecologist" id="add-a-gynecologist" width="250px">
<img src="https://user-images.githubusercontent.com/72874510/222927664-292c1e20-bc9f-4712-831a-063e533e8512.jpg" alt="ViewGynecologists" id="view-gynecologists" width="250px">

<img src="https://user-images.githubusercontent.com/72874510/222927670-a598c069-5657-4b24-b931-eea10d016de0.jpg" alt="AddAMedicalExam" id="add-a-medical-exam" width="250px">
<img src="https://user-images.githubusercontent.com/72874510/222927672-c7f23aa0-3a01-4cfd-a4df-9c184f7afcc8.jpg" alt="ViewMedicalExams" id="view-medical-exams" width="250px">

## ER Diagram

<img src="https://user-images.githubusercontent.com/72874510/222954274-77ce7a4e-15b0-4ef4-bb09-72d325617964.jpg" alt="ER Diagram" height="550px">

## Technologies

* React Native, Expo
* Node.js, Express
* PostgreSQL, Docker, TypeORM

## Instructions

To start the mobile app, follow these steps:
1. Navigate to the `./mobile-app` folder.
2. Run `npm install` to install all the required dependencies.
3. Run `npm start` to launch the application.

To start the server, follow these steps:
1. Navigate to the `./app` folder.
2. Run `yarn install` to install all the required dependencies.
3. Create a Docker container by running `./restart_docker_db.sh`.
4. Compile TypeScript to JavaScript by running `yarn watch`.
5. Start the server by running `yarn start`.

Testing data:
* e-mail: ana@gmail.com
* password: password
