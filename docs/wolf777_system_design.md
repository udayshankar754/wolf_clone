# Wolf777 Clone: System Architecture Design

## Implementation approach

Based on the PRD requirements, we will implement a modern, scalable, and high-performance betting platform using Angular 19 for the frontend and Node.js/Express for the backend. The system architecture is designed to address key technical challenges while meeting the specified performance metrics.

### Key Technical Challenges

1. **Real-time Odds and Live Betting**: Implementing low-latency updates for odds changes and live events using WebSockets
2. **High Concurrent User Load**: Supporting 1000+ concurrent users with responsive performance through horizontal scaling
3. **Data Security and Compliance**: Ensuring secure handling of financial transactions and personal data
4. **Responsive Performance**: Achieving < 200ms API response time and < 3.5s time-to-interactive across devices
5. **Scalable Architecture**: Building components that can scale horizontally with increasing user base

### Selected Frameworks and Libraries

#### Frontend
- **Angular 19**: Core framework for component-based UI development
- **NgRx**: State management for complex application state
- **Ant Design for Angular**: Comprehensive UI component library
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **SCSS**: For custom styling and theming
- **Angular PWA**: For progressive web app features
- **RxJS**: For reactive programming and handling async operations
- **Socket.IO Client**: For real-time communication

#### Backend
- **Node.js**: JavaScript runtime for the server
- **Express.js**: Web framework for API development
- **MySQL**: Primary relational database
- **Redis**: For caching, session management, and pub/sub operations
- **Sequelize**: ORM for MySQL database interactions
- **JSON Web Token (JWT)**: For secure authentication
- **Socket.IO**: For real-time bidirectional communication
- **Helmet.js**: For securing HTTP headers
- **Express Validator**: For request validation
- **Winston**: For structured logging
- **Cloudinary SDK**: For media asset management

## Frontend Architecture

The frontend will follow a modular architecture organized by feature modules with clear separation of concerns:

### Component Structure

```
src/
├── app/
│   ├── core/                    # Core module (singleton services, interceptors)
│   │   ├── auth/                 # Authentication services
│   │   ├── http/                 # HTTP interceptors
│   │   ├── guards/               # Route guards
│   │   └── services/             # Core services
│   ├── shared/                   # Shared module (common components, pipes, directives)
│   │   ├── components/           # Reusable components
│   │   ├── directives/           # Custom directives
│   │   ├── pipes/                # Custom pipes
│   │   └── models/               # Shared data models/interfaces
│   ├── layout/                   # Layout components
│   │   ├── header/               # Header component
│   │   ├── footer/               # Footer component
│   │   ├── sidebar/              # Sidebar component
│   │   └── main/                 # Main content layout
│   ├── features/                 # Feature modules
│   │   ├── home/                 # Home page module
│   │   ├── auth/                 # Authentication module
│   │   ├── sports/               # Sports betting module
│   │   ├── casino/               # Casino module
│   │   ├── wallet/               # Wallet management module
│   │   ├── profile/              # User profile module
│   │   └── promotions/           # Promotions module
│   ├── bet-slip/                 # Bet slip module (shared across app)
│   ├── store/                    # NgRx store setup
│   └── app.module.ts             # Main application module
```

### State Management

NgRx store will be organized into the following feature slices:

- **Auth State**: User authentication status, JWT tokens, login/registration
- **User State**: User profile, preferences, KYC status
- **Sports State**: Available sports, leagues, events, markets
- **Bet Slip State**: Current selections, potential winnings, bet submissions
- **Wallet State**: Balance, transaction history, deposit/withdrawal methods
- **Live Betting State**: Live event data, dynamic odds updates
- **Casino State**: Game categories, recent/favorites, game sessions
- **Promotions State**: Available and claimed promotions, loyalty status

### Responsive Design Implementation

Responsive design will follow the PRD-specified breakpoints:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop Small: 1024px - 1439px
- Desktop Large: 1440px and above

