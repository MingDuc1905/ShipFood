USE dbFoody
INSERT INTO tbUser (username, pwd, loaitaikhoan, sdt, vitien,email,trangthai)
VALUES 
  ('tranthib', 'abcdef', N'Khách hàng', '0987654321', 2000,'tranthib@example.com',1),
  ('levanc', 'qwerty', N'Khách hàng', '0901234567', 1500, 'levanc@example.com',1),
  ('shippery', 'shipy456', N'Shipper', '0955555555', 1000,'shippery@gmail.com',1),
  ('shipperz', 'shipz789', N'Shipper', '0966666666', 1200,'shipperz@gmail.com',1),
  ('phamthid', 'xyz123', N'Khách hàng', '0977777777', 1800, 'phamthid@example.com',1),  
  ('konekopizza', 'konekopizza', N'Quán ăn', '0922227262', 10000,'konekopizza@gmail.com',1),
  ('com1990nvs', 'com1990', N'Quán ăn', '0632563451', 10000000, 'com1990@gmail.com',1),
  ('bundaugiadi', 'com1990', N'Quán ăn', '0632586299', 50000000, 'bundaugiadi@gmail.com',1),
  ('quanchayanlactam', 'anlactampdl', N'Quán ăn', '0986123487', 4000000, 'chayanlactam@gmail.com',1),
  ('changanuongbahong', 'bahong123', N'Quán ăn', '0728973833', 130000000, 'changanuongbahong@gmail.com',1),
  ('tralong', 'tralong123', N'Quán ăn', '0286472897', 130000000, 'tralong@gmail.com',1),
  ('bunmambadong', 'badong123', N'Quán ăn', '0905816478', 130000000, 'bunmambadong@gmail.com',1),
  ('danghoanggatre', 'danghoang', N'Quán ăn', '0902123654', 130000000, 'danghoanggatre@gmail.com',1),
  ('sushitotoro', 'totoro123', N'Quán ăn', '0286677897', 130000000, 'sushitotoro@gmail.com',1),
  ('43bakery', '43bakery', N'Quán ăn', '0164982356', 30000000, '43bakery@gmail.com',1),
  ('admin1', 'admin1', N'Admin', '0902122309', 0, 'admin1@gmail.com',1),
  ('admin2', 'admin2', N'Admin', '0286673478', 0, 'admin2@gmail.com',1),
  ('admin3', 'admin3', N'Admin', '0383766899', 0, 'admin3@gmail.com',1);

INSERT INTO tbAdmin 
VALUES (16,N'Admin 1'),
		(17,N'Admin 2'),
		(18,N'Admin 3');

