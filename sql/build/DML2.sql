

/* Inicio DML TBL_PAYMENT_METHODS */

INSERT INTO [pyflor].[dbo].[TBL_PAYMENT_METHODS]
( -- Columns to insert data into
 [description]
)
VALUES
(
	'Efectivo'
),
(
	'Transferencia Bancaria'
),
(
	'Paypal'
)
-- Add more rows here
GO

/* Fin DML TBL_PAYMENT_METHODS */


/* Inicio DML TBL_SAR_TYPES */

INSERT INTO [pyflor].[dbo].[TBL_SAR_TYPES]
( -- Columns to insert data into
 [description]
)
VALUES
( 
 'Gravado'
),
( 
 'Exento'
)
-- Add more rows here
GO

/* Fin DML TBL_SAR_TYPES */


/* Inicio DML TBL_SECTORS */

INSERT INTO [pyflor].[dbo].[TBL_SECTORS]
( -- Columns to insert data into
 [description]
)
VALUES
( 
 'Agroindustria'
),
( 
 'Comidas Rapidas'
),
(
 'Comidas Gourmet'
),
(
 'Tienda de Abarroteria'
),
(
 'Buffets'
)
-- Add more rows here
GO

/* Fin DML TBL_SECTORS */


/* Inicio DML TBL_COMPANY_TYPE */

INSERT INTO [pyflor].[dbo].[TBL_COMPANY_TYPE]
( 
 [name]
)
VALUES
( 
 'Hotel'
),
(
 'Restaurante'
),
(
 'Supermercado'
)
-- Add more rows here
GO

/* Fin DML TBL_COMPANY_TYPE */


/* Inicio DML TBL_DELIVERY_TYPES */

INSERT INTO [pyflor].[dbo].[TBL_DELIVERY_TYPES]
( -- Columns to insert data into
 [name]
)
VALUES
( 
 'Local'
),
( 
 'Centro de distribucion'
),
(
 'Personalizado'
)
-- Add more rows here
GO

/* Fin DML TBL_DELIVERY_TYPES */


/* Inicio DML TBL_DEPARTMENTS */

INSERT INTO [pyflor].[dbo].[TBL_DEPARTMENTS]
( -- Columns to insert data into
 [name]
)
VALUES
(
 'Administración'
),
(
 'Mercadeo y Ventas'
)
,
(
 'Recursos Humanos'
)
,
(
 'Produccion'
)
-- Add more rows here
GO

/* Fin DML TBL_DEPARTMENTS */


/* Inicio DML TBL_JOB_TITLES */

INSERT INTO [pyflor].[dbo].[TBL_JOB_TITLES]
( -- Columns to insert data into
 [name]
)
VALUES
(
 'Asistente Administrativo'
),
(
 'Gerente de Empacadora'
),
(
 'Asistente de Empaque'
),
(
 'Despachador'
),
(
 'Gerente de Ventas'
)
,
(
 'Gerente Administrativo'
)
,
(
 'Gerente de Recursos Humanos'
),
(
 'Gerente de Producción'
),
(
 'Auxiliar de Ventas'
),
(
 'Auxiliar de Recursos Humanos'
),
(
 'Distribuidor'
)
-- Add more rows here
GO

/* Fin DML TBL_JOB_TITLES */


/* Inicio DML TBL_PRICES */

INSERT INTO TBL_PRICES VALUES 
(15.50),
(180),
(23),
(96),
(120),
(11),
(30),
(35),
(75),
(90),
(15),
(100),
(28.50),
(25),
(50),
(80),
(2),
(2.20),
(33.05),
(40),
(20),
(8)

/* Fin DML TBL_PRICES */


/* Inicio DML TBL_PRODUCTS */

