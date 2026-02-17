# Changelog (Frontend)

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-17

### Added
- **Initial Setup:** Scaffolded the project using **Vite + React** with **Tailwind CSS** for a high-performance build and utility-first styling.
- **Landing Page:** Developed a modern, responsive landing page for the PinRu platform.
- **Dashboards:** Created dedicated dashboards for both **User** and **Admin** roles.
- **Management Modules:** Implemented management views for **Master Rooms** and **Customer/User** lists.
- **Booking Workflow:** Integrated full booking lifecycle management including Status Badges for:
  - `Pending`
  - `Approved`
  - `Rejected`

### Improved
- **Authentication Flow:** Implemented a more robust and secure authentication logic for both User and Admin sessions.
- **Enhanced UI/UX:** Refined the overall interface for better visual hierarchy and user navigation across mobile and desktop.
- **Advanced Filtering:** Added search and filter capabilities to sort through data by **Name**, **Date**, and **Location/Room Name**.

### Notes
- **Admin Test Credentials:**
  - **Username:** `admin`
  - **Password:** `123`
- Ensure the API base URL in your `.env` file points to the updated 2026-PinRu-backend server.