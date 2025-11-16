import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import labels from './labels.ts';
import { InputTextarea } from 'primereact/inputtextarea';
import AxiosInstance from '../assets/configs/AxiosInstance.ts';
import './style.css';

function TaskForm({ visible, onHide }) {

    async function callAddTask(title: string, description?: string) {
        try {
            const request = { title, description };
            await AxiosInstance.post('/tasks', request);
            window.location.reload();
        } catch (error) {
            console.error('Error adding a new task:', error);
        }
    }
    //validation for button --> check if title exists
    const titleExists = (values) => {
        const errors: { title?: string } = {};
        if (!values.title.trim()) {
            errors.title = 'Required';
        }
        return errors;
    };

    return (
        <Dialog
            dismissableMask
            visible={visible}
            onHide={onHide}
            maximizable={false}
            resizable={false}
            draggable={false}
            className="p-dialog-primary"
            pt={{ content: { className: 'taskform-dialog-content' } }}
            header={
                <div className="taskform-header">
                    <IoCreateOutline size={25} />
                    <span>{labels.addTask}</span>
                </div>
            }
        >
            <Formik
                initialValues={{ title: '', description: '' }}
                validate={titleExists}
                onSubmit={(values) => callAddTask(values.title, values.description)}
            >
                {({ values, errors, touched, handleChange }) => (
                    <Form>
                        <div className="taskform-grid">

                            {/* Title Section */}
                            <div className="taskform-field">
                                <span className="taskform-label">
                                    {labels.title} <span className="taskform-required">*</span>
                                </span>

                                <InputTextarea
                                    id="title"
                                    name="title"
                                    autoResize
                                    rows={1}
                                    value={values.title}
                                    onChange={handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            document.querySelector('form')?.requestSubmit();
                                        }
                                    }}
                                    className={touched.title && errors.title ? "p-invalid" : ""}
                                />

                                {touched.title && errors.title && (
                                    <small className="p-error">{errors.title}</small>
                                )}
                            </div>

                            {/* Description Section */}
                            <div className="taskform-field">
                                <span className="taskform-label">{labels.description}</span>

                                <InputTextarea
                                    id="description"
                                    name="description"
                                    autoResize
                                    rows={1}
                                    value={values.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="taskform-submit">
                            <Button
                                type="submit"
                                label={labels.add}
                                disabled={!!errors.title || !values.title.trim()}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default TaskForm;
