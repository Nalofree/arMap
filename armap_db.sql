CREATE DATABASE armap_db;

/*example*/
/*
CREATE TABLE Orders
(
	O_Id int(11) NOT NULL,
	OrderNo int(11) NOT NULL,
	P_Id int(11),
	PRIMARY KEY (O_Id),PRIMARY KEY (),
	CONSTRAINT fk_PerOrders FOREIGN KEY (P_Id)
	REFERENCES Persons(P_Id)
)
*/
/*INSERT INTO `providers_office` VALUES (79,8,11),(80,6,11),(81,5,11),(136,12,16),(137,8,16),(138,7,16),(139,6,16),(140,5,16),(141,4,16),(142,12,15),(143,8,15),(144,7,15),(145,6,15),(146,5,15),(147,4,15),(205,12,21),(206,8,21),(207,7,21),(208,6,21),(209,5,21),(210,4,21),(211,12,20),(212,8,20),(213,7,20),(214,6,20),(215,5,20),(216,4,20),(271,12,35),(272,7,35),(273,6,35),(274,4,35),(311,12,45),(312,7,45),(313,6,45),(314,4,45),(355,12,18),(356,8,18),(357,7,18),(358,6,18),(359,5,18),(360,4,18),(361,12,17),(362,8,17),(363,7,17),(364,6,17),(365,5,17),(366,4,17),(367,12,22),(368,8,22),(369,7,22),(370,6,22),(371,5,22),(372,4,22),(385,12,24),(386,8,24),(387,7,24),(388,6,24),(389,5,24),(390,4,24),(397,12,25),(398,8,25),(399,7,25),(400,6,25),(401,5,25),(402,4,25),(409,12,27),(410,8,27),(411,7,27),(412,6,27),(413,5,27),(414,4,27),(415,12,28),(416,8,28),(417,7,28),(418,6,28),(419,5,28),(420,4,28),(421,12,29),(422,8,29),(423,7,29),(424,6,29),(425,5,29),(426,4,29),(427,12,31),(428,8,31),(429,7,31),(430,6,31),(431,5,31),(432,4,31),(441,12,32),(442,7,32),(443,6,32),(444,4,32),(449,12,33),(450,7,33),(451,6,33),(452,4,33),(457,12,37),(458,7,37),(459,6,37),(460,4,37),(461,12,38),(462,7,38),(463,6,38),(464,4,38),(465,12,39),(466,7,39),(467,6,39),(468,4,39),(469,12,34),(470,7,34),(471,6,34),(472,4,34),(473,12,36),(474,7,36),(475,6,36),(476,4,36),(477,12,40),(478,7,40),(479,6,40),(480,4,40),(481,12,41),(482,7,41),(483,6,41),(484,4,41),(485,12,42),(486,7,42),(487,6,42),(488,4,42),(489,12,43),(490,7,43),(491,6,43),(492,4,43),(493,12,44),(494,7,44),(495,6,44),(496,4,44),(497,12,19),(498,8,19),(499,7,19),(500,6,19),(501,5,19),(502,4,19),(503,12,23),(504,8,23),(505,7,23),(506,6,23),(507,5,23),(508,4,23),(509,12,26),(510,8,26),(511,7,26),(512,6,26),(513,5,26),(514,4,26);
office_description,office_area,office_subprice,office_totalprice,office_owner,office_object,office_status
INSERT INTO offices (office_description,office_area,office_subprice,office_totalprice,office_owner,office_object,office_status) VALUES ('1',2,3,4,11,27,1),('павильон № 204, 2 этаж',29,1000,29930,15,19,1),('павильон № 003 1 этаж',19,1400,27734,16,19,0),('%D0%BF%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20231,%202%20%D1%8D%D1%82%D0%B0%D0%B6',21,1000,21120,17,19,1),('%D0%BF%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20230,%202%20%D1%8D%D1%82%D0%B0%D0%B6',16,1000,16800,18,19,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20201,%202%20%D1%8D%D1%82%D0%B0%D0%B6',19,1000,19610,19,19,1),('офис № 304 3 этаж',32,550,19492,20,19,1),('офис № 401 4 этаж',62,650,40300,21,19,1),('%D0%BE%D1%84%D0%B8%D1%81%20%E2%84%96%20422%204%20%D1%8D%D1%82%D0%B0%D0%B6',34,500,17000,22,19,1),('%D0%BE%D1%84%D0%B8%D1%81%20%E2%84%96%20428,%204%20%D1%8D%D1%82%D0%B0%D0%B6',18,400,7488,23,19,1),('%D0%BE%D1%84%D0%B8%D1%81%20%E2%84%96%20503,%205%20%D1%8D%D1%82%D0%B0%D0%B6',21,650,14138,24,19,1),('%D0%BE%D1%84%D0%B8%D1%81%20%E2%84%96%20505%205%20%D1%8D%D1%82%D0%B0%D0%B6',21,650,14138,25,19,1),('%D0%9E%D1%84%D0%B8%D1%81%20%E2%84%96%20506,%205%20%D1%8D%D1%82%D0%B0%D0%B6',22,650,14300,26,19,1),('%D0%BE%D1%84%D0%B8%D1%81%20%E2%84%96%20600,%206%20%D1%8D%D1%82%D0%B0%D0%B6',21,400,8440,27,19,1),('%D0%BE%D1%84%D0%B8%D1%81%20%E2%84%96%20605,%206%20%D1%8D%D1%82%D0%B0%D0%B6',18,650,11700,28,19,1),('%D0%BE%D1%84%D0%B8%D1%81%20%E2%84%96%20606%206%20%D1%8D%D1%82%D0%B0%D0%B6',19,650,12350,29,19,1),('%D0%BE%D1%84%D0%B8%D1%81%20%E2%84%96%20607,%206%20%D1%8D%D1%82%D0%B0%D0%B6',20,650,13000,31,19,1),('%D0%9A%D0%B8%D0%BE%D1%81%D0%BA%20%E2%84%96%20112',4,1738,7821,32,20,1),('%D0%9A%D0%B8%D0%BE%D1%81%D0%BA%20%E2%84%96%20113',3,1738,6448,33,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20109,%201%20%D1%8D%D1%82%D0%B0%D0%B6',17,1500,26250,34,20,1),('павильон № 203 2 этаж',28,1228,35000,35,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20209,%202%20%D1%8D%D1%82%D0%B0%D0%B6',28,1391,40000,36,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20210,%202%20%D1%8D%D1%82%D0%B0%D0%B6',28,1384,40000,37,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20211,%202%20%D1%8D%D1%82%D0%B0%D0%B6',29,1848,54960,38,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20212,%202%20%D1%8D%D1%82%D0%B0%D0%B6',29,1848,55311,39,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20214,%202%20%D1%8D%D1%82%D0%B0%D0%B6',22,1650,36845,40,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20233%D0%B0,%202%20%D1%8D%D1%82%D0%B0%D0%B6',71,856,61367,41,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%20234,%202%20%D1%8D%D1%82%D0%B0%D0%B6',29,1848,53962,42,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%2093,%201%20%D1%8D%D1%82%D0%B0%D0%B6',35,1412,50000,43,20,1),('%D0%9F%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BE%D0%BD%20%E2%84%96%2097,%201%20%D1%8D%D1%82%D0%B0%D0%B6',48,1738,84223,44,20,1),('склад',24,463,11227,45,20,1);
*/

