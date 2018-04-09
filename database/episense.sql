-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 09, 2018 at 06:55 PM
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
  `specialization` text NOT NULL,
  `consultation_hours` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctorinfo`
--

INSERT INTO `doctorinfo` (`doctor_id`, `first_name`, `last_name`, `contact_number`, `address`, `specialization`, `consultation_hours`) VALUES
(1, 'Jones', 'McMillan', '+971535930583', 'Somewhere', 'Something', '12PM - 3PM');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_logindetails`
--

CREATE TABLE `doctor_logindetails` (
  `doctor_id` int(11) NOT NULL,
  `email` text NOT NULL,
  `doctor_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor_logindetails`
--

INSERT INTO `doctor_logindetails` (`doctor_id`, `email`, `doctor_password`) VALUES
(1, 'jones@mcmillan.com', 'password');

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

--
-- Dumping data for table `patientinfo`
--

INSERT INTO `patientinfo` (`patient_id`, `first_name`, `last_name`, `gender`, `age`, `date_of_birth`, `contact_number`, `address`, `emergency_contact_id`, `doctor_id`) VALUES
(1, 'Alexander', 'Al Basosi', 'm', 22, '12/06/1995', '+971503494591', 'Al Barsha 1', 0, 1),
(2, 'Victoria', 'Ashley', 'f', 0, '06/09/2005', '+97150859381', 'Al Barsha 1', 0, 1),
(5, 'donna', 'venezuela', '', 0, '', '', '', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient_logindetails`
--

CREATE TABLE `patient_logindetails` (
  `patient_id` int(11) NOT NULL,
  `email` text NOT NULL,
  `patient_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_logindetails`
--

INSERT INTO `patient_logindetails` (`patient_id`, `email`, `patient_password`) VALUES
(5, 'donna@venezuela.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='),
(2, 'victoria@ashley.com', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=');

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
-- Dumping data for table `seizure_history`
--

INSERT INTO `seizure_history` (`patient_id`, `day`, `date`, `time`) VALUES
(2, 'Thursday', '12/2/2018', '4:00PM'),
(2, 'Friday', '15/2/2018', '4:00AM'),
(2, 'Saturday', '12/06/2017', '9PM'),
(1, 'Friday', '12/03/2015', '3:00PM');

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