-- Insert rows into table 'TBL_PRODUCTS' in schema '[dbo]'
    INSERT INTO [pyflor].[dbo].[TBL_PRODUCTS]
    ( -- Columns to insert data into
    [name], [description], [idSarTypes]
    )
    VALUES
    ( 
    'Albahaca Criolla', 
    'Albahaca con sabor amargo para poder preparar tus comidas y tes.', 
    2
    ),
    ( 
    'Albahaca Dulce', 
    'Albahaca con sabor dulce para decorar tus comidas y darle nuevo sabor a tus tes.', 
    1
    ),
    ( 
    'Albahaca en Bolsa', 
    'Albahaca lista para sembrar donde tu desees.', 
    2
    ),
    ( 
    'Albahaca Limon', 
    'Albahaca preferida para combinar con jugos naturales.', 
    1
    ),
    ( 
    'Albahaca Morada', 
    'Albahaca con sabor amargo para poder preparar tus comidas y tes.', 
    1
    ),
    ( 
    'Albahaca Thai', 
    'Variedad de albahaca con hojas mas alargadas y pequeñas de sabor mas fuerte que el normal y usada en recetas con pollo y carnes blancas.', 
    1
    ),
    ( 
    'Arugula', 
    'Tipo de hortaliza especialmente utilizada para ensaladas. Tambien se puede utilizar como verdura en las pastas.', 
    1
    ),
    ( 
    'Bolsa de Lechuga', 
    'Conjunto de lechugas para poder preparar tus comidas.', 
    2
    ),
    ( 
    'Chive', 
    'Hierba con sabor parecido a la cebolla blanca utilizado mayormente como hierba aromatica.', 
    2
    ),
    ( 
    'Eneldo', 
    'Hierba aromatica utilizada como condimento o para hacer infusiones.', 
    1
    ),
    ( 
    'Escarola Amarilla', 
    'Tipo de lechuga de color amarillo con sabor picante y ligeramente amargo.', 
    2
    ),
    ( 
    'Escarola romana', 
    'tipo de lechuga con hojas alargadas y poco mas crujientes.', 
    2
    ),
    ( 
    'Escarola Verde', 
    'tipo de lechuga de color verde con sabor picante y ligeramente amargo.', 
    2
    ),
    ( 
    'Espinaca', 
    'Planta con hojas comestibles grandes y de color verde muy oscuro. Se puede consumir fresca, cocida o frita.', 
    2
    ),
    ( 
    'Flor de albahaca morada', 
    'Variedad híbrida de Albahaca con grandes hojas rizadas con forma de dientes de sierra de tonos morados oscuros e intensos.', 
    2
    ),
    ( 
    'Flor de arugula', 
    'Hoja de sabor picante que combina perfecto en ensaladas, guisados, sopas, pizza o salteada con otras verduras.', 
    2
    ),
    ( 
    'Flor de exora', 
    'Flor parecida a la hortensia para decorar tus comidas.', 
    2
    ),
    ( 
    'Flor de geranio', 
    'Flor de jardin colorida y fragante para decoracion de hogar.', 
    2
    ),
    ( 
    'Flor de geranio rosado', 
    'Flor de jardin colorida y fragante para decoracion de hogar.', 
    2
    ),
    ( 
    'Flor de hortencia', 
    'Flor de jardin colorida para decoracion de hogar.', 
    2
    ),
    ( 
    'Flor de marigold', 
    'Flor de jardin colorida para decoracion de hogar.', 
    2
    ),
    ( 
    'Flor de rosa', 
    'Flor de jardin colorida para decoracion de hogar.', 
    2
    ),
    ( 
    'Flor de torrenia', 
    'Flor de jardin colorida para decoracion de hogar.', 
    2
    ),
    ( 
    'Flor de zucchini', 
    'Flor comestible para comer fritas o al horno.', 
    2
    ),
    ( 
    'Flor rosa melocoton', 
    'Flor de jardin color rosa palido o naranja pastel para decoracion de hogar.', 
    2
    ),
    ( 
    'Flor rosa rosada', 
    'Flor de jardin color rosa fuerte para decoracion de hogar.', 
    2
    ),
    ( 
    'Flores comestibles', 
    'Flores comestibles para incorporarlas en tus comidas.', 
    2
    ),
    ( 
    'Hierbabuena', 
    'Planta aromática con beneficios aromáticos y gastronómicos.', 
    2
    ),
    ( 
    'Hierbabuena en bolsa', 
    'Conjunto de hierbabuena para utilizar en tus comidas o infusiones.', 
    2
    ),
    ( 
    'Kale', 
    'Es un vegetal de tipo col rizada.', 
    2
    ),
    ( 
    'Kale rojo', 
    'Es un vegetal de tipo col rizada color rojo.', 
    2
    ),
    ( 
    'Kale verde', 
    'Es un vegetal de tipo col rizada color verde.', 
    2
    ),
    ( 
    'Kale verde risado', 
    'Es un vegetal de tipo col rizada color verde.', 
    2
    ),
    ( 
    'Lechuga de hoja', 
    'Verdura de hoja verde utilizada mayormente en ensaladas.', 
    2
    ),
    ( 
    'Lechuga romana', 
    'Tipo de lechuga con tallo color blanco y grueso. Sus hojas son largas color verde claro. Su corazon es fresco y crujiente.', 
    2
    ),
    ( 
    'Menta', 
    'Hierba con sabor fresco, se utiliza seca o fresca.', 
    2
    ),
    ( 
    'Menta en bolsa', 
    'Conjunto de menta para utilizarse de forma fresca o seca.', 
    2
    ),
    ( 
    'Mezcla de lechuga', 
    'Configuracion de diferentes lechugas dentro del mismo empaque.', 
    2
    ),
    ( 
    'Oregano', 
    'Planta medicinal con propiedades digestivas, carminativas, antioxidantes y expectorantes utilizada como condimento en las comidas.', 
    2
    ),
    ( 
    'Oregano en bolsa', 
    'Conjunto de oreganos para utilizarlo de condimento en tus comidas.', 
    2
    ),
    ( 
    'Oregano hoja ancha', 
    'Tipo de oregano con hojas anchas.', 
    2
    ),
    ( 
    'Oregano hoja pequeña', 
    'Tipo de oregano con hojas pequeñas.', 
    2
    ),
    ( 
    'Pepino coctel', 
    'Caja de pepino para decoracion de comidas gourmet.', 
    2
    ),
    ( 
    'Planta ornamental 10', 
    'Plantas para decoracion de espacios fisicos.', 
    2
    ),
    ( 
    'Planta ornamental 11', 
    'Plantas para decoracion de espacios fisicos.', 
    2
    ),
    ( 
    'Planta ornamental 12', 
    'Plantas para decoracion de espacios fisicos.', 
    2
    ),
    ( 
    'Planta ornamental 13', 
    'Plantas para decoracion de espacios fisicos.', 
    2
    ),
    ( 
    'Plantula de apio triumph', 
    'Hortaliza que se puede consumir fresca o utilizar como condimento para tus comidas. Sabor un poco amargo y tallo crujiente. Lista para sembrar.', 
    2
    ),
    ( 
    'Plantula de lechuga invicta', 
    'Planta de lechuga lista para sembrar.', 
    2
    ),
    ( 
    'Romero', 
    'Planta planta aromatica utilizada como condimento en tus comidas.', 
    2
    ),
    ( 
    'Salvia', 
    'Hierba aromatica utilizada para fines medicinales.', 
    2
    ),
    ( 
    'Tomate cherry', 
    'Tipo de tomate de pequeño tamaño con sabor mas dulce que el habitual.', 
    2
    ),
    ( 
    'Tomate cherry verde', 
    'Tipo de tomate de pequeño tamaño color verde con sabor mas dulce que el habitual.', 
    2
    ),
    ( 
    'Tomate grape rojo', 
    'Tomate comunmente utilizado.', 
    2
    ),
    ( 
    'Tomillo', 
    'Hierba utilizada como condimento en estofados, adobos y carnes.', 
    2
    ),
    ( 
    'Tomillo en bolsa', 
    'Conjunto de tomillo para utilizarlo como condimento en tus comidas.', 
    2
    ),
    ( 
    'Zacate de limon', 
    'Planta con agradable olor a cítricos.', 
    2
    ),
    ( 
    'Zucchini amarillo', 
    'Verdura de color amarillo para comer con ensaladas.', 
    2
    ),
    ( 
    'Zucchini verde', 
    'Verdura de color verde para comer con ensaladas.', 
    2
    )
    GO

