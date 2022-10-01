API for "filter_table" project (https://github.com/Malluma/filter_table)

The project is written using express.
This API will allow you to get table data from the database.

## Create Database

    CREATE SCHEMA `filter_table` ;
   
    CREATE TABLE `filter_table`.`filter_table` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `date_` DATE NOT NULL,
      `name_` VARCHAR(45) NOT NULL,
      `amount` DECIMAL NOT NULL,
      `distance` DECIMAL NOT NULL,
      PRIMARY KEY (`id`),
      UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

## Развертывание проекта
+ Клонирование репозитория:

  `git clone git@github.com:Malluma/filter_table_backend.git`
+ Установка зависимостей:

  `npm install`
+ Запуск проекта:

  `node server.js`
  
node version: v16.13.1 
