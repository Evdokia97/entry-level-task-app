import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import labels from "./labels.ts";
import TaskForm from "./TaskForm";
import AxiosInstance from "../assets/configs/AxiosInstance.ts";
import "./style.css";

function TaskList() {
    const [taskFormVisible, setTaskFormVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const hasFetchedRef = useRef(false);

    const getTasks = async () => {
        try {
            const response = await AxiosInstance.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        //check that the getTasks won't be called twice
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        getTasks();
    }, []);

    return (
        <div>
            <div className="task-list-header">
                <h3>{labels.tasks}</h3>
                <Button
                    label={labels.newTask}
                    onClick={() => setTaskFormVisible(true)}
                />
            </div>

            <DataTable value={tasks}>
                <Column field="title" header="Title" />
                <Column field="description" header="Description" />
            </DataTable>

            <TaskForm
                visible={taskFormVisible}
                onHide={() => setTaskFormVisible(false)}
            />
        </div>
    );
}

export default TaskList;
