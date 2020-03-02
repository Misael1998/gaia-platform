-- Create a new database called 'pyflor'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
  SELECT [name]
    FROM sys.databases
    WHERE [name] = N'pyflor'
)
CREATE DATABASE pyflor
GO

use pyflor
GO

-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_USERS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_USERS] (
  idUser INT NOT NULL IDENTITY(1,1),
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(12) NOT NULL,
  address VARCHAR(150) NOT NULL,
  name VARCHAR(45) NOT NULL,
  lastname VARCHAR(45) NULL,
  PRIMARY KEY (idUser))
;

-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_INDIVIDUAL_CLIENTS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_INDIVIDUAL_CLIENTS] (
  idIndividualClients INT NOT NULL IDENTITY(1,1),
  birth_date DATE NOT NULL,
  register_id VARCHAR(13) NOT NULL,
  idUser INT NOT NULL,
  PRIMARY KEY (idIndividualClients),

  CONSTRAINT fk_TBL_NDIVIDUAL_CLIENTS_TBL_USERS
    FOREIGN KEY (idUser)
    REFERENCES TBL_USERS (idUser)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_COMPANY_TYPE]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_COMPANY_TYPE] (
  idCompanyType INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (idCompanyType))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_SECTORS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_SECTORS] (
  idSector INT NOT NULL IDENTITY(1,1),
  description VARCHAR(45) NOT NULL,
  PRIMARY KEY (idSector))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_ENTERPRISE_CLIENTS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_ENTERPRISE_CLIENTS] (
  idEnterpriseClients INT NOT NULL IDENTITY(1,1),
  company_name VARCHAR(45) NOT NULL,
  contact_name VARCHAR(45) NOT NULL,
  RTN VARCHAR(14) NOT NULL,
  contact_number VARCHAR(12) NULL,
  idUser INT NOT NULL,
  idCompanyType INT NOT NULL,
  idSector INT NOT NULL,
  PRIMARY KEY (idEnterpriseClients),
  CONSTRAINT fk_TBL_ENTERPRISE_CLIENTS_TBL_USERS1
    FOREIGN KEY (idUser)
    REFERENCES TBL_USERS (idUser)

   ,
  CONSTRAINT fk_TBL_ENTERPRISE_CLIENTS_TBL_COMPANY_TYPE1
    FOREIGN KEY (idCompanyType)
    REFERENCES TBL_COMPANY_TYPE (idCompanyType)

   ,
  CONSTRAINT fk_TBL_ENTERPRISE_CLIENTS_TBL_SECTORS1
    FOREIGN KEY (idSector)
    REFERENCES TBL_SECTORS (idSector)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_DELIVERY_TYPES]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_DELIVERY_TYPES] (
  idDeliveryType INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (idDeliveryType))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_ORDER_TYPES]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_ORDER_TYPES] (
  idOrderType INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (idOrderType))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_REQUESTS]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_REQUESTS] (
  idRequests INT NOT NULL IDENTITY(1,1),
  idDeliveryType INT NOT NULL,
  emission_date DATETIME NOT NULL,
  shipping FLOAT NULL,
  idOrderType INT NOT NULL,
  idEnterpriseClient INT NULL,
  idIndividualClient INT NULL,
  PRIMARY KEY (idRequests),
  CONSTRAINT fk_TBL_REQUESTS_TBL_DELIVERY_TYPES1
    FOREIGN KEY (idDeliveryType)
    REFERENCES TBL_DELIVERY_TYPES (idDeliveryType)

   ,
  CONSTRAINT fk_TBL_REQUESTS_TBL_ORDER_TYPES1
    FOREIGN KEY (idOrderType)
    REFERENCES TBL_ORDER_TYPES (idOrderType)

   ,
  CONSTRAINT fk_TBL_REQUESTS_TBL_ENTERPRISE_CLIENTS1
    FOREIGN KEY (idEnterpriseClient)
    REFERENCES TBL_ENTERPRISE_CLIENTS (idEnterpriseClients)

   ,
  CONSTRAINT fk_TBL_REQUESTS_TBL_NDIVIDUAL_CLIENTS1
    FOREIGN KEY (idIndividualClient)
    REFERENCES TBL_INDIVIDUAL_CLIENTS (idIndividualClients)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_DEPARTMENTS]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_DEPARTMENTS] (
  idDepartments INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (idDepartments))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_JOB_TITLES]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_JOB_TITLES] (
  idJobTitle INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (idJobTitle))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_EMPLOYEES]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_EMPLOYEES] (
  idEmployees INT NOT NULL IDENTITY(1,1),
  admission_date DATE NOT NULL,
  idUser INT NOT NULL,
  idDepartments INT NOT NULL,
  idJobTitle INT NOT NULL,
  PRIMARY KEY (idEmployees),
  CONSTRAINT fk_TBL_EMPLOYEES_TBL_USERS1
    FOREIGN KEY (idUser)
    REFERENCES TBL_USERS (idUser)

   ,
  CONSTRAINT fk_TBL_EMPLOYEES_TBL_DEPARTMENTS1
    FOREIGN KEY (idDepartments)
    REFERENCES TBL_DEPARTMENTS (idDepartments)

   ,
  CONSTRAINT fk_TBL_EMPLOYEES_TBL_JOB_TITLES1
    FOREIGN KEY (idJobTitle)
    REFERENCES TBL_JOB_TITLES (idJobTitle)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_PROVIDERS]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_PROVIDERS] (
  idProviders INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  phone_contact VARCHAR(12) NOT NULL,
  email VARCHAR(150) NOT NULL,
  PRIMARY KEY (idProviders))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_SAR_TYPES]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_SAR_TYPES] (
  idSarTypes INT NOT NULL IDENTITY(1,1),
  description VARCHAR(45) NOT NULL,
  PRIMARY KEY (idSarTypes))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_PAYMENT_METHODS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_PAYMENT_METHODS] (
  idPaymentMethods INT NOT NULL IDENTITY(1,1),
  description VARCHAR(45) NOT NULL,
  PRIMARY KEY (idPaymentMethods))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_ORDERS]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_ORDERS] (
  idOrders INT NOT NULL IDENTITY(1,1),
  emission_date DATETIME NOT NULL,
  expired_date DATETIME NOT NULL,
  total INT NOT NULL,
  value VARCHAR(45) NOT NULL,
  isv VARCHAR(45) NOT NULL,
  idEmployees INT NOT NULL,
  idProviders INT NOT NULL,
  idSarTypes INT NOT NULL,
  idPaymentMethods INT NOT NULL,
  idSenderEmployee INT NOT NULL,
  idReceiverEmployee INT NOT NULL,
  idAddresseeEmployee INT NOT NULL,
  PRIMARY KEY (idOrders),

  CONSTRAINT fk_TBL_ORDERS_TBL_EMPLOYEES1
    FOREIGN KEY (idEmployees)
    REFERENCES TBL_EMPLOYEES (idEmployees)

   ,
  CONSTRAINT fk_TBL_ORDERS_TBL_PROVIDERS1
    FOREIGN KEY (idProviders)
    REFERENCES TBL_PROVIDERS (idProviders)

   ,
  CONSTRAINT fk_TBL_ORDERS_TBL_SAR_TYPES1
    FOREIGN KEY (idSarTypes)
    REFERENCES TBL_SAR_TYPES (idSarTypes)

   ,
  CONSTRAINT fk_TBL_ORDERS_TBL_PAYMENT_METHODS1
    FOREIGN KEY (idPaymentMethods)
    REFERENCES TBL_PAYMENT_METHODS (idPaymentMethods)

   ,
  CONSTRAINT fk_TBL_ORDERS_TBL_EMPLOYEES2
    FOREIGN KEY (idSenderEmployee)
    REFERENCES TBL_EMPLOYEES (idEmployees)

   ,
  CONSTRAINT fk_TBL_ORDERS_TBL_EMPLOYEES3
    FOREIGN KEY (idReceiverEmployee)
    REFERENCES TBL_EMPLOYEES (idEmployees)

   ,
  CONSTRAINT fk_TBL_ORDERS_TBL_EMPLOYEES4
    FOREIGN KEY (idAddresseeEmployee)
    REFERENCES TBL_EMPLOYEES (idEmployees)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_SUPPLIES]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_SUPPLIES] (
  idSupplies INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  type VARCHAR(45) NOT NULL,
  unit_price VARCHAR(45) NOT NULL,
  TBL_SAR_TYPES_idSarTypes INT NOT NULL,
  PRIMARY KEY (idSupplies),
  CONSTRAINT fk_TBL_SUPPLIES_TBL_SAR_TYPES1
    FOREIGN KEY (TBL_SAR_TYPES_idSarTypes)
    REFERENCES TBL_SAR_TYPES (idSarTypes)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_PRODUCTS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_PRODUCTS] (
  idProducts INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  description VARCHAR(200) NULL,
  idSarTypes INT NOT NULL,
  PRIMARY KEY (idProducts),
  CONSTRAINT fk_TBL_PRODUCTS_TBL_SAR_TYPES1
    FOREIGN KEY (idSarTypes)
    REFERENCES TBL_SAR_TYPES (idSarTypes)

   )
