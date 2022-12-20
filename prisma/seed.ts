import { prisma } from "@/server/db/client";
import { Status } from "@prisma/client";
const projects = [
  {
    clientId: "639f15ef0f4fe9c546af9bbc",
    name: "eCommerce Website",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
  },
  {
    clientId: "63a1a5de28f689093aa55895",
    name: "Dating App",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
    status: Status.Completed,
  },
  {
    clientId: "639f15ef0f4fe9c546af9bbc",
    name: "SEO Project",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
    status: Status.InProgress,
  },
  {
    clientId: "63a1a5de28f689093aa55895",
    name: "Design Prototype",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
  },
  {
    clientId: "639f15ef0f4fe9c546af9bbc",
    name: "Auction Website",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
  },
];
const run = async () => {
  await prisma.project.createMany({ data: projects });
  await prisma.$disconnect();
};

run();
