import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, response) {
  const { method, body } = req;

  console.log(method, body);

  switch (method) {
    case "PUT":
      try {
        const { name, description, status, dueDate } = body;
        const newTask = await prisma.task.create({
          data: { name, description, status, dueDate },
        });
        response.status(201).json(newTask);
      } catch (error) {
        response.status(400).json({ error: "Failed to create task" });
      }
      break;
    // case "GET":
    //   try {
    //     const tasks = await prisma.task.findMany();
    //     response.status(200).json(tasks);
    //   } catch (error) {
    //     response.status(400).json({ error: "Failed to fetch tasks" });
    //   }
    //   break;
    // case "POST":
    //   try {
    //     const { name, description, status, dueDate } = req.body;
    //     const newTask = await prisma.task.create({
    //       data: { name, description, status, dueDate },
    //     });
    //     response.status(201).json(newTask);
    //   } catch (error) {
    //     response.status(400).json({ error: "Failed to create task" });
    //   }
    //   break;
    default:
      response.setHeader("Allow", ["PUT", "GET", "POST"]);
      response.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
