import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  // Prevent duplicate seeding
  const existingUser = await prisma.user.findFirst({
    where: { email: "admin@gmail.com" }
  });

  if (existingUser) {
    console.log("User already exists, skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("P@ssw0rd", 10);

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      isTwoFactorEnabled: false,
    }
  });

  console.log("✅ User seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });