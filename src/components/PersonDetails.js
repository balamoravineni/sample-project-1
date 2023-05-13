import React, { PureComponent } from 'react';

// export default function PersonDetails {  
export default class PersonDetails extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Balakrishna Moravineni',
      dob: "1998-10-18",
      profession: 'Software Engineer',
      yoe: 3,
      quote: '<p style="color: green; font-size: 30px; font-weight: bold"> A river cuts through rock not because of its power, but because of its persistence </p>',
      editMode: false
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onEditDetailsSubmit = this.onEditDetailsSubmit.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
  }

  onInputChange(event) {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    })
  }

  onEditDetailsSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      editMode: false
    })
  }

  onResetClick(event) {
    event.preventDefault();
    this.setState({
      name: '',
      dob: '',
      profession: '',
      yoe: '',
      quote: ''
    });
  }

  render() {
    const { name, dob, profession, yoe, quote, editMode } = this.state;


    return (
      <div className='person-details'>
        {editMode ? (
          <form onSubmit={this.onEditDetailsSubmit}>
            <div className='input-item'>
              <label for='name'>Name:</label>
              <input id='name' type='text' onChange={this.onInputChange} value={name}></input>
            </div>
            <div className='input-item'>
              <label for='dob'>Date of Birth:</label>
              <input id='dob' type='date' onChange={this.onInputChange} value={dob}></input>
            </div>
            <div className='input-item'>
              <label for='profession'>Profession:</label>
              <input id='profession' type='text' onChange={this.onInputChange} value={profession}></input>
            </div>
            <div className='input-item'>
              <label for='yoe'>Years of Experience:</label>
              <input id='yoe' type='number' onChange={this.onInputChange} value={yoe}></input>
            </div>
            <textarea id='quote' placeholder='Type your favourite quotes' onChange={this.onInputChange} value={quote} style={{ width: '80%', height: '50px' }}></textarea>
            <div>
              <button onClick={this.onResetClick}>Reset</button>
              <button type='submit'>Submit</button>
              {/* <button className='form-button' onClick={() => { this.setState({ editMode: false }) }}>Cancel</button > */}
            </div>
          </form>
        ) :
          <>
            <h2>Name: {name}</h2>
            <h3>Date of Birth: {dob}</h3>
            <h3>Profession: {profession}</h3>
            <h3>Years of Experience: {yoe}</h3>
            <div dangerouslySetInnerHTML={{ __html: quote }}></div>
            <button onClick={() => this.setState({ editMode: true })}>Edit Details</button>
          </>
        }
      </div>
    );

  }
}