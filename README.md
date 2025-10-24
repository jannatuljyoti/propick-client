# Propick

#Live Site :https://propick-code.web.app/
#user credentials:
email: fatiha@khatun.com , password: 123456qwQW

#Project Overview
Propick is a full-stack Product Recommendation platform where users can raise concerns about specific products and request better alternatives. Other users can recommend products, engage through comments, and explore trending alternatives in the community.

This system evaluates your skills in authentication, REST APIs, MongoDB, conditional rendering, JWT protection, dynamic UI layout, and responsive design — ensuring a smooth experience across all devices.

# Key Features

 Authentication
1. Email/Password login
2. Google Sign-In
3. Conditional rendering based on auth state
4. Protected Routes using JWT

 Query Management
1. Add/Edit/Delete your own product-related queries
2. View all queries with filtering and search by product name
3. Display query metadata: author, timestamp, brand, image, reason

 Recommendation System
1. Add recommendations for any query
2. See others' recommendations
3. Delete own recommendations
4. View all recommendations received for your own queries

 Dashboard Pages
1. **My Queries** (Private)
2. **My Recommendations** (Private)
3. **Recommendations For Me** (Private)
4. Grid layout toggling (1/2/3 columns)
5. Search functionality on queries

 UI/UX
1. Responsive Design (Mobile, Tablet, Desktop)
2. Dynamic Layout Switching
3.Eye-pleasing color palette & alignment
4. 404 Error Page with a return button
5. Beautiful Header, Footer with logo and social links


# Technologies Used
### Frontend:
1.React.js
2.React Router
3.Tailwind CSS
4.Firebase Authentication
5.Axios
6.React Firebase Hooks
7.Framer Motion (optional for animations)

### Backend:
1.Express.js
2.MongoDB
3.dotenv
4.CORS
5.JSON Web Token (JWT)

##R&D Documentation
Feature 1: User Badge System

##Feature Description:
Added a dynamic user badge based on the number of recommendations:
Newbie: fewer than 5,
Contributor: 5–9,
Expert: 10 or more

##Reason for Choosing:
Gamification is a proven UX strategy that increases engagement. By showing badges, users feel recognized and motivated to contribute more recommendations.


##Improvement to Project:
Encourages repeat contributions,
Improves user retention and participation,
Makes the platform more community-driven and interactive

##Feature 2: Share Option in Queries Page

##Feature Description:
Integrated a share button that lets users share interesting queries with others (e.g., via link copying or social media).

##Reason for Choosing:
Sharing features increase reach and traffic. Users can promote helpful posts, bringing more organic visitors and potential contributors.


##Improvement to Project:
Boosts visibility and user engagement,
Encourages content discovery,
Promotes collaboration among users

##Feature 3: Analytics Overview (Home Page)

##Feature Description:
Added an Analytics OverView showing:
Total Queries,
Total Recommendations,
Recommendations by Logged-in User
Visualized using Recharts.

##Reason for Choosing Recharts:
Lightweight and React-friendly chart library,
Easy to customize and integrate,
Provides visually clear insights

##Improvement to Project:
Helps users  understand community activity,
Builds transparency and data-driven insight,
Makes the UI more professional and informative.