CREATE DATABASE  IF NOT EXISTS `gameshunter` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gameshunter`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: gameshunter
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `ID_Genero` int NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID_Genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Accion'),(2,'Aventura'),(3,'Rol'),(4,'Deportes'),(5,'Josua'),(6,'Cocina');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos`
--

DROP TABLE IF EXISTS `juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos` (
  `ID_Juego` int NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `ID_Genero` int DEFAULT NULL,
  `Precio` decimal(4,2) DEFAULT NULL,
  `Descripcion` varchar(1000) DEFAULT NULL,
  `Imagen` varchar(200) DEFAULT NULL,
  `FechaDescuento` datetime DEFAULT NULL,
  `Descuento` decimal(2,0) DEFAULT NULL,
  PRIMARY KEY (`ID_Juego`),
  KEY `Generos_idx` (`ID_Genero`),
  CONSTRAINT `Generos` FOREIGN KEY (`ID_Genero`) REFERENCES `generos` (`ID_Genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos`
--

LOCK TABLES `juegos` WRITE;
/*!40000 ALTER TABLE `juegos` DISABLE KEYS */;
INSERT INTO `juegos` VALUES (1,'Dragon Ball Z',1,38.40,'Goku le gana','IMG/Droga_en_bolsita.jpg','2024-11-30 00:00:00',20),(2,'Dragon´s Dogma 2',3,60.00,'RPG de acción centrado en la narrativa, para un jugador, que desafía a los usuarios a elegir su propia aventura','IMG/apps.396.14277259033847105.7852260c-8a58-4e28-9e97-dd6d1a7f62f9.jpg','2024-12-07 00:00:00',0),(3,'SEKIRO',2,38.00,'Juego de Shinobis','IMG/B66T6RbAfvIGjpEQxPq7k0Mu.jpg','2024-12-07 00:00:00',5),(4,'Las Aventuras de Josua',5,10.50,'Adentrate en los pensamientos de Josua Jesus Soria Fabrello','IMG/Zoria.jpg','2024-12-07 00:00:00',15),(5,'RIDE 5',4,28.50,'Juego de carreras','IMG/5803ac45883772a5e3000a7b52b250d27795151046397481.avif','2024-12-07 00:00:00',5),(6,'Albion Online',3,0.00,'Albion ONline es un MMORPG no lineal en el que escribes tu propia historia...','IMG/159797.jpeg','2024-12-07 00:00:00',0),(7,'GATA IV',1,99.00,'Gata IV','IMG/GTA_IV.jpeg','2024-12-07 00:00:00',0),(8,'MASA EFECT',6,64.00,'Efecto de amasar','IMG/MassEfect.jpg','2024-12-07 00:00:00',20),(9,'Fantasy',3,37.50,'Al final Fanta si','IMG/FFX.jpg','2024-12-07 00:00:00',25),(12,'pito',1,10.56,'pito2','IMG/Zoria.jpg','2024-12-10 00:00:00',12),(13,'raul 2',2,84.15,'Apasionante historia de raul 2','IMG/B66T6RbAfvIGjpEQxPq7k0Mu.jpg','2024-12-10 00:00:00',15);
/*!40000 ALTER TABLE `juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `Username` varchar(10) NOT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('Julian','12345');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vwjuegos`
--

DROP TABLE IF EXISTS `vwjuegos`;
/*!50001 DROP VIEW IF EXISTS `vwjuegos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vwjuegos` AS SELECT 
 1 AS `ID_Juego`,
 1 AS `Nombre`,
 1 AS `Genero`,
 1 AS `Precio`,
 1 AS `Imagen`,
 1 AS `FechaDescuento`,
 1 AS `Descuento`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vwjuegos`
--

/*!50001 DROP VIEW IF EXISTS `vwjuegos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vwjuegos` AS select `juegos`.`ID_Juego` AS `ID_Juego`,`juegos`.`Nombre` AS `Nombre`,`generos`.`Nombre` AS `Genero`,`juegos`.`Precio` AS `Precio`,`juegos`.`Imagen` AS `Imagen`,`juegos`.`FechaDescuento` AS `FechaDescuento`,`juegos`.`Descuento` AS `Descuento` from (`juegos` join `generos` on((`generos`.`ID_Genero` = `juegos`.`ID_Genero`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-10 22:43:58
