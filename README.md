# Project-Services

Domain microservices for the ECA retail POS system. This repository serves as the parent module containing the business domain services that handle user identity, product catalog, and order management.

## About

Project-Services is a multi-module repository that aggregates the domain-specific Spring Boot microservices for the ECA (Enterprise Cloud Application) retail Point of Sale system. It uses Git submodules to manage the individual service repositories, allowing independent versioning and deployment while maintaining a cohesive project structure.

This domain layer includes:
- **IAM Service**: Identity and Access Management - user authentication and authorization
- **Product Service**: Product Catalog - inventory, pricing, and product management
- **Order Service**: Order Management - order processing, payments, and analytics

## Student Information

| Detail | Value |
|---|---|
| **Name** | Shashi Madushan |
| **Student Number** | 2301691002 |
| **Course** | Enterprise Computing Architecture |
| **Institution** | Institute of Software Engineering (IJSE) |

## Repository Structure

```
Project-Services/
├── .gitmodules              # Submodule configuration
├── pom.xml                  # Parent Maven POM
├── ecosystem.config.js      # PM2 process orchestration config
├── iam-service/             # Git submodule - IAM Service
├── product-service/         # Git submodule - Product Service
└── order-service/           # Git submodule - Order Service
```

## Git Submodules

This repository uses Git submodules to include the domain service repositories:

| Submodule | Path | Repository URL |
|-----------|------|----------------|
| iam-service | `iam-service/` | https://github.com/Shashi-Madushan/iam-service.git |
| product-service | `product-service/` | https://github.com/Shashi-Madushan/product-service.git |
| order-service | `order-service/` | https://github.com/Shashi-Madushan/order-service.git |

### Cloning This Repository

**Clone with all submodules:**
```bash
git clone --recurse-submodules https://github.com/Shashi-Madushan/Project-Services.git
```

**Clone without submodules (then initialize separately):**
```bash
git clone https://github.com/Shashi-Madushan/Project-Services.git
cd Project-Services
git submodule update --init --recursive
```

### Submodule Commands

**Initialize submodules after cloning:**
```bash
git submodule update --init --recursive
```

**Update all submodules to latest commits:**
```bash
git submodule update --remote
```

**Pull changes for all submodules:**
```bash
git pull --recurse-submodules
```

**Add new submodule:**
```bash
git submodule add <repository-url> <path>
```

## Tech Stack

| Technology | Details |
|---|---|
| Java | 25 |
| Spring Boot | 4.0.3 |
| Spring Cloud | 2025.1.0 |
| Spring Data JPA | Database operations (IAM, Order) |
| Spring Data MongoDB | Database operations (Product) |
| MySQL | Primary database (IAM, Order) |
| MongoDB | Document database (Product) |
| MapStruct | 1.6.3 - Object mapping |
| Netflix Eureka Client | Service registration |
| Spring Cloud Config Client | External configuration |
| PM2 | Process orchestration |

## Getting Started

### Prerequisites

- Java 25 or higher
- Maven 3.8+
- MySQL 8.0+ (for IAM and Order services)
- MongoDB 5.0+ (for Product service)
- Running [Project-Platform](https://github.com/Shashi-Madushan/Project-Platform) services

### Prerequisites - Platform Services

Domain services depend on platform infrastructure. Ensure these are running first:

1. **Config-Server** (port 9000)
2. **Service-Registry** (port 9001)
3. **API-Gateway** (port 7000)

### Startup Order

After platform services are running, start domain services in any order:

- **IAM-Service** - Dynamic port (registered with Eureka)
- **Product-Service** - Dynamic port (registered with Eureka)
- **Order-Service** - Dynamic port (registered with Eureka)

### Running with Maven

```bash
# Start IAM Service
cd iam-service
./mvnw spring-boot:run

# Start Product Service (in new terminal)
cd product-service
./mvnw spring-boot:run

# Start Order Service (in new terminal)
cd order-service
./mvnw spring-boot:run
```

### Running with PM2

```bash
# Start all domain services
pm2 start ecosystem.config.js

# View logs
pm2 logs

# Stop all
pm2 stop all
```

## Service Details

| Service | Database | Port | Description |
|---|---|---|---|
| IAM Service | MySQL | Dynamic | User management, authentication |
| Product Service | MongoDB | Dynamic | Product catalog, inventory |
| Order Service | MySQL | Dynamic | Order processing, analytics |

## API Gateway Routes

All requests go through the API Gateway at `http://localhost:7000`:

| Route | Path | Target Service |
|---|---|---|
| Users API | `/api/v1/users/**` | IAM Service |
| Products API | `/api/v1/products/**` | Product Service |
| Orders API | `/api/v1/orders/**` | Order Service |

## Troubleshoot

| Issue | Solution |
|---|---|
| Submodule shows as empty | Run `git submodule update --init --recursive` |
| Service fails to start | Verify Config-Server and Service-Registry are running |
| Database connection error | Check MySQL/MongoDB is running and credentials are correct |
| Service not registering | Ensure Service-Registry is accessible and Eureka config is correct |
| 404 errors from Gateway | Verify service name matches the registered Eureka service ID |
| Submodule commit not appearing | Run `git submodule update --remote` in parent repo |
| Build fails with missing dependency | Run `mvn clean install` in submodule directory |
| Config fetch timeout | Verify Config-Server URL is accessible from service |

## Related Projects

- [Project-Platform](https://github.com/Shashi-Madushan/Project-Platform) - Platform infrastructure (Config, Registry, Gateway)

## Architecture Overview

```
┌─────────────────┐
│   API Gateway   │ http://localhost:7000
│   (Port 7000)   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌───▼────┐ ┌───────┐
│  IAM  │ │Product │ │ Order │
│Service│ │Service │ │Service│
└───┬───┘ └───┬────┘ └───┬───┘
    │         │          │
┌───▼───┐ ┌───▼────┐ ┌──▼────┐
│ MySQL │ │MongoDB │ │ MySQL │
└───────┘ └────────┘ └───────┘
```

## License

This project is part of an academic assignment for the Enterprise Computing Architecture course at IJSE.
