-- Clear existing data and insert proper sample data with correct column order
DELETE FROM universities;
DELETE FROM countries;

-- Insert countries first
INSERT INTO countries (name, code, flag_url) VALUES 
('United States', 'US', 'https://flagcdn.com/w320/us.jpg'),
('United Kingdom', 'UK', 'https://flagcdn.com/w320/gb.jpg'),
('Canada', 'CA', 'https://flagcdn.com/w320/ca.jpg'),
('Australia', 'AU', 'https://flagcdn.com/w320/au.jpg'),
('Germany', 'DE', 'https://flagcdn.com/w320/de.jpg');

-- Insert universities with proper column order: name, location, ranking, description, programs, tuition_fee, country_id, website_url
INSERT INTO universities (name, location, ranking, description, programs, tuition_fee, country_id, website_url) VALUES 
-- US Universities
('Harvard University', 'Cambridge, MA', 1, 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.', ARRAY['Computer Science', 'Medicine', 'Business', 'Law'], 50000, (SELECT id FROM countries WHERE code = 'US'), 'https://harvard.edu'),
('MIT', 'Cambridge, MA', 2, 'Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts.', ARRAY['Engineering', 'Computer Science', 'Physics', 'Mathematics'], 53790, (SELECT id FROM countries WHERE code = 'US'), 'https://mit.edu'),
('Stanford University', 'Stanford, CA', 3, 'Stanford University is a private research university in Stanford, California.', ARRAY['Computer Science', 'Engineering', 'Business', 'Medicine'], 56169, (SELECT id FROM countries WHERE code = 'US'), 'https://stanford.edu'),
-- UK Universities  
('University of Oxford', 'Oxford', 1, 'The University of Oxford is a collegiate research university in Oxford, England.', ARRAY['Philosophy', 'History', 'Medicine', 'Law'], 45000, (SELECT id FROM countries WHERE code = 'UK'), 'https://ox.ac.uk'),
('University of Cambridge', 'Cambridge', 2, 'The University of Cambridge is a collegiate research university in Cambridge, United Kingdom.', ARRAY['Mathematics', 'Physics', 'Engineering', 'Medicine'], 42000, (SELECT id FROM countries WHERE code = 'UK'), 'https://cam.ac.uk'),
-- Canada Universities
('University of Toronto', 'Toronto, ON', 1, 'The University of Toronto is a public research university in Toronto, Ontario, Canada.', ARRAY['Engineering', 'Medicine', 'Business', 'Computer Science'], 35000, (SELECT id FROM countries WHERE code = 'CA'), 'https://utoronto.ca'),
('University of British Columbia', 'Vancouver, BC', 2, 'The University of British Columbia is a public research university with campuses in Vancouver and Kelowna.', ARRAY['Engineering', 'Business', 'Science', 'Arts'], 32000, (SELECT id FROM countries WHERE code = 'CA'), 'https://ubc.ca'),
-- Australia Universities
('University of Melbourne', 'Melbourne, VIC', 1, 'The University of Melbourne is a public research university located in Melbourne, Australia.', ARRAY['Medicine', 'Engineering', 'Business', 'Arts'], 25000, (SELECT id FROM countries WHERE code = 'AU'), 'https://unimelb.edu.au'),
('Australian National University', 'Canberra, ACT', 2, 'The Australian National University is a national research university located in Canberra.', ARRAY['Politics', 'Economics', 'Science', 'Engineering'], 23000, (SELECT id FROM countries WHERE code = 'AU'), 'https://anu.edu.au'),
-- Germany Universities
('Technical University of Munich', 'Munich', 1, 'The Technical University of Munich is a research university with campuses in Munich, Garching, and Freising-Weihenstephan.', ARRAY['Engineering', 'Technology', 'Science', 'Mathematics'], 15000, (SELECT id FROM countries WHERE code = 'DE'), 'https://tum.de');