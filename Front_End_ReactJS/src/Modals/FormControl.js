import React, { Component } from 'react'

class FormControl extends Component {
    render() {
        return (
            <select className="form-control">
                <option value="">Select the correct delimiter</option>
                <option value="one">,</option>
                <option value="two">:</option>
                <option value="three">;</option>
                <option value="four">/</option>
                <option value="five">\</option>
                <option value="five">|</option>
            </select>    
        )
    }
}
export default FormControl ;