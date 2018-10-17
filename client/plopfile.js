module.exports = (plop) => {
  /**
   * A helper method for Handlebars to create a simple
   * logical comparisons in templates;
   * to use it in a Handlebars template just use this syntax:
   * {{#ifvalue your_variable value='the value to compare against'}}
   */
  plop.setHelper('ifvalue', function ifValue(conditional, options) {
    if (options.hash.value === conditional) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  /**
   * ifvalue helper end
   */

  plop.setGenerator('Saga', {
    description: 'Create a new saga with a test suite',
    prompts: [
      {
        type: 'input',
        name: 'sagaFile',
        message: 'File name (WITHOUT .js extension, e.g. photo-get-many)',
      },
      {
        type: 'input',
        name: 'sagaName',
        message: 'Saga name (e.g. photoGetMany)',
      },
      {
        type: 'list',
        choices: ['mutation', 'query'],
        name: 'sagaType',
        message: 'Saga type',
      },
    ],

    actions: [
      {
        type: 'add',
        path: 'src/redux/sagas/{{sagaFile}}.js',
        templateFile: 'devtools/templates/saga-{{sagaType}}.hbs',
      },
      {
        type: 'add',
        path: 'src/redux/sagas/{{sagaFile}}.test.js',
        templateFile: 'devtools/templates/saga-{{sagaType}}.test.hbs',
      },
    ],
  });
};