;

CREATE TABLE [pyflor].[dbo].[TBL_PRICES] (
  idPrices INT NOT NULL IDENTITY(1,1),
  unit_price FLOAT NOT NULL,
  PRIMARY KEY (idPrices),
  )
;

CREATE TABLE [pyflor].[dbo].[TBL_PRODUCT_HAS_PRICES](
  idProduct INT NOT NULL,
  idPrice INT NOT NULL,
  idCompanyType INT NOT NULL,
  CONSTRAINT fk_TBL_PRODUCTS_PRICES
    FOREIGN KEY (idProduct)
    REFERENCES TBL_PRODUCTS (idProducts)
    ,
  CONSTRAINT fk_TBL_PRICES_1
    FOREIGN KEY (idPrice)
    REFERENCES TBL_PRICES (idPrices)
    ,
  CONSTRAINT fk_TBL_COMPANY_PRICE
    FOREIGN KEY (idCompanyType)
    REFERENCES TBL_COMPANY_TYPE (idCompanyType)


)
;

-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_REFFERALS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_REFFERALS] (
  idRefferals INT NOT NULL IDENTITY(1,1),
  date DATE NULL,
  idOrders INT NOT NULL,
  PRIMARY KEY (idRefferals),
  CONSTRAINT fk_TBL_REFFERALS_TBL_ORDERS1
    FOREIGN KEY (idOrders)
    REFERENCES TBL_ORDERS (idOrders)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_INVENTORY]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_INVENTORY] (
  idInventory INT NOT NULL IDENTITY(1,1),
  in_date DATE NOT NULL,
  out_date DATE NOT NULL,
  idSupplies INT NOT NULL,
  PRIMARY KEY (idInventory),
  CONSTRAINT fk_TBL_INVENTORY_TBL_SUPPLIES1
    FOREIGN KEY (idSupplies)
    REFERENCES TBL_SUPPLIES (idSupplies)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_BILLS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_BILLS] (
  idBills INT NOT NULL IDENTITY(1,1),
  emission_date DATE NOT NULL,
  idOrders INT NULL,
  idRequests INT NULL,
  num_bill VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (idBills),
  CONSTRAINT fk_TBL_BILLS_TBL_ORDERS1
    FOREIGN KEY (idOrders)
    REFERENCES TBL_ORDERS (idOrders)

   ,
  CONSTRAINT fk_TBL_BILLS_TBL_REQUESTS1
    FOREIGN KEY (idRequests)
    REFERENCES TBL_REQUESTS (idRequests)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_ORDER_DETAILS]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_ORDER_DETAILS] (
  idSupplies INT NOT NULL,
  idOrders INT NOT NULL,
  quantity INT NOT NULL,
  unit VARCHAR(45) NOT NULL,
  PRIMARY KEY (idSupplies, idOrders),
  CONSTRAINT fk_TBL_SUPPLIES_has_TBL_ORDERS_TBL_SUPPLIES1
    FOREIGN KEY (idSupplies)
    REFERENCES TBL_SUPPLIES (idSupplies)

   ,
  CONSTRAINT fk_TBL_SUPPLIES_has_TBL_ORDERS_TBL_ORDERS1
    FOREIGN KEY (idOrders)
    REFERENCES TBL_ORDERS (idOrders)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_CATEGORIES]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_CATEGORIES] (
  idCategories INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (idCategories))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[PRODUCTS_has_CATEGORIES]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[PRODUCTS_has_CATEGORIES] (
  idProducts INT NOT NULL,
  idCategories INT NOT NULL,
  PRIMARY KEY (idProducts, idCategories),
  CONSTRAINT fk_TBL_PRODUCTS_has_TBL_CATEGORIES_TBL_PRODUCTS1
    FOREIGN KEY (idProducts)
    REFERENCES TBL_PRODUCTS (idProducts)

   ,
  CONSTRAINT fk_TBL_PRODUCTS_has_TBL_CATEGORIES_TBL_CATEGORIES1
    FOREIGN KEY (idCategories)
    REFERENCES TBL_CATEGORIES (idCategories)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[REQUESTS_has_PRODUCTS]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[REQUESTS_has_PRODUCTS] (
  idProducts INT NOT NULL,
  idRequest INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (idProducts, idRequest),
  CONSTRAINT fk_TBL_PRODUCTS_has_TBL_REQUESTS_TBL_PRODUCTS1
    FOREIGN KEY (idProducts)
    REFERENCES TBL_PRODUCTS (idProducts)

   ,
  CONSTRAINT fk_TBL_PRODUCTS_has_TBL_REQUESTS_TBL_REQUESTS1
    FOREIGN KEY (idRequest)
    REFERENCES TBL_REQUESTS (idRequests)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_CAI_BILL]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_CAI_BILL] (
  idCaiBills INT NOT NULL IDENTITY(1,1),
  idBills INT NOT NULL,
  sub_total FLOAT NULL,
  import FLOAT NULL,
  exent FLOAT NULL,
  aliquot_rate FLOAT NULL,
  total FLOAT NULL,
  PRIMARY KEY (idCaiBills),
  CONSTRAINT fk_TBL_CAI_BILL_TBL_BILLS1
    FOREIGN KEY (idBills)
    REFERENCES TBL_BILLS (idBills)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_PRO_BILL]
