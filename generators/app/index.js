'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the magnificent ' + chalk.red('generator-polymer-init-element-template') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'elementName',
      message: 'How would you like to call your element?',
      default: process.cwd().split(path.sep).pop() + '-element'
    }, {
      type: 'input',
      name: 'parentFolder',
      message: 'Where would you like to put your element?',
      default: 'src'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    const elementName = this.props.elementName;
    const parentFolder = this.props.parentFolder;

    this.fs.copyTpl(
      this.templatePath('element.html'),
      this.destinationPath(`${parentFolder}/${elementName}.html`),
      this.props
    );

     this.fs.copyTpl(
      this.templatePath('element_test.html'),
      this.destinationPath(`test/${elementName}.html`),
      this.props
    );
  },

  install: function () {
    // this.installDependencies();
  }
});
