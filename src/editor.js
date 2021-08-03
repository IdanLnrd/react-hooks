import React, { useState, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import api from './api'
import AddSkillEvalForm from './forms/AddSkillEvalForm'
import EditSkillEvalForm from './forms/EditSkillEvalForm'
import SkillEvalTable from './tables/SkillEvalTable'
let inited = false;
const Editor = () => {

	const location = useLocation();
	const search = new URLSearchParams(location.search);
	const skillQ = search.get('skill') || '';

	// Data
	const skillsData = [];
	const initialFormState = { };

	// Setting state
	const [ skills, setSkills ] = useState(skillsData)
	const [ currentSkill, setCurrentSkill ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)
	const updateView = async () => {
		console.log('update view');
		const tags = skillQ ? [skillQ] : [];
		const { result: skills } = await api.read({ tags });
		setSkills(skills);
		console.log(skills);
	}
	// CRUD operations
	const addSkill = async skill => {
		skill.tags = [ ...(skill.tags || []), skillQ, skillQ.toLowerCase() ];
		await api.create(skill);
		updateView();
	}

	const deleteSkill = async id => {
		setEditing(false)
		await api.delete(id);
		updateView();
	}

	const updateSkill = async (id, updatedSkill) => {
		setEditing(false)
		updatedSkill.id = id;
		await api.update(updatedSkill);
		updateView();
	}

	const editRow = async skill => {
		setEditing(true)
		setCurrentSkill({ ...skill })
	}
	if(!inited) {
		inited = true;
		updateView();
	}
	return (
		<div className="container">
			<h1>Skill Evaluator</h1>
			<h5>{ skillQ }</h5>
			<div className="flex-cols">
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
							<h2>Add Evaluator</h2>
							<AddSkillEvalForm addSkill={addSkill} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>Evaluators</h2>
					<SkillEvalTable skills={skills} 
						canEdit={true} 
						editRow={editRow} 
						deleteSkill={deleteSkill} />
				</div>
			</div>
		</div>
	)
}

export default Editor;