INSERT INTO tbQuanAn (userid, tenquanan, diachi, toado, soluotdanhgia, diemdanhgia, trangthai, hinhanh)
VALUES 
	(6, N'Koneko Pizza', N'K57H10/12 Bà Bang Nhãn, P. Hòa Hải,  Quận Ngũ Hành Sơn, Đà Nẵng', geography::STPointFromText('POINT(108.2533 15.9800)', 4326), 75, 4.5, N'Đóng cửa', 'koneko.jpg'),
	(7, N'Cơm 1990 - Ngô Văn Sở', N'61 Ngô Văn Sở, P.Hòa Khánh Nam,  Quận Liên Chiểu, Đà Nẵng', geography::STPointFromText('POINT(108.1585 16.0659)', 4326), 300, 4.7, N'Đang mở cửa', 'com1990.jpg'),
	(8, N'Bún Đậu Mắm Tôm Gia Di - Nguyễn Văn Thoại', N'100 Nguyễn Văn Thoại, P. Mỹ An,  Quận Ngũ Hành Sơn, Đà Nẵng', geography::STPointFromText('POINT(108.2453 16.0483)', 4326), 100, 4.5, N'Đang mở cửa', 'bundaugiadi.jpg'),
	(9, N'Quán Chay An Lạc Tâm - Phan Đăng Lưu', N'117 Phan Đăng Lưu, P. Hòa Cường Bắc,  Quận Hải Châu, Đà Nẵng', geography::STPointFromText('POINT(108.2218 16.0532)', 4326), 100, 4.9, N'Đang mở cửa', 'quanchayanlactam.jpg'),
	(10, N'Chân Gà Nướng Bà Hồng - Trần Cao Vân', N'151 Trần Cao Vân, P. Tam Thuận,  Quận Thanh Khê, Đà Nẵng', geography::STPointFromText('POINT(108.2105 16.0739)', 4326), 400, 4.8, N'Đang mở cửa', 'changanuongbahong.jpg'),
	(11, N'Trà Long - Trà Trái Cây', N'149/11 Lê Đình Lý,  Quận Hải Châu, Đà Nẵng', geography::STPointFromText('POINT(108.2084 16.0630)', 4326), 300, 4.7, N'Đang mở cửa', 'tralong.jpg'),
	(12, N'Bún Mắm Bà Đông', N'145 Huỳnh Thúc Kháng, P. Bình Hiên,  Quận Hải Châu, Đà Nẵng', geography::STPointFromText('POINT(108.2161 16.0742)', 4326), 70, 4.8, N'Đang mở cửa', 'bunmambadong.jpg'),
	(13, N'Đàng Hoàng - Gà Tre Đèo Le', N'90 Huỳnh Ngọc Huệ,  Quận Thanh Khê, Đà Nẵng', geography::STPointFromText('POINT(108.2101 16.0607)', 4326), 100, 5, N'Đang mở cửa', 'danghoang_gatre.jpg'),
	(14, N'Sushi Totoro - Sushi Của Người Việt', N'51 Châu Thị Vĩnh Tế, P. Bắc Mỹ Phú, Quận Ngũ Hành Sơn, Đà Nẵng', geography::STPointFromText('POINT(108.2457 16.0458)', 4326), 200, 4.1, N'Đang mở cửa', 'sushitotoro.jpg'),
	(15, N'43 Bakery - Bánh Mì & Bánh Kem - Ngũ Hành Sơn', N'149 Ngũ Hành Sơn, P. Mỹ An, Quận Ngũ Hành Sơn, Đà Nẵng', geography::STPointFromText('POINT(108.2445 16.0451)', 4326), 200, 4.7, N'Đang mở cửa', '43_bakery.jpg');

INSERT INTO tbShipper (userid, tenshipper, diachi, diemdanhgia, soluotdanhgia, trangthai, hinhanh)
VALUES 
  (3, N'Le Van Y', N'48 Cao Thắng, P.Thanh Bình, Quận Hải Châu, Đà Nẵng',  4.3, 80, N'Không hoạt động', 'shipper_y.jpg'),
  (4, N'Nguyen Thi Z', N'80 Huỳnh Ngọc Huệ,  Quận Thanh Khê, Đà Nẵng',  4.7, 120, N'Đang hoạt động', 'shipper_z.jpg');

INSERT INTO tbKhachHang (userid, tenkh)
VALUES 
  (1, N'Tran Thi B'),
  (2, N'Le Van C'),
  (5, N'Pham Thi D');

