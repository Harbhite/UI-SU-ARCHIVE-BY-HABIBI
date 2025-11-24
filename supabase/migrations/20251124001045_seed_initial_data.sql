/*
  # Seed Initial Data
  
  ## Overview
  Populates the database with initial data from the application including:
  - Historical documents
  - Current announcements
  - Past administrations and their executive teams
  - Clubs and societies
  - Halls of residence
  
  ## Notes
  This migration uses static data currently in the React components.
  Future updates can be made through the admin interface.
*/

-- Seed Documents
INSERT INTO documents (title, year, type, size, description) VALUES
  ('The 1952 Students Union Constitution', 1952, 'Constitution', '2.4 MB', 'The founding legal document of the Union.'),
  ('Gamaliel Onosode: The Mellamby Address', 1955, 'Speech', '450 KB', 'Address delivered at the first hall dinner of Mellamby Hall.'),
  ('Independence Day Union Memo', 1960, 'Report', '800 KB', 'Official union stance on Nigerian Independence.'),
  ('Kunle Adepeju Memorial Committee Report', 1971, 'Report', '1.2 MB', 'Findings on the police brutality incident.'),
  ('Ali Must Go: Charter of Demands', 1978, 'Manifesto', '1.5 MB', 'The list of demands presented to the Federal Military Government.'),
  ('Student Welfare Bill 1985', 1985, 'Bill', '600 KB', 'Legislative bill for improving cafeteria services.'),
  ('Anti-Cultism Decree', 1999, 'Bill', '900 KB', 'Union regulations against secret cult activities on campus.'),
  ('2001 Amended Constitution', 2001, 'Constitution', '3.1 MB', 'Major amendments following the return to democracy.'),
  ('The "Book of Life" Speech Transcript', 2017, 'Speech', '300 KB', 'Transcript of Ojo Aderemi''s budget speech.'),
  ('Students Union Restoration Agreement', 2019, 'Report', '2.0 MB', 'Agreement between the University Management and Student Leaders.'),
  ('2023 Appropriation Bill', 2023, 'Bill', '1.8 MB', 'Approved budget for the 2023/2024 academic session.'),
  ('2024 Constitution (Digital Edition)', 2024, 'Constitution', '4.2 MB', 'The current operating constitution of the Union.');

-- Seed Announcements
INSERT INTO announcements (title, date, category, summary, content, author) VALUES
  ('Resumption Date for 2024/2025 Session', '2024-10-24', 'Urgent', 
   'The University Senate has officially approved the resumption date for fresh and returning students.',
   'The University of Ibadan Management has announced that the 2024/2025 academic session will commence on Monday, November 4th, 2024. Fresh students are expected to begin clearance immediately upon resumption. Returning students should ensure all outstanding levies are paid before the portal closes.',
   'Office of the Registrar'),
  
  ('Students Union Week Schedule', '2024-10-20', 'Event',
   'Get ready for the biggest cultural and intellectual festival on campus. See the full lineup of events.',
   'The highly anticipated SU Week is here! Day 1: Gyration at SUB, Day 2: Inter-Faculty Debate, Day 3: Cultural Night, Day 4: Sports Festival at Awo Stadium, Day 5: Grand Dinner & Awards Night. Tickets are available at the SUB secretariat.',
   'Director of Socials'),
  
  ('Maintenance Work at Kuti Hall', '2024-10-18', 'Memo',
   'Scheduled power outage and water maintenance in Kuti Hall this weekend.',
   'This is to inform all residents of Kuti Hall that there will be a scheduled maintenance of the water pumping machine on Saturday, Oct 26th. Consequently, water supply will be interrupted from 8am to 4pm. Please store water accordingly.',
   'Hall Warden'),
  
  ('Library Opening Hours Extended', '2024-10-15', 'News',
   'Kenneth Dike Library extends reading hours in preparation for upcoming exams.',
   'In response to the SRC request, the Kenneth Dike Library (KDL) will now remain open 24/7 starting from next week Monday to facilitate exam preparations. Security measures have been beefed up around the library vicinity.',
   'University Librarian'),
  
  ('Call for Scholarship Applications', '2024-10-10', 'News',
   'The UI Alumni Association is accepting applications for the Annual Indigent Students Scholarship.',
   'Applications are invited from suitably qualified undergraduate students for the UI Alumni Scholarship. Requirements: Must have a CGPA of 3.5 and above. Must demonstrate financial need. Deadline: Nov 30th, 2024.',
   'UI Alumni Association');

-- Seed Administrations and their teams
DO $$
DECLARE
  admin_2024_id uuid;
  admin_2023_id uuid;
  admin_2021_id uuid;
  admin_2019_id uuid;
  admin_2017_id uuid;
  admin_1994_id uuid;
  admin_1978_id uuid;
