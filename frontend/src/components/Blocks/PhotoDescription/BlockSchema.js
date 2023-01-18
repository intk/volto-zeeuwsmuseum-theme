export default () => ({
  title: 'Description to the photo',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['photoName', 'photographer'],
    },
  ],
  properties: {
    photoName: {
      title: 'photoName',
      type: 'string',
    },
    photographer: {
      title: 'photographer',
      type: 'string',
    },
  },
  required: [],
});
