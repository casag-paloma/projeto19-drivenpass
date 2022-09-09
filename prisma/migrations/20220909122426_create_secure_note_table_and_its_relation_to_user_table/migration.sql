-- CreateTable
CREATE TABLE "SecureNote" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SecureNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SecureNote" ADD CONSTRAINT "SecureNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
