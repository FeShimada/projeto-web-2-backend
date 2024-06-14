/*
  Warnings:

  - You are about to drop the column `user_id` on the `activity` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[activity] DROP CONSTRAINT [activity_user_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[activity] DROP COLUMN [user_id];
ALTER TABLE [dbo].[activity] ADD [assignedToId] INT,
[createdById] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[activity] ADD CONSTRAINT [activity_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[activity] ADD CONSTRAINT [activity_assignedToId_fkey] FOREIGN KEY ([assignedToId]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
