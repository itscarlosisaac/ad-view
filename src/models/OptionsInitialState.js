import uuid from 'uuid'

const OptionInitialState = {
  id: uuid(),
  usePreviewParam: {
      label: 'Use size as param',
      value: true
  },
  useSizeAsParam: {
    label: 'Use provider as param',
    value: true
  },
  showViewsHeader: {
    label: 'Show views header',
    value: true,
  }
}

export default OptionInitialState;