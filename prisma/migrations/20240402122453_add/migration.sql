BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_role_df] DEFAULT 0 FOR [role];

-- CreateTable
CREATE TABLE [dbo].[article] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [summary] NVARCHAR(1000) NOT NULL,
    [pdfLink] NVARCHAR(1000) NOT NULL,
    [status] INT NOT NULL CONSTRAINT [article_status_df] DEFAULT 0,
    [score1] INT NOT NULL,
    [score2] INT NOT NULL,
    CONSTRAINT [article_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_ArticleToUser] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_ArticleToUser_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_ArticleToUser_B_index] ON [dbo].[_ArticleToUser]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[_ArticleToUser] ADD CONSTRAINT [_ArticleToUser_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[article]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_ArticleToUser] ADD CONSTRAINT [_ArticleToUser_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[user]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