Implementation strategies include:
- Tailwind CSS utility classes for responsive behaviors
- Component-specific responsive adaptations (e.g., collapsible navigation)
- Device-specific optimizations (touch targets on mobile, keyboard shortcuts on desktop)
- Conditional rendering based on viewport size

### Performance Optimization

- Route-level code splitting with lazy loading
- OnPush change detection strategy
- Virtual scrolling for long lists (event listings, transaction history)
- Image optimization with responsive loading strategies
- Service workers for asset caching
- Web workers for CPU-intensive tasks

## Backend Architecture

### API Layer Architecture

The backend uses a layered architecture pattern to separate concerns:

```
src/
├── server.js                   # Application entry point
├── config/                     # Configuration files
├── api/                        # API routes and controllers
│   ├── routes/                 # Route definitions
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Custom middleware
│   ├── validators/             # Request validators
│   └── services/               # Business logic services
├── models/                     # Database models
├── utils/                      # Utility functions
├── services/                   # External service integrations
└── realtime/                   # Real-time WebSocket services
```

### Key API Endpoints

The backend will implement all endpoints specified in the PRD, organized by feature area:

1. **Authentication API** - User registration, login, token management
2. **User Management API** - Profile, documents, preferences
3. **Sports and Events API** - Sports categories, leagues, events
4. **Betting API** - Odds retrieval, bet placement, cashout
5. **Casino API** - Game listings, categories, game launch
6. **Wallet API** - Balance, deposits, withdrawals, transactions
7. **Promotions API** - Available promotions, claiming bonuses, loyalty

### Real-time Communication

Socket.IO will power real-time features through dedicated channels:

1. **Odds Updates**: Dynamic odds changes pushed to subscribed clients
2. **Live Event Updates**: Match status, scores, and key event notifications
3. **Bet Status Updates**: Settlement notifications and cashout availability
4. **Balance Updates**: Real-time wallet balance changes after transactions
5. **Personalized Notifications**: Custom alerts for users

### API Response Structure

All API responses will follow a consistent structure:

```json
{
  "success": true,
  "data": {},
  "message": "",
  "timestamp": "2025-06-27T12:30:45.000Z"
}
```

