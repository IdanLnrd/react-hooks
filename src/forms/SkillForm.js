import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import api from '../api';

const SkillForm = props => {
	const initialFormState = [ '' ];
	const [ skills, setSkills ] = useState(initialFormState);
	const [selected, setSelected ] = useState('');
	const [ sugessions, setSuggestions ] = useState([]);
	useEffect(() => {
		api.data().then(d => {
			const skls = d.map(x => x.Skill);
			setSkills(skls);
		});
		return () => {};
	}, []);

	const handleInputChange = event => {
		const { value } = event.target;
		setSuggestions(skills.filter(s => !!value && s.toLowerCase().startsWith(value.toLowerCase())));
		setSelected(value);
	}

	return (
		<>
			<form
			onSubmit={event => {
				event.preventDefault()
				console.log('selected', selected);
			}}
		>
			<label>Choose skill</label>
			<input type="text" 
				name="selected" 
				value={selected} 
				onChange={handleInputChange} />
			{ selected ? <Link to={'/editor?skill=' + selected}>Continue</Link> : <span></span> }
			
			<div className="suggestions-container" style={sugessions.length > 0 ? {} : { 'display': 'none' }}>
				{sugessions.map((s, index) => <div key={index} 
					onClick={() => {setSelected(sugessions[index]); setSuggestions([])}} 
					className="suggest">{ s }</div>)}
			</div>
		</form>
		</>
	
	)
}

export default SkillForm;
