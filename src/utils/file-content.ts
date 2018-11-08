import { ComponentType } from '../zen-component';
import getComponentFile from './filetypes/component';
import getIndexFile from './filetypes/index';
import getStorybookFile from './filetypes/stories';
import getSpecFile from './filetypes/spec';

export enum ZenFileType {
  index = 'index',
  component = 'component',
  story = 'story',
  spec = 'spec',
}

const getFileContent = (type: ZenFileType, componentName: string, componentType: ComponentType) => {
  switch (type) {
    case ZenFileType.index:
      return getIndexFile(componentName);
    case ZenFileType.component:
      return getComponentFile(componentName, componentType);
    case ZenFileType.story:
      return getStorybookFile(componentName);
    case ZenFileType.spec:
      return getSpecFile(componentName);
    default:
      return '';
  }
};


export default getFileContent;
