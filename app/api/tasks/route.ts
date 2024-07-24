import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import task from "@prisma/client";
import prisma from "@/prisma/client";
import { createTaskSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createTaskSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newTask = await prisma.task.create({
    data: {
      name: body.name,
      description: body.description,
      status: body.status,
      dueDate: body.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(newTask, { status: 201 });
}
