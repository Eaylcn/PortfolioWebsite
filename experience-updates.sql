-- =============================================
-- EXPERIENCE UPDATE
-- Run this in Supabase SQL Editor
-- =============================================

DELETE FROM experiences;

INSERT INTO experiences (title, company, period, description, is_visible, sort_order) VALUES
('QA Engineer', 'ERIKLABS', '07.10.2024 – 06.10.2025',
 ARRAY['Provided QA consultancy at ATP for the Tradesoft project (mobile stock trading application).',
       'Designed and automated regression and functional tests using Cucumber (BDD) with Java.',
       'Performed API testing with RestAssured, Karate and Postman.',
       'Integrated automated tests into the CI/CD pipeline.',
       'Later contributed as a QA Engineer in a web project, supporting manual test processes and ensuring product quality.'],
 true, 1),
('Associate QA Engineer', 'BLUECLOUD', '06.11.2023 – 27.09.2024',
 ARRAY['Embedded in an agile team; actively shaped sprint priorities by surfacing quality risks early in the planning cycle.',
       'Owned regression and UAT testing for the InXpress project; ensured new features met acceptance criteria before release.',
       'Bridged communication between developers and stakeholders on defect severity and product impact.',
       'Developed automated BDD tests with Cucumber and Gherkin.',
       'Automated CI/CD processes with Jenkins.'],
 true, 2),
('QA Automation Engineer Trainee', 'FEEDBACKFRUITS', '20.02.2023 – 18.08.2023',
 ARRAY['Specialized in frontend UI acceptance testing. Evaluated user-facing behavior against product requirements.',
       'Built expertise in Ember.js-based test flows; contributed to test coverage for a SaaS EdTech platform.'],
 true, 3),
('QA Automation Engineer Intern', 'HUAWEI', '26.12.2022 – 17.02.2023',
 ARRAY['Worked in the QuickApp project''s Test and Automation team.',
       'Performed mobile tests on QuickApp IDE.',
       'Utilized DeviceFarmer with Docker for physical mobile device testing.'],
 true, 4),
('QA Automation Engineer Intern', 'IBTECH', '16.05.2022 – 16.11.2022',
 ARRAY['Set up test automation projects; gained hands-on experience with Selenium, Appium and Robot Framework.'],
 true, 5);

-- DONE!