INSERT INTO tbDanhMuc (tendanhmuc, mota,hinhanh)
VALUES 
  (N'Đồ ăn', N'Các món ăn khác nhau từ nhiều nền văn hóa và phong cách ẩm thực khác nhau.','do_an.jpg'),
  (N'Đồ uống', N'Các loại đồ uống như nước ngọt, nước trái cây, nước ép, nước lọc, trà, cà phê, cocktail, và nhiều loại đồ uống khác.','do_uong.jpg'),
  (N'Đồ chay', N'Các món ăn không chứa thịt hoặc bất kỳ sản phẩm động vật nào.','do_chay.jpg'),
  (N'Bánh kem', N'Bánh kem là một loại bánh ngọt được làm từ các thành phần như bột mì, đường, trứng và sữa, thường được trang trí với kem và nhiều loại topping khác nhau.','banh_kem.jpg'),
  (N'Tráng miệng', N'Các món như bánh ngọt, kem, hoa quả hoặc các loại đặc sản ngọt khác.','trang_mieng.jpg'),
  (N'Homemade', N'Đồ ăn tự làm được chế biến tại nhà hoặc do các nhà hàng địa phương chế biến một cách thủ công và truyền thống.','homemade.jpg'),
  (N'Vỉa hè', N'Các loại thức ăn đường phố hoặc các món ăn nhanh phổ biến','via_he.jpg'),
  (N'Pizza/Burger', N'Các loại thức ăn nhanh phổ biến, thường được làm từ bánh mì, thịt, rau cải và các loại sốt.','pizza.jpg'),
  (N'Món gà', N'CCác món ăn chế biến từ thịt gà, bao gồm cả các món ăn nhanh và các món truyền thống.','mon_ga.jpg'),
  (N'Món lẩu', N'Một loại món ăn được chế biến trong một nồi lớn có nước dùng nấu sôi, thường bao gồm thịt, hải sản, rau cải và các loại gia vị.','mon_lau.jpg'),
  (N'Sushi', N'Món sushi thường được chế biến từ cơm trộn giấm kết hợp với các nguyên liệu khác nhau như hải sản, cá, hải sản tươi sống.','sushi.jpg'),
  (N'Mì phở', N'Mì phở bao gồm một tô nước dùng sôi và bún mì phở.','mi_pho.jpg'),
  (N'Cơm hộp', N'Cơm hộp thường một phần cơm trắng, kèm theo các loại thức ăn khác nhau được sắp xếp ngăn nắp trong một hộp đựng cơm.','com_hop.jpg');
 -- Quán 6
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  (N'Trà tắc', N'Trà và tắc.', 10000, 'tratac.jpg',6, 2),
  (N'Pizza thập cẩm _ Size M', N'Thịt, xúc xích, ớt chuông, bắp và phô mai', 80000, 'banh_mi_op_la.jpg',6, 8),
  (N'Pizza Bò _ Size M', N'Bò, ớt chuông, bắp và phô mai', 70000, 'pizza.jpg',6, 8),
  (N'Pizza xúc xích _ Size M', N'Xúc xích, bắp, phô mai và ớt chuông', 70000, 'pizza.jpg',6, 8),
  (N'Pizza hải sản _ Size M', N'Tôm, mực, ớt chuông, bắp, phô mai', 95000, 'pizza.jpg',6,  8);
 -- Quán 7
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  (N'Cơm trắng + đậu nhồi thịt sốt cà chua', N'Món phụ ăn kèm', 40000, 'comdaunhoithit.jpg', 7, 13),
  (N'Cơm trắng + sườn xào chua ngọt', N'Món phụ ăn kèm', 40000, 'comsuonxao.jpg',7,13),
  (N'Combo cơm gà rang xả ớt + nước', N'Coca hoặc trà tắc hoặc nước khoáng lạt', 50000, 'combo_comga.jpg', 7, 1),
  (N'Cơm trắng + đậu nhồi thịt + rau xào theo ngày', N'Rau theo mùa', 40000, 'comdaurau.jpg',7, 13),
  (N'Coca',N'Nước ngọt', 10000, 'coca.jpg',7, 2);
  --Quán 8
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  (N'Mẹt A', N'Bao gồm: thịt luộc + đậu khuôn + chả quế + chả cốm', 40000, 'metabc.jpg', 8, 12),
  (N'Mẹt B', N'Bao gồm: Bún, đậu khuôn, thịt, chả cốm, chả quế, nem rán, phèo luộc', 50000, 'metabc.jpg',7,12),
  (N'Mẹt C', N'Bao gồm: bún, đậu khuôn, thịt, chả cốm, dồi, phèo luộc, lưỡi, nem rán', 75000, 'metabc.jpg', 8, 12),
  (N'Mẹt nem nướng cuốn', N'Nem nướng Nha Trang', 70000, 'metnemnuongcuon.jpg',8, 1),
  (N'Mẹt cuốn tá lá',N'Ram tôm đất + Nem nướng Nha Trang', 75000, 'metcuontala.jpg',8, 1);
  --Quán 9
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  (N'Chà Bông Chay', N'Trộn với cơm trắng hoặc thêm rong biển sấy và đậu phộng muối để có món cơm trộn vừa ngon lại không ngấy', 35000, 'cha_bong_chay.jpg', 9, 3),
  (N'Nấm rim mè', N'Có thể trộn gỏi, ăn cùng cơm trắng hoặc ăn vặt đều ngon', 40000, 'nam_rim.jpg',9,13),
  (N'Cơm Ngọc Bích', N'Cơm được trộn với nước cốt dừa và cải bó xôi xay nhuyễn. Ăn kèm là các loại hạt cùng chả rong biển. Mùi vị thơm béo, lạ miệng', 38000, 'com_ngoc_bich.jpg', 9, 3),
  (N'Nấm Sốt Bơ Tỏi', N'Nấm đùi gà được tắm đẫm trong sốt bơ tỏi. Khi ăn sẽ kèm bánh mì. Hương bị béo ngậy, thơm bơ, ngon đến khó tả', 58000, 'nam_sot_bo_toi.jpg',9, 3),
  (N'Mì quảng',N'Hương vị đậm đà được và vị ngọt tự nhiên từ rau củ, quyện với nước nhân mì nấu từ nghệ, thêm vị giòn bùi của đậu phộng và bánh tráng ăn kèm',29000, 'mi_quang_chay.jpg',9, 3)
	--Quán 10
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  (N'Chân gà nướng(3cặp)', N'3 cặp', 39000, 'chan_ga.jpg', 10, 7),
  (N'Cánh gà nướng(2 cánh)', N'2 cánh', 38000, 'canh_ga.jpg', 10, 7),
  (N'Thịt xiên nướng', N'5 xiên', 60000, 'thit_xien_nuong.jpg', 10, 7),
  (N'Chim cút nướng(2con)', N'2 con', 64000, 'chim_cut_nuong.jpg', 10, 7),
  (N'Ếch nướng(2con)', N'2 conp', 56000, 'ech_nuong.jpg', 10, 7);
  --Quán 11
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  (N'TRÀ MÃNG CẦU Sz L', N'Khách thích uống Trà thái xanh thì note lại cho quán. Bánh flan, 3v khúc bạch, 2v pudding, thạch pho mai, củ năng, trân châu đen hoặc trắng, 3v pho mai viên', 33000, 'ts_dac_biet.jpg', 11, 2),
  (N'TRÀ MÃNG CẦU Sz L', N'Món này khách không chọn up sz giùm quán nhé, chỉ có 1sz', 28000, 'tra_mang_cau.jpg',11,2),
  (N'Trà trái cây Nhiệt đới Size L', N'Món này khách không chọn up sz giùm quán nhé, chỉ có 1sz', 28000, 'tra_trai_cay.jpg', 11, 2),
  (N'Trà Long nhãn thái lan Size L', N'Món này khách không chọn up sz giùm quán nhé, chỉ có 1sz. Trà long nhãn + trân châu trắng uống thanh mát', 28000, 'st_thot_not.jpg',11, 2),
  (N'Sữa Tươi THỐT NỐT Rim sz M',N'Ko điều chỉnh đc lượng đường', 35000, 'st_thot_not.jpg',7, 2),
  (N'TRÀ SEN HILAND', N'', 29000, 'tra_sen.jpg',11 ,2 ),
  (N'Trà Dâu Tằm', N'', 20000, 'tra_dau_tam.jpg',11 ,2 ),
  (N'Đặc biệt Trà Trái cây ly 1lit ( khách ghi chú trà )', N'Trà 1 lít gồm : TRÀ ĐÀO - dâu tằm - trà ổi - trà xoài - trà dâu - trà kiwi ( KHÁCH KO NOTE QUÁN SẼ TỰ LÀM )', 30000, 'tra_trai_cay_dbiet.jpg',11 ,2 ),
  (N'LY Trà sữa Pho mai viên + củ năng + t/c', N'3viên pho mai, 1 vá củ năng, 1 vá trân châu', 29000, 'ts_phomai_cunang.jpg', 11,2 ),
  (N'Trà sữa THÁI XANH (full thạch nhà làm+ Flan )', N'Trà sữa + trân châu + thạch nhà làm + Flan', 28000, 'ts_thai_xanh.jpg',11 ,2 );
  --Quán 12
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  (N'Bún mắm thịt heo quay', N'Bún mắm + heo quay', 35000, 'bun_mam_heo_quay.jpg',12 ,12 ),
  (N'Bún mắm thập cẩm', N'Bún mắm thập cẩm', 45000, 'bun_mam_thap_cam.jpg',12 ,12 ),
  (N'Nem - 1 cây', N'1 cây', 5000, 'nem.jpg',12 ,12 ),
  (N'BÚN HEO QUAY ĐẶC BIỆT', N'', 45000, '.jpg',12 , 12),
  (N'Bún mắm nem - chả', N'', 35000, '.jpg',12 ,12 ),
  (N'HEO QUAY CÚNG THẦN TÀI. (100gr)', N'ĐỂ NGUYÊN HOẶC CHẶT MIẾNG NHỎ', 40000, 'heo_quay.jpg',12 , 1),
  (N'Nước mía', N'', 10000, '.jpg',12 ,2 ),
  (N'Thịt heo quay thêm(100gram)', N'', 40000, 'heo_quay.jpg',12 ,1 ),
  (N'Bún mắm thịt heo quay - nem', N'', 40000, '.jpg',12 ,12 ),
  (N'BÚN HEO QUAY ĐẶC BIỆT', N'', 45000, '.jpg',12 ,12 );
  --Quán 13
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  (N'Gà Xé Kèm Xôi Xéo', N'Gà hấp + xôi', 275000, 'ga_xe_xoi.jpg', 13,9 ),
  (N'Gà Quay Đặc Biệt', N'Gà quay nguyên con', 235000, 'ga_quay.jpg', 13 , 9),
  (N'Gà hấp hành', N'Chặt theo yêu cầu', 225000, 'ga_hap_hanh.jpg', 13, 9),
  (N'Gà rang muối', N'Chặt miếng', 265000, 'ga_rang_muoi.jpg', 13,9 ),
  (N'Combo 0,5 Gà quay + Xôi', 'Nửa con gà + xôi', 190000, 'combo_ga_xoi.jpg', 13,9 );
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  --Quán 14
  (N'SASHIMI MIX SỐT CAY KIỂU THÁI LAN', N'CÁ HỒI, CÁ NGỪ, CÁ TRẮNG SỐT CAY KIỂU THÁI', 104000, 'sashimi_kieu_thai.jpg',14 ,11 ),
  (N'Set cá hồi vs lươn tươi ngon', N'Sushi cá hồi 5 viên Sushi cá hồi 9 4 viên Sushi lươn 5 viên', 199000, 'set_cahoi_luon.jpg',14 , 11),
  (N'Set cá hồi tươi ngon', N'Thành phần gồm : - Sashimi cá hồi - Cơm cuộn cá hồi bơ - Sushi cá hồi chín sốt cay', 198000, 'set_ca_hoi.jpg', 14, 11),
  (N'SET NGON - BỔ - RẺ 7', N'Đồ ăn ngon những miếng sashimi tươi ngon, béo ngậy', 189000, 'set_7.jpg', 14, 11),
  (N'Gừng + Rong Nho', N'Gừng đỏ và rong nho', 57000, 'gung_rong_nho.jpg',14 ,11 ),
  (N'SET TAKE AWAY A', N'Maki trứng tôm 8 viên, sushi thanh cua, sushi cá hồi chín sốt cay', 95000, 'set_take_away.jpg',14 ,11 );
 --Quán 15
