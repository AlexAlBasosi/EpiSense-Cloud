var mySQLConnection = require('../models/model');

exports.create = function(){

    mySQLConnection.connect(function(err) {
        if (err) {
            console.log(err);
        } else {
    
            console.log("Connection to database made.");

            //create doctorinfo table with primary key
            //delete from doctorinfo table
            //insert values

            //create doctor_logindetails table if not exists 
            //add foreign key
            //delete
            //insert

            //create emergencycontacts table if not exists 
            //add foreign key
            //delete
            //insert

            //create patient_logindetails table if not exists 
            //add foreign key
            //delete
            //insert

            //create seizurehistory table if not exists
            //add foreign key
            //delete
            //insert

            var url = "SELECT constraint_name FROM information_schema.REFERENTIAL_CONSTRAINTS WHERE constraint_schema = compose AND table_name = emergencycontacts";

            mySQLConnection.query(url, function(err, result){
                if(err){
                    console.log(err);
                } else {
                    console.log(result);
                }
            });

    
            mySQLConnection.query("CREATE TABLE IF NOT EXISTS patientinfo (patient_id int(11) NOT NULL, first_name text NOT NULL, last_name text NOT NULL, gender text NOT NULL, age int(11) NOT NULL,date_of_birth text NOT NULL, contact_number text NOT NULL, address text NOT NULL, doctor_id int(11) NOT NULL, sign_up_timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, date text NOT NULL, PRIMARY KEY (patient_id))", function(err, result){
                if(err){
                    console.log(err);
                } else {
                    console.log("patientinfo table created.");
                }
            });

            mySQLConnection.query("DELETE from patientinfo", function(err, result){
                if(err){
                    console.log(err);
                } else {
                    console.log("all records in patientinfo table deleted.");
                }
            });

            mySQLConnection.query("INSERT INTO patientinfo (patient_id, first_name, last_name, gender, age, date_of_birth, contact_number, address, doctor_id, sign_up_timestamp, date) VALUES (0, '', '', '', 0, '', '', '', 0, '2018-04-24 11:14:13', 'Mon Apr 23 2018'), (1, 'Alexander', 'Al Basosi', 'm', 22, '12/06/1995', '+971503494591', 'Al Barsha 1', 1, '2018-04-24 11:17:20', 'Mon Apr 23 2018'), (2, 'Victoria', 'Ashley', 'f', 0, '06/09/2005', '+97150859381', 'Al Barsha 1', 2, '2018-04-24 11:17:23', 'Mon Apr 23 2018'), (3, 'Karen', 'Gillan', 'f', 23, '12/04/1995', '0503489283', '4 Chesterford Road', 2, '2018-04-24 11:17:24', 'Mon Apr 23 2018'), (4, 'John', 'Barrowman', 'm', 45, '12/4/1970', '0503859038', '5 Gaiskell House', 2, '2018-04-24 11:17:27', 'Mon Apr 23 2018'), (5, 'donna', 'venezuela', '', 0, '', '', '', 1, '2018-04-24 11:17:29', 'Mon Apr 23 2018'), (6, 'Katherine', 'Heigl', '', 33, '12/06/1995', '0503829483', 'Lulu Building', 2, '2018-04-24 11:17:32', 'Mon Apr 23 2018'), (8, 'Matt', 'Smith', '', 0, '', '', '', 0, '2018-04-24 11:17:37', 'Mon Apr 23 2018'), (9, 'Matt', 'Smith', '', 0, '', '', '', 4, '2018-04-24 11:17:40', 'Mon Apr 23 2018'), (10, 'Matt', 'Smith', '', 0, '', '', '', 2, '2018-04-24 11:17:42', 'Mon Apr 23 2018'), (12, 'John', 'Smith', '', 0, '', '', '', 2, '2018-04-24 11:17:46', 'Mon Apr 23 2018'), (13, 'Beschier', 'Hassooni', '', 0, '', '', '', 2, '2018-04-24 11:17:48', 'Mon Apr 23 2018'), (14, 'Mary', 'Jane', '', 0, '', '', '', 2, '2018-04-24 11:17:50', 'Mon Apr 23 2018')", function(err, result){
                if(err){
                    console.log(err);
                } else {
                    console.log("values added into patientinfo table.");
                }
            });

            mySQLConnection.query("CREATE TABLE IF NOT EXISTS emergencycontacts (patient_id int(11) NOT NULL,contact_number text NOT NULL, first_name text NOT NULL, last_name text NOT NULL)", function(err, result){
                if(err){
                    console.log(err);
                } else {
                    console.log("emergencycontacts table created.");
                }
            });




            // //drop foreign key
            // mySQLConnection.query("ALTER TABLE emergencycontacts DROP FOREIGN KEY", function(err, result){
            //     if(err){
            //         console.log(err);
            //     } else {
            //         console.log("foreign key dropped.")
            //     }
            // });

            // //drop index

            // mySQLConnection.query("DROP INDEX eckey ON emergencycontacts", function(err, result){
            //     if(err){
            //         console.log(err);
            //     } else {
            //         console.log('index dropped.');
            //     }
            // });

            // mySQLConnection.query("ALTER TABLE emergencycontacts ADD KEY eckey (patient_id)", function(err, result){
            //     if(err){
            //         console.log(err);
            //     } else {
            //         console.log("emergencycontacts index added.");
            //     }
            // });

            // mySQLConnection.query("ALTER TABLE emergencycontacts ADD CONSTRAINT eckey FOREIGN KEY (patient_id) REFERENCES patientinfo (patient_id) ON DELETE CASCADE ON UPDATE CASCADE", function(err, result){
            //     if(err){
            //         console.log(err);
            //     } else {
            //         console.log("emergencycontacts foreign key added.");
            //     }
            // });

            // mySQLConnection.query("ALTER TABLE emergencycontacts ADD FOREIGN KEY (patient_id) REFERENCES patientinfo(patient_id)", function(err, result){
            //     if(err){
            //         console.log(err);
            //     } else {
            //         console.log("emergencycontacts foreign key added.");
            //     }
            // });

            // mySQLConnection.query("DELETE from emergencycontacts", function(err, result){
            //     if(err){
            //         console.log(err);
            //     } else {
            //         console.log("all records in emergencycontacts table deleted.");
            //     }
            // });

            // mySQLConnection.query("INSERT INTO emergencycontacts (patient_id, contact_number, first_name, last_name) VALUES (2, '05034342341', 'Rabia', 'Rauf'), (2, '0505830385', 'John', 'Smith'), (2, '0503958273', 'Simyan', 'Anwar'), (2, '0502950384', 'Samia', 'Ahmad'), (1, ' 971505849382', 'Shaza', 'Kazia'), (2, 'undefined', 'George', 'Michaelcontact_number 971503859472'), (2, 'undefined', 'shaza', 'kazia'), (1, ' 971505849382', 'Shaza', 'Kazia'), (1, ' 971505849382', 'Shaza', 'Kazia'), (2, 'undefined', 'Jack', 'Sparrow'), (2, 'undefined', 'Alexander', 'Al Basosi'), (2, 'undefined', 'Osama', 'Khalifa'), (2, '0503493920', 'John', 'Barrowman');", function(err, result){
            //     if(err){
            //         console.log(err);
            //     } else {
            //         console.log("values added into emergencycontacts table.");
            //     }
            // });
        }
    });

}