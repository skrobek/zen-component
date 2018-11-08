import { ComponentType } from './../../zen-component';

const getClassComponent = (componentName: string) => (
`
interface ${componentName}Props {

};

class ${componentName} extends React.Component<${componentName}Props> {

  public render() {
    return (

    );
  }
}
`
);


const getStatelessComponent = (componentName: string) => (
`interface ${componentName}Props {

}

const ${componentName} = (props: ${componentName}Props) => (

);
`
);


const getComponentFile = (componentName: string, componentType: ComponentType) => {
  return `import * as React from 'react';

${componentType === ComponentType.Class ? getClassComponent(componentName) : ''}
${componentType === ComponentType.Stateless ? getStatelessComponent(componentName) : ''}
export default ${componentName};
`;
};

export default getComponentFile;
