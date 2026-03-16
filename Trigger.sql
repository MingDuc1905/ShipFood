use dbFoody
go
-----------------TRIGGER-------------------------
--1. Trigger xóa bảng tin nhắn sau khi hoàn thành đơn hàng
CREATE TRIGGER trg_XoaTinNhan 
ON tbDonHang 
AFTER UPDATE 
AS 
BEGIN 
	DELETE FROM tbTinNhan
	WHERE madh IN (
		SELECT tbDonHang.madh
		FROM tbDonHang
		INNER JOIN inserted ON tbDonHang.madh = inserted.madh
		WHERE inserted.trangthai = N'Hoàn thành'
		 );
END;
go
--2. Trigger giảm số lượng mã khuyến mãi khi có đơn hàng sử dụng mã khuyến mãi đó 
CREATE trigger trg_GiamSoLuongMonAnKhuyenMai
ON tbDonHang
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE mk
    SET soluong = soluong - 1
    FROM tbMonAnKhuyenMai mk
    INNER JOIN inserted i ON mk.makm = i.makhuyenmai
    WHERE EXISTS (
        SELECT 1
        FROM inserted
        WHERE inserted.makhuyenmai = mk.makm
    );
END;
go

--3. Trigger cập nhật trạng thái của mã khuyến mãi khi insert dữ liệu vào 
CREATE TRIGGER trg_CapNhatTrangThaiMonAnKhuyenMai
ON tbMonAnKhuyenMai
AFTER INSERT
AS
BEGIN
    DECLARE @NgayHienTai DATETIME = GETDATE();
    UPDATE tbMonAnKhuyenMai
    SET trangthai = CASE
                        WHEN (select ngayketthuc from tbKhuyenMai km where inserted.makm = km.makm) <= @NgayHienTai THEN N'Hết hạn'
                        ELSE N'Còn hạn'
                    END
    FROM tbMonAnKhuyenMai makh
    JOIN inserted ON makh.id = inserted.id;
END;
go

--4. Trigger tính phí dịch vụ
CREATE TRIGGER trg_Tinh_phidichvu
ON tbDonHang
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Update phidichvu based on the time of the order
    UPDATE tbDonHang
    SET phidichvu = CASE
                        WHEN DATEPART(HOUR, i.ngaydathang) >= 22 OR DATEPART(HOUR, i.ngaydathang) < 6 THEN 10000
                        ELSE 5000
                    END
    FROM tbDonHang dh
    JOIN inserted i ON dh.madh = i.madh;
END;

go
--5.Function tính khoảng cách
CREATE FUNCTION dbo.Func_TinhKC
(
    @from GEOGRAPHY,
    @to GEOGRAPHY
)
RETURNS FLOAT
AS
BEGIN
    DECLARE @distance FLOAT;
    SET @distance = ceiling(@from.STDistance(@to) / 1000); 
    RETURN @distance;
END;
go