/* Fin DML TBL_PRODUCTS */


/* Inicio DML TBL_REQUEST_TYPES */

INSERT INTO [pyflor].[dbo].[TBL_REQUEST_TYPES]
( -- Columns to insert data into
 [name]
)
VALUES
( 
 'Maquila'
),
( 
 'Planta Neta'
)
-- Add more rows here
GO

/* Fin DML TBL_REQUEST_TYPES */


/* Inicio DML TBL_BILL_STATE */

INSERT INTO TBL_BILL_STATE
VALUES
(1, 'In Progress'),
(2, 'Payed')

/* Fin DML TBL_BILL_STATE */


/* Inicio DML TBL_CATEGORIES */

INSERT INTO [pyflor].[dbo].[TBL_CATEGORIES]
( -- Columns to insert data into
 [name]
)
VALUES
( 
 'hierba'
),
( 
 'planta'
),
(
 'verdura'
),
(
 'pilón'
)
-- Add more rows here
GO

/* Fin DML TBL_CATEGORIES */


/* Inicio DML TBL_PROVIDERS */

INSERT INTO TBL_PROVIDERS VALUES 
(
	'Agritrade',
	'99887766',
	'agitrade@gmail.com'
),
(
	'Del Campo',
	'93450912',
	'delCampo@gmail.com'
),
(
	'Cadelga',
	'93456789',
	'cadelga@gmail.com'
),
(
	'Fertica',
	'92135411',
	'fertica@gmail.com'
)

