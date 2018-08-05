### Problem:

- We always do not know when mail letters come to our house.
- We can miss any important mails if we forget to check mailbox frequently

###	Persona:

- We are solving this problem for many people that want to keep track of their important letters.
- Typical user persona for this problem are:
  - people living in shared house
  - people living in big apartment ( we provide mailbox system for them)

### Our product:

- Our product is smart mailbox including:
  - Hardware: mailbox with camera installed (we assume that we have ideal hardware)
  - Software: website that processes every image uploaded by cameras or anyone (We use React, Express, Socket.io and Mongodb to build website,

We also use Computer Vision to process images uploaded)

### How it works:

- When letter is delivered in the mailbox, camera will take a photo to get information of receiver and upload it to the website
- After receiving images from camera, backend will send request to Google Vision API to have Text Detection in response
- Then, our backend processes the response to send notifications to user in frontend.

### Third-party materials and APIs:

- React
- Express
- Socket.io
- Mongodb
- Google Cloud Vision
- One Signal

[Our online prototype](https://aqueous-gorge-93987.herokuapp.com/household-mails)

[GitHub repo](https://github.com/ducthienbui97/UniHackSyd2018)