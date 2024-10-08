USE [master]
GO

CREATE DATABASE [Perfumaria]
CONTAINMENT = NONE
ON PRIMARY
(
    NAME = N'Perfumaria',
    FILENAME = N'Path_to_database\Perfumaria.mdf',
    SIZE = 8192KB,
    MAXSIZE = UNLIMITED,
    FILEGROWTH = 65536KB
)
LOG ON
(
    NAME = N'Perfumaria_log',
    FILENAME = N'Path_to_database\Perfumaria_log.ldf',
    SIZE = 8192KB,
    MAXSIZE = 2048GB,
    FILEGROWTH = 65536KB
)
GO

-- Restante do script...

USE [Perfumaria]
GO

CREATE TABLE [dbo].[Perfumes](
    [Id] [int] IDENTITY(1,1) NOT NULL,
      NULL,
      NULL,
    [DataFabricacao] [date] NULL,
    [DataVencimento] [date] NULL,
    [Valor] [decimal](8, 2) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
) ON [PRIMARY]
GO