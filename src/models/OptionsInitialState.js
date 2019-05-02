import uuid from 'uuid'

const OptionInitialState = [
  {
    id: uuid(),
    name: 'usePreviewParam',
    label: 'Use size as param',
    value: true
  },
  {
    id: uuid(),
    name: 'useSizeAsParam',
    label: 'Use provider as param',
    value: true
  }
];

export default OptionInitialState;