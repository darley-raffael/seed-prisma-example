import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const fakeUsers = [];
  const fakePosts = [];

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const id = faker.string.uuid();

  for (let i = 0; i < 1000; i++) {
    const users = {
      id,
      email: faker.internet.email({
        firstName,
        lastName,
        allowSpecialCharacters: true,
      }),
      name: faker.person.fullName({ firstName, lastName }),
    };

    const posts = [
      {
        userId: id,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        published: faker.datatype.boolean(),
      },
      {
        userId: id,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        published: faker.datatype.boolean(),
      },
      {
        userId: id,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        published: faker.datatype.boolean(),
      },
    ];

    fakeUsers.push(users);
    fakePosts.push(...posts);
  }
  console.log(fakeUsers.length);

  await prisma.user.createMany({
    data: fakeUsers,
    skipDuplicates: true,
  });

  console.log("Created fake users");

  await prisma.post.createMany({
    data: fakePosts,
    skipDuplicates: true,
  });
}

await main()
  .then(async () => {
    console.log("Seeded successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

console.log("Closed connection");
