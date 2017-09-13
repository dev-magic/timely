import React from 'react'
import Router from 'react-router'
import RouteHandler from Router.RouteHandler
import axios from 'axios'

const ROOT_URL = 'localhost:3000'

var App = 
  React.createClass({
    componentWillMount: function() {
      axios.get(`${ROOT_URL}/user_signed_in`)
    }
    .done(function(data) {
      this.setState({signedIn: data.signed_in});
    }.bind(this));

    return {
    }
    getInitialState: function() {
      return { signedIn: null };
    },

    render:function() {
      return <RouteHandler signedIn={this.state.signedIn}/>
    }
  });

module.exports = App;
