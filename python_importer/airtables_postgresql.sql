INSERT INTO kiestze_editablefield (fieldname) VALUES 
('foto'),
('facebook'),
('linkedin'),
('twitter'),
('website')
;





ON CONFLICT (id) DO NOTHING;
INSERT INTO public.kiestze_useredit(guid, field, accepted_date, suggested_value, politieker_id) VALUES

('0b3157fe-4b61-4b35-a1b1-f994781597c6', 'foto', '2018-07-24 16:37:15', 'https://dl.airtable.com/dILzuOs2TjGjOVO9wU9M_large_10750086_1546904588884506_9222424052202976103_o.jpg', 22360),
('c9dc7056-9e94-4844-bbbc-6bf427e96e50', 'facebook', '2018-07-24 16:37:15', 'https://www.facebook.com/profile.php?id=100006949396969', 22360),
('801ba354-8054-4ef8-af64-c303ac609b0c', 'foto', '2018-07-24 16:37:15', 'https://dl.airtable.com/p1dFtNZySQExPULjw56b_large_0%20(1).jpeg', 15045),
('9e7c42ce-f174-4128-8379-f56bfbb5e43c', 'linkedin', '2018-07-24 16:37:15', 'https://www.linkedin.com/in/jan-watteeuw-b9817a58/', 15045),
('ff133e62-a46c-4034-82e7-1419b040df76', 'foto', '2018-07-24 16:37:15', 'https://dl.airtable.com/kNKbR6RrQYObkDR2fAvk_large_Jos-Emmerechts-Meise.jpg', 22281),
('ee96e726-d3e4-4825-8346-5cd2fd455311', 'facebook', '2018-07-24 16:37:15', 'https://www.facebook.com/jos.emmerechts', 22281),
('39da5f92-4584-4308-9c8d-c2c731f0a926', 'linkedin', '2018-07-24 16:37:15', 'https://www.linkedin.com/in/marieke-cloet-10728649/', 14983),
('675a6def-00d0-4e80-a3ea-ed9883be5845', 'foto', '2018-07-24 16:37:15', 'https://dl.airtable.com/bNiGmX6CRxOHJewTjteD_large_unnamed.jpg', 15016),
('0621a222-4354-4623-b824-340544d5c44f', 'twitter', '2018-07-24 16:37:15', 'https://twitter.com/decroix_filip', 15016),
('44a80ffd-ff61-4f66-bb94-9e64c8ff5a65', 'foto', '2018-07-24 16:37:15', 'https://dl.airtable.com/tQopgsToTtCQnoOI6Pia_large__MG_6227_400x400.jpg', 22308),
('cd1ac8f3-4bb6-4cfa-867a-845b089153b0', 'twitter', '2018-07-24 16:37:15', 'https://twitter.com/snauwaertdirk', 22308),
('5882f2ba-c504-47b1-aa4a-45631f745398', 'foto', '2018-07-24 16:37:15', 'https://dl.airtable.com/bnG1rLk2R7SkaXuRd4xb_large_E_SCFpVT_400x400.jpg', 15101),
('50cedd4b-816a-450d-bbdf-f6a04e9b5cd5', 'twitter', '2018-07-24 16:37:15', 'https://twitter.com/nancysix ', 15101),
('6166bffc-9ecb-4814-97aa-79ad861d5592', 'foto', '2018-07-24 16:37:15', 'https://dl.airtable.com/xawsD8gzTmKoq9ZmIQfU_large_763.jpeg', 15078),
('6bad14a1-2944-4b29-94b3-589cdf3034ab', 'facebook', '2018-07-24 16:37:15', 'https://www.facebook.com/ives.goudeseune', 15078),
('ba48c4b6-7839-4d3c-b670-20b92aec4d92', 'foto', '2018-07-24 16:37:15', 'https://dl.airtable.com/G6Nv1fUQyfjYzvk5aFwu_large_2074.jpg', 22272),
('89a92711-f756-496a-b0b5-6a4ece815305', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/dUIjzSt7QTfOKxxQ2lSD_large_3517913.jpg', 23499),
('460a81c5-e6f4-4485-a9a0-ba5f9a6fcfd2', 'twitter', '2018-07-24 16:37:16', 'https://twitter.com/sigridverhaeghe', 23499),
('530f499f-8e05-4985-b585-135b228e34e9', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/1VMOQexrQhybnzxS4pcj_large_fk_eff_11_geert_vanlangendonck_800_x_800.jpg', 15055),
('29cdbab9-27a5-4491-a85a-1920661f8b62', 'facebook', '2018-07-24 16:37:16', 'https://www.facebook.com/geert.vanlangendonck', 15055),
('14203e7d-6259-423e-9794-11604852d465', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/M0F7d527SYKhtBr5T85a_large_000000_1934.jpg', 22367),
('589ea7cd-36bd-4d58-b4ff-52f9350c83bf', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/pwPr48OlT3CALvJLuMMN_large_ffd00ee6-dd2f-41ef-8a67-f8d79a328ede.jpg', 23497),
('abd06213-d3b8-447b-b882-2845f747bf3f', 'facebook', '2018-07-24 16:37:16', 'https://www.facebook.com/thomas.manhout', 23497),
('74c5752a-95b3-44c9-a074-324ba1a27eb9', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/kfL06Lb6RqOfMCZDPGgg_large_ZbdJiU28_400x400.jpg', 15060),
('6fabedbc-5219-459c-9f98-9c3aa820851d', 'twitter', '2018-07-24 16:37:16', 'https://twitter.com/ludovicide ', 15060),
('a46f887e-395c-4dd9-a066-e0d5b884fd48', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/1s1UWu7TTE29rtLMeEQI_large_size_400_534_1221.jpg', 22325),
('c919d90e-cdb5-4557-9096-8a56329edee7', 'facebook', '2018-07-24 16:37:16', 'https://www.facebook.com/gerda.vandenbrande?hc_ref=ARQsvydYwuE9GMlbUd_SSMkO3Z0DBsLqVBkgbN2Q88VshH8F5VcYbnd_HkIRas0ZJbg', 22325),
('ca374e60-6d55-4b63-99c0-6f1cf2818b13', 'linkedin', '2018-07-24 16:37:16', 'https://www.linkedin.com/in/johan-sanders-9063b2b3/', 15103),
('5a9c291b-91ca-43c6-807d-a409617d61bb', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/arkSWaSQ5ejTzkdMUysc_large_532947_10204754166165539_9199493808763025264_n.jpg', 22268),
('a160e3f9-2870-43d5-9c83-e007dad40fb0', 'facebook', '2018-07-24 16:37:16', 'https://www.facebook.com/adeboeck', 22268),
('6fcf4f28-22a0-4da1-bb49-62df7b50cbf8', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/Y3ZmJfn8Q3SVq41Lx8JB_large_0.jpeg', 14996),
('92282638-45e0-4836-b582-30d335b00331', 'linkedin', '2018-07-24 16:37:16', 'https://www.linkedin.com/in/mattie-archie-04b42075/', 14996),
('e60d6558-66d2-4034-9eb0-eee5f80ae177', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/IwNxlF0gQiOWGBRpOLyy_large_lawyer-roel-anciaux-brussel-nl-21927.jpeg', 22376),
('0778ab8c-332c-4008-99de-a89eed1abf1a', 'twitter', '2018-07-24 16:37:16', 'https://twitter.com/roelanciaux', 22376),
('e832ffd7-8fec-4024-b7d8-eba24ccef845', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/QumAKFiwQLqaUBxmm6yR_large_yves-leterme.png', 14975),
('6d9d1370-d920-4f0f-b0a1-dc1bc01a0a7d', 'twitter', '2018-07-24 16:37:16', 'https://twitter.com/yleterme ', 14975),
('2888b0b7-6fc6-46fa-96a2-85b3ee62e56d', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/vfTEgylgSaCXH6JM7TJc_large_1064.JPG', 22301),
('e92f2bca-a0c6-4f1e-bf2b-e6c3af11301c', 'facebook', '2018-07-24 16:37:16', 'https://www.facebook.com/mariejeanne.thaelemans', 22301),
('7aa540da-8523-4f3e-b852-ee5f07303a45', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/K4DgauaRkmXbSQ9haOmB_large_19452920_10212003884106799_2485718046307366118_o.jpg', 14997),
('d45034fa-5373-40be-a68c-0932a3360db2', 'twitter', '2018-07-24 16:37:16', 'https://twitter.com/ieperlink?lang=nl', 14997),
('1ff085ca-bc7c-4c2b-a1d4-a9cd462ae66d', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/Vx1hFbFcQF60gw1r6Cs4_large_GEERT_KL.jpg', 23551),
('c8b93ebb-b9ab-4169-8955-1e25f3306046', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/uiF1uzKWTsvKAKs9227Q_large_vincentboel.png', 22380),
('35b72ed3-c7a5-4f19-8521-606c381bf877', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/les1eM9yT5aqxdbrtmyh_large_04_eva_ryde_0.jpg', 14960),
('3f23ba62-a42e-4e12-bf51-b7bdd22035b8', 'linkedin', '2018-07-24 16:37:16', 'https://www.linkedin.com/in/eva-ryde-b68a6514a/ https://www.facebook.com/eva.ryde', 14960),
('a33ac1c0-124b-439a-9709-6be3ff83fe48', 'facebook', '2018-07-24 16:37:16', 'https://www.facebook.com/edwardjimi.demelio', 22386),
('641d2f08-066a-462d-98ac-6aed69d9a9d3', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/zufGC3gMQMSASHaDCtWF_large_dbbed6b8454ead7d74b14cf37bdde92a_400x400.jpeg', 14957),
('e1297633-7829-472b-9b4d-04e735d0ebf9', 'twitter', '2018-07-24 16:37:16', 'https://twitter.com/quincytimperman', 14957),
('d031943b-24cf-496d-8ed9-de5abc0b0c7c', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/OS0gHZTdQrWXfPcj08To_large_jorgennoens_400x400.jpg', 22390),
('9f14586d-753a-447e-a864-eacc267b96cd', 'twitter', '2018-07-24 16:37:16', 'https://twitter.com/jorgnoens', 22390),
('6030e269-667a-4b7f-b9e4-b4190bd2df9b', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/AtV8ZUlTS2qS2YilQsis_large_jdv_mei_2015.jpg', 22319),
('2814940a-120f-4ebd-9897-2e9f3a25796d', 'facebook', '2018-07-24 16:37:16', 'https://www.facebook.com/jonathan.devalck https://twitter.com/DeValckJonathan https://www.linkedin.com/in/jonathan-de-valck-31386171/?trk=hp-identity-name', 22319),
('fe3a280c-6625-4ddf-8372-e52c93127704', 'foto', '2018-07-24 16:37:16', 'https://dl.airtable.com/KBJ1CiNQVOrVvd29C0JQ_large_0JWC1OQY_400x400.jpg', 22351),
('8750d0f3-7a48-4c5a-8c3d-96d7e7575f29', 'twitter', '2018-07-24 16:37:16', 'https://twitter.com/deklippelv', 22351),
('63e4c592-8c01-4476-bdd7-c8bb594ec01c', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/c91tCcCeSUi2P1wMmILA_large_img_8791.jpg', 4144),
('b2518c09-ec82-4e68-89c0-0d8a296c30e1', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/EE41loQJ2T8B8PRiDEtQ_large_Ward%20V_KL.jpg', 23550),
('1892c078-11d3-45ed-a444-5699a581ba9e', 'twitter', '2018-07-24 16:37:17', 'https://twitter.com/wardvergote', 23550),
('3995482e-6732-4e44-8b70-fa9cb6aae13d', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/WxOFkXinTXSDDKVcKHEk_large_0%20(2).jpeg', 15025),
('00f96a3f-a2d6-4015-9164-7ed9036ae6fd', 'linkedin', '2018-07-24 16:37:17', 'https://www.linkedin.com/in/ann-sophie-himpe-399552157/', 15025),
('ce122a4b-05be-433a-b5d4-7de24ed640ee', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/DoZSNNLDQauezKrSpldC_large_13891913_1052282011476107_4633313021296895257_n.jpg', 23524),
('a6cd7ac1-de26-4448-a800-a1c39d3feddd', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/filip.ameel', 23524),
('e8e8810f-86c8-4b27-86ca-3ae2cb4342e1', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/sW3p5XRhTfyPItyktyMg_large_32581655_10155921287051849_6085737572011606016_o.jpg', 15043),
('42c5710f-3bcd-4f6b-94b7-da73ad0af36f', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/patrick.benoot.9', 15043),
('dded4503-9bda-4d76-90fe-b5dcc2c65164', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/DnhKqMVfS26TYRpOT7rL_large_28378949_10215709386150462_5399797239573209050_n.jpg', 14998),
('656af86e-2ed9-4f8f-8f5f-54101e906b24', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/greet.carle1 https://www.linkedin.com/in/greet-carle-0ab2065b/', 14998),
('0e8584c3-ebbf-44bc-ba75-ad0c0cb1b288', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/io0CSJ6kQzWHG3NPtb3Y_large_WARD%20G_KL.png', 23530),
('fea87c71-0f93-4c5e-a1e7-6f2f97c7eecb', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/ward.gillis', 23530),
('79e2ef36-0cd3-4e80-8a2f-10083f31f45f', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/fEfUBWaTWSQgFhQHaR0X_large_MIA_KL.jpg', 23555),
('a9bc68d0-520f-4671-93ec-40d51c604620', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/mia.wyffels.737', 23555),
('6697938c-f55e-4bb3-9115-7c8277d98892', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/poWTbJayR0WfmYWDWCcL_large_900002801.jpg', 22296),
('7aa409eb-6db4-4a16-8c0c-8ca96da94d04', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/dEARj4HUSSqQkKbJac8D_large_20090716_6262_01.JPG', 14984),
('5af38d2d-8de1-450c-b494-276613802fb3', 'website', '2018-07-24 16:37:17', 'https://www.jandurnez.be/index.php?id=10', 14984),
('8d93986c-b867-4bd8-bfb5-30ea8810f28a', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/wjim0bLFQmieQDAsUAKe_large_35893223_1846139242115530_1440308349181624320_n.jpg', 15093),
('034f2ebe-bfd6-4119-871b-90cbe1df04ce', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/erwin.balduyck', 15093),
('7891ea1d-f07b-42d3-b795-b443546abd3e', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/f1of1UiJTribYEks8XKw_large_14915279_10210268179694913_2580574294195046019_n.jpg', 23518),
('a41e1f9d-cfbb-4fc2-a8de-a448018c9032', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/vdbgoedele', 23518),
('f642e3a4-f9c1-48a5-87f1-705d59ca771e', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/qfeGVQagQYOGG302r2O1_large_32928287_241731189708073_8841482953851666432_n.jpg', 15098),
('93488c5d-6dcb-4261-910c-2a51a3aa15c3', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/patsy.durnez.5 ', 15098),
('cec3a47d-a9ce-4c83-8964-88caa25cd88c', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/iV0jzNQqTgaSXIL7YmCe_large_289215_4046689178891_548706235_o.jpg', 15034),
('c6922263-c095-4917-8eec-3fe79cc5d5cc', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/karl.thybergin', 15034),
('0a3b3cc1-6d04-48c6-9a57-ec1b078ba5f8', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/9nBmzdqRLiTzG7CW4aCw_large_Mark-Vermont_20090129_0013-2.jpg', 23512),
('ad6243c7-d980-4608-82a7-bebdb9f08512', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/marc.vermont.79', 23512),
('04bdcab9-1e20-4429-acb3-27116e765fe9', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/F2sVHPibTX622Nql68Lx_large__mg_7085.jpg', 22310),
('fc5d3fff-1f71-457c-825d-0a238ff89c1d', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/KPCov1yXRxyzxVOCTSFX_large_IQCYv6SV_400x400.jpeg', 15032),
('05d49285-5e06-4391-ab2a-adb00a2ac871', 'twitter', '2018-07-24 16:37:17', 'https://twitter.com/emmilytalpe', 15032),
('d738bc18-773e-4c3e-896b-78b7441d30d8', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/hGVqeC5zR6emKv2oJvEC_large_266px-Sonja_becq.jpg', 22280),
('7b836b01-5dcf-4a98-92f0-423c238ba4c8', 'website', '2018-07-24 16:37:17', 'http://sonjabecq.tumblr.com/', 22280),
('e5b4ad4e-4e72-419a-8ae0-1d79189dba6d', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/fa2ZRUcgSPGtuOdZ2iSt_large_293124_4443340085578_1768907818_n.jpg', 15063),
('b2fc49d3-1a84-4352-b107-4466c0bbbc8e', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/valentijn.despeghel', 15063),
('cbe68042-93e9-48d6-ae9c-0ece34451bd4', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/hWOvjl2xRpOg2jYmPfR3_large_878.jpg', 22333),
('9cde17c0-1878-4797-bfed-989bbac5f0af', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/paul.vandoorslaer.9?fref=ts', 22333),
('6aac000e-164f-4873-b711-2d1635826553', 'foto', '2018-07-24 16:37:17', 'https://dl.airtable.com/Gm5YU7dqRbmtUgz6T5pW_large_img_8751.jpg', 22343),
('cd5be828-74a2-4a11-8a0d-a65e55495ea7', 'facebook', '2018-07-24 16:37:17', 'https://www.facebook.com/herwig.cornelis', 22343),
('4bd5c94c-d18b-4960-ba8d-d9b21eb43312', 'foto', '2018-07-24 16:37:18', 'https://dl.airtable.com/zdSvhghRRneeEhB5Kt1b_large_Schermafbeelding%202018-07-11%20om%2011.27.54.png', 22295),
('962e58cc-1e37-42e9-bce9-d83c2918a586', 'facebook', '2018-07-24 16:37:18', 'https://www.facebook.com/leticia.sere', 22295)
;