INSERT INTO tbMonAn (tenmon, mota, giatien, hinhanh,maquanan, madanhmuc)
VALUES
  (N'Bento cake', N'', 110000, 'bento.jpg', 15, 10),
  (N'Bánh kem decor dễ thương', N'Ngẫu nhiên', 250000, 'banh_kem_dthuong.jpg', 15, 10),
  (N'Bông lan trứng muối trang trí sinh nhật size 16', N'Ngẫu nhiên', 220000, 'bong_lan_trung_muoi.jpg', 15, 10),
  (N'Tiramisu mix bông lan trứng muối - set 9 hộp', N'9 hộp', 300000, 'tiramisu_9hop.jpg', 15, 10),
  (N'Bánh kem trẻ em', N'Ngẫu nhiên', 270000, 'banh_kem_tre_em.jpg', 15, 10),
  (N'Bánh kem trái cây s16', N'Size 16, ngẫu nhiên', 320000, 'banh_kem_trai_cay.jpg', 15, 10),
  (N'Set hoa và bánh', N'Hộp gồm bánh và hoa trang  trí', 350000, 'set_hoa_banh.jpg', 15, 10);

INSERT INTO tbThongTinDatHang (sdt, diachi, toado, tennguoinhan, userid)
VALUES 
('0987654321', N'02 Thanh Sơn, Thanh Bình, Hải Châu, Đà Nẵng', geography::STPointFromText('POINT(108.2085 16.0729)', 4326), N'Trần Thị B', 1),
('0901234567', N'48 Cao Thắng, Thanh Bình, Hải Châu, Đà Nẵng', geography::STPointFromText('POINT(108.2151 16.0735)', 4326), N'Lê Văn C', 2);