Error responses will include:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  },
  "timestamp": "2025-06-27T12:30:45.000Z"
}
```

## Redis Caching Strategy

Redis will be leveraged for several performance-critical functions:

### Session Management

- **JWT Token Storage**: Storing refresh tokens with appropriate TTL
- **Session Tracking**: User session data to support multi-device logins
- **Session Invalidation**: Quick blacklisting of sessions during logout

### Data Caching

- **Sports Structure**: Caching the hierarchical sports/leagues/events data
- **Popular Events**: Caching details of frequently accessed events
- **User Profile**: Caching frequently accessed user data
- **Casino Game Listings**: Caching game catalogs and categories

### Rate Limiting

- **API Rate Limiting**: Tracking request rates per user/IP
- **Login Attempt Tracking**: Preventing brute force attacks
- **Sensitive Action Limiting**: Extra protection for financial operations

### Real-time Features

- **Pub/Sub for Odds Updates**: Broadcasting odds changes to subscribed clients
- **Live Event Data**: Publishing match events and statistics
- **Leaderboards**: Maintaining real-time leaderboards for tournaments

### Cache Invalidation Strategy

- **Time-based Expiration**: Setting appropriate TTL for different data types
- **Event-based Invalidation**: Clearing specific caches when underlying data changes
- **Versioned Cache Keys**: Including data version in cache keys for atomic updates

## Cloudinary Integration

Cloudinary will be used for efficient media asset management:

### User Document Storage

- **KYC Documents**: Secure storage of identity and address verification documents
- **Profile Pictures**: User avatars with automatic transformations
- **Private Folder Structure**: Organization by user ID with appropriate access controls

### Media Asset Management

- **Game Thumbnails**: Optimized game images for different device sizes
- **Promotion Banners**: Responsive banner images for marketing materials
- **Sports/League Logos**: Team and competition imagery

### Image Transformations

- **Responsive Images**: Automatic resizing based on device requirements
- **Format Optimization**: WebP delivery for supporting browsers
- **Quality Optimization**: Balancing quality and file size for fast loading

### Implementation Strategy

- **Backend Integration**: Using Cloudinary SDK for secure uploads
- **Upload Presets**: Defining transformation presets for different asset types
- **Signed Uploads**: Securing direct frontend uploads with signed URLs
- **CDN Delivery**: Leveraging Cloudinary's global CDN for fast delivery

## Security Architecture

### Authentication & Authorization

- **JWT-based Authentication**: Short-lived access tokens with refresh token rotation
- **Role-based Access Control**: Admin and user role distinctions
- **Permission Granularity**: Fine-grained permissions for different operations
- **Multi-factor Authentication**: OTP verification for sensitive operations

### Data Protection

- **Data Encryption**: Sensitive data encrypted at rest
- **TLS 1.3**: Secure data transmission with strong cipher suites
- **PII Protection**: Proper handling of personally identifiable information
- **Payment Data Security**: No storage of complete card details

### API Security

- **Input Validation**: Comprehensive request payload validation
- **Rate Limiting**: Protection against abuse and DDoS attacks
- **CORS Policies**: Strict origin restrictions
- **Security Headers**: Using Helmet.js to set secure HTTP headers

### Fraud Prevention

- **Device Fingerprinting**: Tracking suspicious login patterns
- **Transaction Monitoring**: Flagging unusual betting or deposit behaviors
- **IP Reputation Check**: Blocking known malicious IPs
- **Behavioral Analysis**: Detecting irregular user activities

## Deployment Architecture

### Docker Configuration

All components will be containerized for consistent development and deployment:

```yaml
# docker-compose.yml (development)
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "4200:4200"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: poiuytrewq
      MYSQL_DATABASE: staff_management
    volumes:
      - mysql-data:/var/lib/mysql

  redis:
    image: redis:6.2-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  mysql-data:
  redis-data:
```

### Scaling Strategy

- **Horizontal Scaling**: Adding more backend instances behind load balancer
- **Database Scaling**: Read replicas for query-heavy operations
- **Redis Cluster**: For distributed caching at scale
- **Microservices Evolution**: Path to decompose monolith as needed

### CI/CD Pipeline

GitHub Actions workflow for continuous integration and deployment:

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: docker-compose build
      - name: Save Docker images
        run: docker save -o images.tar frontend:latest backend:latest
      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: docker-images
          path: images.tar

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: docker-images
      - name: Load Docker images
        run: docker load -i images.tar
      - name: Deploy to production
        run: |
          # Deployment commands
          echo "Deploying to production"
```

### Environment Configuration

Using .env files for environment-specific configuration:

```env
# .env.example

# Server Configuration
NODE_ENV=development
PORT=3000
API_BASE_URL=/api

# Redis Config
REDIS_URL=redis://redis:6379/

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=do8vkz3mn
CLOUDINARY_API_KEY=165181326316722
CLOUDINARY_API_SECRET=sFh6SpEOj6r8CobM_eKhWaVIdpM

# MySQL Config
DATABASE_HOST=mysql
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_NAME=staff_management
DATABASE_PASSWORD=poiuytrewq

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Security
CORS_ORIGIN=http://localhost:4200
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

## Anything UNCLEAR

1. **External Data Sources**: The PRD doesn't specify which third-party data providers will be used for sports events, odds, and live data feeds. This decision significantly impacts the implementation of the Sports API.

2. **Payment Gateway Integration**: Specific payment gateway providers for the Indian market need to be identified and evaluated for integration with the wallet system.

3. **Game Provider Integration**: For the casino module, we need details on which game providers will be integrated and their specific API requirements.

4. **Regulatory Compliance**: Specific regulatory requirements for the Indian betting market need further clarification to ensure the platform is fully compliant with local laws.

5. **Analytics Requirements**: The PRD does not provide detailed requirements for analytics and reporting functionality, which would be important for both users and administrators.