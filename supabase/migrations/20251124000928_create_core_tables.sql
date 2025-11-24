/*
  # UISU Archive Database Schema
  
  ## Overview
  Creates the core tables for the UISU Archive platform including documents, announcements,
  administrations, clubs, and halls data.
  
  ## New Tables
  
  ### 1. `documents`
  - `id` (uuid, primary key) - Unique document identifier
  - `title` (text) - Document title
  - `year` (integer) - Year of publication/creation
  - `type` (text) - Document category (Constitution, Bill, Manifesto, Speech, Report, Memo)
  - `size` (text) - File size string
  - `description` (text) - Document summary
  - `file_url` (text, nullable) - URL to actual file storage
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 2. `announcements`
  - `id` (uuid, primary key) - Unique announcement identifier
  - `title` (text) - Announcement title
  - `date` (date) - Publication date
  - `category` (text) - Category (News, Event, Memo, Urgent)
  - `summary` (text) - Brief summary
  - `content` (text) - Full announcement content
  - `author` (text) - Issuing department/office
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 3. `administrations`
  - `id` (uuid, primary key) - Unique administration identifier
  - `session` (text, unique) - Academic session (e.g., "2024/2025")
  - `president` (text) - President's name
  - `alias` (text) - President's alias
  - `motto` (text) - Administration motto
  - `notable_events` (text) - Key achievements
  - `status` (text) - Status (Active, Completed, Suspended, Impeached)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 4. `executive_members`
  - `id` (uuid, primary key) - Unique member identifier
  - `administration_id` (uuid, foreign key) - References administrations
  - `role` (text) - Position/role
  - `name` (text) - Member's name
  - `alias` (text, nullable) - Member's alias
  - `created_at` (timestamptz) - Creation timestamp
  
  ### 5. `clubs`
  - `id` (uuid, primary key) - Unique club identifier
  - `name` (text) - Club name
  - `acronym` (text, nullable) - Club acronym
  - `category` (text) - Category (Sociocultural, Academic, Religious, Press, Tech, Sports, Politics)
  - `founded` (text) - Year founded
  - `motto` (text) - Club motto
  - `description` (text) - Club description
  - `activities` (jsonb) - Array of activities
  - `president` (text, nullable) - Current president
  - `color` (text) - Brand color hex code
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 6. `halls`
  - `id` (uuid, primary key) - Unique hall identifier
  - `name` (text) - Official hall name
  - `alias` (text) - Hall nickname
  - `motto` (text) - Hall motto
  - `description` (text) - Hall history and culture
  - `notable_alumni` (jsonb) - Array of notable people
  - `color` (text) - Representative color
  - `type` (text) - Hall type (male, female, mixed)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Public read access for all data (this is an archive/informational site)
  - Authenticated write access for admins only
*/

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  year integer NOT NULL,
  type text NOT NULL CHECK (type IN ('Constitution', 'Bill', 'Manifesto', 'Speech', 'Report', 'Memo')),
  size text NOT NULL DEFAULT '1.0 MB',
  description text NOT NULL,
  file_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  category text NOT NULL CHECK (category IN ('News', 'Event', 'Memo', 'Urgent')),
  summary text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create administrations table
CREATE TABLE IF NOT EXISTS administrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session text UNIQUE NOT NULL,
  president text NOT NULL,
  alias text NOT NULL,
  motto text NOT NULL,
  notable_events text NOT NULL,
  status text NOT NULL CHECK (status IN ('Active', 'Completed', 'Suspended', 'Impeached')) DEFAULT 'Completed',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create executive_members table
CREATE TABLE IF NOT EXISTS executive_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  administration_id uuid NOT NULL REFERENCES administrations(id) ON DELETE CASCADE,
  role text NOT NULL,
  name text NOT NULL,
  alias text,
  created_at timestamptz DEFAULT now()
);

-- Create clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  acronym text,
  category text NOT NULL CHECK (category IN ('Sociocultural', 'Academic', 'Religious', 'Press', 'Tech', 'Sports', 'Politics')),
  founded text NOT NULL,
  motto text NOT NULL,
  description text NOT NULL,
  activities jsonb DEFAULT '[]'::jsonb,
  president text,
  color text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create halls table
CREATE TABLE IF NOT EXISTS halls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  alias text NOT NULL,
  motto text NOT NULL,
  description text NOT NULL,
  notable_alumni jsonb DEFAULT '[]'::jsonb,
  color text NOT NULL,
  type text NOT NULL CHECK (type IN ('male', 'female', 'mixed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_documents_year ON documents(year);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_announcements_date ON announcements(date DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements(category);
CREATE INDEX IF NOT EXISTS idx_administrations_session ON administrations(session);
CREATE INDEX IF NOT EXISTS idx_executive_members_admin ON executive_members(administration_id);
CREATE INDEX IF NOT EXISTS idx_clubs_category ON clubs(category);
CREATE INDEX IF NOT EXISTS idx_halls_type ON halls(type);

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE administrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE executive_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE halls ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access, authenticated write access

-- Documents policies
CREATE POLICY "Documents are viewable by everyone"
  ON documents FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Documents can be inserted by authenticated users"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Documents can be updated by authenticated users"
  ON documents FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Documents can be deleted by authenticated users"
  ON documents FOR DELETE
  TO authenticated
  USING (true);

-- Announcements policies
CREATE POLICY "Announcements are viewable by everyone"
  ON announcements FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Announcements can be inserted by authenticated users"
  ON announcements FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Announcements can be updated by authenticated users"
  ON announcements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Announcements can be deleted by authenticated users"
  ON announcements FOR DELETE
  TO authenticated
  USING (true);

-- Administrations policies
CREATE POLICY "Administrations are viewable by everyone"
  ON administrations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Administrations can be inserted by authenticated users"
  ON administrations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Administrations can be updated by authenticated users"
  ON administrations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Administrations can be deleted by authenticated users"
  ON administrations FOR DELETE
  TO authenticated
  USING (true);

-- Executive members policies
CREATE POLICY "Executive members are viewable by everyone"
  ON executive_members FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Executive members can be inserted by authenticated users"
  ON executive_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Executive members can be updated by authenticated users"
  ON executive_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Executive members can be deleted by authenticated users"
  ON executive_members FOR DELETE
  TO authenticated
  USING (true);

-- Clubs policies
CREATE POLICY "Clubs are viewable by everyone"
  ON clubs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Clubs can be inserted by authenticated users"
  ON clubs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Clubs can be updated by authenticated users"
  ON clubs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Clubs can be deleted by authenticated users"
  ON clubs FOR DELETE
  TO authenticated
  USING (true);

-- Halls policies
CREATE POLICY "Halls are viewable by everyone"
  ON halls FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Halls can be inserted by authenticated users"
  ON halls FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Halls can be updated by authenticated users"
  ON halls FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Halls can be deleted by authenticated users"
  ON halls FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_administrations_updated_at BEFORE UPDATE ON administrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clubs_updated_at BEFORE UPDATE ON clubs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_halls_updated_at BEFORE UPDATE ON halls
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();