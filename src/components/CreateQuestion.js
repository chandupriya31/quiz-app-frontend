import { useEffect, useState } from "react"
import axios from "../axios/axios"
import Select from 'react-select'

function CreateQuestion(){
    const [title,setTitle] = useState('')
    const [type,setType] = useState('')
    const [options,setOptions] = useState([])
    const [score,setScore] = useState('')
    const [tags,setTags] = useState([])
    const [tagId,setTagId] = useState('')
    const [serverErrors,setServerErrors] = useState([])

    console.log('tags',tags)

    const handleOptionText = (index,value)=>{
        const newArr = options.map((ele,i)=>{
            if(i === index){
                return {...ele,optionText:value}
            }else{
                return {...ele}
            }
        })
        setOptions(newArr)
    }
    
    useEffect(()=>{
        (async()=>{
            try{
                const tagData = await axios.get('/api/tags/list')
                setTags(tagData.data)
            }catch(e){
                console.log(e)
            }
        })()
    },[])

    const handleAddOption = ()=>{
        const option = {
            optionText:''
        }
        setOptions([...options,option])
    }

    const handleRemoveOption = (index)=>{
        const newArr = options.filter((ele,i)=>{
            return i!==index
        })
        setOptions(newArr)
    }

    return (
        <div>
            <h1>Add Question</h1>
            <form>
                <label htmlFor="title">Title</label><br/>
                <textarea
                    id="title"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                ></textarea><br/>
                <label>Type</label><br/>
                <input
                    type="radio"
                    name="single-choice"
                    value={type}
                    onChange={e=>setType(e.target.checked)}
                />single-choice
                <input
                    type="radio"
                    name="single-choice"
                    value={type}
                    onChange={e=>setType(e.target.checked)}
                />multi-choice <br/>
                <label htmlFor="options">Add Options</label><br/>
                {options.map((ele,i)=>{
                    return <div>
                        <input
                            type="text"
                            id="options"
                            value={ele.optionText}
                            onChange={e => handleOptionText(i,e.target.value)}
                        />
                        <button onClick={()=>handleRemoveOption(i)}>Remove</button>
                    </div>
                })}
                <button type='button' onClick={handleAddOption}>Add Option</button><br/>
                <label htmlFor="score">Score</label><br/>
                <input 
                    type="number"
                    id="score"
                    value={score}
                    onChange={e=>setScore(e.target.value)}
                /><br/>
                <label htmlFor="tag">Add Tags</label>
                <Select
                    
                />
            </form>
        </div>
    )
}

export default CreateQuestion