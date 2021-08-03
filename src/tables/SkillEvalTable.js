import React from 'react'

const SkillEvalTable = props => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.skills.length > 0 ? (
        props.skills.map(skill => (
          <tr key={skill.id}>
            <td>{skill.title}</td>
            <td>{skill.description}</td>
            <td>
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
            </td>
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