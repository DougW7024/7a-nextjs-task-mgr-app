"use client";

import {
  Button,
  Callout,
  TextField,
  Theme,
  Text,
  Spinner,
} from "@radix-ui/themes";
// import { TextField } from "@radix-ui/react-textfield";
// import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

// type TaskForm = z.infer<typeof createTaskSchema>;

// const NewTaskPage = () => {
//   const router = useRouter();
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TaskForm>({
//     resolver: zodResolver(createTaskSchema),
//   });

// const [error, setError] = useState("");
// const [isSubmitting, setSubmitting] = useState(false);
// // const [tasks, setTasks] = useState<Task[]>([]);
// const [currentTask, setCurrentTask] = useState(null);
// const [description, setDescription] = useState("");

// const onSubmit = handleSubmit(async (data) => {
//   console.log("Submitting due date:", data.dueDate, typeof data.dueDate);
//   try {
//     setSubmitting(true);
//     await axios.post("/api/tasks", data);
//     router.push("/tasks");
//   } catch (error) {
//     setSubmitting(false);
//     setError("An unexpected error occurred.");
//   }
// });
////////////////////////////////
////////////////////////////////

const AddTask = () => {
  let isSubmitting = true;
  let newId = Math.floor(Math.random() * (1 - 999999 + 1));
  // const [taskId, setTaskId] = useState(newId); // example task ID
  const [taskData, setTaskData] = useState({
    id: newId,
    name: "Added task text",
    description: "Added task description",
    status: "OPEN",
    dueDate: 20240816,
  });
  console.log(taskData); //success message

  const addTask = async () => {
    const response = await fetch(`/api/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      {/* <Button type="submit" disabled={isSubmitting}>
        Submit New Task {isSubmitting && <Spinner />}
      </Button> */}
      <button onClick={addTask}>Submit New Task</button>
    </div>
  );
};

export default AddTask;

////////////////////////////////
////////////////////////////////

//   return (
//     <div className="max-w-xl">
//       {error && (
//         <Callout.Root color="red" className="mb-5">
//           <Callout.Text>{error}</Callout.Text>
//         </Callout.Root>
//       )}
//       <form className="space-y-3" onSubmit={onSubmit}>
//         <TextField.Root
//           placeholder="Name"
//           {...register("name", {
//             required: "Please enter the name of your task.",
//           })}
//         />
//         <ErrorMessage>{errors.name?.message}</ErrorMessage>

//         <select {...register("status", { required: true })}>
//           <option value="OPEN">OPEN</option>
//           <option value="IN_PROGRESS">IN PROGRESS</option>
//           <option value="CLOSED">CLOSED</option>
//         </select>

//         {/* <Controller
//           name="description"
//           control={control}
//           render={({ field }) => (
//             <SimpleMDE placeholder="Description" {...field} />
//           )}
//         />
//         <ErrorMessage>{errors.description?.message}</ErrorMessage> */}

//         {/* <div>Description value={description} onChange={setDescription}</div> */}

//         <TextField.Root
//           placeholder="Due Date"
//           {...register("dueDate", { required: "Please enter the due date." })}
//         />
//         {/* <TextField.Root placeholder="Due Date" /> */}

//         <Button type="submit" disabled={isSubmitting}>
//           Submit New Task {isSubmitting && <Spinner />}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default NewTaskPage;
