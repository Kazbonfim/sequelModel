-- Criação da tabela AdminUsers
CREATE TABLE IF NOT EXISTS `AdminUsers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `occupation` VARCHAR(255),
    `newsletter` TINYINT(1) DEFAULT false,
    `hash` VARCHAR(255) NOT NULL,
    `role` ENUM('Admin', 'Dev', 'User') DEFAULT 'Admin',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- Criação da tabela Users
CREATE TABLE IF NOT EXISTS `Users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `occupation` VARCHAR(255),
    `newsletter` TINYINT(1) DEFAULT false,
    `hash` VARCHAR(255) NOT NULL,
    `role` ENUM('Admin', 'Dev', 'User') DEFAULT 'User',
    `adminUserId` INT,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_AdminUser` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUsers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Criação da tabela Tasks
CREATE TABLE IF NOT EXISTS `Tasks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `status` ENUM('Pendente', 'Em progresso', 'Concluído') DEFAULT 'Pendente',
    `userId` INT,
    `adminUserId` INT,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_User` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_AdminUser_Task` FOREIGN KEY (`adminUserId`) REFERENCES `AdminUsers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
