CREATE DATABASE IF NOT EXISTS `lukupaivakirja` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci;
USE `lukupaivakirja`;

CREATE TABLE `kayttaja` (
  `id` int(11) NOT NULL,
  `kayttajatunnus` text NOT NULL,
  `salasana` text NOT NULL
) 

CREATE TABLE `kirja` (
  `id` int(11) NOT NULL,
  `kirjanNimi` text NOT NULL,
  `kirjailijanEtunimi` text NOT NULL,
  `kirjailijanSukunimi` text NOT NULL,
  `arvostelu` int(11) NOT NULL,
  `sanallinenArvostelu` text NOT NULL,
  `kayttajaId` int(11) NOT NULL
) 


ALTER TABLE `kayttaja`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `kirja`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `kayttaja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `kirja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
