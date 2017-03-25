import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import AuthExample from './auth';
render (
    <AuthExample/>,
    document.body.appendChild(document.createElement('div'))
)