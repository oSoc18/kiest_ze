INSERT INTO kiestze_editablefield (fieldname) VALUES 
('foto'),
('facebook'),
('linkedin'),
('twitter'),
('website')

ON CONFLICT (fieldname) DO NOTHING;





INSERT INTO public.kiestze_useredit(guid, field, accepted_date, suggested_value, politieker_id) VALUES

('0e4d6390-d869-4440-912d-8545f493a015', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/dILzuOs2TjGjOVO9wU9M_large_10750086_1546904588884506_9222424052202976103_o.jpg', 22360),
('4b901c74-5df3-4f2e-a83a-fb75b3da0086', 'facebook', '2018-07-24 17:00:11', 'https://www.facebook.com/profile.php?id=100006949396969', 22360),
('6a0e0256-97c6-4d33-86ee-ee840bbee5c8', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/p1dFtNZySQExPULjw56b_large_0%20(1).jpeg', 15045),
('68ecfa94-faec-4af4-a097-7aed717530c0', 'linkedin', '2018-07-24 17:00:11', 'https://www.linkedin.com/in/jan-watteeuw-b9817a58/', 15045),
('b7b26d6f-ee9d-4856-9ad8-e0d9eb1bfd9b', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/kNKbR6RrQYObkDR2fAvk_large_Jos-Emmerechts-Meise.jpg', 22281),
('2e33b28b-a670-458f-9eb2-8af8533da160', 'facebook', '2018-07-24 17:00:11', 'https://www.facebook.com/jos.emmerechts', 22281),
('7fa0856f-418b-4e2c-b471-ca8a50df7186', 'linkedin', '2018-07-24 17:00:11', 'https://www.linkedin.com/in/marieke-cloet-10728649/', 14983),
('01bc62c1-d58a-49ee-9bda-da314fa28352', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/bNiGmX6CRxOHJewTjteD_large_unnamed.jpg', 15016),
('c27fd2dd-3cb7-41fa-91f1-79ac81c7c6bf', 'twitter', '2018-07-24 17:00:11', 'https://twitter.com/decroix_filip', 15016),
('3e368c5d-a1e1-441c-9062-40b69ef1f2b5', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/tQopgsToTtCQnoOI6Pia_large__MG_6227_400x400.jpg', 22308),
('4005fe8f-a043-4b9e-af4a-2bf6679300f5', 'twitter', '2018-07-24 17:00:11', 'https://twitter.com/snauwaertdirk', 22308),
('c2bd29f4-f540-4916-b32d-494e581cebcc', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/bnG1rLk2R7SkaXuRd4xb_large_E_SCFpVT_400x400.jpg', 15101),
('3ed76383-e72f-47a8-813b-3649ebef01b4', 'twitter', '2018-07-24 17:00:11', 'https://twitter.com/nancysix ', 15101),
('67c23270-5d8a-46a3-b6b7-3498a7006425', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/xawsD8gzTmKoq9ZmIQfU_large_763.jpeg', 15078),
('f11030f0-dacf-4080-8eb1-fbec9c0731c8', 'facebook', '2018-07-24 17:00:11', 'https://www.facebook.com/ives.goudeseune', 15078),
('ba7565a0-7052-4b9e-bf24-df26b1b2830b', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/G6Nv1fUQyfjYzvk5aFwu_large_2074.jpg', 22272),
('6dfcd09a-01c9-406d-9881-c2ce82bd6506', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/dUIjzSt7QTfOKxxQ2lSD_large_3517913.jpg', 23499),
('1b8bf4a5-7b4b-4ece-9255-ad9a06f81171', 'twitter', '2018-07-24 17:00:11', 'https://twitter.com/sigridverhaeghe', 23499),
('8e301bfe-d2ee-422c-9e65-d71dc138e6e0', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/1VMOQexrQhybnzxS4pcj_large_fk_eff_11_geert_vanlangendonck_800_x_800.jpg', 15055),
('3b6a1f71-7b94-4d6a-986d-c13cebecb0b7', 'facebook', '2018-07-24 17:00:11', 'https://www.facebook.com/geert.vanlangendonck', 15055),
('2a59ef8f-2756-4282-bd93-e911a2b5aee8', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/M0F7d527SYKhtBr5T85a_large_000000_1934.jpg', 22367),
('8d1a25ea-d9a6-4451-afd8-3176d026c530', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/pwPr48OlT3CALvJLuMMN_large_ffd00ee6-dd2f-41ef-8a67-f8d79a328ede.jpg', 23497),
('9c317bba-7042-4121-bc15-eb973c92e436', 'facebook', '2018-07-24 17:00:11', 'https://www.facebook.com/thomas.manhout', 23497),
('f009a857-2ba7-4d37-aeb1-0561fe5a5aeb', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/kfL06Lb6RqOfMCZDPGgg_large_ZbdJiU28_400x400.jpg', 15060),
('0b30f0c0-f890-4df4-96f5-c134b1b822f9', 'twitter', '2018-07-24 17:00:11', 'https://twitter.com/ludovicide ', 15060),
('66cf3451-d52a-4287-af89-5ccd17f5c568', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/1s1UWu7TTE29rtLMeEQI_large_size_400_534_1221.jpg', 22325),
('d68849c5-876e-40f1-bd18-7d35abc838f0', 'facebook', '2018-07-24 17:00:11', 'https://www.facebook.com/gerda.vandenbrande?hc_ref=ARQsvydYwuE9GMlbUd_SSMkO3Z0DBsLqVBkgbN2Q88VshH8F5VcYbnd_HkIRas0ZJbg', 22325),
('c69269f7-8787-43b1-9a1f-798d85e5d09b', 'linkedin', '2018-07-24 17:00:11', 'https://www.linkedin.com/in/johan-sanders-9063b2b3/', 15103),
('8ae049de-26a4-49f7-9ee9-4b6254e74d0e', 'foto', '2018-07-24 17:00:11', 'https://dl.airtable.com/arkSWaSQ5ejTzkdMUysc_large_532947_10204754166165539_9199493808763025264_n.jpg', 22268),
('90f6f987-4142-4b47-b9d3-709ea1372a72', 'facebook', '2018-07-24 17:00:11', 'https://www.facebook.com/adeboeck', 22268),
('0f622ecb-d8c4-4dbd-abf5-908b3dcc14c9', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/Y3ZmJfn8Q3SVq41Lx8JB_large_0.jpeg', 14996),
('9e4221ee-ca20-47bd-b509-e5fbd4d10181', 'linkedin', '2018-07-24 17:00:12', 'https://www.linkedin.com/in/mattie-archie-04b42075/', 14996),
('5c600571-7100-46a4-bf62-7feef96a629f', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/IwNxlF0gQiOWGBRpOLyy_large_lawyer-roel-anciaux-brussel-nl-21927.jpeg', 22376),
('f8d6452b-25e7-42d8-adc1-3444dde97ea7', 'twitter', '2018-07-24 17:00:12', 'https://twitter.com/roelanciaux', 22376),
('72f11c9f-feec-4e15-ad17-613795aa3473', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/QumAKFiwQLqaUBxmm6yR_large_yves-leterme.png', 14975),
('75d937e8-f110-485c-9f5f-78fa000de905', 'twitter', '2018-07-24 17:00:12', 'https://twitter.com/yleterme ', 14975),
('da30ae43-91ad-400c-8a67-a35f31e007ba', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/vfTEgylgSaCXH6JM7TJc_large_1064.JPG', 22301),
('112d3731-121e-4889-8567-f5daf70abb12', 'facebook', '2018-07-24 17:00:12', 'https://www.facebook.com/mariejeanne.thaelemans', 22301),
('33d2b499-40a9-46c3-99a6-9a4286c42e5e', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/K4DgauaRkmXbSQ9haOmB_large_19452920_10212003884106799_2485718046307366118_o.jpg', 14997),
('a9a788f3-2fd7-48b9-b6ce-9c3768f651fe', 'twitter', '2018-07-24 17:00:12', 'https://twitter.com/ieperlink?lang=nl', 14997),
('da21fab5-ce36-458d-bd7e-5399bc5310cb', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/Vx1hFbFcQF60gw1r6Cs4_large_GEERT_KL.jpg', 23551),
('9a9abf34-3083-4e53-b730-c29763c0cb93', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/uiF1uzKWTsvKAKs9227Q_large_vincentboel.png', 22380),
('30902209-aeb6-4979-ae6e-fe9f04c24f6c', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/les1eM9yT5aqxdbrtmyh_large_04_eva_ryde_0.jpg', 14960),
('ad74f0d4-6f5a-49b5-aa8b-c20c3591ccbb', 'linkedin', '2018-07-24 17:00:12', 'https://www.linkedin.com/in/eva-ryde-b68a6514a/ https://www.facebook.com/eva.ryde', 14960),
('2b9902c0-ab34-4757-b094-f2fc30172671', 'facebook', '2018-07-24 17:00:12', 'https://www.facebook.com/edwardjimi.demelio', 22386),
('600d279f-b6ec-4f72-9fa6-1fb33c27df8f', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/zufGC3gMQMSASHaDCtWF_large_dbbed6b8454ead7d74b14cf37bdde92a_400x400.jpeg', 14957),
('d7546029-d6a1-4938-8d74-27a054947c07', 'twitter', '2018-07-24 17:00:12', 'https://twitter.com/quincytimperman', 14957),
('b16f4dfb-7063-43a6-b92e-d0712b4b03cf', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/OS0gHZTdQrWXfPcj08To_large_jorgennoens_400x400.jpg', 22390),
('78d5d048-fb72-4ac9-8632-6e43e900680b', 'twitter', '2018-07-24 17:00:12', 'https://twitter.com/jorgnoens', 22390),
('941bb4c6-dae8-4d38-ad71-cd3998571796', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/AtV8ZUlTS2qS2YilQsis_large_jdv_mei_2015.jpg', 22319),
('f233f535-582c-4bc3-bffe-16be1ba13520', 'facebook', '2018-07-24 17:00:12', 'https://www.facebook.com/jonathan.devalck https://twitter.com/DeValckJonathan https://www.linkedin.com/in/jonathan-de-valck-31386171/?trk=hp-identity-name', 22319),
('39f06db0-b41c-45ae-9f97-51f41acb871b', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/KBJ1CiNQVOrVvd29C0JQ_large_0JWC1OQY_400x400.jpg', 22351),
('2ed4c03f-7270-4320-8bcf-7f7a8c16875f', 'twitter', '2018-07-24 17:00:12', 'https://twitter.com/deklippelv', 22351),
('9c0771f6-dbb8-4086-a21c-dfd3a9693242', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/c91tCcCeSUi2P1wMmILA_large_img_8791.jpg', 4144),
('4533e51f-e864-4ae7-92ac-e9a8d5f74605', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/EE41loQJ2T8B8PRiDEtQ_large_Ward%20V_KL.jpg', 23550),
('824f60b4-7f94-453b-aa0c-f87453edb627', 'twitter', '2018-07-24 17:00:12', 'https://twitter.com/wardvergote', 23550),
('fd8f3e26-a73d-43f1-a582-9c4404237767', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/WxOFkXinTXSDDKVcKHEk_large_0%20(2).jpeg', 15025),
('5b8e73a6-5fbe-4176-a09d-85650a2204e5', 'linkedin', '2018-07-24 17:00:12', 'https://www.linkedin.com/in/ann-sophie-himpe-399552157/', 15025),
('e83ac493-0ada-4b69-b07c-5cf43bebdcc4', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/DoZSNNLDQauezKrSpldC_large_13891913_1052282011476107_4633313021296895257_n.jpg', 23524),
('c76ea8e6-2d01-44ad-a224-6fdef40ccc31', 'facebook', '2018-07-24 17:00:12', 'https://www.facebook.com/filip.ameel', 23524),
('0161fccc-03a8-459e-8181-077e0eb0e505', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/sW3p5XRhTfyPItyktyMg_large_32581655_10155921287051849_6085737572011606016_o.jpg', 15043),
('14a3c189-4f15-4923-a367-c2f2a0087609', 'facebook', '2018-07-24 17:00:12', 'https://www.facebook.com/patrick.benoot.9', 15043),
('ac1d86e9-9f29-48f7-93fc-b84559d298a1', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/DnhKqMVfS26TYRpOT7rL_large_28378949_10215709386150462_5399797239573209050_n.jpg', 14998),
('ffdee62f-ea42-4071-a879-3e19ecf76a02', 'facebook', '2018-07-24 17:00:12', 'https://www.facebook.com/greet.carle1 https://www.linkedin.com/in/greet-carle-0ab2065b/', 14998),
('9429a3b6-3d9f-4d09-8efb-b6d7d7386c50', 'foto', '2018-07-24 17:00:12', 'https://dl.airtable.com/io0CSJ6kQzWHG3NPtb3Y_large_WARD%20G_KL.png', 23530),
('10d0f389-b971-4d46-a51a-6226d7f20c24', 'facebook', '2018-07-24 17:00:12', 'https://www.facebook.com/ward.gillis', 23530),
('7b7d4572-7016-4ca8-acff-1e6b57a6fb6e', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/fEfUBWaTWSQgFhQHaR0X_large_MIA_KL.jpg', 23555),
('0cf99789-94fe-4e51-a25b-1bec31922ccd', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/mia.wyffels.737', 23555),
('3419d263-5df1-45d7-96a6-d3c4d2ce2ebe', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/poWTbJayR0WfmYWDWCcL_large_900002801.jpg', 22296),
('a91ae230-7a86-4508-a5b0-bc0e0c394403', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/dEARj4HUSSqQkKbJac8D_large_20090716_6262_01.JPG', 14984),
('6906dc06-ee2c-486a-806d-9f1e727085db', 'website', '2018-07-24 17:00:13', 'https://www.jandurnez.be/index.php?id=10', 14984),
('dc067e5b-14c5-4561-970b-ed3cd3979b50', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/wjim0bLFQmieQDAsUAKe_large_35893223_1846139242115530_1440308349181624320_n.jpg', 15093),
('dffe6ed7-d082-4a11-955d-f647dee57877', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/erwin.balduyck', 15093),
('8943ba95-acd4-43bf-8081-3208e83014ea', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/f1of1UiJTribYEks8XKw_large_14915279_10210268179694913_2580574294195046019_n.jpg', 23518),
('302c6058-51c5-4381-9efe-138292ba89ea', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/vdbgoedele', 23518),
('ff1666e3-0c94-4013-b9c6-bc0646cb590c', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/qfeGVQagQYOGG302r2O1_large_32928287_241731189708073_8841482953851666432_n.jpg', 15098),
('c9af4f60-b15d-4c50-b9e0-1ce8bd3c88e6', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/patsy.durnez.5 ', 15098),
('76765581-c78b-4f03-8567-bb6b37175d92', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/iV0jzNQqTgaSXIL7YmCe_large_289215_4046689178891_548706235_o.jpg', 15034),
('f1d08459-fb71-4dab-9cf9-60c373f6935b', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/karl.thybergin', 15034),
('4bc8ab1e-32a3-480a-82e6-d12c4c213ef0', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/9nBmzdqRLiTzG7CW4aCw_large_Mark-Vermont_20090129_0013-2.jpg', 23512),
('05679da1-2ee6-444c-8746-01ca31b4109b', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/marc.vermont.79', 23512),
('1581805e-b674-4632-bad0-0e0cddf8a00a', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/F2sVHPibTX622Nql68Lx_large__mg_7085.jpg', 22310),
('b725382c-f69d-42b1-ae51-6bbcd7fc1303', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/KPCov1yXRxyzxVOCTSFX_large_IQCYv6SV_400x400.jpeg', 15032),
('896db773-f3cf-4de1-b3b4-ae6b2e5a58cc', 'twitter', '2018-07-24 17:00:13', 'https://twitter.com/emmilytalpe', 15032),
('2d55ea15-3856-4d96-8e2d-4c1353bcf848', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/hGVqeC5zR6emKv2oJvEC_large_266px-Sonja_becq.jpg', 22280),
('b3213e22-41c8-452e-bcaf-974079347083', 'website', '2018-07-24 17:00:13', 'http://sonjabecq.tumblr.com/', 22280),
('090d1be9-52d3-4fbe-8c5e-4d44ea7a5aba', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/fa2ZRUcgSPGtuOdZ2iSt_large_293124_4443340085578_1768907818_n.jpg', 15063),
('9e7a215b-3eb9-4285-8a9c-891309be88d6', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/valentijn.despeghel', 15063),
('9e25a1d5-268b-4148-97a0-d0b39932ae3e', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/hWOvjl2xRpOg2jYmPfR3_large_878.jpg', 22333),
('d738a0fa-8f5c-4ba7-9699-eb827c438a04', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/paul.vandoorslaer.9?fref=ts', 22333),
('f5444f0b-f853-463d-ba4a-7c443ce8534a', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/Gm5YU7dqRbmtUgz6T5pW_large_img_8751.jpg', 22343),
('c7ba83ef-d191-4047-88b3-f84085ae0674', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/herwig.cornelis', 22343),
('0fdf6ef4-2872-4c2c-ad24-4f8dfc5ff840', 'foto', '2018-07-24 17:00:13', 'https://dl.airtable.com/zdSvhghRRneeEhB5Kt1b_large_Schermafbeelding%202018-07-11%20om%2011.27.54.png', 22295),
('2358d39d-f59c-4bec-a543-106208c25491', 'facebook', '2018-07-24 17:00:13', 'https://www.facebook.com/leticia.sere', 22295)
;




