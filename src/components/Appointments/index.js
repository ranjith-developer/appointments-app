import {Component} from 'react'
import {v4 as uid} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isFilterActive: false,
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeDate = event => {
    this.setState({date: event.target.value})
    // const occasion = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    // this.setState({
    //   date: occasion,
    // })
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, stared: !each.stared}
        }
        return each
      }),
    }))
  }

  onChangeFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formatDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    const newAppointment = {
      id: uid(),
      title,
      date: formatDate,
      stared: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilterList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(eachItem => eachItem.stared === true)
    }
    return appointmentList
  }

  render() {
    const {title, date} = this.state
    const filterList = this.getFilterList()
    return (
      <div className="background">
        <div className="box">
          <div className="mainBox">
            <div className="leftBox">
              <h1 className="head">Add Appointment</h1>
              <form>
                <div className="form">
                  <label className="title" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    className="titleInput"
                    onChange={this.changeTitle}
                    value={title}
                  />
                  <label className="title" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    onChange={this.changeDate}
                    value={date}
                  />
                </div>
                <button
                  type="submit"
                  className="but"
                  onClick={this.addAppointment}
                >
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="bottomHead">
              <h1 className="head">Appointments</h1>
              <button
                type="button"
                className="but1"
                onClick={this.onChangeFilter}
              >
                Starred
              </button>
            </div>
            <ul className="ulContainer">
              {filterList.map(eachAppointment => (
                <AppointmentItem
                  value={eachAppointment}
                  key={eachAppointment.id}
                  toggle={this.toggleIsFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
