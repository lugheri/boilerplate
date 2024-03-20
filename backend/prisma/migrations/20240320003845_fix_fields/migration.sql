-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_levelId_fkey`;

-- AlterTable
ALTER TABLE `levels` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `levelId` VARCHAR(191) NULL,
    MODIFY `reset` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `levels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