insert into tbLoaiHinhThanhToan(tenhinhthuc, mota)
values (N'Tiền mặt', N'Thanh toán khi nhận hàng'),
		(N'Tài khoản ngân hàng', N'Liên kết tài khoản ngân hàng'),
		(N'ZaloPay', N'Tài khoản ZaloPay liên kết'),
		(N'Paypal', ''),
		(N'Momo', '');
--

INSERT INTO tbKhuyenMai (tenkm, mota, loaikm,phantramgiam, dieukien, ngaybatdau, ngayketthuc)
VALUES 
    (N'Khuyến mãi mùa hè', N'Giảm giá 20% cho tất cả sản phẩm mùa hè', N'Giảm giá',20, N'Sản phẩm mùa hè', '2024-06-01', '2024-08-31'),
    (N'Khuyến mãi sinh nhật', N'Giảm 30%  cho khách hàng sinh nhật trong tháng', N'Giảm giá',30, N'Khách hàng sinh nhật', '2024-01-01', '2024-5-17'),
    (N'Khuyến mãi mua hàng lớn', N'Giảm giá 10% cho hóa đơn từ 1 triệu trở lên', N'Giảm giá',10, N'Hóa đơn từ 1 triệu', '2024-05-01', '2024-05-10');

INSERT INTO tbMonAnKhuyenMai (makm, mamon, soluong, trangthai, phantramgiam)
VALUES 
    (1, 1, 50, N'Còn hạn', 20),
    (2, 2, 30, N'Hết hạn', 30),
    (2, 3, 20, N'Hết hạn', 10);

