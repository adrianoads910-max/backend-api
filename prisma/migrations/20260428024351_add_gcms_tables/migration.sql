-- CreateTable
CREATE TABLE `samples` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `samples_substances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sampleId` INTEGER NOT NULL,
    `substanceId` INTEGER NOT NULL,
    `relativeArea` FLOAT NULL,
    `extraNote` TEXT NULL,

    UNIQUE INDEX `samples_substances_sampleId_substanceId_key`(`sampleId`, `substanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `substances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nist` FLOAT NOT NULL,
    `tR` FLOAT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `class` VARCHAR(100) NOT NULL,
    `molecularFormula` VARCHAR(50) NOT NULL,
    `molecularWeight` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `base_ions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mz` INTEGER NOT NULL,
    `intensity` FLOAT NOT NULL,
    `substanceId` INTEGER NOT NULL,

    UNIQUE INDEX `base_ions_substanceId_key`(`substanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fragment_ions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mz` INTEGER NOT NULL,
    `intensity` FLOAT NOT NULL,
    `substanceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `samples_substances` ADD CONSTRAINT `samples_substances_sampleId_fkey` FOREIGN KEY (`sampleId`) REFERENCES `samples`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `samples_substances` ADD CONSTRAINT `samples_substances_substanceId_fkey` FOREIGN KEY (`substanceId`) REFERENCES `substances`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `base_ions` ADD CONSTRAINT `base_ions_substanceId_fkey` FOREIGN KEY (`substanceId`) REFERENCES `substances`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fragment_ions` ADD CONSTRAINT `fragment_ions_substanceId_fkey` FOREIGN KEY (`substanceId`) REFERENCES `substances`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
