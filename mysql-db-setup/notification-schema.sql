DROP SCHEMA IF EXISTS `notification_manager`;

CREATE SCHEMA `notification_manager`;

USE `notification_manager`;

CREATE TABLE `notification_types` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL,
  `display_name` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);


CREATE TABLE `notification_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL,
  `display_name` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

CREATE TABLE `notifications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL,
  `display_name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

CREATE TABLE `languages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL,
  `display_name` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);


CREATE TABLE `groups` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(30) NOT NULL,
  `display_name` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);



CREATE TABLE `customers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `language_id` INT UNSIGNED NOT NULL,
  `contact` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_language_id_customers_idx` (`language_id`),
  CONSTRAINT `fk_language_id_laguages` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE `customers_groups` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `group_id` INT UNSIGNED NOT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_customer_id_customers_groups_idx` (`customer_id`),
  CONSTRAINT `fk_customer_id_customers_groups` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  KEY `fk_group_id_customers_groups_idx` (`group_id`),
  CONSTRAINT `fk_group_id_customers_groups` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
);


CREATE TABLE `notification_text_translations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `notification_text` varchar(255) NOT NULL,
  `notification_id` INT UNSIGNED NOT NULL,
  `language_id` INT UNSIGNED NOT NULL,
  `created_at` DATETIME DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_notification_id_notifications_text_translations_idx` (`notification_id`),
  CONSTRAINT `fk_notification_id_notifications_text_translations` FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  KEY `fk_language_id_notifications_text_translations_idx` (`language_id`),
  CONSTRAINT `fk_language_id_notifications_text_translations` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
);



LOCK TABLES `notification_types` WRITE;

INSERT INTO
  `notification_types` (
    `id`,
    `code`,
    `display_name`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    '1',
    'PERSONAL',
    'Personal',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '2',
    'GROUP',
    'Group notification',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  );

UNLOCK TABLES;

LOCK TABLES `groups` WRITE;

INSERT INTO
  `groups` (
    `id`,
    `code`,
    `display_name`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    '1',
    'EXECUTIVE',
    'Executive',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '2',
    'REGULAR',
    'Regular',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  );

UNLOCK TABLES;

LOCK TABLES `notification_categories` WRITE;

INSERT INTO
  `notification_categories` (
    `id`,
    `code`,
    `display_name`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    '1',
    'SMS',
    'SMS',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '2',
    'EMAIL',
    'Email',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '3',
    'PUSH',
    'Push',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  );

UNLOCK TABLES;

LOCK TABLES `languages` WRITE;

INSERT INTO
  `languages`(
    `id`,
    `code`,
    `display_name`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    '1',
    'en',
    'English',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),(
    '2',
    'ar',
    'Arabic',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  );

UNLOCK TABLES;


LOCK TABLES `customers` WRITE;

INSERT INTO
  `customers` (
    `id`,
    `name`,
    `language_id`,
    `email`,
    `contact`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    '1',
    'Franck',
    '1',
    'franck@xmail.com',
    '008767676767',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '2',
    'William',
    '1',
    'wll@xmail.com',
    '00876jkjkjkj',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '3',
    'Al-Nasr',
    '2',
    'nasr@xmail.com',
    '008767ddf76767',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '4',
    'Qaswa',
    '2',
    'qaswak@xmail.com',
    '00876767980767',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  );

UNLOCK TABLES;

LOCK TABLES `customers_groups` WRITE;

INSERT INTO
  `customers_groups` (
    `id`,
    `customer_id`,
    `group_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    '1',
    '1',
    '1',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '2',
    '2',
    '1',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '3',
    '3',
    '2',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  ),
  (
    '4',
    '3',
    '2',
    '2021-02-18 08:11:47',
    '2021-02-18 08:11:47'
  );

UNLOCK TABLES;
