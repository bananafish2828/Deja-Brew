import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import PhoneInvalidError from '../../Dialog/PhoneInvalidError.jsx';
import PhoneIncompleteError from '../../Dialog/PhoneIncompleteError.jsx';
import FriendInfoError from '../../Dialog/FriendInfoError.jsx';

const styles = {
  name: {
    width: '320px'
  },
  pre: {
    width: '28px'
  },
  SLN: {
    width: '40px'
  },
  button: {
    margin: 5,
    height: 24
  }
}

export default class QueryFriendInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invalid: false,
      incomplete: false,
      friendInfo: false
    };
    this.validate=this.handleValidation.bind(this);
    this.handleInvalidOK=this.handleInvalidOK.bind(this);
    this.handleIncompleteOK=this.handleIncompleteOK.bind(this);
    this.handleFriendInfoOK=this.handleFriendInfoOK.bind(this);
  }

  handleValidation(friendName, areacode, prefix, SLN){
    if (friendName === '' || friendName === undefined) {
      this.setState({ friendInfo: true });
    } else { 
      console.log('logic to validate valid phone number (' + areacode +') ' + prefix + '-' + SLN);
      if (areacode === undefined || prefix === undefined || SLN === undefined) {
        this.setState({ friendInfo: false, incomplete: true, invalid: false });
      } else {
        let areaDigit = Number(areacode.substring(0, 1));
        let preDigit = Number(prefix.substring(0, 1));
        let phoneNum = areacode + prefix + SLN;
        if (areaDigit === 0 || areaDigit === 1 || preDigit === 0 || preDigit === 1 || phoneNum.length < 10 || isNaN(phoneNum)) {
          this.setState({ friendInfo: false, incomplete: false, invalid: true });
        } else {
          this.props.handleSubmit(friendName, phoneNum);
        }
      }
    }
  }

  handleInvalidOK() {
    this.setState({ invalid: false, incomplete: false, friendInfo: false });
  }

  handleIncompleteOK() {
    this.setState({ incomplete: false, invalid: false, friendInfo: false });
  }

  handleFriendInfoOK() {
    this.setState({ friendInfo: false, incomplete: false, friendInfo: false });
  }

  render() {
    let friendName;
    let areacode;
    let prefix;
    let SLN;
    return (
      <div>
        <span>
          <TextField floatingLabelText="name" floatingLabelFixed={true} style={ styles.name } onChange={(e) => friendName = e.target.value } />
          (<TextField floatingLabelText="phone number" floatingLabelFixed={true} maxLength='3' style={ styles.pre } onChange={(e) => areacode = e.target.value } />
          )<TextField floatingLabelText=" " maxLength='3' style={ styles.pre } onChange={(e) => prefix = e.target.value } />          
          -<TextField floatingLabelText=" " maxLength='4' style={ styles.SLN } onChange={(e) => SLN = e.target.value } />
          <RaisedButton onClick={() => { this.validate(friendName, areacode, prefix, SLN) }} style={ styles.button } label="Submit" />
          <RaisedButton onClick={() => { this.props.handleSubmit() }} style={ styles.button } label="Cancel" />
        </span>
        <PhoneInvalidError invalidOK={ this.handleInvalidOK } open={ this.state.invalid } />
        <PhoneIncompleteError incompleteOK={ this.handleIncompleteOK } open={ this.state.incomplete } />
        <FriendInfoError friendInfoOK={ this.handleFriendInfoOK } open={ this.state.friendInfo } />
      </div>
    )
  }
}
