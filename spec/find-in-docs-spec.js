'use babel';

import FindInDocs from '../lib/find-in-docs';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('FindInDocs', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('find-in-docs');
  });

  describe('when the find-in-docs:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.find-in-docs')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'find-in-docs:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.find-in-docs')).toExist();

        let findInDocsElement = workspaceElement.querySelector('.find-in-docs');
        expect(findInDocsElement).toExist();

        let findInDocsPanel = atom.workspace.panelForItem(findInDocsElement);
        expect(findInDocsPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'find-in-docs:toggle');
        expect(findInDocsPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.find-in-docs')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'find-in-docs:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let findInDocsElement = workspaceElement.querySelector('.find-in-docs');
        expect(findInDocsElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'find-in-docs:toggle');
        expect(findInDocsElement).not.toBeVisible();
      });
    });
  });
});
