// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {value, toggle} = props
  const {id, title, date, stared} = value
  const url = stared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const liked = () => {
    toggle(id)
  }
  return (
    <li className="container">
      <div className="boxHead">
        <p className="headBox">{title}</p>
        <button type="button" testid="star" className="starBut" onClick={liked}>
          <img src={url} alt="star" />
        </button>
      </div>
      <p className="dateItem">{date}</p>
    </li>
  )
}

export default AppointmentItem
