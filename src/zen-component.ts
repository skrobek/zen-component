import * as path from 'path';
import * as fs from 'fs';

import { InputBoxOptions, QuickPickOptions } from 'vscode';
import { IDisposable } from './disposable.interface';
import { ComponentExistError } from './errors/component-exist.error';
import { VSCodeWindow } from './vscode.interfaces';
import getFileContent, { ZenFileType } from './utils/file-content';

export enum ComponentType {
  Class = 'class',
  Stateless = 'stateless',
}

export interface TypeSelection {
  label: string;
  target: ComponentType;
  description?: string;
}

export class ZenComponent implements IDisposable {
  private readonly defaultPath = 'frontend';
  private readonly files = [
    { filename: 'index', extenstion: 'ts', type: ZenFileType.index },
    { extenstion: 'tsx', type: ZenFileType.component },
    { extenstion: 'spec.tsx', type: ZenFileType.spec },
    { extenstion: 'stories.tsx', type: ZenFileType.story },
  ];

  private readonly componentTypes = [
    { label: 'Stateless Component', target: ComponentType.Stateless },
    { label: 'Class Component', target: ComponentType.Class },
  ];

  constructor(private workspaceRoot: string, private window: VSCodeWindow) {
    // add me
  }

  public async execute(): Promise<void> {
    const componentType: TypeSelection = await this.promptType();
    const componentName: string | undefined = await this.prompt();

    if (!componentName || !componentType) {
      return;
    }

    const absolutePath: string = this.toAbsolutePath(componentName);

    try {
      this.create(absolutePath, componentName, componentType.target);

      this.window.showInformationMessage(`${componentType.label}: '${componentName}' successfully created`);
    } catch (err) {
      // log?
      if (err instanceof ComponentExistError) {
        this.window.showErrorMessage(`Duck: '${componentName}' already exists`);
      } else {
        this.window.showErrorMessage(`Error: ${err.message}`);
      }
    }
  }

  public async promptType(): Promise<TypeSelection> {
    const options: QuickPickOptions = {
      placeHolder: 'Select React component type',
    };

    return this.window.showQuickPick(this.componentTypes, options);
  }

  public async prompt(): Promise<string | undefined> {
    // this can be abstracted out as an argument for prompt
    const options: InputBoxOptions = {
      ignoreFocusOut: true,
      prompt: "'ExampleComponent' or a relative path: 'Components/ExampleComponent'",
      placeHolder: 'zen-component',
      validateInput: this.validate,
    };

    return this.window.showInputBox(options);
  }

  public create(absolutePath: string, componentName: string, componentType: ComponentType) {
    if (fs.existsSync(absolutePath)) {
      const name: string = path.basename(absolutePath);

      throw new ComponentExistError(`'${name}' already exists`);
    }

    try {
      // create the directory
      fs.mkdirSync(absolutePath);

      // create index.js
      this.files.forEach((opt) => {
        const params = {
          ...opt,
          componentType,
        };

        this.createFile(absolutePath, componentName, params);
      });
    } catch (err) {
      // log other than console?
      console.log('Error', err.message);

      throw err;
    }
  }

  public createFile(absolutePath: string, componentName: string, params: any): void {
    const parts: string[] = componentName.split('/');
    const className = parts[parts.length - 1];
    let filename: string = className;

    if (params.filename) {
      filename = params.filename;
    }

    filename += `.${params.extenstion}`;

    const fullpath = path.join(absolutePath, filename);

    fs.writeFileSync(fullpath, getFileContent(params.type, className, params.componentType));
  }

  public validate(name: string): string | null {
    if (!name) {
      return 'Name is required';
    }

    if (name.includes(' ')) {
      return 'Spaces are not allowed';
    }

    // no errors
    return null;
  }

  public toAbsolutePath(nameOrRelativePath: string): string {
    // simple test for slashes in string
    // if (/\/|\\/.test(nameOrRelativePath)) {
    //   return path.resolve(this.workspaceRoot, nameOrRelativePath);
    // }

    return path.resolve(this.workspaceRoot, this.defaultPath, nameOrRelativePath);
  }

  public dispose(): void {
    console.log('disposing...');
  }
}
