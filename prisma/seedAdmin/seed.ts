import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../../src/lib/prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import config from "../../src/config";

async function seedAdmin() {
  const adminName = "Projects Admin";
  const adminEmail = config.admin_email;
  const adminPassword = config.admin_password;
  const adminPhone = "01854*****";
  const adminAddress = "Mirsharai, chittagong";
  const adminProfileImage = "https://adminImage.png";
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      address: adminAddress,
      profileImage: adminProfileImage,
      password: hashedPassword,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });
}

seedAdmin()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
