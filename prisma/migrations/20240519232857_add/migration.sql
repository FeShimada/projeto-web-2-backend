BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[artifact] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [activityId] INT NOT NULL,
    CONSTRAINT [artifact_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[artifact] ADD CONSTRAINT [artifact_activityId_fkey] FOREIGN KEY ([activityId]) REFERENCES [dbo].[activity]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
