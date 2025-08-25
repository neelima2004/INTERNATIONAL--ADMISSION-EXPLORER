-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  nationality TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create countries table
CREATE TABLE public.countries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  flag_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create universities table
CREATE TABLE public.universities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  location TEXT,
  ranking INTEGER,
  description TEXT,
  programs TEXT[],
  tuition_fee DECIMAL(10,2),
  image_url TEXT,
  website_url TEXT,
  admission_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student enrollments table (for tracking which students went to which universities)
CREATE TABLE public.student_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  enrollment_year INTEGER,
  program TEXT,
  status TEXT DEFAULT 'enrolled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_enrollments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for countries (public read access)
CREATE POLICY "Countries are viewable by everyone" 
ON public.countries 
FOR SELECT 
USING (true);

-- Create RLS policies for universities (public read access)
CREATE POLICY "Universities are viewable by everyone" 
ON public.universities 
FOR SELECT 
USING (true);

-- Create RLS policies for student enrollments
CREATE POLICY "Users can view their own enrollments" 
ON public.student_enrollments 
FOR SELECT 
USING (auth.uid() = student_id);

CREATE POLICY "Users can create their own enrollments" 
ON public.student_enrollments 
FOR INSERT 
WITH CHECK (auth.uid() = student_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_universities_updated_at
  BEFORE UPDATE ON public.universities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample countries
INSERT INTO public.countries (name, code) VALUES
  ('United States', 'US'),
  ('United Kingdom', 'UK'),
  ('Canada', 'CA'),
  ('Australia', 'AU'),
  ('Germany', 'DE'),
  ('France', 'FR'),
  ('Netherlands', 'NL'),
  ('Sweden', 'SE'),
  ('Singapore', 'SG'),
  ('Japan', 'JP');

-- Insert sample universities
INSERT INTO public.universities (name, country_id, location, ranking, description, programs, tuition_fee, image_url) 
SELECT 
  'Harvard University',
  c.id,
  'Cambridge, Massachusetts',
  1,
  'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.',
  ARRAY['Business', 'Medicine', 'Law', 'Engineering'],
  54000.00,
  '/placeholder.svg'
FROM public.countries c WHERE c.code = 'US'
UNION ALL
SELECT 
  'Oxford University',
  c.id,
  'Oxford, England',
  2,
  'The University of Oxford is the oldest university in the English-speaking world.',
  ARRAY['Philosophy', 'Medicine', 'Law', 'Literature'],
  45000.00,
  '/placeholder.svg'
FROM public.countries c WHERE c.code = 'UK'
UNION ALL
SELECT 
  'University of Toronto',
  c.id,
  'Toronto, Ontario',
  18,
  'The University of Toronto is a public research university in Toronto, Ontario, Canada.',
  ARRAY['Engineering', 'Medicine', 'Business', 'Computer Science'],
  35000.00,
  '/placeholder.svg'
FROM public.countries c WHERE c.code = 'CA';