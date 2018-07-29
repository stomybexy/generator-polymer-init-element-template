'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the tiptop ${chalk.red(
          'generator-polymer-init-element-template'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'elementName',
        message: 'What is the name of your element?',
        default: 'my-element'
      },
      {
        type: 'input',
        name: 'destFolder',
        message: `Where would you like to put your element?`,
        default: 'src/components/elements'
      },
      {
        type: 'confirm',
        name: 'generateTest',
        message: `Would you like to generate test file?`,
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const className = changeCase.pascalCase(this.props.elementName);
    const displayName = changeCase.sentenceCase(this.props.elementName);
    const destFolder = this.props.destFolder;
    const elementName = this.props.elementName;

    let computedDestFolder;

    if (this.props.generateTest) {
      computedDestFolder = `${destFolder}/${elementName}`;
    } else {
      computedDestFolder = `${destFolder}`;
    }

    this.fs.copyTpl(
      this.templatePath('_element.js'),
      this.destinationPath(`${computedDestFolder}/${elementName}.js`),
      {
        ...this.props,
        className,
        displayName
      }
    );
    if (this.props.generateTest) {
      this.fs.copyTpl(
        this.templatePath('_element_test.html'),
        this.destinationPath(`${computedDestFolder}/${elementName}_test.html`),
        {
          ...this.props,
          className,
          displayName
        }
      );
    }
  }

  install() {
    if (this.props.generateTest) {
      console.log('Do not forget to add test in unit test suites');
    }
  }
};
