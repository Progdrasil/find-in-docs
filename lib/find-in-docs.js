'use babel';

import FindInDocsView from './find-in-docs-view';
import { CompositeDisposable } from 'atom';

export default {

  findInDocsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.findInDocsView = new FindInDocsView(state.findInDocsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.findInDocsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'find-in-docs:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.findInDocsView.destroy();
  },

  find() {
		let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()

    }
	}

};
