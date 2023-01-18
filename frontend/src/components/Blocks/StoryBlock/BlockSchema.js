export default () => ({
  title: 'Story telling block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'story', 'image'],
    },
  ],
  properties: {
    title: {
      title: 'Title of this block',
      type: 'string',
    },
    story: {
      title: 'Write your story',
      type: 'string',
    },
    image: {
      title: 'Background Image',
      widget: 'attachedimage',
    },
  },
  required: [],
});
