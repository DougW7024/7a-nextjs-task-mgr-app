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
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type TaskForm = z.infer<typeof createTaskSchema>;

const NewTaskPage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(createTaskSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [description, setDescription] = useState("");

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // const fetchTasks = async () => {
  //   const response = await fetch("/api/tasks");
  //   // console.log(response);
  //   const data = await response.json();
  //   setTasks(data);
  // };

  // const addTask = async (name, description, status, dueDate) => {
  const addTask = async () => {
    // const request = new Request("https://example.org/post", {
    //   method: "POST",
    //   body: JSON.stringify({ username: "example" }),
    // });

    // const response1 = await fetch(request);
    // console.log(response1.status);

    // // Will throw: "Body has already been consumed."
    // const response2 = await fetch(request);
    // console.log(response2.status);

    console.log("inside aqddtask function");

    // const response = await fetch("/api/tasks", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: name, description: description, status: status, dueDate: dueDate }),
    // });
    // const newTask = await response.json();
    // setTasks([...register, newTask]);
    // setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // const toggleComplete = async (id) => {
  //   const taskToUpdate = tasks.find((task) => task.id === id);
  //   const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

  //   const response = await fetch(`/api/tasks/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedTask),
  //   });
  //   const data = await response.json();
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) => (task.id === id ? data : task))
  //   );
  // };

  // const removeTask = async (id) => {
  //   await fetch(`/api/tasks/${id}`, {
  //     method: "DELETE",
  //   });
  //   setTasks(tasks.filter((task) => task.id !== id));
  // };

  // const editTask = (id) => {
  //   const taskToEdit = tasks.find((task) => task.id === id);
  //   setCurrentTask(taskToEdit);
  // };

  // const updateTask = async () => {
  //   const response = await fetch(`/api/tasks/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: currentTask?.id,
  //       name: currentTask?.name,
  //       description: currentTask?.description,
  //       status: currentTask?.status,
  //       duedate: currentTask?.dueDate,
  //     }),
  //   });
  //   const data = await response.json();
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) => (task.id === id ? data : task))
  //   );
  //   setCurrentTask(null);
  // };

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     setSubmitting(true);
  //     await axios.post("/api/tasks", data);
  //     router.push("/tasks");
  //   } catch (error) {
  //     setSubmitting(false);
  //     setError("An unexpected error occurred.");
  //   }
  // });
  const onSubmit = handleSubmit(async (data) => {
    console.log("Submitting due date:", data.dueDate, typeof data.dueDate);
    try {
      setSubmitting(true);
      await axios.post("/api/tasks", data);
      router.push("/tasks");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Name"
          {...register("name", {
            required: "Please enter the name of your task.",
          })}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <select {...register("status", { required: true })}>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="CLOSED">CLOSED</option>
        </select>

        {/* <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage> */}

        {/* <div>Description value={description} onChange={setDescription}</div> */}

        <TextField.Root
          placeholder="Due Date"
          {...register("dueDate", { required: "Please enter the due date." })}
        />
        {/* <TextField.Root placeholder="Due Date" /> */}

        <Button type="submit" disabled={isSubmitting}>
          Submit New Task {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