INSERT INTO tbDonHang (maquan, mattdh, ngaydathang, trangthai, tongtien, hinhthucthanhtoan, ghichu, makhuyenmai, phiship,phidichvu, ngaygiaohang, ngaythanhtoan, mashipper)
VALUES 
	(10, 1, '2024-05-16 08:00:00', N'Hoàn thành', 100000, 1, N'Ghi chú đơn hàng', NULL, 0, 0, '2024-05-20 08:00:00', '2024-05-20 08:00:00', 3),
	(6, 1, '2024-05-16 08:00:00', N'Đã đặt', 90000, 1, N'Ghi chú đơn hàng', 1, 0, 0, '2024-05-20 08:00:00', '2024-05-20 08:00:00', 3);

INSERT INTO tbChiTietDonHang (madh, mamon, soluong, dongia)
VALUES 
    (1, 1, 1, 50000.00),
    (1, 2, 2, 75000.00),
    (2, 2, 1, 60000.00);

INSERT INTO tbTinNhan (madh, noidung, mashipper, makh)
VALUES
    (1, N'Đơn hàng của bạn đã được xác nhận', 3, 1),
    (1, N'Đơn hàng của bạn đang được vận chuyển', 3, 1),
    (1, N'Giao hàng đã thành công', 3, 1),
    (2, N'Đơn hàng của bạn đã được xác nhận', 3, 1),
    (2, N'Đơn hàng của bạn đang được vận chuyển', 3, 1),
    (2, N'Giao hàng đã thành công', 3, 1);
