// creating an interface for the VS Code Extension window namespace so that
// intellisense can be used when the namespace is passed in as an argument
// in the contructor of the duck-generator. this makes it easier to mock
// the window in the duck-generator test

import { InputBoxOptions, QuickPickOptions } from "vscode";
import { TypeSelection } from './zen-component';

export interface VSCodeWindow {
  showErrorMessage(message: string): Thenable<string>;
  showInformationMessage(message: string): Thenable<string>;
  showInputBox(options?: InputBoxOptions): Thenable<string | undefined>;
  showQuickPick(items: TypeSelection[], options: QuickPickOptions): Thenable<TypeSelection>;
}