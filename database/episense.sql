-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 07, 2018 at 06:40 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `episense`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctorinfo`
--

CREATE TABLE `doctorinfo` (
  `doctor_id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `contact_number` text NOT NULL,
  `address` text NOT NULL,
  `specialization` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_logindetails`
--

CREATE TABLE `doctor_logindetails` (
  `doctor_id` int(11) NOT NULL,
  `email` text NOT NULL,
  `doctor_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `emergencycontacts`
--

CREATE TABLE `emergencycontacts` (
  `patient_id` int(11) NOT NULL,
  `contact_number` text NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `patientinfo`
--

CREATE TABLE `patientinfo` (
  `patient_id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `gender` text NOT NULL,
  `age` int(11) NOT NULL,
  `date_of_birth` text NOT NULL,
  `contact_number` text NOT NULL,
  `address` text NOT NULL,
  `emergency_contact_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `patient_logindetails`
--

CREATE TABLE `patient_logindetails` (
  `patient_id` int(11) NOT NULL,
  `email` text NOT NULL,
  `patient_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `seizure_history`
--

CREATE TABLE `seizure_history` (
  `patient_id` int(11) NOT NULL,
  `day` text NOT NULL,
  `date` text NOT NULL,
  `time` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctorinfo`
--
ALTER TABLE `doctorinfo`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `doctor_logindetails`
--
ALTER TABLE `doctor_logindetails`
  ADD KEY `doctor_logindetails > doctorinfo` (`doctor_id`);

--
-- Indexes for table `emergencycontacts`
--
ALTER TABLE `emergencycontacts`
  ADD KEY `emergencycontacts > patientinfo` (`patient_id`);

--
-- Indexes for table `patientinfo`
--
ALTER TABLE `patientinfo`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `patient_logindetails`
--
ALTER TABLE `patient_logindetails`
  ADD KEY `logindetails > patientinfo` (`patient_id`);

--
-- Indexes for table `seizure_history`
--
ALTER TABLE `seizure_history`
  ADD KEY `seizure_history > patientinfo` (`patient_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor_logindetails`
--
ALTER TABLE `doctor_logindetails`
  ADD CONSTRAINT `doctor_logindetails > doctorinfo` FOREIGN KEY (`doctor_id`) REFERENCES `doctorinfo` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `emergencycontacts`
--
ALTER TABLE `emergencycontacts`
  ADD CONSTRAINT `emergencycontacts > patientinfo` FOREIGN KEY (`patient_id`) REFERENCES `patientinfo` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patient_logindetails`
--
ALTER TABLE `patient_logindetails`
  ADD CONSTRAINT `logindetails > patientinfo` FOREIGN KEY (`patient_id`) REFERENCES `patientinfo` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seizure_history`
--
ALTER TABLE `seizure_history`
  ADD CONSTRAINT `seizure_history > patientinfo` FOREIGN KEY (`patient_id`) REFERENCES `patientinfo` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