BEGIN
  -- 2024/2025 Administration
  INSERT INTO administrations (session, president, alias, motto, notable_events, status)
  VALUES ('2024/2025', 'Aweda Bolaji', 'Oloye', 'Team Inclusive',
          'Current administration focusing on inclusivity, digital ID cards, and student welfare amid rising economic costs.',
          'Active')
  RETURNING id INTO admin_2024_id;

  INSERT INTO executive_members (administration_id, role, name, alias) VALUES
    (admin_2024_id, 'Vice President', 'Bolutife', 'Abderry'),
    (admin_2024_id, 'General Secretary', 'Ogundipo', 'Global'),
    (admin_2024_id, 'Asst. Gen. Sec', 'Elemide Daniel', NULL),
    (admin_2024_id, 'House Secretary', 'Tunde-Ipaye', NULL),
    (admin_2024_id, 'Public Relations Officer', 'Adetona', NULL),
    (admin_2024_id, 'Treasurer', 'Hassan', NULL),
    (admin_2024_id, 'Sports Secretary', 'Olatunji', NULL);

  -- 2023/2024 Administration
  INSERT INTO administrations (session, president, alias, motto, notable_events, status)
  VALUES ('2023/2024', 'Samuel Samson Tobiloba', 'Host', 'Team Reform',
          'Focused on reforming union processes, constitutional review, and digitalizing the secretariat.',
          'Completed')
  RETURNING id INTO admin_2023_id;

  INSERT INTO executive_members (administration_id, role, name, alias) VALUES
    (admin_2023_id, 'Vice President', 'Ogunsesan Nafisat', NULL),
    (admin_2023_id, 'General Secretary', 'Salami Olufisayo', NULL),
    (admin_2023_id, 'Asst. Gen. Sec', 'Oluwole Ayomide', NULL),
    (admin_2023_id, 'House Secretary', 'Sanjay', NULL),
    (admin_2023_id, 'Public Relations Officer', 'Adeona Tosin', NULL),
    (admin_2023_id, 'Treasurer', 'Busari', NULL),
    (admin_2023_id, 'Sports Secretary', 'Josh', NULL);

  -- 2021/2022 Administration
  INSERT INTO administrations (session, president, alias, motto, notable_events, status)
  VALUES ('2021/2022', 'Adewole Adeyinka', 'Mascot', 'Team Restoration',
          'Restored the union after a long period of suspension and caretaker committees. Rebuilt student confidence.',
          'Completed')
  RETURNING id INTO admin_2021_id;

  INSERT INTO executive_members (administration_id, role, name, alias) VALUES
    (admin_2021_id, 'Vice President', 'Zainab', NULL),
    (admin_2021_id, 'General Secretary', 'Bamidele Taiwo', NULL),
    (admin_2021_id, 'Asst. Gen. Sec', 'Federal', NULL),
    (admin_2021_id, 'House Secretary', 'Michael', NULL),
    (admin_2021_id, 'Public Relations Officer', 'Jagaban', NULL),
    (admin_2021_id, 'Treasurer', 'Daniel', NULL),
    (admin_2021_id, 'Sports Secretary', 'Felix', NULL);

  -- 2019/2020 Administration
  INSERT INTO administrations (session, president, alias, motto, notable_events, status)
  VALUES ('2019/2020', 'Akeju Olusegun', 'Akeju', 'Unification',
          'Managed student affairs during the COVID-19 pandemic transition and ASUU strikes.',
          'Completed')
  RETURNING id INTO admin_2019_id;

  INSERT INTO executive_members (administration_id, role, name, alias) VALUES
    (admin_2019_id, 'Vice President', 'Oloyede', NULL),
    (admin_2019_id, 'General Secretary', 'Mustapha', NULL),
    (admin_2019_id, 'Public Relations Officer', 'Ajao', NULL),
    (admin_2019_id, 'House Secretary', 'Elijah', NULL),
    (admin_2019_id, 'Sports Secretary', 'Coach', NULL);

  -- 2017/2018 Administration
  INSERT INTO administrations (session, president, alias, motto, notable_events, status)
  VALUES ('2017/2018', 'Ojo Aderemi', 'Patriotic Intelligentsia', 'Patriotic Intelligentsia',
          'Historically suspended for leading a protest against ID card fees. Delivered the famous ''Book of Life'' budget speech.',
          'Suspended')
  RETURNING id INTO admin_2017_id;

  INSERT INTO executive_members (administration_id, role, name, alias) VALUES
    (admin_2017_id, 'Vice President', 'Oluwafunke', NULL),
    (admin_2017_id, 'General Secretary', 'Iyanuoluwa', NULL),
    (admin_2017_id, 'Asst. Gen. Sec', 'Nifemi', NULL),
    (admin_2017_id, 'House Secretary', 'Pascal', 'P. Manager'),
    (admin_2017_id, 'Public Relations Officer', 'Adebayo', NULL),
    (admin_2017_id, 'Treasurer', 'Ajibola', NULL),
    (admin_2017_id, 'Sports Secretary', 'Sporty', NULL);

  -- 1994/1995 Administration
  INSERT INTO administrations (session, president, alias, motto, notable_events, status)
  VALUES ('1994/1995', 'Sowore Omoyele', 'Sowore', 'Anti-Military',
          'Led fierce anti-military protests during the Abacha regime. Expelled/Suspended multiple times.',
          'Suspended')
  RETURNING id INTO admin_1994_id;

  INSERT INTO executive_members (administration_id, role, name, alias) VALUES
    (admin_1994_id, 'Movement', 'Student Activists Collective', NULL);

  -- 1978/1979 Administration
  INSERT INTO administrations (session, president, alias, motto, notable_events, status)
  VALUES ('1978/1979', 'Segun Okeowo', 'Okeowo', 'Ali Must Go',
          'Led the nationwide ''Ali Must Go'' protests against the commercialization of education.',
          'Impeached')
  RETURNING id INTO admin_1978_id;

  INSERT INTO executive_members (administration_id, role, name, alias) VALUES
    (admin_1978_id, 'General Secretary', 'Comrade Arogundade', NULL),
    (admin_1978_id, 'PRO', 'Comrade Labinjo', NULL);
