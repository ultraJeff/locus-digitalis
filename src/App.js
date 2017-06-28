import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: localStorage.getItem('markdownStorage') || '### Type Markdown Here'
    };
  }

  rawMarkup() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      }
    })

    var rawMarkup = marked(this.state.content, {sanitize: true})
    return {
      __html: rawMarkup
    }
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value
    });
    localStorage.setItem('markdownStorage', event.target.value);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jeff's Crazy Simple Markdown Editor</h2>
        </div>
        <p className="App-intro">
          Every keystroke you take saves the file to localStorage
        </p>
        <div className="container-fluid">
          <div className="row">
            <h1 className="text-center">
              ReactJS Markdown Editor
            </h1>
            <div className="col-xs-12 col-sm-6">
              <h3>Markdown</h3>
              <textarea id="markdown" className="markdown" defaultValue={this.state.content} onChange={this.handleChange}></textarea>
            </div>
            <div className="col-xs-12 col-sm-6">
              <h3>Preview</h3>
              <div id="preview" dangerouslySetInnerHTML={this.rawMarkup()}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