/*
alter table offices modify office_area varchar(255) collate cp1251_general_ci;
alter table offices modify office_subprice varchar(255) collate cp1251_general_ci;
alter table offices modify office_totalprice varchar(255) collate cp1251_general_ci;
*/

CREATE USER 'admin_armapuser'@'localhost' IDENTIFIED BY 'HQCbezLWux';
GRANT ALL PRIVILEGES ON * . * TO 'admin_armapuser'@'localhost';

CREATE TABLE roles (
	role_id int(11) NOT NULL AUTO_INCREMENT,
	role_name varchar(30),
	PRIMARY KEY (role_id)
);

CREATE TABLE users (
	user_id int(11) NOT NULL AUTO_INCREMENT,
	user_name varchar(30),
	user_pass varchar(60),
	user_role int(11), 
	FOREIGN KEY (user_role) REFERENCES roles (role_id),
	PRIMARY KEY (user_id)
);

CREATE TABLE objects (
	object_id int(11) NOT NULL AUTO_INCREMENT,
	object_name varchar(255),
	object_coordinates varchar(30),
	object_addres varchar(255),
	object_show int(2),
	object_image varchar(255),
	PRIMARY KEY (object_id)
);

CREATE TABLE owners (
	owner_id int(11) NOT NULL AUTO_INCREMENT,
	owner_name varchar(255),
	owner_contact varchar(255),
	PRIMARY KEY (owner_id)
);

