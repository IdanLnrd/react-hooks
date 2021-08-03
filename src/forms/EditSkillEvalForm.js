import React, { useState, useEffect } from 'react'

const EditSkillEvalForm = props => {
  const [ skill, setSkill ] = useState(props.currentSkill)

  useEffect(
    () => {
      setSkill(props.currentSkill)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    setSkill({ ...skill, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateSkill(skill.id, skill)
      }}
    >
      <label>Title</label>
      <input type="text" name="title" value={skill.title} onChange={handleInputChange} />
      <label>Description</label>
      <input type="text" name="description" value={skill.description} onChange={handleInputChange} />
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditSkillEvalForm;
