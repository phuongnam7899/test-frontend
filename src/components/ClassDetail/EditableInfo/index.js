import React, { useState } from "react"
import { Input } from 'antd';
import "./index.css"

const EditableInfo = (props) => {
    const {label, content, onUpdate} = props;
    const [editable,setEditable] = useState(false)
    const [currentContent, setCurrentContent] = useState(content)

    const turnOnEditable = () => {
        setEditable(true)
    }

    const turnOffEditable = () => {
        setEditable(false)
    }

    const updateCurrentContent = (e) => {
        setCurrentContent(e.target.value)
        console.log(currentContent)
    }

    const handleUpdate = (content) => {
        onUpdate(content)
    }

    return(
    <div className="editable-content" onClick={turnOnEditable}>{label}: {editable ? <Input onChange={updateCurrentContent} onPressEnter={() => {
        turnOffEditable();
        handleUpdate(currentContent);
    }} value={currentContent}/> : currentContent}</div>
    )
}

export default EditableInfo