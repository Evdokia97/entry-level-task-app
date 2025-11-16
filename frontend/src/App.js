import React from 'react';
import TaskList from './components/TaskList';
import { Card } from 'primereact/card';
import labels from "./components/labels.ts";

function App() {
    return (
        <Card title={labels.appTitle}>
            <div className="container mt-4">
                <TaskList/>
            </div>
        </Card>
    );
}

export default App;
