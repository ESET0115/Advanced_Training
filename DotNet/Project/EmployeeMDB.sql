CREATE DATABASE EmployeeMDB;

USE EmployeeMDB;

CREATE TABLE Employees (
    EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Department NVARCHAR(50) NOT NULL,
    Salary DECIMAL(10,2) NOT NULL,
    Email NVARCHAR(100) UNIQUE
);

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(50) UNIQUE NOT NULL,
    Password NVARCHAR(100) NOT NULL,
    Role NVARCHAR(20) NOT NULL
);

INSERT INTO Employees (FullName, Department, Salary, Email) VALUES
('Tom Hanks', 'HR', 850000.00, 'tom.hanks@email.com'),
('Rihanna', 'IT', 1200000.00, 'rihanna@email.com'),
('Dwayne Johnson', 'Operations', 890000.00, 'dwayne.johnson@email.com'),
('Emma Watson', 'Finance', 600000.00, 'emma.watson@email.com'),
('LeBron James', 'Marketing', 1190000.00, 'lebron.james@email.com'),
('Taylor Swift', 'HR', 1500000.00, 'taylor.swift@email.com'),
('Robert Downey Jr.', 'Manager', 660000.00, 'robert.downey@email.com'),
('Beyonce', 'Operations', 1350000.00, 'beyonce@email.com');

INSERT INTO Users (UserName, Password, Role) VALUES
('admin', 'admin123', 'Admin'),
('user1', 'user123', 'User'),
('manager', 'manager123', 'Admin'),
('testuser', 'test123', 'User');

SELECT * FROM Employees
SELECT * FROM Users
