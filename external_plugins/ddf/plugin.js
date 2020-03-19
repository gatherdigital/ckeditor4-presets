"use strict";

CKEDITOR.plugins.add('ddf', {
  icons: 'ddf',
  init: function init(editor) {
    if (editor.element.hasClass("ddf")) {
      editor.addCommand('ddf', new CKEDITOR.dialogCommand('ddfDialog'));
      editor.ui.addButton('DDF', {
        label: 'Insert Dymanic Data',
        command: 'ddf',
        toolbar: 'insert'
      });
      editor.addMenuGroup('ddfGroup');
      editor.addMenuItem('ddfItem', {
        label: 'Edit Dymanic Data',
        icon: this.path + 'icons/ddf.png',
        command: 'ddf',
        group: 'ddfGroup'
      });

      if (editor.contextMenu != null) {
        editor.contextMenu.addListener(function (element) {
          if (element.getAscendant('x-ddf', true)) {
            return {
              ddfItem: CKEDITOR.TRISTATE_OFF
            };
          }
        });
      }

      return editor.on('doubleclick', function (evt) {
        var element = evt.data.element;

        if (element.is('x-ddf')) {
          return evt.data.dialog = 'ddfDialog';
        }
      });
    }
  },
  onLoad: function onLoad() {
    return CKEDITOR.addCss("x-ddf::before { content: \"<\"; }\nx-ddf::after { content: \">\"; }");
  }
});
CKEDITOR.on('dialogDefinition', function (evt) {
  if (evt.data.name === 'image' && evt.editor.element.hasClass("ddf")) {
    var imageTab = evt.data.definition.getContents('info');
    return imageTab.elements.splice(1, 0, {
      type: 'select',
      id: 'field',
      label: 'DDF',
      width: 'auto; display: block',
      items: window.ddFields && [[], ['Attendee Photo', 'viewer.photo_url']],
      setup: function setup(type, element) {
        return this.setValue(element.getAttribute("data-field"));
      },
      commit: function commit(type, element) {
        var value = this.getValue();

        if (value !== '') {
          return element.setAttribute('data-field', value);
        } else {
          return element.removeAttribute('data-field');
        }
      },
      onChange: function onChange() {
        var iconPath = this.getDialog().getParentEditor().plugins.ddf.path + 'icons/ddf.png';
        return this.getDialog().getContentElement('info', 'txtUrl').setValue(this.getValue() !== '' ? iconPath : '');
      }
    });
  }
});
CKEDITOR.dialog.add('ddfDialog', function (editor) {
  return {
    title: 'Dymanic Data Field',
    minWidth: 200,
    minHeight: 80,
    contents: [{
      id: 'tab-basic',
      label: 'Basic Settings',
      elements: [{
        type: 'select',
        id: 'field',
        width: 'auto; display: block',
        items: window.ddFields || [],
        validate: CKEDITOR.dialog.validate.notEmpty("Data field must be selected."),
        setup: function setup(element) {
          return this.setValue(element.getAttribute("data-field"));
        },
        commit: function commit(element) {
          var select = this.getInputElement().$;
          var label = select.options[select.selectedIndex].text;
          element.setText(label);
          return element.setAttribute("data-field", this.getValue());
        }
      }]
    }],
    onOk: function onOk() {
      this.commitContent(this.element);

      if (this.insertMode) {
        return editor.insertElement(this.element);
      }
    },
    onShow: function onShow() {
      var selection = editor.getSelection();
      this.element = selection.getStartElement();

      if (this.element) {
        this.element = this.element.getAscendant('x-ddf', true);
      }

      if (!this.element || this.element.getName() !== 'x-ddf') {
        this.element = editor.document.createElement('x-ddf');
        this.insertMode = true;
      } else {
        this.insertMode = false;
      }

      if (!this.insertMode) {
        return this.setupContent(this.element);
      }
    }
  };
});
