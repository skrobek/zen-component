const getSpecFile = (componentName: string) => (
`import * as React from 'react';
import { render } from 'react-testing-library';

import ${componentName} from './${componentName}';

// jest.mock('./Mocked', () => {
//   return { default: jest.fn(() => null) };
// });

describe('${componentName}', async () => {
  const props = {};
  const { container } = render(<${componentName} {...props} />);

  it('first test', async () => {
    expect(container).toHaveTextContent('');
  });
});
`
);

export default getSpecFile;
