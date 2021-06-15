# Overview

A customer is registered with a preferred language, email address and contact. Customers can be organized into groups. A notification has a type e.g. group, individual and a category e.g. Email, SMS, PUSH. A notification also has a translated scripts in different languages. A notification is created with it's translations using NotificationCreate API. After a notification is created, it can be sent to customer/group and at the time of sending, notification category is specified which tells if a notification is to be sent via Email, SMS, or app PUSH. 

# Prerequisites

- Docker
- Docker Compose

# Setting up & Running

Clone the repository and run it.

```bash
  git clone https://github.com/usman6/swvl-task.git
  cd swvl-task
  docker-compose up
```
A couple of sample users and setup data is automatically created.

Create notification...

```bash
curl --location --request POST 'http://localhost:8080/api/v1/notification' \
--header 'Content-Type: application/json' \
--data-raw '{
    "code": "1",
    "displayName": "not1",
    "description": "desc",
    "notificationTranslations": [
        {
            "notificationText": "english text",
            "languageId": 1
        },
        {
            "notificationText": "arabic text",
            "languageId": 2
        }
    ]
}'
```

Send the previously created notification via email(notificationCategoryId:2) after replacing the notificationId returned in response to previous request.

```bash
  # send a group notification
  curl --location --request POST 'localhost:8080/api/v1/notification/send/group' \
--header 'Content-Type: application/json' \
--data-raw '{
    "notificationId": 1,
    "notificationCategoryId": 2,
    "groupId":1
}'

  # send to single customer

curl --location --request POST 'localhost:8080/api/v1/notification/send/customer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "notificationId": 1,
    "notificationCategoryId": 2,
    "customerId":1
}'
```

Notification will be visible in console of email-notification-sender service.

# Swagger Documentation

Swagger UI based API docs are available at the following end point.

[{host:port}/v1/api-docs/]()

# Postman Collection

Postman collection of APIs is available in scripts folder of notification-manager-api.

# Project Components

- MySQL Database
- Kafka
- Redis
- Notification Manager APIs
- Notification Processor
- Email Notification Sender


## 1) Notification Manager APIs

- CRUD operations for creating and sending notifications to customers and groups
- A notification is created with translations and stored in database.
- This notification then can be sent to customer/group via API. 
- The notification is sent to notifications-raw topic of Kafka from send notifications API from where it is picked up by Notification processor for further processing.
- An API and route registration mechanism is implemented for automatic versioning and end point creation.
- Configurations are passed through environment variables. 

## 2) Notification Processor

- Picks up notification from notification-raw topic of Kafka. 
- It fetches notification translations and group users from APIs and create separate notification for each user based on preferred language of customer.
- Redis cache is used here to enhance performance and reduce time consuming calls to APIs.
- It forwards notifications based upon their category to their respective kafka topic. e.g email notifications are forwarded to notifications-email topic.
This intermediate part can be scaled to handle millions of notifications as per need. 

## 3) Email Notification Sender

This is the final step in process of sending a notification to respective user. Notifications are picked up synchronously and sent according the the set per minuter rate. Mutex are implemented to control topic read speed according the the max rate of emails per minute. Email part is not implemented, it just prints the notification here. Notifications can be seen printed on consoles once they are sent via notification manager. I only have implemented email sender, sms sender would be the same while push notification sender should be the same as well but without the limit of max notification rate per minute.

## 4) Tests

In order to run tests...
```bash
  cd notification-manager-api
  npm test
```

# Design Philosophy

The designed is implemented around the need for performance and scalability. The notification processor and email notification sender have consumer group implemented so that multiple instances of each component can be run. The idea of separating the components is purely to avoid performance bottleneck imposed by one component over another. 

I have used models and repository based structure based on sequelize. MySQL has been used for notification schema implementation just because I was at ease with it. It could be replaced with high speed database e.g. MongoDB or a faster SQL database that is Postgres.

# To Do

- Enhance the usage of redis cache to increase performance
- load-balancer implementation to manage load between multiple instances of notification-manager-apis  


