
DELETE from kiestze_editablefield *;
DELETE from kiestze_useredit *;
DELETE from kiestze_approver *;

ALTER SEQUENCE kiestze_editablefield_id_seq RESTART WITH 1;

INSERT INTO kiestze_editablefield (fieldname) VALUES 
('foto'),
('facebook'),
('linkedin'),
('twitter'),
('website')

ON CONFLICT (fieldname) DO NOTHING;

select * from kiestze_editablefield;

