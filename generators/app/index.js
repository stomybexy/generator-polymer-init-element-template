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

    this.fs.copyTpl(
      this.templatePath('_element.js'),
      this.destinationPath(`${destFolder}/${elementName}/${elementName}.js`),
      {
        ...this.props,
        className,
        displayName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_element_test.html'),
      this.destinationPath(`${destFolder}/${elementName}/${elementName}_test.html`),
      {
        ...this.props,
        className,
        displayName
      }
    );
  }

  install() {
    console.log('Do not forget to add test in unit test suites');
  }
};
