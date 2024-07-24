import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, response) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "PUT":
      try {
        const { name, description, status, dueDate } = body;
        const updatedTask = await prisma.task.update({
          where: { id: parseInt(id) },
          data: { name, description, status, dueDate },
        });
        response.status(200).json(updatedTask);
      } catch (error) {
        response.status(400).json({ error: "Failed to update task" });
      }
      break;
    case "DELETE":
      try {
        await prisma.task.delete({ where: { id: parseInt(id) } });
        response.status(204).end();
      } catch (error) {
        response.status(400).json({ error: "Failed to delete task" });
      }
      break;
    default:
      response.setHeader("Allow", ["PUT", "DELETE"]);
      response.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
