use master 
go
drop database if exists dbFoody
go
create database dbFoody
go
use dbFoody
go
create table tbUser
(
	userid int primary key identity(1,1),
	username varchar(50) not null,
	pwd nvarchar(50) not null,
	loaitaikhoan nvarchar(50) not null,
	constraint ck_ltk check (loaitaikhoan in (N'Khách hàng',N'Quán ăn',N'Shipper',N'Admin')),
	sdt varchar(11) not null,
	constraint sdt_uni unique(sdt),
	constraint ck_sdt check (
		(LEN(sdt) = 10 AND sdt LIKE '0%[0-9]') OR 
        (LEN(sdt) = 11 AND sdt LIKE '0%[0-9]')),
	vitien money,
	constraint ck_vitien check (vitien >= 0),
	email varchar(50) not null,
	constraint email__uni unique(email),
	constraint mail__lk check (email like '%@%'),
	trangthai int not null,
	constraint ck_trangthai CHECK(
	(trangthai in (1,2) and loaitaikhoan = N'Khách hàng') or
	(trangthai in ( 0,1,2,3) and loaitaikhoan in (N'Quán ăn', N'Shipper',N'Admin')))
	);
		--0: chưa duyệt; 1:Đã duyệt, đang hoạt động; 2:Đã bị khóa

create table tbShipper
(
	userid int foreign key references tbUser(userid),
	tenshipper nvarchar(50) not null,
	diachi nvarchar(250) not null,
	toado geography,
	diemdanhgia decimal,
	constraint ck_ddg_shipper check (diemdanhgia >= 0 and diemdanhgia<=5),
	soluotdanhgia int,
	constraint ck_sldg_shipper check (soluotdanhgia >= 0),
	trangthai nvarchar(50),
	constraint ck_ttshipper check (trangthai in (N'Đang hoạt động', N'Không hoạt động')),
	hinhanh varchar(100),
	primary key(userid)
)
alter table tbShipper add 
	constraint ttshipper_default default N'Không hoạt động' for trangthai;

create table tbQuanAn
(
	userid int primary key foreign key references tbUser(userid),
	tenquanan nvarchar(100) not null,
	diachi nvarchar(250) not null,
	toado geography,
	soluotdanhgia int,
	constraint ck_sldg_quan check (soluotdanhgia >= 0),
	diemdanhgia decimal,
	constraint ck_ddg_quan check (diemdanhgia >= 0 and diemdanhgia<=5),
	trangthai nvarchar(50),
	constraint ck_ttquan check (trangthai in (N'Đang mở cửa',N'Đóng cửa')),
	hinhanh varchar(100),
)
alter table tbQuanAn add 
	constraint ttquan_default default N'Đóng cửa' for trangthai;

create table tbKhachHang
(
	userid int primary key foreign key references tbUser(userid),
	tenkh nvarchar(50) not null,
)

create table tbThongTinDatHang
(
	mattdh int primary key identity(1,1),
	sdt varchar(11) not null,
	constraint ck_sdt_dh check (
		(LEN(sdt) = 10 AND sdt LIKE '0%[0-9]') OR 
        (LEN(sdt) = 11 AND sdt LIKE '0%[0-9]')),
	diachi nvarchar(250) not null,
	toado geography not null,
	tennguoinhan nvarchar(50) not null,
	userid int foreign key references tbKhachHang(userid),
)
create table tbKhuyenMai
(
	makm int primary key identity(1,1),
	tenkm nvarchar(100) not null,
	mota nvarchar(500),
	loaikm nvarchar(200) not null,
	phantramgiam int,
	dieukien nvarchar(500),
	ngaybatdau datetime,
	ngayketthuc datetime,
	constraint ck_date check (ngaybatdau<ngayketthuc),
)

create table tbLoaiHinhThanhToan
(
	mahttt int primary key identity(1,1),
	tenhinhthuc nvarchar(100) not null,
	mota nvarchar(500),
)

create table tbDonHang
(
	madh int primary key identity(1,1),
	maquan int foreign key references tbQuanAn(userid)
		ON UPDATE cascade
		ON DELETE set null,
	mattdh int foreign key references tbThongTinDatHang(mattdh)
		ON UPDATE cascade
		ON DELETE set null,
	ngaydathang datetime,
	trangthai nvarchar(50),
	constraint ck__trangthaidh check(trangthai in (N'Đã đặt',N'Đã hủy',N'Đã xác nhận',N'Đã lấy',N'Hoàn thành')),
	tongtien money,
	hinhthucthanhtoan int foreign key references tbLoaiHinhThanhToan(mahttt),
	ghichu nvarchar(200),
	makhuyenmai int foreign key references tbKhuyenMai(makm),
	phiship money,
	phidichvu money,
	ngaygiaohang datetime,
	ngaythanhtoan datetime,
	mashipper int foreign key references tbShipper(userid)
		ON UPDATE cascade
		ON DELETE set null,
    constraint ck_ngay_dhtt CHECK (ngaythanhtoan <= ngaygiaohang),
	constraint ck_ngay_dhgh CHECK (ngaydathang < ngaygiaohang),
)
alter table tbDonHang add 
	constraint ttdonhang_default default 'Đã đặt' for trangthai;


create table tbTinNhan
(
	matn int primary key identity(1,1),
	madh int foreign key references tbDonHang(madh),
	noidung nvarchar(500),
	mashipper int foreign key references tbShipper(userid),	
	makh int foreign key references tbKhachHang(userid),
)

create table tbDanhMuc
(
	madanhmuc int primary key identity(1,1),
	tendanhmuc nvarchar(100) not null,
	mota nvarchar(250),
	hinhanh varchar(100)
)

create table tbMonAn
(
	mamon int primary key identity(1,1),
	tenmon nvarchar(100) not null,
	mota nvarchar(500),
	giatien money,
	constraint ck_gia check (giatien >=0),
	hinhanh varchar(50),
	maquanan int foreign key references tbQuanAn(userid)
		ON UPDATE cascade
		ON DELETE cascade,
	madanhmuc int foreign key references tbDanhMuc(madanhmuc)
		ON UPDATE cascade
		ON DELETE cascade,
)

create table tbChiTietDonHang
(
	mactdh int primary key identity(1,1),
	madh int foreign key references tbDonHang(madh)
		ON UPDATE cascade
		ON DELETE cascade,
	mamon int foreign key references tbMonAn(mamon),
	soluong int,
	constraint ck_sl check (soluong >=0),
	dongia money,
	constraint ck_dgia check (dongia >=0),
)
create table tbMonAnKhuyenMai
(
	id int primary key identity(1,1),
	makm int foreign key references tbKhuyenMai(makm)
		ON UPDATE cascade
		ON DELETE cascade,
	mamon int foreign key references tbMonAn(mamon),
	soluong int,
	constraint ck_slkm check (soluong >= 0),
	trangthai nvarchar(50),
	constraint ck_ttkm check (trangthai in (N'Còn hạn',N'Hết hạn')),
	phantramgiam int not null,
)

alter table tbMonAnKhuyenMai add 
	constraint ttkm_default default 'Còn hạn' for trangthai;

create table tbDanhGia
(
	madg int primary key identity(1,1),
	mactdh int foreign key references tbChiTietDonHang(mactdh),
	diemdanhgia int,
	nhanxet nvarchar(500),
	hinhanh varchar(100),
)
create table tbAdmin
(
	userid int primary key foreign key references tbUser(userid),
	tenadmin nvarchar(50) not null,
)


