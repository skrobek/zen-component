const getIndexFile = (componentName: string) => (
`import ${componentName} from './${componentName};

export default ${componentName};
`
);

export default getIndexFile;
