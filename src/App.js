import React, { useState, Fragment } from 'react'
import AddSkillEvalForm from './forms/AddSkillEvalForm'
import EditSkillEvalForm from './forms/EditSkillEvalForm'
import SkillEvalTable from './tables/SkillEvalTable'

const App = () => {
	// Data
	const skillsData = [];

	const initialFormState = { id: null, title: '', description: '' };

	// Setting state
	const [ skills, setSkills ] = useState(skillsData)
	const [ currentSkill, setCurrentSkill ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addSkill = skill => {
		skill.id = skills.length + 1
		setSkills([ ...skills, skill ])
	}

	const deleteSkill = id => {
		setEditing(false)
		setSkills(skills.filter(s => s.id !== id))
	}

	const updateSkill = (id, updatedSkill) => {
		setEditing(false)

		setSkills(skills.map(skill => (skill.id === id ? updatedSkill : skill)))
	}

	const editRow = skill => {
		setEditing(true)

		setCurrentSkill({ id: skill.id, title: skill.title, description: skill.description })
	}

	return (
		<div className="container">
			<h1>Skill Evaluator</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit skill</h2>
							<EditSkillEvalForm
								editing={editing}
								setEditing={setEditing}
								currentSkill={currentSkill}
								updateSkill={updateSkill}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add skill</h2>
							<AddSkillEvalForm addSkill={addSkill} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>Skill Evaluators</h2>
					<SkillEvalTable skills={skills} editRow={editRow} deleteSkill={deleteSkill} />
				</div>
			</div>
		</div>
	)
}

export default App
