# Job Management App

A cross-platform mobile application built with NativeScript for managing jobs, tracking applications, and collaborating through comments.

## Features

- User authentication (login/registration)
- Job listing and management
- Detailed job view with company information
- Comment system for job discussions
- Add and edit jobs
- Real-time data persistence with Supabase
- Responsive mobile UI with Tailwind CSS

## Tech Stack

### Core Framework
- **NativeScript 8.8.0** - Cross-platform mobile framework for building native iOS and Android apps using TypeScript/JavaScript
- **TypeScript 5.4.0** - Type-safe development

### UI & Styling
- **NativeScript Theme 3.0.2** - Pre-built UI themes
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **@nativescript/tailwind 2.1.0** - Tailwind integration for NativeScript

### Backend & Database
- **Supabase** - Backend-as-a-Service for authentication and data persistence
- Real-time database capabilities
- Row Level Security (RLS) for data protection

### Build Tools
- **Webpack 5.0.0** - Module bundler
- **@nativescript/webpack 5.0.0** - NativeScript-specific webpack configuration

### Development Tools
- **@nativescript/preview-cli** - Live preview and testing
- **@nativescript/android 8.8.0** - Android platform support

## Project Structure

```
app/
├── pages/              # Application pages/screens
│   ├── login/         # Authentication page
│   ├── jobs-list/     # Main job listing page
│   ├── job-details/   # Individual job details
│   └── add-job/       # Add/edit job form
├── services/          # Business logic and data management
│   ├── auth-service.ts      # Authentication service
│   ├── job-store.ts         # Job data management
│   └── comment-store.ts     # Comment functionality
├── models/            # TypeScript interfaces and types
│   ├── job.ts        # Job data model
│   └── user.ts       # User data model
├── utils/            # Helper functions
│   └── date-formatter.ts
├── styles/           # Global styles
│   └── theme.css
├── app.ts            # Application entry point
└── app.css           # Global CSS

hooks/                # Build hooks
webpack.config.js     # Webpack configuration
tailwind.config.js    # Tailwind CSS configuration
tsconfig.json         # TypeScript configuration
```

## Architecture

The app follows the **MVVM (Model-View-ViewModel)** pattern:

- **Models**: Define data structures (Job, User)
- **Views**: XML-based UI declarations
- **ViewModels**: Handle business logic and data binding using NativeScript Observables

## Prerequisites

Before running this project, ensure you have:

- Node.js (v14 or higher)
- npm or yarn
- NativeScript CLI installed globally: `npm install -g @nativescript/cli`
- Android Studio (for Android development) or Xcode (for iOS development)
- Supabase account and project set up

## Environment Setup

1. Create a `.env` file in the project root with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Configure your Supabase database with the required tables and RLS policies (see Database Setup section below)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd job-management-app
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Android
```bash
npm run android
```

### iOS (macOS only)
```bash
npm run ios
```

### Preview Mode (for quick testing)
```bash
npm run preview
```

This will generate a QR code that you can scan with the NativeScript Preview app on your mobile device.

## Database Setup

The application requires the following Supabase tables:

### Users Table
- Managed by Supabase Auth
- Automatically created when using Supabase authentication

### Jobs Table
```sql
- id (uuid, primary key)
- title (text)
- company (text)
- location (text)
- description (text)
- status (text)
- salary (text)
- created_at (timestamp)
- user_id (uuid, foreign key to auth.users)
```

### Comments Table
```sql
- id (uuid, primary key)
- job_id (uuid, foreign key to jobs)
- user_id (uuid, foreign key to auth.users)
- content (text)
- created_at (timestamp)
```

Enable Row Level Security (RLS) on all tables to ensure data protection.

## Development

### Adding New Pages

1. Create a new folder in `app/pages/`
2. Add three files:
   - `page-name-page.xml` (UI markup)
   - `page-name-page.ts` (navigation and event handling)
   - `page-name-view-model.ts` (business logic)

### Modifying Styles

- Global styles: Edit `app/app.css` or `app/styles/theme.css`
- Tailwind utilities: Configure in `tailwind.config.js`
- Page-specific styles: Add inline in the XML files

### Building for Production

#### Android APK
```bash
ns build android --release --key-store-path <path-to-keystore> --key-store-password <password> --key-store-alias <alias> --key-store-alias-password <alias-password>
```

#### iOS IPA
```bash
ns build ios --release --for-device
```

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @nativescript/core | ~8.8.0 | Core NativeScript framework |
| @nativescript/theme | ~3.0.2 | UI theming |
| @nativescript/tailwind | ^2.1.0 | Tailwind CSS support |
| @nativescript/webpack | ~5.0.0 | Build tooling |
| tailwindcss | ~3.4.0 | Utility CSS framework |
| typescript | ~5.4.0 | Type safety |

## Troubleshooting

### Common Issues

**App won't build:**
- Clear the platforms folder: `rm -rf platforms/`
- Clean build: `ns clean`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**Preview not working:**
- Ensure you have the latest NativeScript Preview app installed
- Check your network connection
- Try restarting the preview server

**Supabase connection issues:**
- Verify your `.env` file has correct credentials
- Check Supabase project is active and not paused
- Ensure RLS policies allow the operations you're attempting

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check NativeScript documentation: https://docs.nativescript.org/
- Supabase documentation: https://supabase.com/docs
