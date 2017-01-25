import React, { Component } from 'react'
import { DeviceOrientation } from 'react-event-components'
import {
  LineChart,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      orientation: [],
      running: true,
    }
  }

  handleAccelerometer = (o) => {
    console.log(o)
    this.setState({ orientation: [ ...this.state.orientation, o] })
  }

  toggleRunning = () => {
    if (!this.state.running) {
      this.setState({ orientation: [] })
    }
    this.setState({ running: !this.state.running })
  }

  render() {
    const { running } = this.state
    return (
      <div className="App">
        <h2></h2>

        {running && <DeviceOrientation do={this.handleAccelerometer} />}

        <div className="button" onClick={this.toggleRunning}>
          <span>{ running ? 'Stop' : 'Start' }</span>
        </div>

        {!running
          ? <ResponsiveContainer height={350} width="100%"><LineChart data={this.state.orientation} >
            <XAxis dataKey="timestamp" />
            <YAxis />
            <CartesianGrid/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="alpha" stroke="green" />
            <Line type="monotone" dataKey="beta" stroke="blue" />
            <Line type="monotone" dataKey="gamma" stroke="red" />
          </LineChart></ResponsiveContainer>
            : <div className="graphPlaceholder">Press STOP to show graph</div>}
      </div>
    )
  }
}