-- -----------------------------------------------------



CREATE TABLE [pyflor].[dbo].[TBL_PRO_BILL] (
  idProBills INT NOT NULL IDENTITY(1,1),
  idBills INT NOT NULL,
  description VARCHAR(45) NOT NULL,
  maquila DECIMAL(10,2) NULL,
  net_plant DECIMAL(10,2) NULL,
  PRIMARY KEY (idProBills),
  CONSTRAINT fk_TBL_PRO_BILL_TBL_BILLS1
    FOREIGN KEY (idBills)
    REFERENCES TBL_BILLS (idBills)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_DISCOUTS]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_DISCOUTS] (
  idDiscounts INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  percentage INT NOT NULL,
  PRIMARY KEY (idDiscounts))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_TAXES]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_TAXES] (
  idTaxes INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  percentage INT NOT NULL,
  PRIMARY KEY (idTaxes))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_CAI_BILL_has_TBL_DISCOUTS]
-- -----------------------------------------------------


CREATE TABLE [pyflor].[dbo].[TBL_CAI_BILL_has_TBL_DISCOUTS] (
  idCaiBills INT NOT NULL,
  idDiscounts INT NOT NULL,
  PRIMARY KEY (idCaiBills, idDiscounts),
  CONSTRAINT fk_TBL_CAI_BILL_has_TBL_DISCOUTS_TBL_CAI_BILL1
    FOREIGN KEY (idCaiBills)
    REFERENCES TBL_CAI_BILL (idCaiBills)

   ,
  CONSTRAINT fk_TBL_CAI_BILL_has_TBL_DISCOUTS_TBL_DISCOUTS1
    FOREIGN KEY (idDiscounts)
    REFERENCES TBL_DISCOUTS (idDiscounts)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_CAI_BILL_has_TBL_TAXES]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_CAI_BILL_has_TBL_TAXES] (
  idCaiBills INT NOT NULL,
  idTaxes INT NOT NULL,
  PRIMARY KEY (idCaiBills, idTaxes),
  CONSTRAINT fk_TBL_CAI_BILL_has_TBL_TAXES_TBL_CAI_BILL1
    FOREIGN KEY (idCaiBills)
    REFERENCES TBL_CAI_BILL (idCaiBills)

   ,
  CONSTRAINT fk_TBL_CAI_BILL_has_TBL_TAXES_TBL_TAXES1
    FOREIGN KEY (idTaxes)
    REFERENCES TBL_TAXES (idTaxes)

   )
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_REDUCTIONS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_REDUCTIONS] (
  idReduttcions INT NOT NULL IDENTITY(1,1),
  name VARCHAR(45) NOT NULL,
  description VARCHAR(45) NULL,
  percentage INT NOT NULL,
  PRIMARY KEY (idReduttcions))
;


-- -----------------------------------------------------
-- Table [pyflor].[dbo].[TBL_CAI_BILL_has_TBL_REDUCTIONS]
-- -----------------------------------------------------

CREATE TABLE [pyflor].[dbo].[TBL_CAI_BILL_has_TBL_REDUCTIONS] (
  idCaiBills INT NOT NULL,
  idReduttcions INT NOT NULL,
  PRIMARY KEY (idCaiBills, idReduttcions),

  CONSTRAINT fk_TBL_CAI_BILL_has_TBL_REDUCTIONS_TBL_CAI_BILL1
    FOREIGN KEY (idCaiBills)
    REFERENCES TBL_CAI_BILL (idCaiBills)

   ,
  CONSTRAINT fk_TBL_CAI_BILL_has_TBL_REDUCTIONS_TBL_REDUCTIONS1
    FOREIGN KEY (idReduttcions)
    REFERENCES TBL_REDUCTIONS (idReduttcions)

   )
;
