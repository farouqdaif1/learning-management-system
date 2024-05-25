# Learning Management System

Welcome to our Learning Management System (LMS) platform. This project leverages cutting-edge technology to deliver a robust and user-friendly experience for both students and teachers.

## Key Technologies

- **Next.js 13** with the App Router
- **Prisma** as an ORM
- **PayMob** for payments
- **UploadThing** for file uploads
- **Mux** for video processing and HLS video playback
- **Clerk** for authentication
- **Planetscale** for MySQL database

## Key Features

- **Browse & Filter Courses**: Easily browse and filter through available courses to find what suits you best.
- **Purchase Courses using Stripe**: Securely purchase courses using the Stripe payment gateway.
- **Mark Chapters as Completed or Uncompleted**: Track your learning progress by marking chapters as completed or uncompleted.
- **Progress Calculation of each Course**: Automatically calculate and display your progress for each course.
- **Student Dashboard**: A personalized dashboard for students to manage their courses and track their progress.
- **Teacher Mode**: Special features and tools for teachers to create and manage courses and chapters.
- **Create New Courses**: Teachers can create new courses with ease.
- **Create New Chapters**: Add new chapters to existing courses, complete with rich text descriptions.
- **Easily Reorder Chapter Position with Drag n’ Drop**: Intuitive drag and drop functionality to reorder chapters.
- **Upload Thumbnails, Attachments, and Videos**: Use UploadThing to upload various media files for your courses.
- **Video Processing using Mux**: Efficient video processing to ensure smooth playback.
- **HLS Video Player using Mux**: Stream videos using the HLS video player.
- **Rich Text Editor for Chapter Description**: Create detailed and formatted chapter descriptions with a rich text editor.
- **Authentication using Clerk**: Secure and seamless user authentication.

## Installation

To get started with the development environment, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/farouqdaif1/learning-management-system.git
    cd lms
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Run database migrations**:
    ```sh
    npx prisma migrate dev
    ```

5. **Start the development server**:
    ```sh
    npm run dev
    ```

## Usage

### Student

- **Browse Courses**: Navigate to the courses section to browse available courses.
- **Enroll in a Course**: Select a course and complete the purchase using Stripe.
- **Track Progress**: Use the dashboard to view your enrolled courses and track your progress.

### Teacher

- **Create Courses**: Access the teacher mode to create new courses.
- **Manage Chapters**: Add, edit, or reorder chapters using the intuitive drag and drop interface.
- **Upload Media**: Upload course materials such as thumbnails, attachments, and videos.

## Contributing

We welcome contributions from the community. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m "Add your feature"
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any questions or suggestions, please open an issue or contact us at daiffarouq@gmail.com.
