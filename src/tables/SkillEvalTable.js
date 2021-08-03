import React from 'react'

const SkillEvalTable = props => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Evaluation</th>
        <th>Level</th>
      
        {props.canEdit ? <th>Actions</th>: <th></th>}
      </tr>
    </thead>
    <tbody>
      {props.skills.length > 0 ? (
        props.skills.map(skill => (
          <tr key={skill.id}>
            <td>{skill.title}</td>
           
            <td>{skill.description}</td>
            <td>
              <a href={'http://localhost:3001?id=' + skill.id} 
                rel="noopener noreferrer" 
                target="_blank">{skill.evaluation ? 'Survey' : 'Create' }</a>
            </td>
            <td>{skill.level}</td>
        
            { props.canEdit ?             <td>
              <button
                onClick={() => {
                  props.editRow(skill)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteSkill(skill.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>: <td></td>}

          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default SkillEvalTable;
