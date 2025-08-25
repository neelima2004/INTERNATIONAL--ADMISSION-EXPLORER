-- Insert sample countries if they don't exist
INSERT INTO countries (name, code, flag_url) VALUES 
('United States', 'US', 'https://flagcdn.com/w320/us.jpg'),
('United Kingdom', 'UK', 'https://flagcdn.com/w320/gb.jpg'),
('Canada', 'CA', 'https://flagcdn.com/w320/ca.jpg'),
('Australia', 'AU', 'https://flagcdn.com/w320/au.jpg'),
('Germany', 'DE', 'https://flagcdn.com/w320/de.jpg'),
('France', 'FR', 'https://flagcdn.com/w320/fr.jpg'),
('Netherlands', 'NL', 'https://flagcdn.com/w320/nl.jpg'),
('Singapore', 'SG', 'https://flagcdn.com/w320/sg.jpg'),
('Japan', 'JP', 'https://flagcdn.com/w320/jp.jpg'),
('South Korea', 'KR', 'https://flagcdn.com/w320/kr.jpg')
ON CONFLICT (code) DO NOTHING;

-- Insert sample universities for each country
INSERT INTO universities (name, location, ranking, description, programs, tuition_fee, country_id, website_url) 
SELECT 
  name,
  location,
  ranking,
  description,
  programs::text[],
  tuition_fee,
  (SELECT id FROM countries WHERE code = country_code),
  website_url
FROM (VALUES
  ('Harvard University', 'Cambridge, MA', 1, 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.', ARRAY['Computer Science', 'Medicine', 'Business', 'Law'], 50000, 'US', 'https://harvard.edu'),
  ('MIT', 'Cambridge, MA', 2, 'Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts.', ARRAY['Engineering', 'Computer Science', 'Physics', 'Mathematics'], 53790, 'US', 'https://mit.edu'),
  ('Stanford University', 'Stanford, CA', 3, 'Stanford University is a private research university in Stanford, California.', ARRAY['Computer Science', 'Engineering', 'Business', 'Medicine'], 56169, 'US', 'https://stanford.edu'),
  ('University of Oxford', 'Oxford', 1, 'The University of Oxford is a collegiate research university in Oxford, England.', ARRAY['Philosophy', 'History', 'Medicine', 'Law'], 45000, 'UK', 'https://ox.ac.uk'),
  ('University of Cambridge', 'Cambridge', 2, 'The University of Cambridge is a collegiate research university in Cambridge, United Kingdom.', ARRAY['Mathematics', 'Physics', 'Engineering', 'Medicine'], 42000, 'UK', 'https://cam.ac.uk'),
  ('Imperial College London', 'London', 3, 'Imperial College London is a public research university in London.', ARRAY['Engineering', 'Medicine', 'Science', 'Business'], 38000, 'UK', 'https://imperial.ac.uk'),
  ('University of Toronto', 'Toronto, ON', 1, 'The University of Toronto is a public research university in Toronto, Ontario, Canada.', ARRAY['Engineering', 'Medicine', 'Business', 'Computer Science'], 35000, 'CA', 'https://utoronto.ca'),
  ('University of British Columbia', 'Vancouver, BC', 2, 'The University of British Columbia is a public research university with campuses in Vancouver and Kelowna.', ARRAY['Engineering', 'Business', 'Science', 'Arts'], 32000, 'CA', 'https://ubc.ca'),
  ('McGill University', 'Montreal, QC', 3, 'McGill University is a public research university located in Montreal, Quebec, Canada.', ARRAY['Medicine', 'Engineering', 'Arts', 'Science'], 28000, 'CA', 'https://mcgill.ca'),
  ('University of Melbourne', 'Melbourne, VIC', 1, 'The University of Melbourne is a public research university located in Melbourne, Australia.', ARRAY['Medicine', 'Engineering', 'Business', 'Arts'], 25000, 'AU', 'https://unimelb.edu.au'),
  ('Australian National University', 'Canberra, ACT', 2, 'The Australian National University is a national research university located in Canberra.', ARRAY['Politics', 'Economics', 'Science', 'Engineering'], 23000, 'AU', 'https://anu.edu.au'),
  ('University of Sydney', 'Sydney, NSW', 3, 'The University of Sydney is a public research university located in Sydney, Australia.', ARRAY['Medicine', 'Engineering', 'Business', 'Arts'], 24000, 'AU', 'https://sydney.edu.au'),
  ('Technical University of Munich', 'Munich', 1, 'The Technical University of Munich is a research university with campuses in Munich, Garching, and Freising-Weihenstephan.', ARRAY['Engineering', 'Technology', 'Science', 'Mathematics'], 15000, 'DE', 'https://tum.de'),
  ('University of Heidelberg', 'Heidelberg', 2, 'Heidelberg University is a public research university in Heidelberg, Baden-Württemberg, Germany.', ARRAY['Medicine', 'Science', 'Philosophy', 'Law'], 12000, 'DE', 'https://uni-heidelberg.de'),
  ('RWTH Aachen University', 'Aachen', 3, 'RWTH Aachen University is a research university located in Aachen, North Rhine-Westphalia, Germany.', ARRAY['Engineering', 'Technology', 'Science'], 14000, 'DE', 'https://rwth-aachen.de')
) AS v(name, location, ranking, description, programs, tuition_fee, country_code, website_url)
ON CONFLICT (name) DO NOTHING;