"use client";

import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const TasksPage = () => {
  return (
    <div>
      <Button>
        <Link href="/tasks/new">New Task</Link>
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button>
        <Link href="/tasks">View Tasks</Link>
      </Button>
    </div>
  );
};

export default TasksPage;