/* Fin DML TBL_PROVIDERS */


/* Inicio DML TBL_SUPPLIES */

INSERT INTO TBL_SUPPLIES VALUES 
(
	'Semilla Pony',
	'Semilla',
	74.35,
	1
),
(
	'Semilla de Lechuga',
	'Semilla',
	85.35,
	2
),
(
	'Semilla de Tomate',
	'Semilla',
	45.35,
	1
),
(
	'Semilla de Pepino',
	'Semilla',
	78.35,
	2
),
(
	'Semilla de Aguacate',
	'Semilla',
	56.35,
	1
),
(
	'Semilla de Fresa',
	'Semilla',
	79.35,
	2
)
,
(
	'Clamp de Empaque',
	'Empaque',
	80.35,
	1
),
(
	'Bandejas de Siembra',
	'Bandeja',
	100.35,
	2
),
(
	'Chadine',
	'Fertilizante',
	200.35,
	1
)
,
(
	'Sustrato',
	'Fertilizante',
	300.35,
	2
)
,
(
	'Fertilizante',
	'Fertilizante',
	400.35,
	1
)
,
(
	'Guantes',
	'Material de Proteccion',
	24.35,
	2
)
,
(
	'Cestas de Empaque',
	'Empaque',
	100.35,
	1
)
,
(
	'Lona de Distribucion',
	'Empaque',
	700.45,
	2
)
/* Fin DML TBL_SUPPLIES */


/* Inicio DML */
/* Fin DML */

/******************** ESTOS INSERTS PUEDEN DAR PROBLEMAS POR LOS IDS!!!!  *****************************/

/* Inicio DML PRODUCTS_has_CATEGORIES */

INSERT INTO PRODUCTS_has_CATEGORIES
VALUES
    (3,1),
    (4,1),
    (5,2),
    (6,1),
    (7,1),
    (8,1),
    (9,3),
    (10,3),
    (11,1),
    (12,1),
    (13,3),
    (14,3),
    (15,3),
    (16,3),
    (17,2),
    (18,2),
    (19,2),
    (20,2),
    (21,2),
    (22,2),
    (23,2),
    (24,2),
    (25,2),
    (26,2),
    (27,2),
    (28,2),
    (29,2),
    (30,1),
    (31,2),
    (32,3),
    (33,3),
    (34,3),
    (35,3),
    (36,3),
    (37,3),
    (38,1),
    (39,2),
    (40,3),
    (41,1),
    (42,2),
    (43,1),
    (44,1),
    (45,3),
    (46,2),
    (47,2),
    (48,2),
    (49,2),
    (50,2),
    (51,2),
    (52,1),
    (53,1),
    (54,3),
    (55,3),
    (56,3),
    (57,1),
    (58,2),
    (59,1)

/* Fin DML PRODUCTS_has_CATEGORIES */


/* Inicio DML tbl_Product_has_prices */

insert into tbl_Product_has_prices values (3,1,3), (4,2,2), (4,2,1), (4,3,3),
(5,11,3), (6,1,3), (7,1,3), (8,1,3), (9,2,2), (9,2,1), (9,1,3), (10,4,2), (11,2,2),
(11,1,3), (12,5,2), (12,1,3), (13,6,1), (14,7,3), (15,7,2), (15,7,3), (16,7,2),
(16,7,1),(17,8,2),(16,7,3), (18,8,2), (19,9,2), (20,9,2), (21,9,2), (22,9,2), (22,9,1),
(23,9,2), (24,9,2), (25,9,2), (25,9,1), (26,9,2), (27,10,1), (28,10,1), (29,9,1), (30,2,2),
(30,2,1), (30,1,3), (31,11,3), (32,12,2), (32,15,3), (33,12,2), (34,12,2), (35,12,2),
(36,7,2), (36,7,3), (37,7,2), (38,2,2), (38,2,1), (38,3,3), (39,11,3), (40,10,2), (41,5,2),
(41,1,3), (42,11,3), (43,3,2), (44,3,2), (45,7,2), (45,7,1), (45,13,3), (46,14,3), (47,7,3),
(48,15,3), (49,16,3), (50,17,2), (51,18,2), (52,2,2), (52,2,1), (52,1,3), (53,3,2), (53,1,3),
(54,7,2), (54,7,1), (54,13,3), (55,7,2), (56,7,2), (56,19,3), (57,2,2), (57,2,1), (57,1,3),
(58,11,3), (59,20,3);

/* Fin DML tbl_Product_has_prices */