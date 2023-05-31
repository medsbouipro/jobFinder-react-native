-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema craftseeker
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema craftseeker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `craftseeker` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `craftseeker` ;

-- -----------------------------------------------------
-- Table `craftseeker`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`clients` (
  `clientId` VARCHAR(500) NOT NULL,
  `clientFirstName` VARCHAR(45) NOT NULL,
  `clientAddress` VARCHAR(255) NOT NULL,
  `clientEmail` VARCHAR(45) NOT NULL,
  `clientPhone` VARCHAR(45) NOT NULL,
  `clientDateOfBirth` DATE NOT NULL,
  `clientLastName` VARCHAR(45) NOT NULL,
  `ClientImgUrl` VARCHAR(450) NULL DEFAULT NULL,
  `clientCity` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`clientId`),
  UNIQUE INDEX `clientEmail_UNIQUE` (`clientEmail` ASC) VISIBLE,
  UNIQUE INDEX `clientPhone_UNIQUE` (`clientPhone` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `craftseeker`.`workers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`workers` (
  `workerId` VARCHAR(500) NOT NULL,
  `workerFirstName` VARCHAR(45) NOT NULL,
  `workerLastName` VARCHAR(45) NOT NULL,
  `workerAddress` VARCHAR(45) NULL DEFAULT NULL,
  `workerEmail` VARCHAR(45) NULL DEFAULT NULL,
  `workerCategory` VARCHAR(255) NULL DEFAULT NULL,
  `workerDateOfBirth` VARCHAR(45) NULL DEFAULT NULL,
  `workerYearsOfExperience` INT NULL DEFAULT NULL,
  `workerPhoneNumber` VARCHAR(45) NULL DEFAULT NULL,
  `workerNumberOfJobs` INT NULL DEFAULT NULL,
  `workerAvailability` VARCHAR(45) NULL DEFAULT NULL,
  `workerJob` VARCHAR(255) NULL DEFAULT NULL,
  `workerProfessionalSummary` LONGTEXT NULL DEFAULT NULL,
  `workerTotalRating` INT NULL DEFAULT NULL,
  `workerBio` LONGTEXT NULL DEFAULT NULL,
  `workerNumRates` INT NULL DEFAULT NULL,
  `workerCity` VARCHAR(50) NULL DEFAULT NULL,
  `workerImgUrl` VARCHAR(450) NULL DEFAULT NULL,
  PRIMARY KEY (`workerId`),
  UNIQUE INDEX `workerEmail_UNIQUE` (`workerEmail` ASC) VISIBLE,
  UNIQUE INDEX `workerPhoneNumber_UNIQUE` (`workerPhoneNumber` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `craftseeker`.`chatrooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`chatrooms` (
  `roomId` VARCHAR(255) NOT NULL,
  `clientId` VARCHAR(500) NOT NULL,
  `workerId` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`roomId`),
  INDEX `clientId` (`clientId` ASC) VISIBLE,
  INDEX `workerId` (`workerId` ASC) VISIBLE,
  CONSTRAINT `chatrooms_ibfk_1`
    FOREIGN KEY (`clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `chatrooms_ibfk_2`
    FOREIGN KEY (`workerId`)
    REFERENCES `craftseeker`.`workers` (`workerId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `craftseeker`.`reportsoftheclients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`reportsoftheclients` (
  `clientReportId` INT NOT NULL AUTO_INCREMENT,
  `clientId` VARCHAR(500) NOT NULL,
  `workerId` VARCHAR(500) NOT NULL,
  `clientReportingWorkerTitle` VARCHAR(255) NOT NULL,
  `clientReportingWorkerBody` LONGTEXT NOT NULL,
  `clientReportDate` DATETIME NOT NULL,
  PRIMARY KEY (`clientReportId`),
  INDEX `clientId` (`clientId` ASC) VISIBLE,
  INDEX `workerId` (`workerId` ASC) VISIBLE,
  CONSTRAINT `reportsoftheclients_ibfk_1`
    FOREIGN KEY (`clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `reportsoftheclients_ibfk_2`
    FOREIGN KEY (`workerId`)
    REFERENCES `craftseeker`.`workers` (`workerId`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `craftseeker`.`reportsoftheworkers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`reportsoftheworkers` (
  `workerReportId` INT NOT NULL AUTO_INCREMENT,
  `clientId` VARCHAR(500) NOT NULL,
  `workerId` VARCHAR(500) NOT NULL,
  `workerReportingClientTitle` VARCHAR(255) NOT NULL,
  `workerReportingClientBody` LONGTEXT NOT NULL,
  `workerReportDate` DATETIME NOT NULL,
  PRIMARY KEY (`workerReportId`),
  INDEX `clientId` (`clientId` ASC) VISIBLE,
  INDEX `workerId` (`workerId` ASC) VISIBLE,
  CONSTRAINT `reportsoftheworkers_ibfk_1`
    FOREIGN KEY (`clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `reportsoftheworkers_ibfk_2`
    FOREIGN KEY (`workerId`)
    REFERENCES `craftseeker`.`workers` (`workerId`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `craftseeker`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`reviews` (
  `reviewId` INT NOT NULL AUTO_INCREMENT,
  `clients_clientId` VARCHAR(500) NOT NULL,
  `workers_workerId` VARCHAR(500) NOT NULL,
  `reviewText` LONGTEXT NOT NULL,
  `reviewDate` DATETIME NOT NULL,
  `reviewRating` INT NOT NULL,
  `reviewUrl` VARCHAR(500) NOT NULL,
  `reviewOwner` VARCHAR(45) NULL,
  PRIMARY KEY (`reviewId`),
  INDEX `clients_clientId` (`clients_clientId` ASC) VISIBLE,
  INDEX `workers_workerId` (`workers_workerId` ASC) VISIBLE,
  CONSTRAINT `reviews_ibfk_1`
    FOREIGN KEY (`clients_clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `reviews_ibfk_2`
    FOREIGN KEY (`workers_workerId`)
    REFERENCES `craftseeker`.`workers` (`workerId`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `craftseeker`.`tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `craftseeker`.`tasks` (
  `taskId` INT NOT NULL AUTO_INCREMENT,
  `clients_clientId` VARCHAR(500) NOT NULL,
  `workers_workerId` VARCHAR(500) NOT NULL,
  `taskTitle` VARCHAR(255) NOT NULL,
  `taskText` LONGTEXT NOT NULL,
  `taskDate` DATETIME NOT NULL,
  `taskStatus` VARCHAR(45) NOT NULL,
  `taskWorker` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`taskId`),
  INDEX `clients_clientId` (`clients_clientId` ASC) VISIBLE,
  INDEX `workers_workerId` (`workers_workerId` ASC) VISIBLE,
  CONSTRAINT `tasks_ibfk_1`
    FOREIGN KEY (`clients_clientId`)
    REFERENCES `craftseeker`.`clients` (`clientId`),
  CONSTRAINT `tasks_ibfk_2`
    FOREIGN KEY (`workers_workerId`)
    REFERENCES `craftseeker`.`workers` (`workerId`))
ENGINE = InnoDB
AUTO_INCREMENT = 46
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
