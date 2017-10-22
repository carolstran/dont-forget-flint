# Don't Forget Flint
An online donation platform connecting Flint families with willing water donors. Check it out [here](https://dont-forget-flint.herokuapp.com/).

![main-page](https://user-images.githubusercontent.com/26869552/31865240-dda55bce-b76b-11e7-90e2-7da83eeec2bc.png)

**Frontend**: React <br>
**Backend**: Node.js, Express.js and PostgreSQL

This web app was built on June 19-23, 2017 as a final project for [SPICED Academy](https://www.spiced-academy.com/student-projects).

## How Don't Forget Flint Works
The goal is to personalize the donation process while avoiding prejudice. To accomplish this, here's what happens:

- Users can register as either a donor or a family.
- When a donation is submitted, a database query is triggered to gather a list of potential recipients and insert one into the donation at random.
- The match is then revealed to both sides.

## Other Key Aspects
- Utilizes Amazon's S3 for image hosting
- Hosted on [Heroku](https://dont-forget-flint.herokuapp.com/)
- Logo art by [Catherina](https://www.instagram.com/fragileperson/)
- Stock photos of users from [Pexels](https://www.pexels.com/)

## Wishlist
- [ ] Descriptive project footer
- [ ] More responsive design
- [ ] Prioritize families by need
