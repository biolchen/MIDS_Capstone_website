$('#open-popup').magnificPopup({
    items: [
      {
        src: 'static/slides/Post Processing.png',
        title: 'Peter & Paul fortress in SPB'
      },
      {
        src: 'https://vimeo.com/123123',
        type: 'iframe' // this overrides default type
      },
      {
        src: $('<div class="white-popup">Dynamically created element</div>'), // Dynamically created element
        type: 'inline'
      },
      {
        src: '<div class="white-popup">Popup from HTML string</div>', // HTML string
        type: 'inline'
      },
      {
        src: '#my-popup', // CSS selector of an element on page that should be used as a popup
        type: 'inline'
      }
    ],
    gallery: {
      enabled: true
    },
    type: 'image' // this is a default type
});