END $$;

-- Seed Halls
INSERT INTO halls (name, alias, motto, description, notable_alumni, color, type) VALUES
  ('Kenneth Mellamby Hall', 'Premier Hall', 'Primus Inter Pares',
   'The first hall of residence, named after the first Principal, Kenneth Mellamby. Known for its culture of gentility and excellence. Mellambites are regarded as the "Gentlemen" of the university.',
   '["Wole Soyinka", "Emeka Anyaoku", "Gamaliel Onosode"]'::jsonb,
   '#C5A059', 'male'),
  
  ('Lord Tedder Hall', 'Man O Man', 'God and Fatherland',
   'Strategically located near the academic area. Tedderites are known for their political astuteness and strong defense of their territory.',
   '["Kayode Fayemi", "Godwin Obaseki"]'::jsonb,
   '#8B4513', 'male'),
  
  ('Kuti Hall', 'The Fortress', 'Dare to Struggle, Dare to Win',
   'Named after Rev. I.O. Ransome-Kuti. Famous for its radicalism and intellectual contributions to unionism. Kuti Hall is often seen as a bastion of consciousness.',
   '["Femi Falana", "Babatunde Fashola"]'::jsonb,
   '#15803d', 'male'),
  
  ('Sultan Bello Hall', 'The Sultanate', 'Nobility',
   'Named after Sir Ahmadu Bello. The hall prides itself on leadership ("The Mayor") and the annual "State of the Nation" address. Bellites are called "Nobles".',
   '["Ahmadu Ali", "Shehu Musa Yar''Adua"]'::jsonb,
   '#1e40af', 'male'),
  
  ('Queen Elizabeth II Hall', 'Queens', 'Laborare Est Orare',
   'Opened by Queen Elizabeth II herself in 1956. It is a female hall known for its serenity and elegance. The residents are the "Queens".',
   '["Florence Nwapa", "Ameyo Adadevoh"]'::jsonb,
   '#7e22ce', 'female'),
  
  ('Queen Idia Hall', 'Amazonia', 'Home of Amazons',
   'Named after the legendary Queen Idia of Benin. It is the largest female hall and known for its vibrant social atmosphere and strong solidarity.',
   '["Funke Akindele", "Toyin Abraham"]'::jsonb,
   '#be185d', 'female'),
  
  ('Independence Hall', 'Katanga Republic', 'Liberty and Service',
   'The "Headquarters of Aluta". Established in 1961. Katangese are the fiercest defenders of student rights and the custodians of the union''s radical traditions.',
   '["Segun Okeowo", "Sowore Omoyele"]'::jsonb,
   '#b91c1c', 'male'),
  
  ('Nnamdi Azikiwe Hall', 'Baluba Kingdom', 'Zikism',
   'Named after Nigeria''s first President. It is the largest hall in UI. Famous for "Aroism", Gyration, and a unique culture that blends humor with intellect.',
   '["Basketmouth", "Godswill Akpabio"]'::jsonb,
   '#d97706', 'male'),
  
  ('Obafemi Awolowo Hall', 'Awo', 'Discipline and Integrity',
   'One of the largest student accommodations in West Africa. It houses both undergraduate and postgraduate students and is a city within a city.',
   '["Biyi Bandele"]'::jsonb,
   '#0f766e', 'mixed');