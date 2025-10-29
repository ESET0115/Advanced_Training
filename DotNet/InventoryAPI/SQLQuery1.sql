CREATE DATABASE InventoryDB
USE InventoryDB

CREATE TABLE Categories (
    CategoryId INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName  NVARCHAR(100) NOT NULL
);



CREATE TABLE Products (
    ProductId INT IDENTITY(1,1) PRIMARY KEY,
    ProductName NVARCHAR(150) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT NOT NULL,
    CategoryId INT,
    CONSTRAINT CategoryID FOREIGN KEY (CategoryId) 
        REFERENCES Categories(CategoryId)
);


SELECT * FROM Categories
SELECT * FROM Products