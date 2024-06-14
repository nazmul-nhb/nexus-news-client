# Nexus News

A Simple News Portal Website

## Live Link

- [Live Link](https://nexus-news-nhb.web.app)

## Admin Access

For admin access, use the following credentials:

- **Email**: `admin@nexus.com`
- **Password**: `Admin@Nexus42`

## For Fake Payment

<details>
<summary>Test Card Information</summary>

| Card Type                   | Card Number          | CVC          | Expiration Date  | ZIP Code      |
|-----------------------------|----------------------|--------------|------------------|---------------|
| Visa                        | 4242424242424242     | Any 3 digits | Any future date  | Any 5 digits  |
| Visa (debit)                | 4000056655665556     | Any 3 digits | Any future date  | Any 5 digits  |
| Mastercard                  | 5555555555554444     | Any 3 digits | Any future date  | Any 5 digits  |
| Mastercard (2-series)       | 2223003122003222     | Any 3 digits | Any future date  | Any 5 digits  |
| Mastercard (debit)          | 5200828282828210     | Any 3 digits | Any future date  | Any 5 digits  |
| Mastercard (prepaid)        | 5105105105105100     | Any 3 digits | Any future date  | Any 5 digits  |
| American Express            | 378282246310005      | Any 4 digits | Any future date  | Any 5 digits  |
| American Express            | 371449635398431      | Any 4 digits | Any future date  | Any 5 digits  |
| Discover                    | 6011111111111117     | Any 3 digits | Any future date  | Any 5 digits  |
| Discover                    | 6011000990139424     | Any 3 digits | Any future date  | Any 5 digits  |
| Discover (debit)            | 6011981111111113     | Any 3 digits | Any future date  | Any 5 digits  |
| Diners Club                 | 3056930009020004     | Any 3 digits | Any future date  | Any 5 digits  |
| Diners Club (14-digit card) | 36227206271667       | Any 3 digits | Any future date  | Any 5 digits  |
| BCcard and DinaCard         | 6555900000604105     | Any 3 digits | Any future date  | Any 5 digits  |
| JCB                         | 3566002020360505     | Any 3 digits | Any future date  | Any 5 digits  |
| UnionPay                    | 6200000000000005     | Any 3 digits | Any future date  | Any 5 digits  |
| UnionPay (debit)            | 6200000000000047     | Any 3 digits | Any future date  | Any 5 digits  |
| UnionPay (19-digit card)    | 6205500000000000004  | Any 3 digits | Any future date  | Any 5 digits  |

</details>

## NPM Utility Packages Used in this Project

- [tanstack-table](https://tanstack.com/table/latest) for showing interactive tables
- [tanstack-query](https://tanstack.com/query/latest) for managing states while fetching data (get)
- [axios](https://axios-http.com/docs/intro) for fetching data (CRUD)
- [react-photo-view](https://www.npmjs.com/package/react-photo-view) to view photos in full size
- [react-hook-form](https://react-hook-form.com/) for handling forms
- [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter) for typewriter animation
- [swiper](https://swiperjs.com/) for slider on the homepage banner
- [animate.css](https://animate.style/) for animation effects
- [react-tooltip](https://react-tooltip.com/) for showing tooltips
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async) for dynamic page titles
- [react-icons](https://react-icons.github.io/react-icons/) for displaying icons throughout the site
- [react-hot-toast](https://react-hot-toast.com/) for showing toast notifications
- [sweetalert2](https://sweetalert2.github.io/) for showing sweet alerts
- [momentjs](https://momentjs.com/) for handling time and date formats
- [keen-slider](https://keen-slider.io/) for creating publisher carousel
- [leaflet](https://leafletjs.com/) for interactive maps
- [react-chartjs-2](https://react-chartjs-2.js.org/) for charts and data visualization
- [react-countup](https://www.npmjs.com/package/react-countup) for number animations
- [react-fast-marquee](https://www.npmjs.com/package/react-fast-marquee) for scrolling latest headlines on top of navbar
- [react-google-charts](https://react-google-charts.com/) for displaying stats in admin dashboard
- [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer) for observing visibility of elements
- [react-select](https://react-select.com/home) for customizable select input fields

## Notable Features & Description of the Project

### Homepage

- **Trending News Slider**: Features a slider with trending news in the hero section. Clicking on the title redirects to the details page.
- **Latest Articles**: Displays four recent articles. Users can read the full article by clicking the area.
- **All Publishers**: Showcases all publishers whose articles are displayed on the site with a rotating carousel.
- **User Statistics**: Displays user stats with increasing number styles and charts to visualize the data.
- **Premium Plans**: Shows all the premium plans. Clicking the button navigates to the subscription page.
- **Commitment to the Environment**: Highlights the site's support for the green movement.

### All Articles Page

- Displays all approved articles.
- Users can filter articles by publishers or tags or search for specific article titles.
- Articles can be sorted by the latest or oldest.
- Free users cannot access the detailed view of articles.

### Subscription & Payment Pages

- Displays premium plans.
- Users can select a plan and proceed to the payment page.
- If already subscribed, a popup shows the plan details.

### Article Details Page

- Shows detailed information about the article and related articles from the same tags.

### User Profile Page

- Users can update their profile.
- Displays the last login time and current plan details.

### Add Article Page

- Allows users to add/post articles. Free users can post only one article.
- Users can upload images with their articles.

### My Articles Page

- Displays all articles posted by the current user.
- Users can update or delete their articles.

### Premium Articles Page

- Displays all premium articles.
- Only premium users can access detailed views of the articles.

### Dashboard

- **Admin Home**: Shows site statistics in pie charts, column graphs, and line charts.
- **All Users Page**: Displays all users with basic info. Admins can promote users to admin status.
- **All Articles Page**: Displays all posted articles. Admins can approve, decline, delete, or make articles premium.
- **Add Publisher Page**: Allows admins to add and manage publishers.

### About

- Displays the address of the newspaper with a map by OpenStreetMap.

### Register Page

- Users must fill in all fields to create a new account. Passwords must be at least 6 characters long and include an uppercase letter, a number, and a symbol.
- Error messages are shown below input fields and as toast notifications for invalid inputs.
- Successful registration redirects users to the login page.

### Login Page

- Users can log in using email/password or Google/Facebook accounts.
- Includes a link to the register page for new accounts.
- Successful login triggers a toast notification. Errors are displayed as toast messages.

### Navbar & Others

- **Navbar**: Includes a theme toggler icon to switch between dark and light modes. Clicking the profile picture opens a menu with profile links and a logout button.
- **Scroll Buttons**: Allows users to scroll to the top or bottom of pages.
- **Headline Scroller**: On top of Navbar displays the latest headlines scrolling from right to left.
- **Live Clock**: Shows a live clock on the right corner of the website.
- **404 Error Page**: Displays when an invalid URL is accessed.

## Technologies Used in this Project

- ReactJS
- JavaScript
- TailwindCSS
- Express.js (Server Side)
- MongoDB (Server Side)
