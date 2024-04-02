BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[article] ALTER COLUMN [score1] INT NULL;
ALTER TABLE [dbo].[article] ALTER COLUMN [score2] INT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH