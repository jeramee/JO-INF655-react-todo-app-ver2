// ./components/Task/AddTask.js

import { useFormik } from "formik";
import React from "react";
import Card from "../shared/Card";
import * as Yup from "yup";

export default function AddTask({ handelAdd }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      subTaskDescription: "",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .max(10, "Title must be 10 characters or less")
        .required("Title is required"),
      description: Yup.string()
        .max(20, "Description must be 20 characters or less")
        .required("Description is required"),
      subTaskDescription: Yup.string().max(
        20,
        "Sub-Task Description must be 20 characters or less"
      ),
    }),

    onSubmit: (values) => {
      handelAdd(values);
    },
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <h2>Add a Task to your list</h2>
        <div className="inputBox">
          <div className="input_row">
            <label
              htmlFor="title"
              className={`label ${
                formik.errors.title && formik.touched.title ? "error" : ""
              }`}
            >
              {formik.errors.title ? formik.errors.title : "Title"}
            </label>
            <input
              type="text"
              className="input"
              name="title"
              onChange={formik.handleChange}
              placeholder="Task Title"
            />
          </div>
          <div className="input_row">
            <label
              htmlFor="description"
              className={`label ${
                formik.errors.description && formik.touched.description
                  ? "error"
                  : ""
              }`}
            >
              {formik.errors.description
                ? formik.errors.description
                : "Description"}
            </label>
            <input
              type="text"
              className="input"
              name="description"
              onChange={formik.handleChange}
              placeholder="Task Description"
            />
          </div>
          <div className="input_row">
            <label htmlFor="subTaskDescription">Sub-Task Description</label>
            <input
              type="text"
              className="input"
              name="subTaskDescription"
              onChange={formik.handleChange}
              placeholder="Sub-Task Description"
            />
          </div>
        </div>
        <button type="submit" className="btn">
          Add Task
        </button>
      </form>
    </Card>
  );
}
