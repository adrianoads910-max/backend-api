-- AlterTable
ALTER TABLE `User` ADD COLUMN `image` TEXT NULL;

-- AlterTable
ALTER TABLE `samples` ADD COLUMN `image` TEXT NULL,
    ADD COLUMN `matrizId` INTEGER NULL;

-- CreateTable
CREATE TABLE `matrizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `image` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `samples` ADD CONSTRAINT `samples_matrizId_fkey` FOREIGN KEY (`matrizId`) REFERENCES `matrizes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