CREATE TABLE offices (
	office_id int(11) NOT NULL AUTO_INCREMENT,
	office_description varchar(255),
	office_area int(11),
	office_subprice int(11),
	office_totalprice int(11),
	office_owner int(11), 
	FOREIGN KEY (office_owner) REFERENCES owners (owner_id),
	office_object int(11), 
	FOREIGN KEY (office_object) REFERENCES objects (object_id),
	office_status int(2),
	PRIMARY KEY (office_id)
);

CREATE TABLE included_services (
	includes_id int(11) NOT NULL AUTO_INCREMENT,
	includes_name varchar(255),
	PRIMARY KEY (includes_id)
);

CREATE TABLE extended_services (
	extendes_id int(11) NOT NULL AUTO_INCREMENT,
	extendes_name varchar(255),
	PRIMARY KEY (extendes_id)
);

CREATE TABLE providers (
	provider_id int(11) NOT NULL AUTO_INCREMENT,
	provider_name varchar(255),
	PRIMARY KEY (provider_id)
);

CREATE TABLE meanings (
	meaning_id int(11) NOT NULL AUTO_INCREMENT,
	meaning_name varchar(255),
	PRIMARY KEY (meaning_id)
);

CREATE TABLE images (
	image_id int(11) NOT NULL AUTO_INCREMENT,
	image_name varchar(255),
	image_cover int(2),
	PRIMARY KEY (image_id)
);

CREATE TABLE included_services_office (
	included_services_office_id int(11) NOT NULL AUTO_INCREMENT,
	included_services_office_service int(11), 
	FOREIGN KEY (included_services_office_service) REFERENCES included_services (includes_id),
	included_services_office_office int(11), 
	FOREIGN KEY (included_services_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (included_services_office_id)
);

CREATE TABLE extended_services_office (
	extended_services_office_id int(11) NOT NULL AUTO_INCREMENT,
	extended_services_office_service int(11), 
	FOREIGN KEY (extended_services_office_service) REFERENCES extended_services (extendes_id),
	extended_services_office_office int(11), 
	FOREIGN KEY (extended_services_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (extended_services_office_id)
);

CREATE TABLE providers_office (
	providers_office_id int(11) NOT NULL AUTO_INCREMENT,
	providers_office_provider int(11), 
	FOREIGN KEY (providers_office_provider) REFERENCES providers (provider_id),
	providers_office_office int(11), 
	FOREIGN KEY (providers_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (providers_office_id)
);

CREATE TABLE meanings_office (
	meanings_office_id int(11) NOT NULL AUTO_INCREMENT,
	meanings_office_meaning int(11), 
	FOREIGN KEY (meanings_office_meaning) REFERENCES meanings (meaning_id),
	meanings_office_office int(11), 
	FOREIGN KEY (meanings_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (meanings_office_id)
);

CREATE TABLE images_office (
	images_office_id int(11) NOT NULL AUTO_INCREMENT,
	images_office_image int(11), 
	FOREIGN KEY (images_office_image) REFERENCES images (image_id),
	images_office_office int(11), 
	FOREIGN KEY (images_office_office) REFERENCES offices (office_id),
	PRIMARY KEY (images_office_id)
);

CREATE TABLE images_object (
	images_object_id int(11) NOT NULL AUTO_INCREMENT,
	images_object_image int(11), 
	FOREIGN KEY (images_object_image) REFERENCES images (image_id),
	images_object_object int(11), 
	FOREIGN KEY (images_object_object) REFERENCES objects (object_id),
	PRIMARY KEY (images_object_id)
);