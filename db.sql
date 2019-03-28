-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: socialJS
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AIME`
--

DROP TABLE IF EXISTS `AIME`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AIME` (
  `celui_qui_aime` varchar(255) NOT NULL,
  `celui_qui_est_aime` varchar(255) NOT NULL,
  PRIMARY KEY (`celui_qui_aime`,`celui_qui_est_aime`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AIME`
--

LOCK TABLES `AIME` WRITE;
/*!40000 ALTER TABLE `AIME` DISABLE KEYS */;
/*!40000 ALTER TABLE `AIME` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AMI`
--

DROP TABLE IF EXISTS `AMI`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AMI` (
  `user1` varchar(255) NOT NULL,
  `user2` varchar(255) NOT NULL,
  PRIMARY KEY (`user1`,`user2`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AMI`
--

LOCK TABLES `AMI` WRITE;
/*!40000 ALTER TABLE `AMI` DISABLE KEYS */;
/*!40000 ALTER TABLE `AMI` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `INTERET`
--

DROP TABLE IF EXISTS `INTERET`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `INTERET` (
  `identifiantSite` varchar(255) NOT NULL,
  `interet` varchar(255) NOT NULL,
  PRIMARY KEY (`identifiantSite`,`interet`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `INTERET`
--

LOCK TABLES `INTERET` WRITE;
/*!40000 ALTER TABLE `INTERET` DISABLE KEYS */;
/*!40000 ALTER TABLE `INTERET` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MESSAGE`
--

DROP TABLE IF EXISTS `MESSAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MESSAGE` (
  `idMessage` int(11) NOT NULL AUTO_INCREMENT,
  `auteur` varchar(255) NOT NULL,
  `destinataire` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `date_envoi` varchar(30) NOT NULL,
  PRIMARY KEY (`idMessage`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MESSAGE`
--

LOCK TABLES `MESSAGE` WRITE;
/*!40000 ALTER TABLE `MESSAGE` DISABLE KEYS */;
/*!40000 ALTER TABLE `MESSAGE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UTILISATEUR`
--

DROP TABLE IF EXISTS `UTILISATEUR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UTILISATEUR` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `identifiantSite` varchar(255) NOT NULL,
  `motDePasseSite` char(60) NOT NULL,
  `age` int(11) NOT NULL,
  `description` text,
  `sexe` char(1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UTILISATEUR`
--

LOCK TABLES `UTILISATEUR` WRITE;
/*!40000 ALTER TABLE `UTILISATEUR` DISABLE KEYS */;
/*!40000 ALTER TABLE `UTILISATEUR` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-17 18:06:18
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('jean','dupont','machin','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',18,'Adepte du rétrogaming, j\'ai également\ntoutes les consoles actuelles.Je suis toujours\ndispo pour 1 fifa','H','tigre.jpeg');
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('eric','poivre','El Rico','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',21,'Supporter de Manchester United depuis 1990.\nJ\'aime aussi jouer au foot avec mon grand père\net manger des pizzas','H','manu.svg');
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('melanie','poyard','La Taupe Du 77','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',28,'Mon plaisir personnel : lire des\nbouquins ou faire de la pêche.Quoi de\nmieux que le calme?','F','mer.jpeg');
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('claire','dupont','chenilleSauvage','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',35,'Je cueille des fleurs dans les bois.\n','F','fleur.jpeg');
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('alice','dupont','spectra','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',27,'Développeuse chez Microsoft, j\'aime tout ce qui est dark','F','prolix.gif');
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('bob','dupont','warnerPlayer','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',13,'Joueur de League of Tanks de niveau\nmaster/chal,je joue ma vie à\nchaque game','H','xbox.png');
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('laurent','petit','Esprit_Calme','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',59,'Je passe mon temps à voyager (bien que je\ncommence à me faire vieux),j\'aime les paysages\n et la marche à pied.','H','paysage1.jpg');
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('moussa','dupont','wolf33','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',45,'J\'aime les animaux et en particulier\nles colins que je pêche en week-end.\nJ\'ai notamment 1 rat chez moi et\n8 poissons rouges','H','rat.jpg');
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('pierre','aymerick','coffee','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',25,'J\'aime le café et le java(rires).Je dors pas\nbeaucoup la nuit mais j\'en profite\npour développer','H','java.png');
INSERT INTO UTILISATEUR (nom,prenom,identifiantSite,motDePasseSite,age,description,sexe,image)
 VALUES('melodie','marais','symphony','$2b$10$Au8mE1lcwPh3KJZLuwk8Ge8FXvA2n0ZTdtohWCe23r96pz4Sfumna',39,'Passionnée par l\'algo, j\'essaye d\'optimiser\n tout ce que j\'implémente entre\n2 tests unitaires.J\'aime aussi beaucoup les\nmaths qui me servent au quotidien','F','pi.jpeg');

INSERT INTO INTERET (identifiantSite,interet) VALUES ('machin','jeuxvideos');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('eric','foot');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('La Taupe Du 77','lecture');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('La Taupe Du 77','peche');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('chenilleSauvage','NONE');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('Esprit_Calme','NONE');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('spectra','programmation');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('spectra','lecture');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('warnerPlayer','jeuxvideos');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('warnerPlayer','programmation');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('symphony','programmation');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('coffee','lecture');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('coffe','programmation');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('coffe','foot');
INSERT INTO INTERET (identifiantSite,interet) VALUES ('wolf33','peche');
