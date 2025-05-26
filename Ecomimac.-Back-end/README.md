-- Cấu trúc thư mục

/MyProject
│── MyProject.sln # Solution file
│ │── /MyProject.Domain # Domain Layer
│ │ │── Entities/ # Business models (Core entities)
│ │ │── Interfaces/ # Repository contracts (Abstractions)
│ │── /MyProject.Application # Application Layer
│ │ │── DTOs/ # Data Transfer Objects
│ │ │── Interfaces/ # Application-level interfaces
│ │ │── UseCases/ # Business logic
│ │── /MyProject.Infrastructure # Infrastructure Layer
│ │ │── Persistence/ # Database context (EF Core, MongoDB, etc.)
│ │ │── Repositories/ # Implementations of Repository pattern
│ │ │── Services/ # External services (APIs, Auth, Logging)
│ │── /MyProject.WebAPI # Presentation Layer
│ │ │── Controllers/ # API controllers
│ │ │── Middleware/ # Custom middleware (logging, exceptions)
│ │ │── Program.cs # Dependency injection setup
│── /tests # Unit Tests & Integration Tests
│ │── /MyProject.UnitTests # Unit tests
│ │── /MyProject.IntegrationTests # API & DB tests
│── /build # CI/CD & build scripts
│── README.md # Project documentation
│── .gitignore # Git ignore file
