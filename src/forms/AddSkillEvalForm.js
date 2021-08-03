import React, { useState } from 'react'

const AddSkillEvalForm = props => {
	const initialFormState = { id: null, title: '', description: '', level: 0 }
	const [ skill, setSkill ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target
		setSkill({ ...skill, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!skill.title || !skill.description) return

				props.addSkill(skill)
				setSkill(initialFormState)
			}}
		>
			<label>Title</label>
			<input type="text" name="title" value={skill.title} onChange={handleInputChange} />
			<label>Description</label>
			<input type="text" name="description" value={skill.description} onChange={handleInputChange} />
			<label>Level</label>
			<input type="number" name="level" value={skill.level} onChange={handleInputChange} />
			<button>Add new skill</button>
		</form>
	)
}

export default AddSkillEvalForm;
